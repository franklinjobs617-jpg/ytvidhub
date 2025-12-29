"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
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

  // URL 参数获取
  const urlsParam = searchParams.get("urls");
  const fromParam = searchParams.get("from");
  const isFromHome = fromParam === "home";

  // 状态管理
  const [videoList, setVideoList] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"video" | "analysis" | "quiz">(
    "video"
  );

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

    analyzeUrls(urls).then((results) => {
      setVideoList(results);

      if (results.length > 0) {
        const firstVideo = results[0];
        setCurrentVideo(firstVideo);

        if (isFromHome) {
          const storageKey = `auto_analyzed_${firstVideo.id}`;
          const hasAnalyzedInSession = sessionStorage.getItem(storageKey);

          if (!hasAnalyzedInSession) {
            handleRequestAnalysis(firstVideo.url, firstVideo.id);

            sessionStorage.setItem(storageKey, "true");

            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("from");
            router.replace(`/workspace?${newParams.toString()}`, {
              scroll: false,
            });
          } else {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("from");
            router.replace(`/workspace?${newParams.toString()}`, {
              scroll: false,
            });
          }
        }
      }
    });
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

// 在 WorkspaceContent 组件内部添加这个常量
const MOCK_AI_DATA = `---
tags: AI, LLM, Data Engineering, Research
---
# 🚀 YouTube Data for LLM Training

Extracting subtitles in bulk is the **gold standard** for creating high-quality conversational datasets. This video explains why clean text outperforms raw crawls.

## Key Insights
- **Cleanliness**: Removing filler words like "um" increases model accuracy.
- **Bulk Action**: Handling 100+ videos at once saves 90% of prep time.
- **Formats**: JSONL is the preferred format for fine-tuning.

---START_CARDS---
---
Q: Why is bulk downloading better than manual extraction?
A: It allows researchers to build massive datasets from entire playlists in seconds, ensuring consistency in data formatting.
T: 01:24
---
Q: What defines "Clean Data" in this context?
A: Data that has had timestamps, advertising segments, and filler words removed to maximize the signal-to-noise ratio.
T: 05:40
---
Q: Which format is best for OpenAI fine-tuning?
A: JSONL (JSON Lines) is recommended as it allows the model to process each conversation turn as a separate object.
T: 12:15
`;

// ... 在 WorkspaceContent 内部修改这个函数 ...
const handleRequestAnalysis = async (url?: string, videoId?: string) => {
  const targetUrl = url || currentVideo?.url;
  if (!targetUrl) return;

  // 1. 进入加载状态
  // 注意：这里由于 useSubtitleDownloader 是外部 hook，我们可能需要手动模拟它的状态变化
  // 如果你的 hook 没提供 setLoading，你可以自己定义一个本地的 isMockLoading
  
  if (window.innerWidth < 768) setActiveTab("analysis");

  // --- 模拟开始 ---
  // 先清空旧数据
  setSummaryData(""); 
  
  // 模拟 AI 思考延迟
  setTimeout(() => {
    setSummaryData(MOCK_AI_DATA);
    // 注意：如果是真实 Hook，这里可能需要调用 generateAiSummary。
    // 为了模拟，我们直接用 setSummaryData 填充。
  }, 1500); 
  // --- 模拟结束 ---
};
  // --- 业务处理 ---
  // const handleRequestAnalysis = async (url?: string, videoId?: string) => {
  //   const targetUrl = url || currentVideo?.url;
  //   if (!targetUrl || isAiLoading) return;
  //   if (window.innerWidth < 768) setActiveTab("analysis");
  //   await generateAiSummary(MOCK_AI_RESPONSE);
  // };





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
        <Loader2 className="animate-spin text-violet-600 w-8 h-8" />
        <span className="ml-3 text-slate-500 font-medium">
          Loading workspace...
        </span>
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
            className={`flex-col bg-white transition-all duration-0 md:duration-75 ease-linear ${
              activeTab === "video" ? "flex h-full" : "hidden md:flex"
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
            className={`flex-1 overflow-hidden bg-[#fcfcfd] ${
              activeTab !== "video" ? "flex" : "hidden md:flex"
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
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === tab.id ? "text-violet-600" : "text-slate-400"
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

// === 2. 导出包裹了 Suspense 的组件 ===
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
