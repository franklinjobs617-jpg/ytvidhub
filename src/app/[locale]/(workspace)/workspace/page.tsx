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
import {
  Loader2,
  ArrowLeft,
  Sparkles,
  Brain,
  Video as VideoIcon,
} from "lucide-react";

// === 1. 核心逻辑组件 ===
function WorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

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

  // 状态管理
  const [videoList, setVideoList] = useState<any[]>(placeholderVideos);
  const [currentVideo, setCurrentVideo] = useState<any>(placeholderVideos[0] || null);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"video" | "analysis" | "quiz">(
    isSummaryMode ? "analysis" : "video"
  );

  // 布局调整状态 - 减小视频区域初始宽度，给分析更多空间
  const [leftWidth, setLeftWidth] = useState(35); // 从50改为35
  const isResizing = useRef(false);

  // 防止重复分析的状态管理
  const analysisCache = useRef<Map<string, string>>(new Map());
  const isAnalyzing = useRef<Set<string>>(new Set());

  // 新增：URL 输入框状态
  const [inputUrl, setInputUrl] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const {
    analyzeUrls,
    generateAiSummary,
    summaryData,
    isAiLoading,
    setSummaryData,
  } = useSubtitleDownloader();

  // --- 视频切换时的缓存管理 ---
  useEffect(() => {
    if (!currentVideo?.id) return;

    // 立即清空当前显示的数据，防止显示错误内容
    setSummaryData("");

    // 检查是否有缓存的分析结果
    const cachedResult = analysisCache.current.get(currentVideo.id);
    if (cachedResult) {
      console.log("📋 Loading cached analysis for:", currentVideo.title);
      // 使用 setTimeout 确保清空操作先执行
      setTimeout(() => {
        setSummaryData(cachedResult);
      }, 50);
      return;
    }

    console.log("📋 No cached data for video:", currentVideo.id);
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
          console.log("📋 Using cached analysis for:", enhancedVideo.title);
          setSummaryData(cachedResult);
        } else if (isFromHome && !hasAnalyzedInSession && !isAnalyzing.current.has(enhancedVideo.id)) {
          console.log("🚀 Auto-starting AI analysis for video from home:", enhancedVideo.title);

          if (autoStartTimer) clearTimeout(autoStartTimer);

          autoStartTimer = setTimeout(() => {
            if (!isCancelled && !sessionStorage.getItem(storageKey)) {
              handleRequestAnalysis(enhancedVideo.url, enhancedVideo.id);
              sessionStorage.setItem(storageKey, "true");
            }
          }, 800);
        } else {
          console.log("📋 Video ready for manual analysis:", enhancedVideo.id);
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
          console.log("📋 Using cached analysis for:", firstVideo.title);
          setSummaryData(cachedResult);
        } else if (isFromHome && !hasAnalyzedInSession && !isAnalyzing.current.has(firstVideo.id)) {
          console.log("🚀 Auto-starting AI analysis for video from home:", firstVideo.title);

          if (autoStartTimer) clearTimeout(autoStartTimer);

          autoStartTimer = setTimeout(() => {
            // 双重检查
            if (!isCancelled && !sessionStorage.getItem(storageKey)) {
              handleRequestAnalysis(firstVideo.url, firstVideo.id);
              sessionStorage.setItem(storageKey, "true");
            }
          }, 800);
        } else {
          console.log("📋 Video ready for manual analysis:", firstVideo.id);
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
      console.log("📋 Switching to cached result for:", currentVideo.title);
      // 延迟一点时间确保清空操作完成
      setTimeout(() => {
        setSummaryData(cached);
      }, 100);
    } else {
      console.log("📋 No cache found for:", currentVideo.id);
    }
  }, [currentVideo?.id]);

  useEffect(() => {
    if (summaryData && currentVideo?.id && !isAiLoading) {
      if (summaryData.trim().length > 0) {
        analysisCache.current.set(currentVideo.id, summaryData);
        console.log("💾 Cached completed analysis result for:", currentVideo.title);
      }
    }
  }, [summaryData, currentVideo?.id, isAiLoading]);

  // 调试用：监控状态
  useEffect(() => {
    console.log("🔍 Workspace State:", {
      activeVideo: currentVideo?.id,
      isAiLoading,
      dataSize: summaryData?.length || 0,
      cached: currentVideo?.id ? !!analysisCache.current.get(currentVideo.id) : false,
      analyzingSet: Array.from(isAnalyzing.current)
    });
  }, [currentVideo?.id, isAiLoading, summaryData]);

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

    console.log("🔍 Analysis request:", { targetId, forceRegenerate, isAiLoading, isAnalyzing: isAnalyzing.current.has(targetId) });

    // 如果正在加载且不是强制重新生成，直接返回
    if (isAiLoading && !forceRegenerate) {
      console.log("⏳ Analysis already in progress, skipping...");
      return;
    }

    // 检查是否正在分析中 - 防止重复请求（移到前面，更严格的检查）
    if (isAnalyzing.current.has(targetId) && !forceRegenerate) {
      console.log("⏳ Analysis already in progress for:", targetId);
      return;
    }

    // 如果是强制重新生成，清除缓存和session标记
    if (forceRegenerate) {
      analysisCache.current.delete(targetId);
      sessionStorage.removeItem(`auto_analyzed_${targetId}`);
      setSummaryData(""); // 立即清空当前数据
      console.log("🔄 Force regenerate: cleared cache for", targetId);
    } else {
      // 严格检查缓存 - 只有在没有缓存时才继续
      const cachedResult = analysisCache.current.get(targetId);
      if (cachedResult && cachedResult.trim().length > 0) {
        console.log("📋 Using cached analysis for:", targetId, "length:", cachedResult.length);
        setSummaryData(cachedResult);
        return;
      }
    }

    // 添加到分析中的集合，防止重复调用
    isAnalyzing.current.add(targetId);
    console.log("🚀 Starting AI analysis for:", targetUrl, forceRegenerate ? "(Force regenerate)" : "");

    if (window.innerWidth < 768) setActiveTab("analysis");

    try {
      await generateAiSummary(targetUrl, (chunk) => {
        // 实时更新显示的内容
        // console.log("📝 Received chunk:", chunk.length, "characters");
      });
      console.log("✅ AI analysis completed successfully for:", targetId);

      // AI总结完成后刷新用户积分显示
      await refreshUser();
    } catch (error) {
      console.error("❌ AI Summary failed for:", targetId, error);
      // 如果是积分不足错误，清除正在分析的标记
      if (error instanceof Error && error.message.includes("credit")) {
        console.log("💳 Credit error detected, clearing analysis flag");
      }
      // 错误已经在generateAiSummary中处理了
    } finally {
      // 确保清除分析标记
      isAnalyzing.current.delete(targetId);
      console.log("🏁 Analysis finished, removed from analyzing set:", targetId);
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
      console.log("🔍 Fetching info for new URL:", targetUrl);
      // 获取视频信息
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
        console.log("📋 Using cached analysis for new video:", videoId);
        setTimeout(() => {
          setSummaryData(cachedResult);
        }, 100);
      } else if (!isAnalyzing.current.has(videoId)) {
        // 只有在没有正在分析时才开始新的分析
        console.log("🚀 Starting analysis for new video:", videoId);
        setTimeout(() => {
          handleRequestAnalysis(targetUrl, videoId);
        }, 200);
      } else {
        console.log("⏳ Analysis already in progress for new video:", videoId);
      }

    } catch (error) {
      console.error("Failed to add video:", error);
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
              {useAuth().user?.credits ?? 0}
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
                console.log("🔄 Switching video from", currentVideo.id, "to", v.id);
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
          { id: "quiz", label: "Quiz", icon: Brain },
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
