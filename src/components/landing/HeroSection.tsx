"use client";

import { useState, useEffect, useRef } from "react";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import {
  Gift,
  Info,
  AlertCircle,
  Youtube,
  ArrowRight,
  Clipboard,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { FeatureTabs, FeatureMode } from "@/components/hero/FeatureTabs";
import { DownloaderView, VideoResult } from "@/components/views/DownloaderView";
import { SummaryView } from "@/components/views/SummaryView";
import { ControlBar } from "@/components/hero/ControlBar";

// 校验工具
const isValidYoutubeUrl = (url: string) => {
  if (!url) return false;
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url.trim());
};

export default function HeroSection() {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 状态管理
  const [selectedMode, setSelectedMode] = useState<FeatureMode>("download");
  const [urls, setUrls] = useState("");
  const [inputError, setInputError] = useState(false);
  // 控制是否聚焦（用于隐藏/显示空状态引导）
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [downloadFormat, setDownloadFormat] = useState("srt");
  const [userCredits, setUserCredits] = useState<string>("--");
  const [activeSummaryId, setActiveSummaryId] = useState<string | null>(null);

  const {
    analyzeUrls,
    startSingleDownload,
    startBulkDownload,
    isAnalyzing,
    isDownloading,
    isAiLoading,
    summaryData,
    progress,
    statusText,
  } = useSubtitleDownloader();

  useEffect(() => {
    if (user) {
      subtitleApi
        .syncUser()
        .then((data) => data && setUserCredits(data.credits || "0"));
    } else {
      setUserCredits("--");
    }
  }, [user]);

  const handleModeChange = (mode: FeatureMode) => {
    if (mode !== selectedMode) handleReset();
    setSelectedMode(mode);
    setInputError(false);
  };

  const handleReset = () => {
    setUrls("");
    setVideoResults([]);
    setSelectedIds(new Set());
    setActiveSummaryId(null);
    setInputError(false);
    setIsFocused(false); // 重置聚焦状态
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
    if (inputError) setInputError(false);
  };

  // 点击“Try Example”的逻辑
  const handlePasteExample = () => {
    setUrls(
      "https://www.youtube.com/watch?v=jNQXAC9IVRw\nhttps://youtu.be/dQw4w9WgXcQ"
    );
    setInputError(false);
    setIsFocused(true); // 激活输入状态
    toast.success("Example links pasted!");

    // 自动聚焦输入框
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // 点击空白区域自动聚焦
  const handleAreaClick = () => {
    if (textareaRef.current && videoResults.length === 0) {
      textareaRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleMainAction = async () => {
    // 1. 空值检查
    if (!urls.trim() && videoResults.length === 0) {
      setInputError(true);
      toast.error("Please enter a YouTube link first.", {
        position: "top-center",
      });
      return;
    }

    // 2. 链接校验
    if (videoResults.length === 0) {
      const lines = urls
        .split("\n")
        .map((u) => u.trim())
        .filter((u) => u.length > 0);
      const invalidLinks = lines.filter((link) => !isValidYoutubeUrl(link));

      if (invalidLinks.length > 0) {
        setInputError(true);
        toast.error("Invalid YouTube URL detected", {
          description: "Please check the highlighted link and try again.",
          position: "top-center",
          duration: 4000,
        });
        return;
      }
    }

    // 3. 登录校验
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // 4. 业务逻辑
    if (selectedMode === "summary") {
      let targetUrls =
        videoResults.length === 0
          ? urls
              .split("\n")
              .map((u) => u.trim())
              .filter((u) => u.startsWith("http"))
              .join(",")
          : videoResults
              .filter((v) => selectedIds.has(v.id))
              .map((v?: any) => v.url)
              .join(",");
      if (!targetUrls) return;
      router.push(
        `/workspace?urls=${encodeURIComponent(targetUrls)}&from=home`
      );
      return;
    }

    if (videoResults.length === 0) {
      const uniqueUrls = Array.from(
        new Set(
          urls
            .split("\n")
            .map((u) => u.trim())
            .filter((u) => u.startsWith("http"))
        )
      );
      if (uniqueUrls.length === 0) return;
      const results = await analyzeUrls(uniqueUrls);
      setVideoResults(results);
      setSelectedIds(
        new Set(
          results.filter((v: any) => v.hasSubtitles).map((v: any) => v.id)
        )
      );
    } else {
      const selectedVideos = videoResults.filter((v) => selectedIds.has(v.id));
      if (selectedVideos.length === 0) {
        toast.warning("Please select at least one video.");
        return;
      }
      selectedVideos.length === 1
        ? await startSingleDownload(selectedVideos[0], downloadFormat)
        : await startBulkDownload(selectedVideos, downloadFormat);
    }
  };

  const actionLabel = isAnalyzing
    ? "Analyzing..."
    : selectedMode === "summary"
    ? videoResults.length > 0
      ? "Open AI Workspace"
      : "Analyze & Summarize"
    : videoResults.length > 0
    ? `Download (${selectedIds.size})`
    : "Analyze Link";

  return (
    <div className="relative isolate bg-white min-h-screen">
      <Toaster richColors closeButton position="top-center" />

      {/* === 1. 保留你原本的背景 === */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <section className="relative pt-12 pb-16 md:pt-14 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          {!user && (
            <div
              onClick={() => setShowLoginModal(true)}
              className="cursor-pointer mb-6 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-[11px] font-bold uppercase tracking-widest shadow-sm animate-bounce hover:bg-green-100 transition-colors"
            >
              <Gift size={14} />
              Limited Offer: Login to get 5 Free Credits
            </div>
          )}

          {/* === 2. 保留你原本的 Title 样式 === */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide text-slate-900 leading-tight mb-4 drop-shadow-sm">
              Bulk YouTube Subtitle Downloader
            </h1>
            <h2 className="text-base md:text-lg font-medium text-slate-600 max-w-2xl mx-auto italic">
              Stop 100 clicks. Extract pure{" "}
              <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                LLM-Ready Data
              </span>{" "}
              in seconds.
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* === 3. 一体化卡片容器 (整合 Tabs + Input + Footer) === */}
            <div
              className={`
                relative bg-white rounded-2xl border shadow-xl overflow-hidden flex flex-col
                transition-all duration-300
                ${
                  inputError
                    ? "border-red-300 shadow-red-100 ring-4 ring-red-50"
                    : "border-slate-200 shadow-blue-100/50"
                }
            `}
            >
              {/* === 卡片顶部：Tabs 工具栏 === */}
              {/* 关键修改：bg-slate-50 做底色，padding 控制间距 */}
              <div className="bg-slate-50 border-b border-slate-200 px-3 py-3 md:px-4">
                <div className="w-full">
                  <FeatureTabs
                    currentMode={selectedMode}
                    onChange={handleModeChange}
                  />
                </div>
              </div>

              {/* === 卡片中部：输入区 & 空状态 === */}
              <div
                className="relative min-h-[350px] flex flex-col bg-white group cursor-text"
                onClick={handleAreaClick}
              >
                {isAnalyzing ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 animate-in fade-in">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-slate-700 animate-pulse">
                      Syncing Video Data...
                    </h3>
                  </div>
                ) : videoResults.length === 0 ? (
                  <>
                    {/* --- 核心优化：中心引导页 (Empty State) --- */}
                    {/* 只有在没有内容 且 没有聚焦 时显示 */}
                    {/* 使用 absolute 让它叠在 textarea 下面/上面，通过 opacity 控制显隐 */}
                    <div
                      className={`
                            absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none
                            ${
                              urls || isFocused
                                ? "opacity-0 scale-95"
                                : "opacity-100 scale-100"
                            }
                        `}
                    >
                      {/* 图标 */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-60"></div>
                        <div className="relative w-20 h-20 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center justify-center">
                          <Youtube
                            size={40}
                            className="text-red-500"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* 文字 */}
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Start by pasting links
                      </h3>
                      <p className="text-slate-400 mb-8 max-w-xs mx-auto leading-relaxed">
                        Supports videos, shorts, and playlists. <br />
                        Press{" "}
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-600 border border-slate-200">
                          Cmd+V
                        </span>{" "}
                        to begin.
                      </p>

                      {/* 按钮 (需要 pointer-events-auto 才能点击) */}
                      <div className="pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePasteExample();
                          }}
                          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-full hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all text-xs font-bold uppercase tracking-wide"
                        >
                          <Clipboard size={14} /> Try Example Links
                        </button>
                      </div>
                    </div>

                    {/* --- Textarea --- */}
                    {/* 当未聚焦且为空时，透明度设为0，隐藏光标，让引导页展示 */}
                    <textarea
                      ref={textareaRef}
                      value={urls}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => !urls && setIsFocused(false)}
                      className={`
                            relative z-0 flex-1 w-full p-8 bg-transparent text-lg font-mono text-slate-800
                            outline-none resize-none leading-relaxed transition-opacity duration-200
                            ${inputError ? "caret-red-500" : "caret-blue-600"}
                            ${urls || isFocused ? "opacity-100" : "opacity-0"} 
                        `}
                      placeholder=""
                      spellCheck={false}
                    />

                    {/* 错误提示 Badge */}
                    {inputError && (
                      <div className="absolute top-4 right-6 z-20 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={14} /> Invalid URL detected
                      </div>
                    )}

                    {/* 规则提示 Badge */}
                    <div className="absolute bottom-3 right-4 z-20 pointer-events-none opacity-50">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <Info size={12} /> 1 Credit = 1 Extraction
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto max-h-[500px] p-0">
                    {/* 结果列表 */}
                    {selectedMode === "download" ? (
                      <DownloaderView
                        videos={videoResults}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                      />
                    ) : (
                      <SummaryView
                        videos={videoResults}
                        activeVideoId={activeSummaryId}
                        onSelectVideo={(id: any) => setActiveSummaryId(id)}
                        summaryData={summaryData}
                        isLoading={isAiLoading}
                      />
                    )}
                  </div>
                )}

                {/* 遮罩层 (Downloading) */}
                {isDownloading && (
                  <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                    {/* ... loading UI ... */}
                    <div className="w-full max-w-sm text-center">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
                        {statusText}
                      </h3>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden text-left">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${Math.round(progress)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        {Math.round(progress)}% Complete
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* === 卡片底部：ControlBar === */}
              <div className="bg-white border-t border-slate-100 px-6 py-4">
                <ControlBar
                  mode={selectedMode}
                  userCredits={userCredits}
                  format={downloadFormat}
                  setFormat={setDownloadFormat}
                  availableFormats={
                    selectedMode === "download" ? ["srt", "vtt", "txt"] : []
                  }
                  onReset={handleReset}
                  onAction={handleMainAction}
                  canReset={videoResults.length > 0 || !!urls}
                  isAnalyzing={isAnalyzing}
                  isDownloading={isDownloading}
                  canAction={
                    !isAnalyzing && (videoResults.length > 0 || !!urls)
                  }
                  actionLabel={actionLabel}
                />
              </div>
            </div>

            {/* 底部文案 */}
            <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
              High Efficiency • 5 Free Extractions for New Users
            </p>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
