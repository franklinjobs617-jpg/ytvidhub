// hooks/useSubtitleDownloader.ts
import { useState, useRef } from "react";
import { subtitleApi } from "@/lib/api";
import { extractVideoId, isPlaylistOrChannelUrl } from "@/lib/youtube";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';
import { trackConversion } from "@/lib/analytics";

interface PlaylistProcessingState {
  phase: 'expanding' | 'checking' | 'completed' | 'error' | 'paused';
  currentPlaylist?: {
    title: string;
    uploader: string;
    totalVideos: number;
    url: string;
  };
  totalVideos: number;
  processedVideos: number;
  videosWithSubtitles: number;
  currentVideoTitle?: string;
  estimatedTimeRemaining?: number;
  error?: string;
  canPause: boolean;
  canCancel: boolean;
}

interface BulkDownloadState {
  phase: 'processing' | 'completed' | 'error';
  totalVideos: number;
  processedVideos: number;
  currentVideoTitle?: string;
  error?: string;
}

export function useSubtitleDownloader(onCreditsChanged?: () => void) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<string>("");
  const [statusText, setStatusText] = useState("");
  const [playlistProcessing, setPlaylistProcessing] = useState<PlaylistProcessingState | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [bulkDownloadState, setBulkDownloadState] = useState<BulkDownloadState | null>(null);
  const [showBulkDownloadModal, setShowBulkDownloadModal] = useState(false);
  const [downloadedContent, setDownloadedContent] = useState<{ text: string; title: string; url: string; format?: string } | null>(null);

  // 积分不足弹窗状态
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ required: 1, current: 0, feature: "this feature" });

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const processingCancelRef = useRef<boolean>(false);
  const processingPausedRef = useRef<boolean>(false);
  const bulkDownloadCancelRef = useRef<boolean>(false);

  // 多语言支持
  const tStatus = useTranslations('statusMessages');
  const tActions = useTranslations('actions');

  const startSmoothProgress = (max = 95) => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => (prev >= max ? prev : prev + (max - prev) * 0.1));
    }, 200);
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const analyzeUrls = async (urls: string[]) => {
    setIsAnalyzing(true);
    setProgress(0);
    processingCancelRef.current = false;
    processingPausedRef.current = false;

    try {
      // 智能识别URL类型：单个视频、playlist、channel
      const hasPlaylistOrChannel = urls.some(url => isPlaylistOrChannelUrl(url));

      if (hasPlaylistOrChannel) {
        // 显示处理模态框
        setShowPlaylistModal(true);

        // 阶段1：展开playlist
        setPlaylistProcessing({
          phase: 'expanding',
          totalVideos: 0,
          processedVideos: 0,
          videosWithSubtitles: 0,
          canPause: false,
          canCancel: true
        });

        setStatusText(tStatus('expandingPlaylist', { count: '...' }));
        setProgress(10);

        // 使用新的智能解析API
        const parseResult = await subtitleApi.parseMixedUrls(urls);

        // 检查是否被取消
        if (processingCancelRef.current) {
          throw new Error('Processing cancelled by user');
        }

        // 更新playlist信息
        if (parseResult.summary && parseResult.summary.playlist_info.length > 0) {
          const firstPlaylist = parseResult.summary.playlist_info[0];
          setPlaylistProcessing(prev => prev ? {
            ...prev,
            phase: 'checking',
            currentPlaylist: {
              title: firstPlaylist.title || 'Unknown Playlist',
              uploader: 'Unknown',
              totalVideos: parseResult.summary.total_videos,
              url: firstPlaylist.url
            },
            totalVideos: parseResult.summary.total_videos,
            canPause: true,
            canCancel: true
          } : null);
        }

        // 显示展开结果
        if (parseResult.summary) {
          const { total_videos, duplicates_removed, playlists_processed } = parseResult.summary;

          if (duplicates_removed > 0) {
            setStatusText(tStatus('deduplicating'));
            setProgress(30);
          }

          // 显示成功消息
          toast.success(
            tStatus('foundVideos', {
              count: total_videos,
              playlists: playlists_processed
            }),
            {
              position: "top-center",
              duration: 3000
            }
          );
        }

        // 阶段2：检查字幕可用性
        setStatusText(tStatus('checkingSubtitles'));
        setProgress(50);

        // 使用去重后的视频列表
        const uniqueVideoUrls = parseResult.unique_videos?.map((v: any) => v.url) || [];

        if (uniqueVideoUrls.length === 0) {
          throw new Error("No valid videos found");
        }

        // 分批检查字幕（避免超时）- 增强用户体验版本
        const batchSize = 30;
        const allResults: any[] = [];
        const startTime = Date.now();

        for (let i = 0; i < uniqueVideoUrls.length; i += batchSize) {
          // 检查是否被取消或暂停
          if (processingCancelRef.current) {
            throw new Error('Processing cancelled by user');
          }

          // 处理暂停
          while (processingPausedRef.current && !processingCancelRef.current) {
            setPlaylistProcessing(prev => prev ? { ...prev, phase: 'paused' } : null);
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          if (processingCancelRef.current) {
            throw new Error('Processing cancelled by user');
          }

          // 恢复处理状态
          setPlaylistProcessing(prev => prev ? { ...prev, phase: 'checking' } : null);

          const batch = uniqueVideoUrls.slice(i, i + batchSize);
          const batchProgress = 50 + (i / uniqueVideoUrls.length) * 45;
          setProgress(batchProgress);

          // 更新当前处理状态
          const currentVideoIndex = i;
          const estimatedTotalTime = uniqueVideoUrls.length * 2; // 假设每个视频2秒
          const elapsedTime = (Date.now() - startTime) / 1000;
          const estimatedRemaining = Math.max(0, estimatedTotalTime - elapsedTime);

          setPlaylistProcessing(prev => prev ? {
            ...prev,
            processedVideos: currentVideoIndex,
            estimatedTimeRemaining: Math.round(estimatedRemaining),
            currentVideoTitle: parseResult.unique_videos?.[currentVideoIndex]?.title
          } : null);

          try {
            const batchData = await subtitleApi.batchCheck(batch);
            allResults.push(...batchData.results);

            // 更新成功检查的视频数量
            const videosWithSubtitles = allResults.filter(r => r.can_download).length;
            setPlaylistProcessing(prev => prev ? {
              ...prev,
              processedVideos: currentVideoIndex + batch.length,
              videosWithSubtitles
            } : null);

          } catch (error) {
            console.warn(`Batch ${i}-${i + batchSize} failed:`, error);
            // 为失败的批次创建默认结果
            batch.forEach((url: any) => {
              allResults.push({
                url,
                video_info: { title: "Check Failed", uploader: "Unknown" },
                can_download: false
              });
            });
          }

          // 继续下一批
        }

        // 完成处理
        setProgress(100);
        setPlaylistProcessing(prev => prev ? {
          ...prev,
          phase: 'completed',
          processedVideos: uniqueVideoUrls.length,
          estimatedTimeRemaining: 0
        } : null);

        // 关闭模态框
        setTimeout(() => {
          setShowPlaylistModal(false);
          setPlaylistProcessing(null);
        }, 800);

        return allResults.map((item: any) => ({
          id: extractVideoId(item.url),
          url: item.url,
          title: item.video_info.title || "Untitled",
          uploader: item.video_info.uploader || "Unknown",
          thumbnail: `https://i.ytimg.com/vi/${extractVideoId(item.url)}/hqdefault.jpg`,
          hasSubtitles: item.can_download,
          subtitleStatus: item.can_download ? 'available' : 'unavailable'
        }));
      } else {
        // 原有的单个视频处理逻辑
        setStatusText(tStatus('checkingSubtitles'));
        const data = await subtitleApi.batchCheck(urls);
        return data.results.map((item: any) => ({
          id: extractVideoId(item.url),
          url: item.url,
          title: item.video_info.title || "Untitled",
          uploader: item.video_info.uploader || "Unknown",
          thumbnail: `https://i.ytimg.com/vi/${extractVideoId(item.url)}/hqdefault.jpg`,
          hasSubtitles: item.can_download,
          subtitleStatus: item.can_download ? 'available' : 'unavailable'
        }));
      }
    } catch (error: any) {
      if (error.message.includes('cancelled')) {
        toast.info('Processing cancelled by user');
        return [];
      }

      setPlaylistProcessing(prev => prev ? {
        ...prev,
        phase: 'error',
        error: error.message
      } : null);

      throw error;
    } finally {
      setIsAnalyzing(false);
      setStatusText("");
      setProgress(100);
    }
  };

  const startSingleDownload = async (video: any, format: string, lang: string = "en") => {
    setIsDownloading(true);
    setProgress(10);
    trackConversion('download_start', { type: 'single', format, lang });

    try {
      // 如果已有相同 URL 和格式的内容，直接下载
      if (downloadedContent && downloadedContent.url === video.url && downloadedContent.format === format) {
        setProgress(100);
        const blob = new Blob([downloadedContent.text], { type: 'text/plain' });
        triggerDownload(blob, `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`);
        trackConversion('download_success', { type: 'single', format, lang, cached: true });
        setTimeout(() => setIsDownloading(false), 500);
        return;
      }

      setStatusText("Connecting...");
      startSmoothProgress(98);

      const blob = await subtitleApi.downloadSingle({
        url: video.url,
        lang,
        format,
        title: video.title,
      });

      setProgress(100);
      setStatusText("Complete!");
      triggerDownload(blob, `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`);
      trackConversion('download_success', { type: 'single', format, lang });

      let subtitleText: string | undefined;
      try {
        subtitleText = await blob.text();
        setDownloadedContent({ text: subtitleText, title: video.title, url: video.url, format });
      } catch {
        // 读取失败不影响下载
      }

      // 写入历史记录（fire-and-forget）
      const videoId = extractVideoId(video.url);
      subtitleApi.upsertHistory({
        videoId,
        videoUrl: video.url,
        title: video.title,
        thumbnail: video.thumbnail,
        duration: video.duration,
        lastAction: "subtitle_download",
        format,
        lang,
        subtitleContent: subtitleText,
      }).catch(() => { });

      // 延迟刷新积分显示，确保服务器端已更新
      setTimeout(() => {
        if (onCreditsChanged) {
          onCreditsChanged();
        }
      }, 1000);

      setTimeout(() => setIsDownloading(false), 800);
    } catch (err: any) {
      setIsDownloading(false);

      // 特殊处理积分不足的错误
      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        trackConversion('download_error', { type: 'single', reason: 'insufficient_credits' });
        // 获取当前积分
        const currentCredits = typeof window !== 'undefined' ? parseInt(localStorage.getItem('user_credits') || "0") : 0;
        setModalConfig({
          required: 1,
          current: currentCredits,
          feature: "Subtitle Download"
        });
        setIsCreditsModalOpen(true);
      } else if (err.message.includes("login")) {
        toast.error("Authentication Required", {
          id: 'auth-error',
          description: "Please login to download subtitles.",
          action: {
            label: "Login",
            onClick: () => window.location.href = "/"
          },
          duration: 5000,
        });
      } else {
        toast.error(err.message);
      }
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const startBulkDownload = async (videos: any[], format: string, lang: string = "en") => {
    setIsDownloading(true);
    setProgress(5);
    bulkDownloadCancelRef.current = false;
    trackConversion('download_start', { type: 'bulk', format, lang, count: videos.length });

    const handleBulkError = (err: any) => {
      setIsDownloading(false);
      setBulkDownloadState(prev => prev ? { ...prev, phase: 'error', error: err.message } : null);

      if (err.message?.includes("Insufficient credits") || err.message?.includes("credit")) {
        // 获取当前积分
        const currentCredits = typeof window !== 'undefined' ? parseInt(localStorage.getItem('user_credits') || "0") : 0;
        setModalConfig({
          required: videos.length,
          current: currentCredits,
          feature: `Bulk Download (${videos.length} videos)`
        });
        setIsCreditsModalOpen(true);
      } else if (err.message?.includes("login")) {
        toast.error("Authentication Required", {
          id: 'auth-error',
          description: "Please login to download subtitles.",
          action: {
            label: "Login",
            onClick: () => window.location.href = "/"
          },
          duration: 5000,
        });
      } else if (!err.message?.includes("cancelled")) {
        toast.error(err.message || "Bulk download failed");
      }

      setTimeout(() => {
        setShowBulkDownloadModal(false);
        setBulkDownloadState(null);
      }, 3000);
    };

    try {
      setShowBulkDownloadModal(true);
      setBulkDownloadState({
        phase: 'processing',
        totalVideos: videos.length,
        processedVideos: 0
      });

      const task = await subtitleApi.submitBulkTask(videos, lang, format);

      const pollTaskStatus = async (): Promise<void> => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (bulkDownloadCancelRef.current) {
            throw new Error('Download cancelled by user');
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
          const status = await subtitleApi.checkTaskStatus(task.task_id);

          if (status.status === "completed") {
            setProgress(100);
            setBulkDownloadState(prev => prev ? { ...prev, processedVideos: videos.length } : null);

            const blob = await subtitleApi.downloadZip(task.task_id);
            if (blob.size === 0) throw new Error("Downloaded ZIP is empty");

            triggerDownload(blob, `bulk_subs_${Date.now()}.zip`);
            trackConversion('download_success', { type: 'bulk', format, lang, count: videos.length });

            setBulkDownloadState(prev => prev ? { ...prev, phase: 'completed' } : null);

            setTimeout(() => {
              if (onCreditsChanged) onCreditsChanged();
            }, 1000);

            setTimeout(() => {
              setIsDownloading(false);
              setShowBulkDownloadModal(false);
              setBulkDownloadState(null);
            }, 2000);
            return;
          } else if (status.status === "failed") {
            throw new Error(status.error || "Batch task failed on server");
          } else {
            const [c, t] = (status.progress || "0/0").split("/").map(Number);
            setProgress(t > 0 ? (c / t) * 100 : 15);

            setBulkDownloadState(prev => prev ? {
              ...prev,
              processedVideos: c,
              currentVideoTitle: videos[c]?.title
            } : null);
          }
        }
      };

      await pollTaskStatus();
    } catch (err: any) {
      handleBulkError(err);
    }
  };

  const generateAiSummary = async (
    videoUrl: string,
    onChunk?: (chunk: string) => void
  ) => {
    setIsAiLoading(true);
    setSummaryData("");

    try {
      console.log("🚀 Starting AI summary for:", videoUrl);
      const response = await subtitleApi.generateSummaryStream(videoUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Failed to start AI summary");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (!reader) throw new Error("Response body is null");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // 处理混合了状态信息和内容的 chunk
        if (chunk.includes("__STATUS__:")) {
          const parts = chunk.split("__STATUS__:");
          for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (!part) continue;

            const lineEndIndex = part.indexOf("\n");
            if (lineEndIndex !== -1 && i > 0) {
              const statusMsg = part.substring(0, lineEndIndex).trim();
              setStatusText(statusMsg);

              const content = part.substring(lineEndIndex + 1);
              if (content) {
                accumulatedText += content;
                setSummaryData(accumulatedText);
                if (onChunk) onChunk(accumulatedText);
              }
            } else if (i === 0 && !chunk.startsWith("__STATUS__")) {
              accumulatedText += part;
              setSummaryData(accumulatedText);
              if (onChunk) onChunk(accumulatedText);
            }
          }
        }
        else if (chunk.includes("__ERROR__:")) {
          const errorMsg = chunk.split("__ERROR__:")[1];
          toast.error("AI Generation Error", { description: errorMsg });
          break;
        }
        else {
          accumulatedText += chunk;
          setSummaryData(accumulatedText);
          if (onChunk) onChunk(accumulatedText);
        }
      } // End while

      console.log("✅ AI summary completed, length:", accumulatedText.length);
      setStatusText("");
      return accumulatedText;
    } catch (err: any) {
      console.error("❌ Summary Stream Error:", err);

      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        // 获取当前积分
        const currentCredits = typeof window !== 'undefined' ? parseInt(localStorage.getItem('user_credits') || "0") : 0;
        setModalConfig({
          required: 2,
          current: currentCredits,
          feature: "AI Summary"
        });
        setIsCreditsModalOpen(true);
      } else if (err.message.includes("login")) {
        toast.error("Authentication Required", {
          id: 'auth-error',
          description: "Please login to use AI Summary feature.",
          action: {
            label: "Login",
            onClick: () => window.location.href = "/"
          },
          duration: 5000,
        });
      } else {
        toast.error(err.message || "An error occurred");
      }

      throw err;
    } finally {
      setIsAiLoading(false);
      console.log("🏁 AI summary process finished");

      setTimeout(() => {
        if (onCreditsChanged) {
          onCreditsChanged();
        }
      }, 1000);
    }
  };

  const clearDownloadedContent = () => setDownloadedContent(null);

  const pauseProcessing = () => {
    processingPausedRef.current = true;
  };

  const resumeProcessing = () => {
    processingPausedRef.current = false;
  };

  const cancelProcessing = () => {
    processingCancelRef.current = true;
    setShowPlaylistModal(false);
    setPlaylistProcessing(null);
    setIsAnalyzing(false);
  };

  const cancelBulkDownload = () => {
    bulkDownloadCancelRef.current = true;
    setShowBulkDownloadModal(false);
    setBulkDownloadState(null);
    setIsDownloading(false);
  };

  return {
    isAiLoading,
    summaryData,
    setSummaryData,
    generateAiSummary,
    analyzeUrls,
    startSingleDownload,
    startBulkDownload,
    isAnalyzing,
    isDownloading,
    progress,
    statusText,
    playlistProcessing,
    showPlaylistModal,
    pauseProcessing,
    resumeProcessing,
    cancelProcessing,
    bulkDownloadState,
    showBulkDownloadModal,
    cancelBulkDownload,
    downloadedContent,
    clearDownloadedContent,
    isCreditsModalOpen,
    setIsCreditsModalOpen,
    modalConfig,
  };
}
