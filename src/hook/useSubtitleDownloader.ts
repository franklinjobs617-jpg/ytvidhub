import { useRef, useState } from "react";
import { subtitleApi } from "@/lib/api";
import { extractVideoId, isPlaylistOrChannelUrl } from "@/lib/youtube";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';
import { trackConversion } from "@/lib/analytics";
import { useAuth } from "@/context/AuthContext";
import { CREDIT_COSTS } from "@/config/credits";

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
  successCount: number;
  failedCount: number;
  currentVideoTitle?: string;
  failedVideos: Array<{ title: string; error: string }>;
  error?: string;
}

type BatchVideo = {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string | number;
};

interface BulkCreditsGuardState {
  videos: BatchVideo[];
  format: string;
  lang: string;
  currentCredits: number;
  requiredCredits: number;
  affordableCount: number;
  shortfall: number;
}

interface PendingBulkTask {
  videos: BatchVideo[];
  format: string;
  lang: string;
  createdAt: number;
  source: string;
}

interface PostPartialUpsellState {
  completedCount: number;
  remainingCount: number;
  totalSelected: number;
  currentCredits: number;
  shortfall: number;
}

const PENDING_BULK_TASK_KEY = "ytvidhub_pending_bulk_resume_v1";

export function useSubtitleDownloader(onCreditsChanged?: () => void) {
  const { user } = useAuth();
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
 const [modalConfig, setModalConfig] = useState<{
  required: number;
  current: number;
  feature: string;
}>({
  required: CREDIT_COSTS.download,
  current: 0,
  feature: "this feature",
});
  const [bulkCreditsGuard, setBulkCreditsGuard] = useState<BulkCreditsGuardState | null>(null);
  const [postPartialUpsell, setPostPartialUpsell] = useState<PostPartialUpsellState | null>(null);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const processingCancelRef = useRef<boolean>(false);
  const processingPausedRef = useRef<boolean>(false);
  const bulkDownloadCancelRef = useRef<boolean>(false);

  // 多语言支持
  const tStatus = useTranslations('statusMessages');

  const getCurrentCredits = () => {
    if (typeof user?.credits === "number") return user.credits;
    if (typeof user?.credits === "string") return parseInt(user.credits, 10) || 0;
    return 0;
  };

  const getLocalePrefix = () => {
    if (typeof window === "undefined") return "";
    const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
    return firstSegment && firstSegment.length === 2 ? `/${firstSegment}` : "";
  };

  const gotoPricingWithBulkContext = (params: {
    selected: number;
    current: number;
    missing: number;
    stage: "precheck" | "post-partial";
  }) => {
    const localePrefix = getLocalePrefix();
    const query = new URLSearchParams({
      from: "bulk-shortfall",
      selected: String(params.selected),
      current: String(params.current),
      missing: String(params.missing),
      resume: "1",
      stage: params.stage,
    });

    window.location.href = `${localePrefix}/pricing?${query.toString()}`;
  };

  const savePendingBulkTask = (task: PendingBulkTask) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(PENDING_BULK_TASK_KEY, JSON.stringify(task));
  };

  const readPendingBulkTask = (): PendingBulkTask | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(PENDING_BULK_TASK_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PendingBulkTask;
    } catch {
      return null;
    }
  };

  const clearPendingBulkTask = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(PENDING_BULK_TASK_KEY);
  };

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
              id: `playlist-found-${total_videos}-${playlists_processed}`,
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
      // 1. 优先检查 sessionStorage 缓存（针对极速下载优化）
      const cacheKey = `ytvidhub_transcript_${video.url}_${lang}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        try {
          const { text, format: cachedFormat } = JSON.parse(cached);

          if (cachedFormat === format) {
            // 虽然是缓存，但依然需要扣除积分以保证公平性
            const userCredits = user?.credits ?? 0;
            if (userCredits < CREDIT_COSTS.download) {
              setModalConfig({
                required: CREDIT_COSTS.download,
                current: userCredits,
                feature: "Subtitle Download"
              });
              setIsCreditsModalOpen(true);
              setIsDownloading(false);
              return;
            }

            // 执行扣费 API
            subtitleApi
              .deductCredits(
                CREDIT_COSTS.download,
                `Subtitle Download (${format})`
              )
              .then(() => {
              if (onCreditsChanged) onCreditsChanged();
            }).catch(() => {
              console.error("Failed to deduct credits for cached download");
            });

            setProgress(100);
            const blob = new Blob([text], { type: 'text/plain' });
            triggerDownload(blob, `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`);
            trackConversion('download_success', { type: 'single', format, lang, cached: true });

            // 写入历史记录
            subtitleApi.upsertHistory({
              videoId: extractVideoId(video.url),
              videoUrl: video.url,
              title: video.title,
              thumbnail: video.thumbnail,
              duration: video.duration,
              lastAction: "subtitle_download",
              format,
              lang,
              subtitleContent: text,
            }).catch(() => { });

            setTimeout(() => setIsDownloading(false), 300);
            return;
          }
        } catch (e) {
          console.error("Cache parse error:", e);
        }
      }

      // 2. 检查内存中的下载历史缓存
      if (downloadedContent && downloadedContent.url === video.url && downloadedContent.format === format) {
        // ... 内存缓存属于同一操作的重复下载，通常不重复扣费（根据需求设定，这里维持原样或参考上面）
        setProgress(100);
        const blob = new Blob([downloadedContent.text], { type: 'text/plain' });
        triggerDownload(blob, `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`);
        trackConversion('download_success', { type: 'single', format, lang, memory_cached: true });
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
          required: CREDIT_COSTS.download,
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

  const startBulkDownload = async (
    videos: BatchVideo[],
    format: string,
    lang: string = "en",
    options?: { skipCreditPrecheck?: boolean; source?: "direct" | "partial_affordable" | "resume_after_payment" }
  ) => {
    const normalizedVideos = (videos || []).filter((video) => !!video?.url);
    if (normalizedVideos.length === 0) {
      toast.error("Please select at least one video.");
      return;
    }

    const currentCredits = getCurrentCredits();
    const requiredCredits = normalizedVideos.length * CREDIT_COSTS.download;

    if (!options?.skipCreditPrecheck) {
      if (!user) {
        toast.error("Authentication Required", {
          id: "auth-error",
          description: "Please login to download subtitles.",
          action: {
            label: "Login",
            onClick: () => (window.location.href = "/"),
          },
          duration: 5000,
        });
        return;
      }

      if (currentCredits < requiredCredits) {
        const shortfall = Math.max(0, requiredCredits - currentCredits);
        if (currentCredits <= 0) {
          setBulkCreditsGuard({
            videos: normalizedVideos,
            format,
            lang,
            currentCredits,
            requiredCredits,
            affordableCount: 0,
            shortfall,
          });
          toast.info(`You need ${shortfall} more credits to start this batch.`);

          trackConversion("download_error", {
            type: "bulk",
            reason: "insufficient_credits_precheck",
            currentCredits,
            requiredCredits,
            shortfall,
          });
          return;
        }

        const affordableCount = Math.max(
          0,
          Math.floor(currentCredits / CREDIT_COSTS.download)
        );
        const downloadableNow = normalizedVideos.slice(0, affordableCount);
        const remaining = normalizedVideos.slice(affordableCount);

        savePendingBulkTask({
          videos: remaining,
          format,
          lang,
          createdAt: Date.now(),
          source: "remaining_after_partial_auto",
        });

        toast.info(`Starting ${downloadableNow.length} downloads now`, {
          description: `${remaining.length} videos are saved for one-click resume after top-up.`,
        });

        trackConversion("download_start", {
          type: "bulk",
          source: "partial_affordable_auto",
          currentCredits,
          requiredCredits,
          partialCount: downloadableNow.length,
          remainingCount: remaining.length,
        });

        await startBulkDownload(downloadableNow, format, lang, {
          skipCreditPrecheck: true,
          source: "partial_affordable",
        });
        return;
      }
    }

    setIsDownloading(true);
    setProgress(5);
    bulkDownloadCancelRef.current = false;
    trackConversion("download_start", {
      type: "bulk",
      format,
      lang,
      count: normalizedVideos.length,
      source: options?.source || "direct",
    });

    const handleBulkError = (err: any) => {
      setIsDownloading(false);
      setBulkDownloadState(prev => prev ? { ...prev, phase: 'error', error: err.message } : null);

      const isCreditsError =
        err?.code === "INSUFFICIENT_CREDITS" ||
        err.message?.includes("Insufficient credits") ||
        err.message?.toLowerCase?.().includes("credit");

      if (isCreditsError) {
        // 获取当前积分
        const details = err?.details || {};
        const availableCredits = Number.isFinite(Number(details.userCredits))
          ? Number(details.userCredits)
          : getCurrentCredits();
        const required = Number(details.requiredCredits) > 0
          ? Number(details.requiredCredits)
          : normalizedVideos.length * CREDIT_COSTS.download;

        setBulkCreditsGuard({
          videos: normalizedVideos,
          format,
          lang,
          currentCredits: availableCredits,
          requiredCredits: required,
          affordableCount: Math.max(
            0,
            Number(
              details.affordableCount ??
                Math.floor(availableCredits / CREDIT_COSTS.download)
            )
          ),
          shortfall: Math.max(0, required - availableCredits),
        });
        toast.info(`Not enough credits for full batch. You can continue with a partial download.`);
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
        totalVideos: normalizedVideos.length,
        processedVideos: 0,
        successCount: 0,
        failedCount: 0,
        failedVideos: []
      });

      const task = await subtitleApi.submitBulkTask(normalizedVideos, lang, format);

      const pollTaskStatus = async (): Promise<void> => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (bulkDownloadCancelRef.current) {
            throw new Error('Download cancelled by user');
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
          const status = await subtitleApi.checkTaskStatus(task.task_id);
          const statusData = status?.data || status;

          if (status.status === "completed") {
            setProgress(100);
            setBulkDownloadState(prev => prev ? {
              ...prev,
              processedVideos: normalizedVideos.length,
              successCount: statusData.completed || status.completed || normalizedVideos.length,
              failedCount: statusData.failed || status.failed || 0,
              failedVideos: statusData.failed_videos || status.failed_videos || []
            } : null);

            const blob = await subtitleApi.downloadZip(task.task_id);
            if (blob.size === 0) throw new Error("Downloaded ZIP is empty");

            triggerDownload(blob, `bulk_subs_${Date.now()}.zip`);
            trackConversion('download_success', {
              type: 'bulk',
              format,
              lang,
              count: normalizedVideos.length,
              source: options?.source || "direct"
            });

            setBulkDownloadState(prev => prev ? { ...prev, phase: 'completed' } : null);

            // 【关键】记录批量下载历史
            const batchId = `batch_${Date.now()}`;
            normalizedVideos.forEach(video => {
              subtitleApi.upsertHistory({
                videoId: video.id,
                videoUrl: video.url,
                title: video.title,
                thumbnail: video.thumbnail,
                duration: typeof video.duration === "number" ? video.duration : undefined,
                lastAction: "batch_download" as any,
                format,
                lang,
                batchId
              }).catch(() => { });
            });

            if (options?.source === "resume_after_payment") {
              clearPendingBulkTask();
            }

            if (options?.source === "partial_affordable") {
              const pending = readPendingBulkTask();
              const remainingCount = pending?.videos?.length || 0;
              if (remainingCount > 0) {
                const totalSelected = normalizedVideos.length + remainingCount;
                setTimeout(() => {
                  const latestCredits = getCurrentCredits();
                  setPostPartialUpsell({
                    completedCount: normalizedVideos.length,
                    remainingCount,
                    totalSelected,
                    currentCredits: latestCredits,
                    shortfall: Math.max(0, remainingCount - latestCredits),
                  });
                }, 800);
              }
            }

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
            const completedCount = statusData.completed ?? status.completed ?? c;
            const failedCount = statusData.failed ?? status.failed ?? 0;
            const failedVideos = statusData.failed_videos || status.failed_videos || [];
            const currentVideoTitle =
              statusData.current_video || status.current_video || normalizedVideos[c]?.title;
            setProgress(t > 0 ? (c / t) * 100 : 15);

            setBulkDownloadState(prev => prev ? {
              ...prev,
              processedVideos: c,
              successCount: completedCount,
              failedCount,
              failedVideos,
              currentVideoTitle
            } : null);
          }
        }
      };

      await pollTaskStatus();
    } catch (err: any) {
      handleBulkError(err);
    }
  };

  const closeBulkCreditsGuard = () => {
    setBulkCreditsGuard(null);
  };

  const downloadAffordableBulkNow = async () => {
    if (!bulkCreditsGuard) return;

    const { videos, affordableCount, format, lang } = bulkCreditsGuard;
    if (affordableCount <= 0) return;

    const downloadableNow = videos.slice(0, affordableCount);
    const remaining = videos.slice(affordableCount);
    setBulkCreditsGuard(null);

    if (remaining.length > 0) {
      savePendingBulkTask({
        videos: remaining,
        format,
        lang,
        createdAt: Date.now(),
        source: "remaining_after_partial",
      });

      toast.info(`Starting ${downloadableNow.length} downloads now`, {
        description: `${remaining.length} videos are saved so you can resume after top-up.`,
      });
    }

    await startBulkDownload(downloadableNow, format, lang, {
      skipCreditPrecheck: true,
      source: "partial_affordable",
    });
  };

  const upgradeForBulkDownload = () => {
    if (!bulkCreditsGuard) return;

    const { videos, format, lang, currentCredits, requiredCredits, shortfall } = bulkCreditsGuard;
    savePendingBulkTask({
      videos,
      format,
      lang,
      createdAt: Date.now(),
      source: "upgrade_from_shortfall",
    });

    gotoPricingWithBulkContext({
      selected: requiredCredits,
      current: currentCredits,
      missing: shortfall,
      stage: "precheck",
    });
  };

  const closePostPartialUpsell = () => {
    setPostPartialUpsell(null);
  };

  const upgradeRemainingBulkDownload = () => {
    const pending = readPendingBulkTask();
    if (!pending) {
      setPostPartialUpsell(null);
      return;
    }

    const requiredCredits = pending.videos.length;
    const currentCredits = getCurrentCredits();
    const shortfall = Math.max(0, requiredCredits - currentCredits);
    setPostPartialUpsell(null);

    gotoPricingWithBulkContext({
      selected: requiredCredits,
      current: currentCredits,
      missing: shortfall,
      stage: "post-partial",
    });
  };

  const resumeRemainingBulkNow = async () => {
    setPostPartialUpsell(null);
    await resumePendingBulkDownload();
  };

  const resumePendingBulkDownload = async () => {
    const pending = readPendingBulkTask();
    if (!pending) return false;

    const requiredCredits = pending.videos.length;
    const currentCredits = getCurrentCredits();
    if (currentCredits < requiredCredits) {
      setBulkCreditsGuard({
        videos: pending.videos,
        format: pending.format,
        lang: pending.lang,
        currentCredits,
        requiredCredits,
        affordableCount: Math.max(0, currentCredits),
        shortfall: Math.max(0, requiredCredits - currentCredits),
      });
      return false;
    }

    toast.success(`Resuming saved batch (${requiredCredits} videos)...`);
    await startBulkDownload(pending.videos, pending.format, pending.lang, {
      skipCreditPrecheck: true,
      source: "resume_after_payment",
    });
    return true;
  };

  const hasPendingBulkDownload = () => {
    return !!readPendingBulkTask();
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
          required: CREDIT_COSTS.summary,
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
    downloadAffordableBulkNow,
    upgradeForBulkDownload,
    closePostPartialUpsell,
    upgradeRemainingBulkDownload,
    resumeRemainingBulkNow,
    closeBulkCreditsGuard,
    resumePendingBulkDownload,
    hasPendingBulkDownload,
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
    bulkCreditsGuard,
    postPartialUpsell,
  };
}
