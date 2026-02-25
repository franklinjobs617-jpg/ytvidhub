// hooks/useSubtitleDownloader.ts
import { useState, useRef } from "react";
import { subtitleApi } from "@/lib/api";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';

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

export function useSubtitleDownloader(onCreditsChanged?: () => void) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<string>("");
  const [statusText, setStatusText] = useState("");
  const [playlistProcessing, setPlaylistProcessing] = useState<PlaylistProcessingState | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const processingCancelRef = useRef<boolean>(false);
  const processingPausedRef = useRef<boolean>(false);

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
      const hasPlaylistOrChannel = urls.some(url =>
        url.includes('playlist?list=') ||
        url.includes('/channel/') ||
        url.includes('/@') ||
        url.includes('/c/')
      );

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
            await new Promise(resolve => setTimeout(resolve, 800)); // 给用户看到去重过程
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
        const batchSize = 10; // 减小批次大小，更频繁更新
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

          // 小延迟避免过快请求，同时给用户更好的视觉反馈
          if (i + batchSize < uniqueVideoUrls.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }

        // 完成处理
        setProgress(100);
        setPlaylistProcessing(prev => prev ? {
          ...prev,
          phase: 'completed',
          processedVideos: uniqueVideoUrls.length,
          estimatedTimeRemaining: 0
        } : null);

        // 延迟关闭模态框，让用户看到完成状态
        setTimeout(() => {
          setShowPlaylistModal(false);
          setPlaylistProcessing(null);
        }, 2000);

        return allResults.map((item: any) => ({
          id: (item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11),
          url: item.url,
          title: item.video_info.title || "Untitled",
          uploader: item.video_info.uploader || "Unknown",
          thumbnail: `https://i.ytimg.com/vi/${(item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11)}/hqdefault.jpg`,
          hasSubtitles: item.can_download,
          subtitleStatus: item.can_download ? 'available' : 'unavailable'
        }));
      } else {
        // 原有的单个视频处理逻辑
        setStatusText(tStatus('checkingSubtitles'));
        const data = await subtitleApi.batchCheck(urls);
        return data.results.map((item: any) => ({
          id: (item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11),
          url: item.url,
          title: item.video_info.title || "Untitled",
          uploader: item.video_info.uploader || "Unknown",
          thumbnail: `https://i.ytimg.com/vi/${(item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11)}/hqdefault.jpg`,
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
    setStatusText("Checking credits...");

    try {
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
      triggerDownload(
        blob,
        `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`
      );

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
        toast.error("Download Failed", {
          id: 'credits-error',
          description: "Subtitle download requires 1 credit. You don't have enough credits.",
          action: {
            label: "Get Credits",
            onClick: () => window.open("/pricing", "_blank")
          },
          duration: 5000,
        });
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
    setStatusText("Checking credits...");

    try {
      setStatusText("Initializing...");
      startSmoothProgress(30);

      const task = await subtitleApi.submitBulkTask(videos, lang, format);
      const timer = setInterval(async () => {
        try {
          const status = await subtitleApi.checkTaskStatus(task.task_id);
          if (status.status === "completed") {
            clearInterval(timer);
            setProgress(100);
            setStatusText("Success!");
            const blob = await subtitleApi.downloadZip(task.task_id);
            triggerDownload(blob, `bulk_subs_${Date.now()}.zip`);

            // 延迟刷新积分显示，确保服务器端已更新
            setTimeout(() => {
              if (onCreditsChanged) {
                onCreditsChanged();
              }
            }, 1000);

            setTimeout(() => setIsDownloading(false), 1000);
          } else {
            const [c, t] = (status.progress || "0/0").split("/").map(Number);
            setProgress(t > 0 ? (c / t) * 100 : 15);
            setStatusText(`Processing ${c}/${t}...`);
          }
        } catch (e) {
          clearInterval(timer);
          throw e;
        }
      }, 3000);
    } catch (err: any) {
      setIsDownloading(false);

      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        toast.error("Bulk Download Failed", {
          id: 'credits-error',
          description: `Bulk download requires ${videos.length} credits. You don't have enough.`,
          action: {
            label: "Get Credits",
            onClick: () => window.open("/pricing", "_blank")
          },
          duration: 5000,
        });
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
        toast.error("AI Summary Failed", {
          id: 'credits-error',
          description: "AI Summary requires 2 credits. You don't have enough.",
          action: {
            label: "Get Credits",
            onClick: () => window.open("/pricing", "_blank")
          },
          duration: 5000,
        });
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
    // 新增的playlist处理功能
    playlistProcessing,
    showPlaylistModal,
    pauseProcessing,
    resumeProcessing,
    cancelProcessing,
  };
}
