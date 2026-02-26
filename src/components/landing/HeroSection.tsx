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
  Sparkles,
  Copy,
  CheckCheck,
  FileText,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { FeatureTabs, FeatureMode } from "@/components/hero/FeatureTabs";
import { EnhancedDownloaderView, VideoResult } from "@/components/views/EnhancedDownloaderView";
import { SummaryView } from "@/components/views/SummaryView";
import { ControlBar } from "@/components/hero/ControlBar";
import { PlaylistProcessingModal } from "@/components/playlist/PlaylistProcessingModal";
import { RecentHistory } from "@/components/landing/RecentHistory";

// 校验工具 - 支持playlist和channel
const isValidYoutubeUrl = (url: string) => {
  if (!url) return false;
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,  // 基本YouTube URL
    /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=.+$/, // Playlist
    /^(https?:\/\/)?(www\.)?youtube\.com\/channel\/.+$/,      // Channel
    /^(https?:\/\/)?(www\.)?youtube\.com\/@.+$/,              // New channel format
    /^(https?:\/\/)?(www\.)?youtube\.com\/c\/.+$/,            // Custom channel
    /^(https?:\/\/)?(www\.)?youtube\.com\/user\/.+$/          // User channel
  ];
  return patterns.some(pattern => pattern.test(url.trim()));
};

interface HeroSectionProps {
  heroHeader?: React.ReactNode;
}

