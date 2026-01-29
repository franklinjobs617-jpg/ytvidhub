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
import { LoadingTransition } from "@/components/workspace/LoadingTransition";

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

  // --- 数据预处理 (瞬时解析 ID) ---
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
  const [isVideoInfoLoaded, setIsVideoInfoLoaded] = useState(false);

  // 布局调整状态
  const [leftWidth, setLeftWidth] = useState(50);
  const isResizing = useRef(false);

  const hasAutoAnalyzed = useRef(false);

  const {
    analyzeUrls,
    generateAiSummary,
    summaryData,
    isAiLoading,
    setSummaryData,
  } = useSubtitleDownloader();

  // --- 初始化逻辑 ---
  useEffect(() => {
    if (!urlsParam) return;

    const urls = decodeURIComponent(urlsParam).split(",");

    // 如果是summary模式，先快速获取视频信息，然后立即开始分析
    if (isSummaryMode && urls.length === 1) {
      // 快速获取视频信息
      subtitleApi.getVideoInfo(urls[0]).then((videoInfo) => {
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
        setIsVideoInfoLoaded(true);

        // 立即开始AI分析
        if (isFromHome) {
          const storageKey = `auto_analyzed_${enhancedVideo.id}`;
          const hasAnalyzedInSession = sessionStorage.getItem(storageKey);

          if (!hasAnalyzedInSession) {
            setTimeout(() => {
              handleRequestAnalysis(enhancedVideo.url, enhancedVideo.id);
            }, 300);
            sessionStorage.setItem(storageKey, "true");
          }
          
          // 清理URL参数
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("from");
          newParams.delete("mode");
          router.replace(`/workspace?${newParams.toString()}`, {
            scroll: false,
          });
        }
      }).catch(() => {
        // 如果快速获取失败，回退到完整分析
        analyzeUrls(urls).then(handleAnalysisResults);
      });
    } else {
      // 非summary模式或多个URL，使用完整分析
      analyzeUrls(urls).then(handleAnalysisResults);
    }

    function handleAnalysisResults(results: any[]) {
      setVideoList(results);
      setIsVideoInfoLoaded(true);

      if (results.length > 0) {
        const firstVideo = results[0];
        setCurrentVideo(firstVideo);

        if (isFromHome && isSummaryMode) {
          const storageKey = `auto_analyzed_${firstVideo.id}`;
          const hasAnalyzedInSession = sessionStorage.getItem(storageKey);

          if (!hasAnalyzedInSession) {
            setTimeout(() => {
              handleRequestAnalysis(firstVideo.url, firstVideo.id);
            }, 300);
            sessionStorage.setItem(storageKey, "true");
          }
          
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("from");
          newParams.delete("mode");
          router.replace(`/workspace?${newParams.toString()}`, {
            scroll: false,
          });
        }
      }
    }
  }, [urlsParam]);

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



  const handleRequestAnalysis = async (url?: string, videoId?: string) => {
    const targetUrl = url || currentVideo?.url;
    if (!targetUrl || isAiLoading) return;
    if (window.innerWidth < 768) setActiveTab("analysis");
    
    try {
      await generateAiSummary(targetUrl);
      // AI总结完成后刷新用户积分显示
      await refreshUser();
    } catch (error) {
      // 错误已经在generateAiSummary中处理了
      console.error("AI Summary failed:", error);
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
      <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-[60] bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
          <span className="text-lg font-black tracking-tighter text-violet-600 italic">
            YTvidHub
          </span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden md:flex shrink-0 h-full border-r border-slate-100 bg-slate-50/30">
          <Sidebar
            videos={videoList}
            activeId={currentVideo.id}
            onSelect={(v: any) => {
              setCurrentVideo(v);
              if (v.id !== currentVideo.id) setSummaryData("");
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
            <div className="p-4 shrink-0 bg-white border-b border-slate-50">
              <VideoPlayer
                videoId={currentVideo.id}
                seekTime={seekTime}
                onTimeUpdate={setCurrentTime}
              />
              <h1 className="mt-4 text-sm md:text-lg font-black text-slate-800 line-clamp-2 leading-tight">
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
