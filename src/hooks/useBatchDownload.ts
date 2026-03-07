import { useState, useCallback } from 'react';
import { subtitleApi } from '@/lib/api';

interface BatchProgress {
  total: number;
  completed: number;
  failed: number;
  currentVideo?: string;
  failedVideos: Array<{ title: string; error: string }>;
}

export function useBatchDownload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<BatchProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    failedVideos: []
  });
  const [taskId, setTaskId] = useState<string | null>(null);

  const startBatchDownload = useCallback(async (
    videos: any[],
    format: string,
    lang: string = 'en'
  ) => {
    setIsProcessing(true);
    setProgress({
      total: videos.length,
      completed: 0,
      failed: 0,
      failedVideos: []
    });

    try {
      // 超过50个视频强制异步处理
      if (videos.length > 50) {
        const result = await subtitleApi.submitBulkTask(videos, lang, format);
        setTaskId(result.task_id);

        // 轮询任务状态
        const pollInterval = setInterval(async () => {
          try {
            const status = await subtitleApi.checkTaskStatus(result.task_id);

            setProgress({
              total: videos.length,
              completed: status.completed || 0,
              failed: status.failed || 0,
              currentVideo: status.current_video,
              failedVideos: status.failed_videos || []
            });

            if (status.status === 'completed' || status.status === 'failed') {
              clearInterval(pollInterval);
              setIsProcessing(false);
            }
          } catch (error) {
            clearInterval(pollInterval);
            setIsProcessing(false);
          }
        }, 2000);
      } else {
        // 小批量同步处理，带错误容忍
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          setProgress(prev => ({
            ...prev,
            currentVideo: video.title
          }));

          try {
            await subtitleApi.downloadSingle({
              url: video.url,
              lang,
              format,
              title: video.title
            });

            setProgress(prev => ({
              ...prev,
              completed: prev.completed + 1
            }));
          } catch (error) {
            setProgress(prev => ({
              ...prev,
              failed: prev.failed + 1,
              failedVideos: [...prev.failedVideos, {
                title: video.title,
                error: error instanceof Error ? error.message : '下载失败'
              }]
            }));
          }
        }
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  }, []);

  const downloadZip = useCallback(async () => {
    if (!taskId) return;
    const blob = await subtitleApi.downloadZip(taskId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles_${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [taskId]);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setProgress({
      total: 0,
      completed: 0,
      failed: 0,
      failedVideos: []
    });
    setTaskId(null);
  }, []);

  return {
    isProcessing,
    progress,
    taskId,
    startBatchDownload,
    downloadZip,
    reset
  };
}
