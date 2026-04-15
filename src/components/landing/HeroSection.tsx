"use client";

import { useState, useEffect, useRef } from "react";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import {
  extractVideoId,
  isPlaylistOrChannelUrl,
  normalizeYoutubeUrl,
} from "@/lib/youtube";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import LoginModal from "@/components/LoginModel";
import {
  Gift,
  Info,
  AlertCircle,
  Youtube,
  Sparkles,
  Download,
  Loader2
} from "lucide-react";

import { PlaylistProcessingModal } from "@/components/playlist/PlaylistProcessingModal";
import { RecentHistory } from "@/components/landing/RecentHistory";
import ExampleVideos from "@/components/landing/ExampleVideos";

const isValidYoutubeUrl = (url: string) => {
  if (!url) return false;
  return /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/.test(url.trim());
};

const PLACEHOLDER_EXAMPLES = [
  "Paste a YouTube video link...",
  "Or paste a playlist link...",
  "Try pasting a channel URL...",
];

interface HeroSectionProps {
  heroHeader?: React.ReactNode;
}

type PendingNavigationState = {
  active: boolean;
  mode: "download" | "summary";
  targetUrls: string[];
};

type SummaryInputChoiceState = {
  allUrls: string[];
  summaryUrl: string | null;
} | null;

export default function HeroSection({ heroHeader }: HeroSectionProps) {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const t = useTranslations("hero");
  const tErrors = useTranslations("errors");

  const [urls, setUrls] = useState("");
  const [inputErrorKey, setInputErrorKey] = useState<"enterUrl" | "invalidUrl" | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFirstSummaryFree, setIsFirstSummaryFree] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);
  const pendingNavigationRef = useRef<PendingNavigationState>({
    active: false,
    mode: "download",
    targetUrls: [],
  });
  const [summaryInputChoice, setSummaryInputChoice] =
    useState<SummaryInputChoiceState>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeAction, setActiveAction] = useState<'download' | 'summary' | null>(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  useEffect(() => {
    if (isFocused || urls) return;
    const target = PLACEHOLDER_EXAMPLES[placeholderIndex];
    let charIndex = 0;
    let pauseTimer: ReturnType<typeof setTimeout>;
    setTypedPlaceholder("");

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedPlaceholder(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        pauseTimer = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length);
        }, 2000);
      }
    }, 40);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(pauseTimer);
    };
  }, [placeholderIndex, isFocused, urls]);

  const refreshCredits = async () => {
    if (user) {
      try { await refreshUser(); } catch {}
    }
  };

  const {
    playlistProcessing,
    showPlaylistModal,
    cancelProcessing,
    pauseProcessing,
    resumeProcessing,
  } = useSubtitleDownloader(refreshCredits);

  useEffect(() => {
    if (user) {
      refreshCredits();
      subtitleApi.getHistory(50).then((data) => {
        const hasUsedSummary = data.some((h: { lastAction?: string }) => h.lastAction === "ai_summary");
        setIsFirstSummaryFree(!hasUsedSummary);
        setHasHistory(data.length > 0);
      }).catch(() => {});

      if (pendingNavigationRef.current.active) {
        const { mode, targetUrls } = pendingNavigationRef.current;
        pendingNavigationRef.current = {
          active: false,
          mode: "download",
          targetUrls: [],
        };
        navigateToWorkspace(mode, targetUrls);
      }
      const interval = setInterval(() => refreshCredits(), 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
    if (inputErrorKey) setInputErrorKey(null);
  };

  const navigateToWorkspace = (
    mode: "download" | "summary",
    targetUrls: string[],
  ) => {
    const mergedUrls = targetUrls.map((url) => normalizeYoutubeUrl(url)).join(",");
    setIsNavigating(true);
    router.push(
      `/workspace?urls=${encodeURIComponent(mergedUrls)}&from=home&mode=${mode}`,
    );
  };

  const requireLoginForNavigation = (
    mode: "download" | "summary",
    targetUrls: string[],
  ) => {
    pendingNavigationRef.current = {
      active: true,
      mode,
      targetUrls,
    };
    setShowLoginModal(true);
    setActiveAction(null);
  };

  const resolveSummaryUrl = (rawUrl: string, normalizedUrl: string) => {
    const idFromRaw = extractVideoId(rawUrl);
    if (idFromRaw) return `https://www.youtube.com/watch?v=${idFromRaw}`;

    const idFromNormalized = extractVideoId(normalizedUrl);
    if (idFromNormalized) return `https://www.youtube.com/watch?v=${idFromNormalized}`;

    return null;
  };

  const handleUseFirstVideoSummary = () => {
    if (!summaryInputChoice?.summaryUrl) return;

    const targetUrl = summaryInputChoice.summaryUrl;
    setUrls(targetUrl);
    setSummaryInputChoice(null);

    if (!user) {
      requireLoginForNavigation("summary", [targetUrl]);
      return;
    }

    navigateToWorkspace("summary", [targetUrl]);
  };

  const handleSwitchToBatchWorkflow = () => {
    if (!summaryInputChoice) return;

    const targetUrls = summaryInputChoice.allUrls;
    setSummaryInputChoice(null);

    if (!user) {
      requireLoginForNavigation("download", targetUrls);
      return;
    }

    navigateToWorkspace("download", targetUrls);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    if (!user) {
      pendingNavigationRef.current = {
        active: false,
        mode: "download",
        targetUrls: [],
      };
    }
  };

  const handleMainAction = async (targetMode: 'download' | 'summary') => {
    setActiveAction(targetMode);
    try {
      if (!urls.trim()) {
        setInputErrorKey("enterUrl");
        setActiveAction(null);
        return;
      }

      const lines = urls.split("\n").map((u) => u.trim()).filter(Boolean);
      const invalidLinks = lines.filter((link) => !isValidYoutubeUrl(link));
      
      if (invalidLinks.length > 0) {
        setInputErrorKey("invalidUrl");
        setActiveAction(null);
        return;
      }

      const normalizedLines = lines.map((line) => normalizeYoutubeUrl(line));

      if (targetMode === "summary") {
        const hasBatchStyleInput =
          normalizedLines.length > 1 ||
          normalizedLines.some((line) => isPlaylistOrChannelUrl(line));

        if (hasBatchStyleInput) {
          setSummaryInputChoice({
            allUrls: normalizedLines,
            summaryUrl: resolveSummaryUrl(lines[0], normalizedLines[0]),
          });
          setActiveAction(null);
          return;
        }
      }

      const targetUrls =
        targetMode === "summary" ? [normalizedLines[0]] : normalizedLines;

      if (!user) {
        requireLoginForNavigation(targetMode, targetUrls);
        return;
      }

      navigateToWorkspace(targetMode, targetUrls);
      
    } catch {
      setActiveAction(null);
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-white overflow-hidden">

      {/* 
        高级背景层 (Notion / Vercel 风格) 
        1. 极细、极淡的网格线，替代廉价的点阵
        2. 径向渐变遮罩 (mask-image)，让网格只在屏幕正中稍上方显现，向四周褪去为纯白
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, #000 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, #000 20%, transparent 100%)',
          }}
        ></div>
      </div>

      {/* 跳转加载遮罩 */}
      {isNavigating && (
        <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100">
             <Loader2 className="w-8 h-8 text-slate-800 animate-spin" />
             <div className="text-sm font-semibold text-slate-600 tracking-wide">
                {activeAction === 'summary' ? 'Preparing AI Workspace...' : 'Analyzing Videos...'}
             </div>
          </div>
        </div>
      )}

      {/* 
        核心内容区
        调整了 max-w-[760px] 让页面宽度更收敛，避免拉得过长导致空旷
        调整了 pt-20，去掉了多余的 padding
      */}
      <section className="relative z-10 pt-20 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-[760px] text-center">
          
          {/* 标题区：紧凑间距 mb-8 (原本是 mb-10/12) */}
          <div className="mb-8">
            {heroHeader}
          </div>

          {/* 
            核心输入框：Command Palette (指令台) 风格
            加入厚重的阴影 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] 形成“悬浮感”
          */}
          <div className="mx-auto relative z-20">
            <div 
              className={`bg-white rounded-[20px] border transition-all duration-300 ${
                isFocused 
                  ? "border-blue-400 ring-[4px] ring-blue-50 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]" 
                  : inputErrorKey 
                  ? "border-red-300 ring-[4px] ring-red-50" 
                  : "border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] hover:border-slate-300"
              }`}
            >
              {/* 输入区域：加大字体，加高默认高度 p-6 */}
              <div className="flex items-start p-6 pb-5">
                <Youtube className={`w-7 h-7 mt-0.5 shrink-0 mr-4 transition-colors ${isFocused ? 'text-red-500' : 'text-slate-300'}`} />
                <textarea
                  ref={textareaRef}
                  value={urls}
                  onChange={(e) => {
                    handleInputChange(e);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 240) + "px";
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => !urls && setIsFocused(false)}
                  rows={1}
                  className={`flex-1 w-full bg-transparent text-lg md:text-[22px] text-slate-800 font-medium outline-none resize-none placeholder:text-slate-300 placeholder:font-normal leading-relaxed min-h-[44px] ${
                    inputErrorKey ? "caret-red-500" : "caret-blue-600"
                  }`}
                  placeholder={isFocused || urls ? "Paste link(s) here..." : typedPlaceholder || "|"}
                  spellCheck={false}
                />
              </div>

              {/* 分割线 */}
              <div className="h-[1px] w-full bg-slate-100"></div>

              {/* 操作底栏：改为极净的白色，仅通过排版区分层级 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white rounded-b-[20px]">
                
                {/* 积分状态 */}
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400 w-full sm:w-auto">
                  {user ? (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-slate-600">{t("credits.remaining", { count: user.credits ?? 0 })}</span>
                    </>
                  ) : (
                    <>
                      <Info size={14} className="text-slate-300" />
                      Sign in required for full workflow
                    </>
                  )}
                </div>

                {/* 按钮组 */}
                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handleMainAction('download')}
                    disabled={!urls.trim() || isNavigating}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {activeAction === 'download' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download size={16} />}
                    Extract Subtitles
                  </button>

                  <button
                    onClick={() => handleMainAction('summary')}
                    disabled={!urls.trim() || isNavigating}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                  >
                    {activeAction === 'summary' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles size={16} />}
                    {user && isFirstSummaryFree ? "AI Summary (Free)" : "AI Summary"}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 错误提示框 */}
            {inputErrorKey && (
              <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-[13px] font-semibold text-red-600 border border-red-100 shadow-sm">
                  <AlertCircle size={14} /> {tErrors(inputErrorKey)}
                </span>
              </div>
            )}
          </div>

          {/* 
            快捷示例：极其紧凑地贴在输入框下方 (mt-6)
            改为了更克制的文本链接样式，消除了原来按钮堆积的杂乱感
          */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
             <span className="text-[13px] font-semibold text-slate-400">Try these examples:</span>
             <div className="flex items-center gap-4">
              {[
                { label: "Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
                { label: "Playlist", url: "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME" },
                { label: "Channel", url: "https://www.youtube.com/@Google" },
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center">
                  <button
                    onClick={() => {
                      setUrls(item.url);
                      setIsFocused(true);
                      textareaRef.current?.focus();
                    }}
                    className="text-[13px] font-semibold text-slate-500 hover:text-blue-600 transition-colors underline decoration-slate-300 underline-offset-4 hover:decoration-blue-300"
                  >
                    {item.label}
                  </button>
                  {idx !== 2 && <span className="mx-3 text-slate-200">/</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 底部隔离区：离上面的核心操作区稍微远一点 */}
          <div className="mt-16">
            {!user ? (
               <div className="text-center">
                 <button
                   onClick={() => setShowLoginModal(true)}
                   className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-[13px] font-bold uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
                 >
                   <Gift size={14} /> {t("cta.signup")}
                 </button>
               </div>
            ) : hasHistory ? (
              <RecentHistory />
            ) : (
              <ExampleVideos />
            )}
          </div>

        </div>
      </section>

      {summaryInputChoice && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSummaryInputChoice(null)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">
              Summary works best on a single video
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Your input contains a playlist/channel or multiple links. Choose one path:
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={handleUseFirstVideoSummary}
                disabled={!summaryInputChoice.summaryUrl}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Summarize first video only
              </button>
              <button
                onClick={handleSwitchToBatchWorkflow}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Switch to batch workflow
              </button>
              {!summaryInputChoice.summaryUrl && (
                <p className="text-xs text-amber-600">
                  Could not detect a single video from the first link. Please use batch workflow.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={showLoginModal} onClose={handleCloseLoginModal} />
      <PlaylistProcessingModal
        isOpen={showPlaylistModal}
        onClose={() => {}}
        onCancel={cancelProcessing}
        onPause={pauseProcessing}
        onResume={resumeProcessing}
        state={playlistProcessing || { phase: "expanding", totalVideos: 0, processedVideos: 0, videosWithSubtitles: 0, canPause: false, canCancel: true }}
      />
    </div>
  );
}
