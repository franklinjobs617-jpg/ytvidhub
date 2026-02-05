"use client";

import { useState, useEffect, useRef } from "react";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from 'next-intl';
import LoginModal from "@/components/LoginModel";
import {
  Gift,
  Info,
  AlertCircle,
  Youtube,
  Clipboard,
  TrendingUp,
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

  // 多语言翻译
  const t = useTranslations('hero');
  const tActions = useTranslations('actions');
  const tStatus = useTranslations('status');
  const tErrors = useTranslations('errors');
  const tAuth = useTranslations('auth');

  // 状态管理
  const [selectedMode, setSelectedMode] = useState<FeatureMode>("download");
  const [urls, setUrls] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [downloadFormat, setDownloadFormat] = useState("srt");
  const [userCredits, setUserCredits] = useState<string>("--");
  const [activeSummaryId, setActiveSummaryId] = useState<string | null>(null);
  const [isActionClicked, setIsActionClicked] = useState(false);

  const refreshCredits = async () => {
    if (user) {
      try {
        const data = await subtitleApi.syncUser();
        if (data) {
          const newCredits = data.credits || "0";
          if (newCredits !== userCredits) {
            setUserCredits(newCredits);
            console.log("✅ Credits updated:", userCredits, "→", newCredits);
          }
        }
      } catch (error) {
        console.error("❌ Failed to refresh credits:", error);
        // 如果刷新失败，显示警告但不阻止用户操作
        setUserCredits("--");
      }
    }
  };

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
  } = useSubtitleDownloader(refreshCredits);

  useEffect(() => {
    if (user) {
      // 初始加载时获取积分
      refreshCredits();

      // 设置定期刷新积分（每30秒检查一次）
      const interval = setInterval(() => {
        refreshCredits();
      }, 30000);

      return () => clearInterval(interval);
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
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
    if (inputError) setInputError(false);
  };

  const handlePasteExample = () => {
    setUrls("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    setInputError(false);
    setIsFocused(true);
    toast.success(tActions('pasteExample') + " pasted!");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleAreaClick = () => {
    if (textareaRef.current && videoResults.length === 0) {
      textareaRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleMainAction = async () => {
    // 设置按钮点击状态
    setIsActionClicked(true);

    try {
      if (!urls.trim() && videoResults.length === 0) {
        setInputError(true);
        toast.error(tErrors('enterUrl'), { position: "top-center" });
        return;
      }
      if (videoResults.length === 0) {
        const lines = urls.split("\n").map((u) => u.trim()).filter((u) => u.length > 0);
        const invalidLinks = lines.filter((link) => !isValidYoutubeUrl(link));
        if (invalidLinks.length > 0) {
          setInputError(true);
          toast.error(tErrors('invalidUrl'), { position: "top-center" });
          return;
        }
      }
      if (!user) {
        toast.success(tAuth('signupMessage'), { position: "top-center" });
        setShowLoginModal(true);
        return;
      }
      if (selectedMode === "summary") {
        let targetUrls = videoResults.length === 0
          ? urls.split("\n").map((u) => u.trim()).filter((u) => u.startsWith("http")).join(",")
          : videoResults.filter((v) => selectedIds.has(v.id)).map((v?: any) => v.url).join(",");
        if (!targetUrls) return;

        // 立即给用户反馈，表示操作已开始
        toast.success(tActions('opening') + "...", {
          position: "top-center",
          duration: 2000
        });

        // 立即跳转，不等待任何异步操作
        router.push(`/workspace?urls=${encodeURIComponent(targetUrls)}&from=home&mode=summary`);
        return;
      }
      if (videoResults.length === 0) {
        const uniqueUrls = Array.from(new Set(urls.split("\n").map((u) => u.trim()).filter((u) => u.startsWith("http"))));
        if (uniqueUrls.length === 0) return;
        const results = await analyzeUrls(uniqueUrls);
        setVideoResults(results);
        setSelectedIds(new Set(results.filter((v: any) => v.hasSubtitles).map((v: any) => v.id)));
      } else {
        const selectedVideos = videoResults.filter((v) => selectedIds.has(v.id));
        if (selectedVideos.length === 0) {
          toast.warning(tErrors('selectVideo'));
          return;
        }

        // 执行下载操作
        if (selectedVideos.length === 1) {
          await startSingleDownload(selectedVideos[0], downloadFormat);
        } else {
          await startBulkDownload(selectedVideos, downloadFormat);
        }

        // 下载完成后，立即刷新一次积分
        await refreshCredits();

        // 额外再延迟刷新一次（确保数据一致性）
        setTimeout(() => {
          refreshCredits();
        }, 2000);
      }
    } finally {
      // 重置按钮状态
      setTimeout(() => {
        setIsActionClicked(false);
      }, 1000);
    }
  };

  const actionLabel = isAnalyzing ? tActions('analyzing') : selectedMode === "summary" ? (videoResults.length > 0 ? tActions('openWorkspace') : tActions('analyze')) : (videoResults.length > 0 ? tActions('download').replace('{count}', selectedIds.size.toString()) : tActions('analyze'));

  return (
    <div className="relative isolate bg-white min-h-screen">
      <Toaster richColors closeButton position="top-center" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <section className="relative pt-12 pb-16 md:pt-14 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          {!user && (
            <div className="mb-6">
              <div onClick={() => setShowLoginModal(true)} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-green-100 transition-colors">
                <Gift size={14} /> {t('cta.signup')}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide text-slate-900 leading-tight mb-4 drop-shadow-sm">
              {t('title')}
            </h1>
            <h2 className="text-base md:text-lg font-medium text-slate-600 max-w-2xl mx-auto italic mb-4">
              {t.rich('subtitle', {
                highlight: (chunks) => <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md font-semibold">{chunks}</span>
              })}
            </h2>

            {/* SEO关键词强化区域 */}
            <div className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
              <span className="font-medium">Download YouTube subtitles</span> • <span className="font-medium">YouTube caption downloader</span> • <span className="font-medium">YouTube transcript extractor</span> • <span className="font-medium">Bulk subtitle download</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`relative bg-white rounded-2xl border shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${inputError ? "border-red-300 shadow-red-100 ring-4 ring-red-50" : "border-slate-200 shadow-blue-100/50"}`}>

              <div className="bg-slate-50 border-b border-slate-200 px-3 py-3 md:px-4">
                <div className="w-full">
                  <FeatureTabs currentMode={selectedMode} onChange={handleModeChange} />
                </div>
              </div>

              <div className="relative min-h-[400px] flex flex-col bg-white group cursor-text" onClick={handleAreaClick}>
                {isAnalyzing ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-slate-700 animate-pulse">{tStatus('syncing')}</h3>
                  </div>
                ) : videoResults.length === 0 ? (
                  <>
                    {/* --- 优化后的空状态区域 --- */}
                    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none px-6 ${urls || isFocused ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"}`}>

                      {/* 1. 图标 */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-red-50 rounded-[2rem] blur-2xl opacity-70"></div>
                        <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center">
                          <Youtube size={32} className="text-red-500" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* 2. 标题与价值主张 */}
                      <div className="space-y-2 mb-8">
                        <h3 className="text-2xl font-bold text-slate-900">{t('placeholder.title')}</h3>
                        <p className="text-sm text-slate-400 italic font-medium tracking-tight">"{t('placeholder.description')}"</p>
                      </div>

                      {/* 3. 支持类型说明 */}
                      <div className="flex flex-col items-center gap-4 mb-10">
                        <p className="text-slate-500 text-sm font-medium">
                          {t.rich('placeholder.support', {
                            tool: (chunks) => <span className="text-slate-900 font-bold underline decoration-blue-200 decoration-2 underline-offset-4">{chunks}</span>,
                            types: (chunks) => <span className="text-slate-900 font-bold underline decoration-blue-200 decoration-2 underline-offset-4">{chunks}</span>
                          })}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                          <TrendingUp size={12} className="animate-pulse" /> {t('features.extracted')}
                        </div>
                      </div>

                      {/* 4. 按钮 */}
                      <div className="pointer-events-auto">
                        <button onClick={(e) => { e.stopPropagation(); handlePasteExample(); }} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 hover:shadow-lg transition-all text-xs font-bold uppercase tracking-widest">
                          <Clipboard size={14} /> {t('cta.secondary')}
                        </button>
                      </div>
                    </div>

                    <textarea
                      ref={textareaRef}
                      value={urls}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => !urls && setIsFocused(false)}
                      className={`relative z-0 flex-1 w-full p-10 bg-transparent text-lg font-mono text-slate-800 outline-none resize-none leading-relaxed transition-opacity duration-300 ${inputError ? "caret-red-500" : "caret-blue-600"} ${urls || isFocused ? "opacity-100" : "opacity-0"}`}
                      placeholder=""
                      spellCheck={false}
                    />

                    {inputError && (
                      <div className="absolute top-4 right-6 z-20 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={14} /> {tErrors('invalidUrl')}
                      </div>
                    )}

                    <div className="absolute bottom-4 right-5 z-20 pointer-events-none">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <Info size={12} className="text-blue-600" />
                        {user ? t('credits.remaining', { count: userCredits }) : t('credits.signup')}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto max-h-[500px] p-0">
                    {selectedMode === "download" ? (
                      <DownloaderView videos={videoResults} selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
                    ) : (
                      <SummaryView videos={videoResults} activeVideoId={activeSummaryId} onSelectVideo={(id: any) => setActiveSummaryId(id)} summaryData={summaryData} isLoading={isAiLoading} />
                    )}
                  </div>
                )}

                {isDownloading && (
                  <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-full max-w-sm text-center px-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">{statusText}</h3>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden shadow-inner">
                        <div className="bg-blue-600 h-full transition-all duration-500 ease-out" style={{ width: `${Math.round(progress)}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{Math.round(progress)}% {tActions('complete')}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border-t border-slate-100 px-6 py-4">
                <ControlBar
                  mode={selectedMode}
                  userCredits={userCredits}
                  format={downloadFormat}
                  setFormat={setDownloadFormat}
                  availableFormats={selectedMode === "download" ? ["srt", "vtt", "txt"] : []}
                  onReset={handleReset}
                  onAction={handleMainAction}
                  canReset={videoResults.length > 0 || !!urls}
                  isAnalyzing={isAnalyzing}
                  isDownloading={isDownloading}
                  isActionClicked={isActionClicked}
                  canAction={!isAnalyzing && (videoResults.length > 0 || !!urls)}
                  actionLabel={actionLabel}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              {!user ? (
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-amber-800 font-semibold">⚠️ <strong>{tAuth('registrationRequired')}</strong></p>
                    <p className="text-xs text-amber-700 mt-1">{tAuth('registrationNote')}</p>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{tAuth('noCardRequired')} • {t('bulkExtraction')}</p>
                </div>
              ) : (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('ready')}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}