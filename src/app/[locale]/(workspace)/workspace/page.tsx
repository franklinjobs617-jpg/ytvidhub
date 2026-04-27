"use client";

import { useCallback, useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/workspace/Sidebar";
import { VideoPlayer } from "@/components/workspace/VideoPlayer";
import { TranscriptArea } from "@/components/workspace/TranscriptArea";
import { SummaryArea } from "@/components/workspace/SummaryArea";
import { EmptyState } from "@/components/workspace/EmptyState";
import { UrlInput } from "@/components/workspace/UrlInput";
import { VideoSwitcher } from "@/components/workspace/VideoSwitcher";
import { AnalysisStatus } from "@/components/workspace/AnalysisStatus";
import { MobileNavigation } from "@/components/workspace/MobileNavigation";
import { ResponsiveLayout } from "@/components/workspace/ResponsiveLayout";
import { KeyboardShortcuts } from "@/components/workspace/KeyboardShortcuts";
import { QuickActions } from "@/components/workspace/QuickActions";
import { TabSwitcher } from "@/components/workspace/TabSwitcher";
import {
  Loader2,
  ArrowLeft,
  Sparkles,
  Video as VideoIcon,
  Zap,
  Plus,
} from "lucide-react";
import {
  extractVideoId,
  normalizeYoutubeUrl,
  isPlaylistOrChannelUrl,
} from "@/lib/youtube";
import {
  clearPendingAction,
  getPendingAction,
  savePendingAction,
} from "@/lib/pendingAction";
import {
  getGuestLimitMessage,
  promptLoginForGuestLimit,
} from "@/lib/guestLimitPrompt";
import { BatchGridView } from "@/components/workspace/BatchGridView";
import { BatchProgressModal } from "@/components/workspace/BatchProgressModal";
import { PlaylistProgressModal } from "@/components/workspace/PlaylistProgressModal";
import { TranslateModal } from "@/components/workspace/TranslateModal";

import { InsufficientCreditsModal } from "@/components/workspace/InsufficientCreditsModal";
import { BulkCreditActionModal } from "@/components/workspace/BulkCreditActionModal";
import { BulkPostPartialUpsellModal } from "@/components/workspace/BulkPostPartialUpsellModal";
import { BatchActionConfirmModal } from "@/components/workspace/BatchActionConfirmModal";

const getTranscriptUnlockKey = (
  video?: { id?: string; url?: string } | null,
) => video?.id || video?.url || "";

// === 1. 核心逻辑组件 ===
function WorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshUser, openLoginModal } = useAuth();
  const normalizedUserCredits =
    typeof user?.credits === "number"
      ? user.credits
      : parseInt(String(user?.credits ?? "0"), 10) || 0;

  // URL 参数获取
  const urlsParam = searchParams.get("urls");
  const fromParam = searchParams.get("from");
  const modeParam = searchParams.get("mode");
  const resumeBulkParam = searchParams.get("resumeBulk");
  const isFromHome = fromParam === "home";
  const isFromHistory = fromParam === "history";
  const isSummaryMode = modeParam === "summary";

  const initialUrls = urlsParam ? decodeURIComponent(urlsParam).split(",") : [];

  // 检测是否为批量模式（多个视频或playlist/channel）
  const initialShouldShowBatchMode =
    initialUrls.length > 1 ||
    (initialUrls.length === 1 && isPlaylistOrChannelUrl(initialUrls[0]));

  const [showBatchView, setShowBatchView] = useState(initialShouldShowBatchMode);
  const [batchSelectedIds, setBatchSelectedIds] = useState<string[]>([]);
  const [hasConfirmedPreviewLeave, setHasConfirmedPreviewLeave] =
    useState(false);
  const [batchConfirmAction, setBatchConfirmAction] = useState<{
    mode: "leave_batch" | "open_preview";
    video?: any;
  } | null>(null);

  const placeholderVideos = initialUrls.map((url) => {
    const id = extractVideoId(url);
    return {
      id,
      url,
      title: "Loading video info...",
      uploader: "...",
      hasSubtitles: false,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  });

  const [videoList, setVideoList] = useState<any[]>(placeholderVideos);
  const hasBatchContext = initialShouldShowBatchMode || videoList.length > 1;
  const isBatchMode = hasBatchContext && showBatchView;
  const [currentVideo, setCurrentVideo] = useState<any>(
    placeholderVideos[0] || null,
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"video" | "analysis">(
    isSummaryMode ? "analysis" : "video",
  );

  const [leftWidth, setLeftWidth] = useState(40); // 调整默认比例分配 40:60，右侧留给功能区域更多空间

  const analysisCache = useRef<Map<string, string>>(new Map());
  const isAnalyzing = useRef<Set<string>>(new Set());
  const metadataHydratedUrlRef = useRef<Set<string>>(new Set());
  const videoPlayerRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null!);
  const hasTriedResumeRef = useRef(false);
  const isResumingPendingActionRef = useRef(false);

  const [inputUrl, setInputUrl] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [analysisError, setAnalysisError] = useState<string>("");
  const [transcriptLang, setTranscriptLang] = useState("en");
  const [isTranscriptLoading, setIsTranscriptLoading] = useState(false);
  const [isTranscriptReady, setIsTranscriptReady] = useState(false);
  const [unlockedTranscriptKeys, setUnlockedTranscriptKeys] = useState<
    string[]
  >([]);
  const [showMobileUrlInput, setShowMobileUrlInput] = useState(false);
  const [mobileKeyboardInset, setMobileKeyboardInset] = useState(0);
  const [showTranslateModal, setShowTranslateModal] = useState(false);

  const selectedBatchCount = batchSelectedIds.length;
  const currentTranscriptUnlockKey = getTranscriptUnlockKey(currentVideo);
  const isCurrentTranscriptUnlocked =
    !!currentTranscriptUnlockKey &&
    unlockedTranscriptKeys.includes(currentTranscriptUnlockKey);

  const unlockTranscriptForVideo = useCallback(
    (video?: { id?: string; url?: string } | null) => {
      const key = getTranscriptUnlockKey(video);
      if (!key) return;
      setUnlockedTranscriptKeys((previous) =>
        previous.includes(key) ? previous : [...previous, key],
      );
    },
    [],
  );

  const {
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
    isAnalyzing: isTranscriptAnalyzing,
    isDownloading,
    progress,
    statusText,
    bulkDownloadState,
    playlistProcessing,
    showPlaylistModal,
    cancelProcessing,
    isCreditsModalOpen,
    setIsCreditsModalOpen,
    modalConfig,
    bulkCreditsGuard,
    postPartialUpsell,
  } = useSubtitleDownloader(refreshUser);

  useEffect(() => {
    if (resumeBulkParam !== "1" || hasTriedResumeRef.current) return;
    if (!user) return;

    hasTriedResumeRef.current = true;

    (async () => {
      const resumed = await resumePendingBulkDownload();
      if (!resumed && !hasPendingBulkDownload()) {
        toast.info("No pending batch found to resume.");
      }
    })();

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("resumeBulk");
    nextParams.delete("fromPayment");
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `/workspace?${nextQuery}` : "/workspace", {
      scroll: false,
    });
  }, [
    resumeBulkParam,
    user,
    resumePendingBulkDownload,
    hasPendingBulkDownload,
    router,
    searchParams,
  ]);

  useEffect(() => {
    if (!currentVideo?.id) return;

    // 先检查缓存，如果有就直接设置，避免闪烁
    const cachedResult = analysisCache.current.get(currentVideo.id);
    if (cachedResult) {
      setSummaryData(cachedResult);
    } else {
      setSummaryData("");
    }
  }, [currentVideo?.id]);

  const [initialSubtitleContent, setInitialSubtitleContent] =
    useState<string>("");

  const maybePromptLoginForGuestLimit = (error: unknown): boolean => {
    if (user) return false;
    if (!promptLoginForGuestLimit(error, openLoginModal)) return false;
    setAnalysisError(getGuestLimitMessage(error));
    return true;
  };

  const getReadableErrorMessage = (
    error: unknown,
    fallback = "Something went wrong. Please try again.",
  ) => {
    if (error instanceof Error && error.message?.trim()) return error.message;
    if (typeof error === "string" && error.trim()) return error;
    return fallback;
  };

  const showAnalysisError = (
    error: unknown,
    fallback = "Failed to analyze this video. Please try again.",
  ) => {
    if (maybePromptLoginForGuestLimit(error)) return;
    const message = getReadableErrorMessage(error, fallback);
    setAnalysisError(message);
    toast.error(message);
  };

  const shouldHydrateMetadata = (
    video:
      | { url?: string; title?: string; uploader?: string }
      | null
      | undefined,
  ) => {
    if (!video?.url) return false;
    const title = String(video.title || "").trim();
    const uploader = String(video.uploader || "").trim();

    const titleNeedsHydration =
      !title ||
      title === "YouTube Video" ||
      title === "Loading video info..." ||
      title === "Unknown Video";
    const uploaderNeedsHydration =
      !uploader || uploader === "Guest Preview" || uploader === "...";

    return titleNeedsHydration || uploaderNeedsHydration;
  };

  // --- 初始化逻辑 ---
  useEffect(() => {
    if (!urlsParam) return;

    let isCancelled = false;
    let autoStartTimer: NodeJS.Timeout | null = null;

    const urls = decodeURIComponent(urlsParam).split(",");

    // 清理函数
    const cleanup = () => {
      isCancelled = true;
      if (autoStartTimer) {
        clearTimeout(autoStartTimer);
        autoStartTimer = null;
      }
    };

    // 如果是从历史记录来的，加载保存的内容
    if (isFromHistory && urls.length === 1) {
      const videoId = extractVideoId(urls[0]);

      Promise.all([
        subtitleApi.getVideoInfo(urls[0]).catch(() => null),
        subtitleApi
          .getHistoryContent(videoId)
          .catch(
            (): { summaryContent?: string; subtitleContent?: string } => ({}),
          ),
      ])
        .then(([videoInfo, savedContent]) => {
          if (isCancelled) return;

          const vid = videoInfo?.id || videoId;
          const enhancedVideo = {
            id: vid,
            url: urls[0],
            title: videoInfo?.title || "Loading...",
            uploader: videoInfo?.uploader || "...",
            hasSubtitles: videoInfo?.has_subtitles ?? true,
            thumbnail:
              videoInfo?.thumbnail ||
              `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
            duration: videoInfo?.duration,
          };

          setCurrentVideo(enhancedVideo);
          setVideoList([enhancedVideo]);

          if (savedContent.summaryContent) {
            setSummaryData(savedContent.summaryContent);
            analysisCache.current.set(vid, savedContent.summaryContent);
          }

          if (savedContent.subtitleContent) {
            setInitialSubtitleContent(savedContent.subtitleContent);
            unlockTranscriptForVideo(enhancedVideo);
            try {
              sessionStorage.setItem(
                `ytvidhub_transcript_${urls[0]}`,
                JSON.stringify({
                  text: savedContent.subtitleContent,
                  format: "vtt",
                }),
              );
            } catch (e) {}
          }

          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("from");
          router.replace(`/workspace?${newParams.toString()}`, {
            scroll: false,
          });
        })
        .catch(() => {
          if (isCancelled) return;
          analyzeUrls(urls)
            .then(handleAnalysisResults)
            .catch((analysisError) => {
              if (isCancelled) return;
              showAnalysisError(analysisError, "Failed to load video details.");
            });
        });
    } else {
      analyzeUrls(urls)
        .then(handleAnalysisResults)
        .catch((error) => {
          if (isCancelled) return;
          showAnalysisError(error, "Failed to analyze the provided URL.");
        });
    }
    // ... (rest of the file logic continues correctly)

    function handleAnalysisResults(results: any[]) {
      if (isCancelled) return;

      setVideoList(results);

      if (results.length > 0) {
        const firstVideo = results[0];
        setCurrentVideo(firstVideo);

        // 自动开始AI分析 - 只对从首页来的用户自动开始
        const storageKey = `auto_analyzed_${firstVideo.id}`;
        const hasAnalyzedInSession = sessionStorage.getItem(storageKey);
        const cachedResult = analysisCache.current.get(firstVideo.id);

        if (cachedResult) {
          setSummaryData(cachedResult);
        }

        // 不再自动添加历史记录，只有在用户下载或解锁时才添加
        if (isFromHome) {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("from");
          newParams.delete("mode");
          router.replace(`/workspace?${newParams.toString()}`, {
            scroll: false,
          });
        }
      }
    }

    return cleanup;
  }, [urlsParam]);

  // --- Handle Video Switching & Caching ---
  useEffect(() => {
    setIsTranscriptReady(false);
  }, [currentVideo?.id]);

  useEffect(() => {
    if (!currentVideo?.id) return;

    // 立即清空显示内容，防止串台
    setSummaryData("");

    // 检查缓存
    const cached = analysisCache.current.get(currentVideo.id);
    if (cached) {
      setTimeout(() => {
        setSummaryData(cached);
      }, 100);
    }
  }, [currentVideo?.id]);

  useEffect(() => {
    if (summaryData && currentVideo?.id && !isAiLoading) {
      if (summaryData.trim().length > 0) {
        analysisCache.current.set(currentVideo.id, summaryData);
      }
    }
  }, [summaryData, currentVideo?.id, isAiLoading]);

  useEffect(() => {
    setBatchSelectedIds((previous) => {
      if (previous.length === 0) return previous;
      const validIds = new Set(
        videoList
          .filter((video) => video.hasSubtitles !== false)
          .map((video) => video.id),
      );
      const filtered = previous.filter((id) => validIds.has(id));
      if (filtered.length === previous.length) return previous;
      return filtered;
    });
  }, [videoList]);

  // 登录后：如果当前视频还是游客占位信息，主动拉取 video-info 回填标题/作者
  useEffect(() => {
    if (!user) {
      metadataHydratedUrlRef.current.clear();
      return;
    }
    if (!currentVideo?.url) return;
    if (!shouldHydrateMetadata(currentVideo)) return;
    if (metadataHydratedUrlRef.current.has(currentVideo.url)) return;

    metadataHydratedUrlRef.current.add(currentVideo.url);
    let cancelled = false;

    subtitleApi
      .getVideoInfo(currentVideo.url)
      .then((videoInfo) => {
        if (cancelled || !videoInfo) return;
        const videoId = videoInfo.id || extractVideoId(currentVideo.url);

        const hydratedPatch = {
          id: videoId,
          title: videoInfo.title || currentVideo.title || "YouTube Video",
          uploader: videoInfo.uploader || currentVideo.uploader || "...",
          hasSubtitles:
            typeof videoInfo.has_subtitles === "boolean"
              ? videoInfo.has_subtitles
              : currentVideo.hasSubtitles,
          thumbnail:
            videoInfo.thumbnail ||
            currentVideo.thumbnail ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          duration:
            typeof videoInfo.duration === "number"
              ? videoInfo.duration
              : currentVideo.duration,
        };

        setCurrentVideo((prev: any) =>
          prev?.url === currentVideo.url ? { ...prev, ...hydratedPatch } : prev,
        );
        setVideoList((prev: any[]) =>
          prev.map((video) =>
            video.url === currentVideo.url ? { ...video, ...hydratedPatch } : video,
          ),
        );
      })
      .catch(() => {
        // 失败允许后续再次尝试
        metadataHydratedUrlRef.current.delete(currentVideo.url);
      });

    return () => {
      cancelled = true;
    };
  }, [user, currentVideo, currentVideo?.url, currentVideo?.title, currentVideo?.uploader]);

  useEffect(() => {
    if (!showMobileUrlInput) {
      setMobileKeyboardInset(0);
      return;
    }

    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      if (!viewport) {
        setMobileKeyboardInset(0);
        return;
      }

      const inset = Math.max(
        0,
        Math.round(window.innerHeight - viewport.height - viewport.offsetTop),
      );
      setMobileKeyboardInset(inset);
    };

    updateKeyboardInset();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", updateKeyboardInset);
    viewport?.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("orientationchange", updateKeyboardInset);

    return () => {
      viewport?.removeEventListener("resize", updateKeyboardInset);
      viewport?.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("orientationchange", updateKeyboardInset);
      setMobileKeyboardInset(0);
    };
  }, [showMobileUrlInput]);

  useEffect(() => {
    setHasConfirmedPreviewLeave(false);
  }, [batchSelectedIds.join(",")]);

  const confirmBatchAction = () => {
    if (!batchConfirmAction) return;

    if (batchConfirmAction.mode === "leave_batch") {
      setBatchConfirmAction(null);
      window.location.href = "/";
      return;
    }

    if (
      batchConfirmAction.mode === "open_preview" &&
      batchConfirmAction.video
    ) {
      setHasConfirmedPreviewLeave(true);
      toast.success(`Selection kept: ${selectedBatchCount} videos.`, {
        id: "batch-selection-kept",
        description: "You can return to batch mode anytime.",
      });
      setCurrentVideo(batchConfirmAction.video);
      setShowBatchView(false);
    }

    setBatchConfirmAction(null);
  };

  // 字幕预加载：后台预加载其他视频的字幕
  useEffect(() => {
    if (!videoList || videoList.length <= 1) return;

    const preloadSubtitles = async () => {
      for (const video of videoList) {
        // 跳过当前视频
        if (video.id === currentVideo?.id) continue;

        // 检查是否已缓存
        const cacheKey = `ytvidhub_transcript_${video.url}`;
        if (sessionStorage.getItem(cacheKey)) continue;

        // 预加载字幕
        try {
          const blob = await subtitleApi.downloadSingle({
            url: video.url,
            lang: "en",
            format: "vtt",
            title: video.title,
            isPreview: true,
          });
          const text = await blob.text();
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ text, format: "vtt" }),
          );
        } catch {
          // 静默失败
        }
      }
    };

    // 延迟执行，避免阻塞主线程
    const timer = setTimeout(preloadSubtitles, 1000);
    return () => clearTimeout(timer);
  }, [videoList, currentVideo?.id]);

  // P2: 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果用户正在输入框中，不触发快捷键
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        // 只允许 Ctrl+F 在输入框中也能工作
        if (e.ctrlKey && e.key === "f") {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
        return;
      }

      switch (e.key) {
        case " ": // 空格键：播放/暂停
          e.preventDefault();
          if (videoPlayerRef.current) {
            videoPlayerRef.current.togglePlayPause();
          }
          break;
        case "ArrowLeft": // 左箭头：快退5秒
          e.preventDefault();
          if (currentTime > 0) {
            setSeekTime(Math.max(0, currentTime - 5));
          }
          break;
        case "ArrowRight": // 右箭头：快进5秒
          e.preventDefault();
          setSeekTime(currentTime + 5);
          break;
        case "f": // Ctrl+F：聚焦搜索框
          if (e.ctrlKey) {
            e.preventDefault();
            searchInputRef.current?.focus();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTime]);

  const handleRequestAnalysis = async (
    url?: string,
    videoId?: string,
    forceRegenerate = false,
    videoMeta?: { title?: string; thumbnail?: string; duration?: number },
  ) => {
    const targetUrl = url || currentVideo?.url;
    const targetId = videoId || currentVideo?.id;

    if (!targetUrl || !targetId) return;

    if (!user) {
      savePendingAction({
        type: "ai_summary",
        payload: {
          videoUrl: targetUrl,
          videoId: targetId,
        },
      });
      toast.info("Please login. We will continue AI Summary automatically.");
      openLoginModal();
      return;
    }

    if (isAiLoading && !forceRegenerate) return;
    if (isAnalyzing.current.has(targetId) && !forceRegenerate) return;

    // 清除之前的错误
    setAnalysisError("");

    if (forceRegenerate) {
      analysisCache.current.delete(targetId);
      sessionStorage.removeItem(`auto_analyzed_${targetId}`);
      setSummaryData("");
    } else {
      const cachedResult = analysisCache.current.get(targetId);
      if (cachedResult && cachedResult.trim().length > 0) {
        setSummaryData(cachedResult);
        return;
      }
    }

    isAnalyzing.current.add(targetId);

    if (window.innerWidth < 768) setActiveTab("analysis");

    try {
      const summaryText = await generateAiSummary(targetUrl, () => {});
      await refreshUser();

      // P3.1: 屏幕阅读器公告
      // announceToScreenReader("Analysis completed successfully");

      // 使用传入的 videoMeta（避免 React 状态未更新导致保存旧标题）
      const meta = videoMeta ?? currentVideo;
      if (meta) {
        subtitleApi.upsertHistory({
          videoId: targetId,
          videoUrl: targetUrl,
          title: meta.title || "Unknown Video",
          thumbnail: meta.thumbnail,
          duration: meta.duration,
          lastAction: "ai_summary",
          summaryContent: summaryText || undefined,
        });
      }
    } catch (error: any) {
      showAnalysisError(error, "Analysis failed. Please try again.");
      // announceToScreenReader(`Analysis failed: ${error?.message || "Please try again"}`);
    } finally {
      isAnalyzing.current.delete(targetId);
    }
  };

  useEffect(() => {
    if (!user || isResumingPendingActionRef.current) return;
    const pending = getPendingAction();
    if (!pending) return;

    const resume = async () => {
      try {
        isResumingPendingActionRef.current = true;
        clearPendingAction();

        if (pending.type === "ai_summary") {
          await handleRequestAnalysis(
            pending.payload.videoUrl,
            pending.payload.videoId,
          );
          return;
        }

        if (pending.type === "download_single") {
          const matchedVideo =
            videoList.find((video) => video.url === pending.payload.videoUrl) ||
            (currentVideo?.url === pending.payload.videoUrl ? currentVideo : null);

          const targetVideo =
            matchedVideo || {
              id: extractVideoId(pending.payload.videoUrl),
              url: pending.payload.videoUrl,
              title: pending.payload.title || "subtitle",
              thumbnail: `https://i.ytimg.com/vi/${extractVideoId(pending.payload.videoUrl)}/hqdefault.jpg`,
            };

          const downloaded = await startSingleDownload(
            targetVideo,
            pending.payload.format,
            pending.payload.lang,
          );
          if (downloaded) unlockTranscriptForVideo(targetVideo);
          return;
        }

        if (pending.type === "download_bulk") {
          await startBulkDownload(
            pending.payload.videos || [],
            pending.payload.format,
            pending.payload.lang,
          );
          return;
        }

        if (pending.type === "playlist_analyze") {
          toast.info("Resuming playlist analysis...");
          const results = await analyzeUrls([pending.payload.url]);
          if (results && results.length > 0) {
            setVideoList(results);
            setCurrentVideo(results[0]);
            setSummaryData("");
            setInputUrl("");
            setShowBatchView(true);
            toast.success(`Added ${results.length} videos!`);
          }
        }
      } catch (error) {
        const message =
          error instanceof Error && error.message
            ? error.message
            : "Failed to resume your previous action.";
        toast.error(message);
      } finally {
        isResumingPendingActionRef.current = false;
      }
    };

    resume();
  }, [
    user,
    videoList,
    currentVideo,
    startSingleDownload,
    startBulkDownload,
    analyzeUrls,
    handleRequestAnalysis,
    unlockTranscriptForVideo,
  ]);

  // 新增：处理新 URL 分析
  const handleAnalyzeNewUrl = async (urlToAnalyze?: string) => {
    const targetUrl = urlToAnalyze || inputUrl.trim();
    if (!targetUrl || isAddingVideo) return;

    // 简单的 Youtube URL 验证
    if (!targetUrl.includes("youtube.com") && !targetUrl.includes("youtu.be")) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    // 更新输入框状态
    if (urlToAnalyze) {
      setInputUrl(urlToAnalyze);
    }

    // 标准化 URL：watch?v=xxx&list=PLxxx → playlist?list=PLxxx
    const normalizedUrl = normalizeYoutubeUrl(targetUrl);

    if (!user) {
      if (isPlaylistOrChannelUrl(normalizedUrl)) {
        savePendingAction({
          type: "playlist_analyze",
          payload: {
            url: normalizedUrl,
          },
        });
        toast.info("Please login. We will continue playlist analysis automatically.");
        openLoginModal();
        return;
      }

      try {
        const results = await analyzeUrls([normalizedUrl]);
        if (results && results.length > 0) {
          setVideoList((prev) => {
            const resultIds = new Set(results.map((video: any) => video.id));
            return [...results, ...prev.filter((video: any) => !resultIds.has(video.id))];
          });
          setCurrentVideo(results[0]);
          setSummaryData("");
          setInputUrl("");
          toast.success("Video analyzed in guest mode.");
        }
      } catch (error) {
        showAnalysisError(error, "Guest parsing failed. Please login to continue.");
      }
      return;
    }

    // 如果是 playlist/channel，走批量流程
    if (isPlaylistOrChannelUrl(normalizedUrl)) {
      toast.info("Analyzing playlist...");
      setInputUrl("");
      try {
        const results = await analyzeUrls([normalizedUrl]);
        if (results && results.length > 0) {
          setVideoList(results);
          setCurrentVideo(results[0]);
          setSummaryData("");
          setShowBatchView(true); // 切换到批量模式
          toast.success(`Added ${results.length} videos!`);
        }
      } catch (error) {
        showAnalysisError(error, "Failed to analyze playlist/channel.");
      }
      return;
    }

    setIsAddingVideo(true);
    toast.info("Analyzing video...");

    try {
      const videoInfo = await subtitleApi.getVideoInfo(normalizedUrl);
      const videoId = videoInfo.id || extractVideoId(normalizedUrl);

      const newVideo = {
        id: videoId,
        url: normalizedUrl,
        title: videoInfo.title || "Unknown Video",
        uploader: videoInfo.uploader || "...",
        hasSubtitles: videoInfo.has_subtitles,
        thumbnail:
          videoInfo.thumbnail ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        duration: videoInfo.duration,
      };

      // 记录到数据库（成功获取视频信息）
      subtitleApi
        .upsertHistory({
          videoId,
          videoUrl: normalizedUrl,
          title: newVideo.title,
          thumbnail: newVideo.thumbnail,
          duration: newVideo.duration,
          lastAction: "video_analyze",
        })
        .catch(() => {});

      // 添加到列表并切换
      setVideoList((prev) => {
        if (prev.some((v) => v.id === videoId)) return prev;
        return [newVideo, ...prev];
      });

      // 先清空当前的总结，防止串台
      setSummaryData("");

      // 切换到新视频
      setCurrentVideo(newVideo);
      setInputUrl("");

      toast.success("Video added successfully!");

      // 切换到分析标签，但不自动开始 AI 分析
      setActiveTab("analysis");

      // 检查是否有缓存的 AI 总结
      const cachedResult = analysisCache.current.get(videoId);
      if (cachedResult && cachedResult.trim().length > 0) {
        setTimeout(() => setSummaryData(cachedResult), 100);
      }
      // AI 总结改为手动触发，用户需要点击按钮才开始分析
    } catch (error) {
      // 失败也记录到数据库
      const failedVideoId = extractVideoId(normalizedUrl);
      if (failedVideoId) {
        subtitleApi
          .upsertHistory({
            videoId: failedVideoId,
            videoUrl: normalizedUrl,
            title: "Failed to load",
            lastAction: "video_analyze",
          })
          .catch(() => {});
      }
      showAnalysisError(
        error,
        "Failed to fetch video info. Please check the URL and try again.",
      );
    } finally {
      setIsAddingVideo(false);
    }
  };

  const handleSeek = (timeStr: string) => {
    const parts = timeStr.split(":").map(Number);
    const secs =
      parts.length === 2
        ? parts[0] * 60 + parts[1]
        : parts[0] * 3600 + parts[1] * 60 + parts[2];
    setSeekTime(secs);
    if (window.innerWidth < 768) setActiveTab("video");
  };

  if (!currentVideo)
    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        <header className="h-14 border-b border-slate-100 flex items-center justify-between px-2 sm:px-4 shrink-0 z-[60] bg-white gap-2 sm:gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => (window.location.href = "/")}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} className="text-slate-500" />
            </button>
            <span className="hidden sm:inline text-lg font-black tracking-tighter text-blue-600 italic">
              YTvidHub
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full">
              <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                <span className="text-[10px] font-black text-amber-900">C</span>
              </div>
              <span className="text-sm font-bold text-amber-700 tabular-nums">
                {normalizedUserCredits}
              </span>
            </div>
            <button
              onClick={() => router.push("/pricing")}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-all shadow-sm group"
            >
              <Sparkles
                size={12}
                className="text-amber-400 group-hover:scale-110 transition-transform"
              />
              <span className="hidden sm:inline">Upgrade</span>
            </button>
          </div>
        </header>

        <div className="flex-1">
          <EmptyState onUrlSubmit={handleAnalyzeNewUrl} />
        </div>
      </div>
    );

  // 批量模式：显示九宫格下载界面
  if (isBatchMode) {
    return (
      <div className="fixed inset-0 flex flex-col bg-white overflow-hidden">
        <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (selectedBatchCount > 0) {
                  setBatchConfirmAction({ mode: "leave_batch" });
                  return;
                }
                window.location.href = "/";
              }}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} className="text-slate-500" />
            </button>
            <span className="text-lg font-black tracking-tighter text-blue-600 italic">
              YTvidHub
            </span>
            <span className="text-sm text-slate-500">Batch Download</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full">
              <span className="text-sm font-bold text-amber-700">
                {normalizedUserCredits}
              </span>
              <span className="text-xs text-amber-600">Credits</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          <BatchGridView
            videos={videoList}
            userCredits={normalizedUserCredits}
            initialSelectedIds={batchSelectedIds}
            onSelectedIdsChange={(nextSelectedIds) => {
              setBatchSelectedIds((previous) => {
                if (
                  previous.length === nextSelectedIds.length &&
                  previous.every((id, index) => id === nextSelectedIds[index])
                ) {
                  return previous;
                }
                return nextSelectedIds;
              });
            }}
            onDownloadSingle={async (video, format) => {
              if (!user) {
                savePendingAction({
                  type: "download_single",
                  payload: {
                    videoUrl: video.url,
                    title: video.title || "subtitle",
                    format: format as "srt" | "vtt" | "txt",
                    lang: transcriptLang,
                  },
                });
                toast.info(
                  "Please login. We will continue your download automatically.",
                );
                openLoginModal();
                return;
              }
              const downloaded = await startSingleDownload(
                video,
                format,
                transcriptLang,
              );
              if (downloaded) unlockTranscriptForVideo(video);
            }}
            onDownloadBatch={(videos, format) => {
              if (!user) {
                savePendingAction({
                  type: "download_bulk",
                  payload: {
                    videos,
                    format: format as string,
                    lang: transcriptLang,
                  },
                });
                toast.info(
                  "Please login. We will continue your download automatically.",
                );
                openLoginModal();
                return;
              }
              startBulkDownload(videos, format, transcriptLang);
            }}
            onVideoClick={(video) => {
              if (selectedBatchCount > 0 && !hasConfirmedPreviewLeave) {
                setBatchConfirmAction({
                  mode: "open_preview",
                  video,
                });
                return;
              }
              setCurrentVideo(video);
              setShowBatchView(false);
            }}
            isDownloading={false}
            progress={0}
            statusText=""
          />
          <BatchProgressModal
            isOpen={isDownloading && !!bulkDownloadState}
            total={bulkDownloadState?.totalVideos || 0}
            completed={bulkDownloadState?.successCount || 0}
            failed={bulkDownloadState?.failedCount || 0}
            currentVideo={bulkDownloadState?.currentVideoTitle}
            failedVideos={bulkDownloadState?.failedVideos || []}
          />
          <BulkCreditActionModal
            isOpen={!!bulkCreditsGuard}
            currentCredits={bulkCreditsGuard?.currentCredits || 0}
            requiredCredits={bulkCreditsGuard?.requiredCredits || 0}
            affordableCount={bulkCreditsGuard?.affordableCount || 0}
            onClose={closeBulkCreditsGuard}
            onDownloadAffordable={downloadAffordableBulkNow}
            onUpgrade={upgradeForBulkDownload}
          />
          <BulkPostPartialUpsellModal
            isOpen={!!postPartialUpsell}
            completedCount={postPartialUpsell?.completedCount || 0}
            remainingCount={postPartialUpsell?.remainingCount || 0}
            totalSelected={postPartialUpsell?.totalSelected || 0}
            currentCredits={postPartialUpsell?.currentCredits || 0}
            shortfall={postPartialUpsell?.shortfall || 0}
            onClose={closePostPartialUpsell}
            onUpgrade={upgradeRemainingBulkDownload}
            onResumeNow={resumeRemainingBulkNow}
          />
          <InsufficientCreditsModal
            isOpen={isCreditsModalOpen}
            onClose={() => setIsCreditsModalOpen(false)}
            requiredAmount={modalConfig.required}
            featureName={modalConfig.feature}
            currentAmount={modalConfig.current}
          />
          <PlaylistProgressModal
            isOpen={showPlaylistModal}
            phase={playlistProcessing?.phase || "expanding"}
            totalVideos={playlistProcessing?.totalVideos || 0}
            processedVideos={playlistProcessing?.processedVideos || 0}
            videosWithSubtitles={playlistProcessing?.videosWithSubtitles || 0}
            currentVideoTitle={playlistProcessing?.currentVideoTitle}
            playlistTitle={playlistProcessing?.currentPlaylist?.title}
            error={playlistProcessing?.error}
            onClose={cancelProcessing}
          />
          <BatchActionConfirmModal
            isOpen={!!batchConfirmAction}
            title={
              batchConfirmAction?.mode === "leave_batch"
                ? "Leave Batch Mode?"
                : "Open Preview?"
            }
            description={
              batchConfirmAction?.mode === "leave_batch"
                ? `You currently selected ${selectedBatchCount} videos. Leaving now will discard this selection.`
                : `You selected ${selectedBatchCount} videos. We will keep your selection and you can continue batch download after preview.`
            }
            confirmLabel={
              batchConfirmAction?.mode === "leave_batch"
                ? "Leave and discard"
                : "Open preview"
            }
            cancelLabel={
              batchConfirmAction?.mode === "leave_batch"
                ? "Stay in batch"
                : "Keep selecting"
            }
            onCancel={() => setBatchConfirmAction(null)}
            onConfirm={confirmBatchAction}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FC] h-screen overflow-hidden flex flex-col font-sans">
      <header className="h-14 border-b border-gray-200 flex items-center justify-between px-2 sm:px-4 shrink-0 z-[60] bg-white gap-2 sm:gap-4 relative">
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => {
              if (hasBatchContext && !showBatchView) {
                setShowBatchView(true);
                if (selectedBatchCount > 0) {
                  toast.success(
                    `Restored ${selectedBatchCount} selected videos.`,
                    {
                      id: "batch-selection-restored",
                    },
                  );
                }
              } else {
                window.location.href = "/";
              }
            }}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
          {hasBatchContext && !showBatchView && (
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              Back to Playlist
            </span>
          )}
          <span className="hidden md:inline text-lg font-black tracking-tighter text-slate-800 italic">
            YTvidHub
          </span>
        </div>

        {/* URL 输入区域 - 绝对居中 */}
        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-[500px] lg:w-[600px] xl:w-[680px]">
          <UrlInput
            value={inputUrl}
            onChange={setInputUrl}
            onSubmit={handleAnalyzeNewUrl}
            isLoading={isAddingVideo}
            className="w-full"
          />
        </div>

        {/* 右侧按钮组 */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => setShowMobileUrlInput(true)}
            className="md:hidden inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Plus size={14} />
            <span>Add Link</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 border border-yellow-100 rounded-full shadow-sm">
            <Zap size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-yellow-700 tabular-nums">
              {normalizedUserCredits}
            </span>
            <span className="text-[11px] font-bold text-yellow-600 uppercase tracking-wide">
              Credits
            </span>
          </div>

          <button
            onClick={() => router.push("/pricing")}
            className="hidden sm:flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px"
          >
            Upgrade
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden md:flex shrink-0 h-full border-r border-slate-100 bg-slate-50/30">
          <Sidebar
            videos={videoList}
            activeId={currentVideo.id}
            onSelect={(v: any) => {
              // 只有当选择不同视频时才切换
              if (v.id !== currentVideo.id) {
                setCurrentVideo(v);
                // 立即清空当前显示的摘要，防止串台
                setSummaryData("");
                // 清除错误状态
                setAnalysisError("");
              }
            }}
            isLoading={isTranscriptLoading}
          />
        </div>

        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* 视频切换器 - 仅在移动端显示 */}
          <div className="md:hidden">
            <VideoSwitcher
              videos={videoList}
              activeId={currentVideo.id}
              onSelect={(v: any) => {
                if (v.id !== currentVideo.id) {
                  setCurrentVideo(v);
                  setSummaryData("");
                  setAnalysisError("");
                }
              }}
              isLoading={isAiLoading}
              onAddVideo={() => setShowMobileUrlInput(true)}
            />
          </div>

          <ResponsiveLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            leftWidth={leftWidth}
            onLeftWidthChange={setLeftWidth}
            leftPanel={
              <>
                {/* 改造为“参考视窗 (Reference Window)” */}
                <div className="p-3 md:p-4 shrink-0 bg-slate-50/60 border-b border-slate-100 flex flex-col items-center justify-center gap-3 md:gap-4 group">
                  <div className="w-full max-w-[300px] aspect-video rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 bg-black/5 overflow-hidden transition-transform duration-300 group-hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]">
                    <VideoPlayer
                      ref={videoPlayerRef}
                      videoId={currentVideo.id}
                      seekTime={seekTime}
                      onTimeUpdate={setCurrentTime}
                    />
                  </div>
                  <h1 className="text-[13px] md:text-sm font-semibold text-slate-800 line-clamp-2 md:line-clamp-3 leading-relaxed text-center flex-1 max-w-[420px]">
                    {currentVideo.title}
                  </h1>
                </div>

                {/* 快速操作栏 */}
                <QuickActions
                  videoUrl={currentVideo.url}
                  videoTitle={currentVideo.title}
                  lang={transcriptLang}
                  onCopyAll={() => {
                    // 触发 TranscriptArea 的复制功能
                    const event = new CustomEvent("copyAllTranscript");
                    window.dispatchEvent(event);
                  }}
                  onGenerateAiSummary={() => handleRequestAnalysis()}
                  hasAiSummary={!!summaryData}
                  isGeneratingAi={isAiLoading}
                  isTranscriptLoading={isTranscriptLoading}
                  isTranscriptReady={isTranscriptReady}
                  onDownloadSuccess={() =>
                    unlockTranscriptForVideo(currentVideo)
                  }
                  onTranslate={() => setShowTranslateModal(true)}
                />

                <div className="flex-1 min-h-0 overflow-hidden">
                  <TranscriptArea
                    videoUrl={currentVideo.url}
                    videoId={currentVideo.id}
                    currentTime={currentTime}
                    onSeek={setSeekTime}
                    searchInputRef={searchInputRef}
                    onLoadingChange={setIsTranscriptLoading}
                    initialSubtitleContent={initialSubtitleContent}
                    lang={transcriptLang}
                    onLangChange={setTranscriptLang}
                    onTranscriptReadyChange={setIsTranscriptReady}
                    isTranscriptUnlocked={isCurrentTranscriptUnlocked}
                    onRequestUnlock={() => {
                      window.dispatchEvent(
                        new CustomEvent("downloadTranscriptForUnlock"),
                      );
                    }}
                  />
                </div>
              </>
            }
            rightPanel={
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <SummaryArea
                    data={summaryData}
                    isLoading={isAiLoading}
                    onSeek={handleSeek}
                    onStartAnalysis={() => handleRequestAnalysis()}
                    onRegenerate={() =>
                      handleRequestAnalysis(undefined, undefined, true)
                    }
                    mobileSubTab={activeTab}
                    videoUrl={currentVideo.url}
                  />
                </div>
              </div>
            }
          ></ResponsiveLayout>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV - P3 跨端一致性优化 */}
      {!showMobileUrlInput && (
        <MobileNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasAnalysis={!!summaryData}
          isAnalyzing={isAiLoading}
        />
      )}

      {/* P3.1: 键盘快捷键提示 */}

      {/* P2: 键盘快捷键提示 */}
      <KeyboardShortcuts />

      {/* 移动端 URL 输入弹窗 */}
      {showMobileUrlInput && (
        <div className="fixed inset-0 z-[100] flex items-end sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileUrlInput(false)}
          />
          <div
            className="relative w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300"
            style={{
              maxHeight: "calc(100dvh - 8px)",
              marginBottom:
                mobileKeyboardInset > 0
                  ? `${mobileKeyboardInset}px`
                  : undefined,
            }}
          >
            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-slate-200" />
            <div className="overflow-y-auto px-5 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+14px)]">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Add Video
              </h3>
              <UrlInput
                value={inputUrl}
                onChange={setInputUrl}
                onSubmit={() => {
                  handleAnalyzeNewUrl();
                  setShowMobileUrlInput(false);
                }}
                isLoading={isAddingVideo}
              />
              <button
                onClick={() => setShowMobileUrlInput(false)}
                className="mt-4 w-full rounded-lg py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <BulkCreditActionModal
        isOpen={!!bulkCreditsGuard}
        currentCredits={bulkCreditsGuard?.currentCredits || 0}
        requiredCredits={bulkCreditsGuard?.requiredCredits || 0}
        affordableCount={bulkCreditsGuard?.affordableCount || 0}
        onClose={closeBulkCreditsGuard}
        onDownloadAffordable={downloadAffordableBulkNow}
        onUpgrade={upgradeForBulkDownload}
      />
      <BulkPostPartialUpsellModal
        isOpen={!!postPartialUpsell}
        completedCount={postPartialUpsell?.completedCount || 0}
        remainingCount={postPartialUpsell?.remainingCount || 0}
        totalSelected={postPartialUpsell?.totalSelected || 0}
        currentCredits={postPartialUpsell?.currentCredits || 0}
        shortfall={postPartialUpsell?.shortfall || 0}
        onClose={closePostPartialUpsell}
        onUpgrade={upgradeRemainingBulkDownload}
        onResumeNow={resumeRemainingBulkNow}
      />
      {/* Credits Modal */}
      <InsufficientCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        requiredAmount={modalConfig.required}
        featureName={modalConfig.feature}
        currentAmount={modalConfig.current}
      />
      {/* Playlist Progress Modal */}
      <PlaylistProgressModal
        isOpen={showPlaylistModal}
        phase={playlistProcessing?.phase || "expanding"}
        totalVideos={playlistProcessing?.totalVideos || 0}
        processedVideos={playlistProcessing?.processedVideos || 0}
        videosWithSubtitles={playlistProcessing?.videosWithSubtitles || 0}
        currentVideoTitle={playlistProcessing?.currentVideoTitle}
        playlistTitle={playlistProcessing?.currentPlaylist?.title}
        error={playlistProcessing?.error}
        onClose={cancelProcessing}
      />

      {/* Translate Modal */}
      <TranslateModal
        isOpen={showTranslateModal}
        onClose={() => setShowTranslateModal(false)}
        videoUrl={currentVideo?.url || ""}
        videoTitle={currentVideo?.title || ""}
      />
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-6">
            <div className="text-3xl font-black tracking-tighter text-slate-900 italic">
              YTvidHub
            </div>
            <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"
                style={{ width: "40%" }}
              />
            </div>
          </div>
        </div>
      }
    >
      <WorkspaceContent />
    </Suspense>
  );
}
