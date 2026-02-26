"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/workspace/Sidebar";
import { VideoPlayer } from "@/components/workspace/VideoPlayer";
import { TranscriptArea } from "@/components/workspace/TranscriptArea";
import { SummaryArea } from "@/components/workspace/SummaryArea";
import { DailyRewardButton } from "@/components/ui/DailyRewardButton";
import {
  Loader2,
  ArrowLeft,
  Sparkles,
  Video as VideoIcon,
} from "lucide-react";

// === 1. 核心逻辑组件 ===
function WorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();

  // URL 参数获取
  const urlsParam = searchParams.get("urls");
  const fromParam = searchParams.get("from");
  const modeParam = searchParams.get("mode");
  const isFromHome = fromParam === "home";
  const isSummaryMode = modeParam === "summary";

  const initialUrls = urlsParam ? decodeURIComponent(urlsParam).split(",") : [];
  const placeholderVideos = initialUrls.map(url => {
    const id = (url.match(/[?&]v=([^&#]+)/) || [])[1] || url.slice(-11);
    return {
      id,
      url,
      title: "Loading video info...",
      uploader: "...",
      hasSubtitles: true,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    };
  });

  const [videoList, setVideoList] = useState<any[]>(placeholderVideos);
  const [currentVideo, setCurrentVideo] = useState<any>(placeholderVideos[0] || null);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"video" | "analysis">(
    isSummaryMode ? "analysis" : "video"
  );

  const [leftWidth, setLeftWidth] = useState(35); // 从50改为35
  const isResizing = useRef(false);

  const analysisCache = useRef<Map<string, string>>(new Map());
  const isAnalyzing = useRef<Set<string>>(new Set());

  const [inputUrl, setInputUrl] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const {
    analyzeUrls,
    generateAiSummary,
    summaryData,
    isAiLoading,
    setSummaryData,
  } = useSubtitleDownloader();

  useEffect(() => {
    if (!currentVideo?.id) return;

    setSummaryData("");

    const cachedResult = analysisCache.current.get(currentVideo.id);
    if (cachedResult) {
      setTimeout(() => {
        setSummaryData(cachedResult);
      }, 50);
      return;
    }
  }, [currentVideo?.id]);

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

    // 如果是summary模式，先快速获取视频信息，然后立即开始分析
    if (isSummaryMode && urls.length === 1) {
      // 快速获取视频信息
      subtitleApi.getVideoInfo(urls[0]).then((videoInfo) => {
        if (isCancelled) return;

        const enhancedVideo = {
          id: videoInfo.id || (urls[0].match(/[?&]v=([^&#]+)/) || [])[1] || urls[0].slice(-11),
          url: urls[0],
          title: videoInfo.title || 'Loading...',
          uploader: videoInfo.uploader || '...',
          hasSubtitles: videoInfo.has_subtitles,
          thumbnail: videoInfo.thumbnail || `https://i.ytimg.com/vi/${videoInfo.id}/hqdefault.jpg`,
          duration: videoInfo.duration
        };

        setCurrentVideo(enhancedVideo);
        setVideoList([enhancedVideo]);

        const storageKey = `auto_analyzed_${enhancedVideo.id}`;
        const hasAnalyzedInSession = sessionStorage.getItem(storageKey);
        const cachedResult = analysisCache.current.get(enhancedVideo.id);

        if (cachedResult) {
          setSummaryData(cachedResult);
        } else if (isFromHome && !hasAnalyzedInSession && !isAnalyzing.current.has(enhancedVideo.id)) {
          if (autoStartTimer) clearTimeout(autoStartTimer);

          autoStartTimer = setTimeout(() => {
            if (!isCancelled && !sessionStorage.getItem(storageKey)) {
              handleRequestAnalysis(enhancedVideo.url, enhancedVideo.id);
              sessionStorage.setItem(storageKey, "true");
            }
          }, 800);
        }

        // 清理URL参数
        if (isFromHome) {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("from");
          newParams.delete("mode");
          router.replace(`/workspace?${newParams.toString()}`, {
            scroll: false,
          });
        }
      }).catch(() => {
        if (!isCancelled) {
          analyzeUrls(urls).then(handleAnalysisResults);
        }
      });
    } else {
      analyzeUrls(urls).then(handleAnalysisResults);
    }

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
        } else if (isFromHome && !hasAnalyzedInSession && !isAnalyzing.current.has(firstVideo.id)) {
          if (autoStartTimer) clearTimeout(autoStartTimer);

          autoStartTimer = setTimeout(() => {
            if (!isCancelled && !sessionStorage.getItem(storageKey)) {
              handleRequestAnalysis(firstVideo.url, firstVideo.id);
              sessionStorage.setItem(storageKey, "true");
            }
          }, 800);
        }

        // 清理URL参数
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

  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);



  const handleRequestAnalysis = async (url?: string, videoId?: string, forceRegenerate = false) => {
    const targetUrl = url || currentVideo?.url;
    const targetId = videoId || currentVideo?.id;

    if (!targetUrl || !targetId) return;

    if (isAiLoading && !forceRegenerate) return;
    if (isAnalyzing.current.has(targetId) && !forceRegenerate) return;

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
      await generateAiSummary(targetUrl, () => {});
      await refreshUser();
      // 写入历史记录（fire-and-forget，不阻塞主流程）
      if (currentVideo) {
        subtitleApi.upsertHistory({
          videoId: targetId,
          videoUrl: targetUrl,
          title: currentVideo.title || "Unknown Video",
          thumbnail: currentVideo.thumbnail,
          duration: currentVideo.duration,
          lastAction: "ai_summary",
        });
      }
    } catch (error) {
      // error already handled in generateAiSummary
    } finally {
      isAnalyzing.current.delete(targetId);
    }
  };

  // 新增：处理新 URL 分析
  const handleAnalyzeNewUrl = async () => {
    if (!inputUrl.trim() || isAddingVideo) return;

    const targetUrl = inputUrl.trim();

    // 简单的 Youtube URL 验证
    if (!targetUrl.includes("youtube.com") && !targetUrl.includes("youtu.be")) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setIsAddingVideo(true);
    try {
      const videoInfo = await subtitleApi.getVideoInfo(targetUrl);
      const videoId = videoInfo.id || (targetUrl.match(/[?&]v=([^&#]+)/) || [])[1] || targetUrl.slice(-11);

      const newVideo = {
        id: videoId,
        url: targetUrl,
        title: videoInfo.title || 'Unknown Video',
        uploader: videoInfo.uploader || '...',
        hasSubtitles: videoInfo.has_subtitles,
        thumbnail: videoInfo.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        duration: videoInfo.duration
      };

      // 添加到列表并切换
      setVideoList(prev => {
        if (prev.some(v => v.id === videoId)) return prev;
        return [newVideo, ...prev];
      });

      // 先清空当前的总结，防止串台
      setSummaryData("");

      // 切换到新视频
      setCurrentVideo(newVideo);
      setInputUrl("");

      // 切换到分析标签
      setActiveTab("analysis");

      // 检查是否有缓存，如果没有则开始分析
      const cachedResult = analysisCache.current.get(videoId);
      if (cachedResult && cachedResult.trim().length > 0) {
        setTimeout(() => setSummaryData(cachedResult), 100);
      } else if (!isAnalyzing.current.has(videoId)) {
        setTimeout(() => handleRequestAnalysis(targetUrl, videoId), 200);
      }

    } catch (error) {
      alert("Failed to fetch video info. Please check the URL and try again.");
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
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading workspace...</p>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex flex-col bg-white overflow-hidden font-sans">
      <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-[60] bg-white gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.location.href = "/"}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
          <span className="hidden sm:inline text-lg font-black tracking-tighter text-violet-600 italic">
            YTvidHub
          </span>
        </div>

        {/* 新增：URL 输入区域 */}
        <div className="flex-1 max-w-2xl flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Paste YouTube URL to analyze..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyzeNewUrl()}
              className="w-full h-9 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
            {isAddingVideo && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 size={14} className="animate-spin text-slate-400" />
              </div>
            )}
          </div>
          <button
            onClick={handleAnalyzeNewUrl}
            disabled={!inputUrl.trim() || isAddingVideo}
            className="h-9 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 text-white text-sm font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span className="hidden md:inline">Analyze</span>
          </button>
        </div>

        {/* 新增：积分显示和购买按钮 */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full">
            <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
              <span className="text-[10px] font-black text-amber-900">C</span>
            </div>
            <span className="text-sm font-bold text-amber-700 tabular-nums">
              {user?.credits ?? 0}
            </span>
            <span className="hidden lg:inline text-[10px] font-bold text-amber-600/70 uppercase tracking-wide">
              Credits
            </span>
          </div>

          <button
            onClick={() => router.push("/pricing")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-all shadow-sm group"
          >
            <Sparkles size={12} className="text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Upgrade</span>
          </button>

          <DailyRewardButton />
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
              }
            }}
          />
        </div>

        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          <div
            className={`flex-col bg-white transition-all duration-0 md:duration-75 ease-linear ${activeTab === "video" ? "flex h-full" : "hidden md:flex"
              }`}
            style={{
              width:
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? `${leftWidth}%`
                  : "100%",
            }}
          >
            <div className="p-3 shrink-0 bg-white border-b border-slate-50">
              <VideoPlayer
                videoId={currentVideo.id}
                seekTime={seekTime}
                onTimeUpdate={setCurrentTime}
              />
              <h1 className="mt-3 text-sm md:text-base font-semibold text-slate-800 line-clamp-2 leading-tight">
                {currentVideo.title}
              </h1>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <TranscriptArea
                videoUrl={currentVideo.url}
                currentTime={currentTime}
              />
            </div>
          </div>

          <div
            onMouseDown={startResizing}
            className="hidden md:flex w-1 hover:w-2 -ml-0.5 z-20 bg-transparent hover:bg-violet-400/20 cursor-col-resize transition-all shrink-0 items-center justify-center group relative"
          >
            <div className="w-px h-full bg-slate-200 group-hover:bg-violet-400 transition-colors" />
          </div>

          {/* RIGHT: Analysis Area */}
          <div
            className={`flex-1 overflow-hidden bg-[#fcfcfd] ${activeTab !== "video" ? "flex" : "hidden md:flex"
              }`}
          >
            <div className="w-full h-full">
              <SummaryArea
                data={summaryData}
                isLoading={isAiLoading}
                onSeek={handleSeek}
                onStartAnalysis={() => handleRequestAnalysis()}
                onRegenerate={() => handleRequestAnalysis(undefined, undefined, true)}
                mobileSubTab={activeTab}
                videoUrl={currentVideo.url}
              />
            </div>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden h-safe-bottom border-t border-slate-100 bg-white flex items-center justify-around shrink-0 z-[70] pb-safe pt-2">
        {[
          { id: "video", label: "Video", icon: VideoIcon },
          { id: "analysis", label: "Insights", icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === tab.id ? "text-violet-600" : "text-slate-400"
              }`}
          >
            <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wide">
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center bg-white gap-4">
          <Loader2 className="animate-spin text-violet-600 w-10 h-10" />
          <p className="text-slate-400 text-sm font-medium animate-pulse">
            Initializing Workspace...
          </p>
        </div>
      }
    >
      <WorkspaceContent />
    </Suspense>
  );
}