export default function HeroSection({ heroHeader }: HeroSectionProps) {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 多语言翻译
  const t = useTranslations('hero');
  const tActions = useTranslations('actions');
  const tStatus = useTranslations('statusMessages');
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
  const [downloadLang, setDownloadLang] = useState("en");
  const [activeSummaryId, setActiveSummaryId] = useState<string | null>(null);
  const [isActionClicked, setIsActionClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const pendingAnalysisRef = useRef(false);

  const handleCopyContent = async () => {
    if (!downloadedContent) return;
    await navigator.clipboard.writeText(downloadedContent.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshCredits = async () => {
    if (user) {
      try {
        await refreshUser();
      } catch (error) {
        console.error("❌ Failed to refresh credits:", error);
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
    playlistProcessing,
    showPlaylistModal,
    pauseProcessing,
    resumeProcessing,
    cancelProcessing,
    downloadedContent,
    clearDownloadedContent,
  } = useSubtitleDownloader(refreshCredits);

  useEffect(() => {
    if (user) {
      // 初始加载时获取积分
      refreshCredits();

      // 登录后自动继续之前的操作
      if (pendingAnalysisRef.current) {
        pendingAnalysisRef.current = false;
        handleMainAction();
      }

      // 设置定期刷新积分（每30秒检查一次）
      const interval = setInterval(() => {
        refreshCredits();
      }, 30000);

      return () => clearInterval(interval);
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
    clearDownloadedContent();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    // AI Summary Mode: Auto-clean playlist URLs (Standard & Short)
    if (selectedMode === 'summary') {
      let cleanId = null;

      // Case A: Standard URL (v=...) containing list=
      if (val.includes('v=') && val.includes('list=')) {
        const match = val.match(/[?&]v=([^&]+)/);
        if (match) cleanId = match[1];
      }
      // Case B: Short URL (youtu.be/...) containing list=
      else if (val.includes('youtu.be/') && val.includes('list=')) {
        const match = val.match(/youtu\.be\/([^?&]+)/);
        if (match) cleanId = match[1];
      }

      if (cleanId) {
        const cleanUrl = `https://www.youtube.com/watch?v=${cleanId}`;
        setUrls(cleanUrl);
        setInputError(false);
        toast.info("Playlist link detected", {
          description: "AI Summary only supports single videos. We've optimized the link for you.",
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
          duration: 3000,
        });
        return;
      }
    }

    setUrls(val);
    if (inputError) setInputError(false);
  };

  const handlePasteExample = () => {
    const examples = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME"
    ];
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setUrls(randomExample);
    setInputError(false);
    setIsFocused(true);
    const exampleType = randomExample.includes('playlist') ? 'playlist example' : 'video example';
    toast.success(`${exampleType} pasted!`);
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
        pendingAnalysisRef.current = true;
        setShowLoginModal(true);
        return;
      }
      if (selectedMode === "summary") {
        if (user && (user.credits || 0) <= 0) {
          toast.error(tErrors('insufficientCredits'), {
            description: "You need credits to generate AI summaries.",
            action: {
              label: "Get Credits",
              onClick: () => router.push('/pricing')
            },
            duration: 5000,
          });
          return;
        }

        let targetUrls = videoResults.length === 0
          ? urls.split("\n").map((u) => u.trim()).filter((u) => u.startsWith("http")).join(",")
          : videoResults.filter((v) => selectedIds.has(v.id)).map((v?: any) => v.url).join(",");
        if (!targetUrls) return;

        // 立即给用户反馈，表示操作已开始
        toast.success(tActions('opening') + "...", {
          position: "top-center",
          duration: 2000
        });

        router.push(`/workspace?urls=${encodeURIComponent(targetUrls)}&from=home&mode=summary`);
        return;
      }
      if (videoResults.length === 0) {
        const uniqueUrls = Array.from(new Set(urls.split("\n").map((u) => u.trim()).filter((u) => u.startsWith("http"))));
        if (uniqueUrls.length === 0) return;

        // 单视频直接下载快速路径
        const isSingleVideo = uniqueUrls.length === 1 &&
          !uniqueUrls[0].includes('playlist?list=') &&
          !uniqueUrls[0].includes('/channel/') &&
          !uniqueUrls[0].includes('/@') &&
          !uniqueUrls[0].includes('/c/');

        if (isSingleVideo) {
          if (user && (user.credits || 0) <= 0) {
            toast.error(tErrors('insufficientCredits'), {
              description: "You need credits to download subtitles.",
              action: { label: "Get Credits", onClick: () => router.push('/pricing') },
              duration: 5000,
            });
            return;
          }
          const url = uniqueUrls[0];
          const videoId = (url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&]+)/) || [])[1] || 'subtitle';
          await startSingleDownload({ url, title: videoId }, downloadFormat, downloadLang);
          await refreshCredits();
          setTimeout(() => refreshCredits(), 2000);
          return;
        }

        const results = await analyzeUrls(uniqueUrls);
        setVideoResults(results);
        setSelectedIds(new Set(results.filter((v: any) => v.hasSubtitles).map((v: any) => v.id)));
      } else {
        // Credits Check before Download
        if (user && (user.credits || 0) <= 0) {
          toast.error(tErrors('insufficientCredits'), {
            description: "You need credits to download subtitles.",
            action: {
              label: "Get Credits",
              onClick: () => router.push('/pricing')
            },
            duration: 5000,
          });
          return;
        }

        const selectedVideos = videoResults.filter((v) => selectedIds.has(v.id));
        if (selectedVideos.length === 0) {
          toast.warning(tErrors('selectVideo'));
          return;
        }

        // 执行下载操作
        if (selectedVideos.length === 1) {
          await startSingleDownload(selectedVideos[0], downloadFormat, downloadLang);
        } else {
          await startBulkDownload(selectedVideos, downloadFormat, downloadLang);
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

  const actionLabel = isAnalyzing
    ? tActions('analyzing')
    : downloadedContent
    ? tActions('analyze')
    : selectedMode === "summary"
    ? (videoResults.length > 0 ? tActions('openWorkspace') : tActions('analyze'))
    : (videoResults.length > 0 ? tActions('download', { count: selectedIds.size }) : tActions('analyze'));

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

          {heroHeader}

          <div className="max-w-4xl mx-auto">
            <div className={`relative bg-white rounded-2xl border shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${inputError ? "border-red-300 shadow-red-100 ring-4 ring-red-50" : "border-slate-200 shadow-blue-100/50"}`}>

              <div className="bg-slate-50 border-b border-slate-200 px-3 py-3 md:px-4">
                <div className="w-full">
                  <FeatureTabs currentMode={selectedMode} onChange={handleModeChange} />
                </div>
              </div>

              <div
                className={`relative min-h-[400px] flex flex-col bg-white group cursor-text transition-all duration-300 ${!isAnalyzing && videoResults.length === 0
                  ? "border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-slate-50/30"
                  : ""
                  }`}
                onClick={handleAreaClick}
              >
                {isAnalyzing ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-slate-700 animate-pulse">{tStatus('syncing')}</h3>
                  </div>
                ) : downloadedContent ? (
                  <div className="flex-1 flex flex-col p-5 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* 顶部：标题 + 操作按钮（始终可见） */}
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCheck size={14} className="text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Subtitle extracted</p>
                        <h3 className="text-sm font-semibold text-slate-800 truncate">{downloadedContent.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handleCopyContent}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                            copied
                              ? "bg-green-500 text-white"
                              : "bg-slate-900 text-white hover:bg-black"
                          }`}
                        >
                          {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => {
                            const url = downloadedContent.url;
                            const text = downloadedContent.text;
                            const fmt = downloadFormat;
                            // 先导航，不阻塞用户
                            router.push(`/workspace?urls=${encodeURIComponent(url)}&from=home&mode=summary`);
                            // 异步写缓存，workspace 挂载前一定完成
                            setTimeout(() => {
                              try {
                                sessionStorage.setItem(
                                  `ytvidhub_transcript_${url}`,
                                  JSON.stringify({ text, format: fmt })
                                );
                              } catch {}
                            }, 0);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-black text-xs uppercase tracking-widest transition-all"
                        >
                          <Sparkles size={13} />
                          AI Summary
                        </button>
                      </div>
                    </div>

                    {/* 内容预览（可滚动） */}
                    <div className="flex-1 relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        <FileText size={10} />
                        <span>{downloadedContent.text.split('\n').filter(l => l.trim()).length} lines</span>
                      </div>
                      <pre className="h-full overflow-y-auto p-4 text-xs text-slate-600 font-mono leading-relaxed whitespace-pre-wrap break-words">
                        {downloadedContent.text}
                      </pre>
                    </div>
                  </div>
                ) : videoResults.length === 0 ? (
                  <>
                    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none px-6 ${urls || isFocused ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"}`}>

                      {/* 1. 图标 */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 rounded-[2rem] blur-2xl opacity-70 bg-red-50"></div>
                        <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Youtube size={32} className="text-red-500" strokeWidth={1.5} />
                          {selectedMode === 'summary' && (
                            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-100">
                              <Sparkles size={14} className="text-purple-600 fill-purple-100" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. 标题与价值主张 */}
                      <div className="space-y-3 mb-8 text-center max-w-2xl">
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                          {selectedMode === 'summary' ? (
                            <span>{t('placeholder.summaryTitle')}</span>
                          ) : (
                            <span>{t('placeholder.title')}</span>
                          )}
                          <span className={`inline-block w-0.5 h-6 animate-pulse rounded-full ${selectedMode === 'summary' ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                        </h3>

                        <p className="text-sm text-slate-400 font-medium tracking-tight">
                          {selectedMode === 'summary' ? (
                            <span>{t('placeholder.summaryDesc')}</span>
                          ) : (
                            <span className="italic">"{t('placeholder.description')}"</span>
                          )}
                        </p>
                      </div>

                      {/* 3. 支持类型说明 */}
                      <div className="flex flex-col items-center gap-4 mb-10">
                        {selectedMode === 'summary' ? (
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full border border-slate-200 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            <Sparkles size={12} className="text-purple-500" />
                            <span>{t('placeholder.poweredBy')}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                            <TrendingUp size={12} className="text-green-600" />
                            <span className="font-bold">{t('features.extracted')}</span>
                          </div>
                        )}
                      </div>

                      {/* 4. 按钮 */}
                      <div className="pointer-events-auto">
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePasteExample(); }}
                          className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all text-xs font-bold uppercase tracking-widest group/btn"
                        >
                          <Clipboard size={14} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                          {t('placeholder.pasteDemo')}
                        </button>
                      </div>

                      {/* 5. 最近历史记录 */}
                      {user && (
                        <div className="pointer-events-auto mt-6 w-full max-w-2xl">
                          <RecentHistory />
                        </div>
                      )}
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

                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <Info size={12} className="text-blue-600" />
                      {user ? t('credits.remaining', { count: user.credits ?? 0 }) : t('credits.signup')}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 p-0">
                    {selectedMode === "download" ? (
                      <EnhancedDownloaderView
                        videos={videoResults}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                        isLoading={isAnalyzing}
                      />
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
                  userCredits={user?.credits?.toString() ?? "--"}
                  format={downloadFormat}
                  setFormat={setDownloadFormat}
                  availableFormats={selectedMode === "download" ? ["srt", "vtt", "txt"] : []}
                  lang={downloadLang}
                  setLang={setDownloadLang}
                  availableLangs={selectedMode === "download" ? ["en", "zh", "es", "fr", "de", "ja", "ko", "pt", "ru", "ar", "hi", "it", "nl", "pl", "tr", "vi", "id", "th"] : []}
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

      {/* Playlist Processing Modal */}
      <PlaylistProcessingModal
        isOpen={showPlaylistModal}
        onClose={() => {/* 处理完成后自动关闭 */ }}
        onCancel={cancelProcessing}
        onPause={pauseProcessing}
        onResume={resumeProcessing}
        state={playlistProcessing || {
          phase: 'expanding',
          totalVideos: 0,
          processedVideos: 0,
          videosWithSubtitles: 0,
          canPause: false,
          canCancel: true
        }}
      />
    </div>
  );
}