"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

interface HeroSectionProps {
  heroHeader?: React.ReactNode;
}

type SummaryInputChoiceState = {
  allUrls: string[];
  summaryUrl: string | null;
} | null;

export default function HeroSection({ heroHeader }: HeroSectionProps) {
  const router = useRouter();
  const { user, refreshUser, openLoginModal } = useAuth();

  const t = useTranslations("hero");
  const tExamples = useTranslations("hero.examples");
  const tErrors = useTranslations("errors");

  const [urls, setUrls] = useState("");
  const [inputErrorKey, setInputErrorKey] = useState<"enterUrl" | "invalidUrl" | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFirstSummaryFree, setIsFirstSummaryFree] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);
  const [summaryInputChoice, setSummaryInputChoice] =
    useState<SummaryInputChoiceState>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeAction, setActiveAction] = useState<'download' | 'summary' | null>(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const placeholderExamples = useMemo(
    () => [
      tExamples("placeholderVideo"),
      tExamples("placeholderPlaylist"),
      tExamples("placeholderChannel"),
    ],
    [tExamples],
  );

  const quickExamples = useMemo(
    () => [
      { label: tExamples("tabVideo"), url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { label: tExamples("tabPlaylist"), url: "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME" },
      { label: tExamples("tabChannel"), url: "https://www.youtube.com/@Google" },
    ],
    [tExamples],
  );

  useEffect(() => {
    if (isFocused || urls) return;
    const target = placeholderExamples[placeholderIndex];
    let charIndex = 0;
    let pauseTimer: ReturnType<typeof setTimeout>;
    setTypedPlaceholder("");

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedPlaceholder(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        pauseTimer = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
        }, 2000);
      }
    }, 40);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(pauseTimer);
    };
  }, [placeholderExamples, placeholderIndex, isFocused, urls]);

  const refreshCredits = useCallback(async () => {
    if (user) {
      try { await refreshUser(); } catch {}
    }
  }, [refreshUser, user]);

  const {
    playlistProcessing,
    showPlaylistModal,
    cancelProcessing,
    pauseProcessing,
    resumeProcessing,
  } = useSubtitleDownloader(refreshCredits);

  const navigateToWorkspace = useCallback((
    mode: "download" | "summary",
    targetUrls: string[],
  ) => {
    const mergedUrls = targetUrls.map((url) => normalizeYoutubeUrl(url)).join(",");
    setIsNavigating(true);
    router.push(
      `/workspace?urls=${encodeURIComponent(mergedUrls)}&from=home&mode=${mode}`,
    );
  }, [router]);

  useEffect(() => {
    if (user) {
      refreshCredits();
      subtitleApi.getHistory(50).then((data) => {
        const hasUsedSummary = data.some((h: { lastAction?: string }) => h.lastAction === "ai_summary");
        setIsFirstSummaryFree(!hasUsedSummary);
        setHasHistory(data.length > 0);
      }).catch(() => {});
      const interval = setInterval(() => refreshCredits(), 30000);
      return () => clearInterval(interval);
    }
  }, [navigateToWorkspace, refreshCredits, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
    if (inputErrorKey) setInputErrorKey(null);
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
    navigateToWorkspace("summary", [targetUrl]);
  };

  const handleSwitchToBatchWorkflow = () => {
    if (!summaryInputChoice) return;

    const targetUrls = summaryInputChoice.allUrls;
    setSummaryInputChoice(null);
    navigateToWorkspace("download", targetUrls);
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
      navigateToWorkspace(targetMode, targetUrls);
      
    } catch {
      setActiveAction(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--surface-page)] font-sans">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.14),rgba(37,99,235,0)_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.34]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse 66% 60% at 50% 32%, #000 15%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 66% 60% at 50% 32%, #000 15%, transparent 95%)",
          }}
        />
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

      <section className="relative z-10 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="container mx-auto max-w-[820px] px-4 text-center md:px-6">
          <div className="mb-9">
            {heroHeader}
          </div>

          <div className="mx-auto relative z-20">
            <div 
              className={`rounded-3xl border bg-white/95 transition-all duration-300 backdrop-blur ${
                isFocused 
                  ? "border-[var(--brand-400)] ring-4 ring-[var(--brand-50)] shadow-[0_30px_65px_-40px_rgba(37,99,235,0.75)]" 
                  : inputErrorKey 
                  ? "border-red-300 ring-[4px] ring-red-50" 
                  : "border-slate-200 shadow-[0_28px_65px_-44px_rgba(15,23,42,0.7)] hover:border-slate-300 hover:shadow-[0_30px_70px_-42px_rgba(37,99,235,0.32)]"
              }`}
            >
              <div className="flex items-start px-5 pb-5 pt-6 sm:px-7">
                <Youtube className={`mr-3 mt-1 h-6 w-6 shrink-0 transition-colors ${isFocused ? 'text-red-500' : 'text-slate-300'}`} />
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
                  className={`min-h-[46px] w-full flex-1 resize-none bg-transparent text-base font-medium leading-relaxed text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 md:text-[21px] ${
                    inputErrorKey ? "caret-red-500" : "caret-blue-600"
                  }`}
                  placeholder={isFocused || urls ? "Paste link(s) here..." : typedPlaceholder || "|"}
                  spellCheck={false}
                />
              </div>

              <div className="h-[1px] w-full bg-slate-100"></div>

              <div className="flex flex-col items-center justify-between gap-4 rounded-b-3xl bg-white px-5 py-4 sm:flex-row sm:px-7">
                <div className="flex w-full items-center gap-2 text-[13px] font-medium text-slate-400 sm:w-auto">
                  {user ? (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-slate-600">{t("credits.remaining", { count: user.credits ?? 0 })}</span>
                    </>
                  ) : (
                    <>
                      <Info size={14} className="text-slate-300" />
                      2 free guest tries / 24h · Sign in for full workflow
                    </>
                  )}
                </div>

                <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                  <button
                    onClick={() => handleMainAction('download')}
                    disabled={!urls.trim() || isNavigating}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                  >
                    {activeAction === 'download' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download size={16} />}
                    Extract Subtitles
                  </button>

                  <button
                    onClick={() => handleMainAction('summary')}
                    disabled={!urls.trim() || isNavigating}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
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

          <div className="relative z-10 mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
             <span className="text-[13px] font-semibold text-slate-400">{tExamples("quickLabel")}</span>
             <div className="flex items-center gap-2 sm:gap-3">
              {quickExamples.map((item, idx) => (
                <div key={item.label} className="flex items-center">
                  <button
                    onClick={() => {
                      setUrls(item.url);
                      setIsFocused(true);
                      textareaRef.current?.focus();
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)]"
                  >
                    {item.label}
                  </button>
                  {idx !== quickExamples.length - 1 && <span className="mx-2 text-slate-200">/</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            {!user ? (
               <div className="text-center">
                 <button
                   onClick={openLoginModal}
                   className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-[var(--brand-700)] shadow-[0_8px_24px_-18px_rgba(37,99,235,0.8)] transition-colors hover:bg-[var(--brand-50)]"
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
