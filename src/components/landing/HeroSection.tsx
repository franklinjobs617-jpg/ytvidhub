"use client";

import { useState, useEffect, useRef } from "react";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { subtitleApi } from "@/lib/api";
import { extractVideoId } from "@/lib/youtube";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from 'next-intl';
import LoginModal from "@/components/LoginModel";
import {
  Gift,
  Info,
  AlertCircle,
  Youtube,
  Sparkles,
  Copy,
  CheckCheck,
  FileText,
  ArrowRight,
  Play,
  ListVideo,
  Radio,
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
  const [isFirstSummaryFree, setIsFirstSummaryFree] = useState(true);
  const pendingAnalysisRef = useRef(false);

  // 动态 placeholder 打字效果
  const placeholderExamples = selectedMode === 'summary'
    ? [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://youtu.be/jNQXAC9IVRw',
      ]
    : [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/playlist?list=PLrAXtmRdnEQy...',
        'https://www.youtube.com/@ChannelName',
      ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');

  useEffect(() => {
    if (isFocused || urls) return;
    const target = placeholderExamples[placeholderIndex];
    let charIndex = 0;
    let pauseTimer: ReturnType<typeof setTimeout>;
    setTypedPlaceholder('');

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedPlaceholder(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        pauseTimer = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
        }, 2000);
      }
    }, 35);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(pauseTimer);
    };
  }, [placeholderIndex, isFocused, urls, selectedMode]);

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

      // 检查是否是首次使用AI Summary（免费）
      subtitleApi.getHistory(50).then((data) => {
        const hasUsedSummary = data.some((h: any) => h.lastAction === "ai_summary");
        setIsFirstSummaryFree(!hasUsedSummary);
      }).catch(() => {});

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
      // Case C: Live/Shorts URL (/live/ or /shorts/) containing list=
      else if ((val.includes('/live/') || val.includes('/shorts/')) && val.includes('list=')) {
        cleanId = extractVideoId(val);
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
          const videoId = extractVideoId(url) || 'subtitle';
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

              <div className="bg-slate-50/80 border-b border-slate-200 px-3 py-2 md:px-4">
                <FeatureTabs currentMode={selectedMode} onChange={handleModeChange} summaryIsFree={isFirstSummaryFree} />
              </div>

              <div
                className={`relative flex flex-col bg-white transition-all duration-300 ${
                  !isAnalyzing && videoResults.length === 0 && !downloadedContent
                    ? ""
                    : "min-h-[400px]"
                }`}
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
                  <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-10 bg-gradient-to-b from-slate-50/80 to-white">
                    <div className="w-full max-w-2xl mx-auto">

                      {/* 引导小标题 */}
                      <p className="text-center text-sm font-bold text-slate-500 mb-4 tracking-wide">
                        {selectedMode === 'summary'
                          ? t('input.headingSummary')
                          : t('input.heading')}
                      </p>

                      {/* 搜索栏 — 带发光动画边框 */}
                      <div className="relative group/input">
                        {/* 发光背景层 */}
                        <div className={`absolute -inset-0.5 rounded-2xl transition-all duration-500 ${
                          isFocused
                            ? selectedMode === 'summary'
                              ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-100'
                              : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-100'
                            : inputError
                              ? 'bg-red-400 opacity-100'
                              : 'bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 opacity-40 group-hover/input:opacity-70'
                        } blur-sm`} />

                        {/* 搜索栏主体 */}
                        <div className={`relative flex items-center rounded-2xl border bg-white transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] ${
                          isFocused
                            ? selectedMode === 'summary'
                              ? 'border-purple-400 shadow-xl shadow-purple-100/50'
                              : 'border-blue-400 shadow-xl shadow-blue-100/50'
                            : inputError
                              ? 'border-red-400'
                              : 'border-slate-200 hover:border-slate-300'
                        }`}>
                        {/* 左侧图标 */}
                        <div className="pl-4 md:pl-5 flex-shrink-0">
                          <Youtube size={24} className="text-red-500" />
                        </div>

                        {/* 输入区域 */}
                        <textarea
                          ref={textareaRef}
                          value={urls}
                          onChange={(e) => {
                            handleInputChange(e);
                            const el = e.target;
                            el.style.height = 'auto';
                            el.style.height = Math.min(el.scrollHeight, 200) + 'px';
                          }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => !urls && setIsFocused(false)}
                          rows={1}
                          className={`flex-1 py-3.5 md:py-4 px-3 bg-transparent text-base md:text-lg text-slate-800 outline-none resize-none placeholder:text-slate-400 placeholder:text-sm md:placeholder:text-base leading-relaxed ${
                            inputError ? 'caret-red-500' : 'caret-blue-600'
                          }`}
                          placeholder={isFocused || urls ? (selectedMode === 'summary'
                            ? t('input.placeholderSummary')
                            : t('input.placeholder')) : typedPlaceholder || '|'}
                          spellCheck={false}
                        />

                        {/* 右侧操作按钮 */}
                        <div className="pr-2.5 md:pr-3 pt-2.5 md:pt-3 pb-2.5 md:pb-3 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMainAction(); }}
                            disabled={!urls.trim() || isAnalyzing || isDownloading}
                            className={`flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                              urls.trim() && !isAnalyzing
                                ? selectedMode === 'summary'
                                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5'
                                  : 'bg-slate-900 text-white hover:bg-black hover:shadow-lg hover:-translate-y-0.5'
                                : selectedMode === 'summary'
                                  ? 'bg-purple-100 text-purple-300 cursor-not-allowed'
                                  : 'bg-blue-50 text-blue-300 cursor-not-allowed'
                            }`}
                          >
                            {isAnalyzing ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : selectedMode === 'summary' ? (
                              <Sparkles size={15} />
                            ) : (
                              <ArrowRight size={15} />
                            )}
                            <span className="hidden sm:inline">{actionLabel}</span>
                          </button>
                        </div>
                        </div>
                      </div>

                      {/* 错误提示 */}
                      {inputError && (
                        <div className="flex items-center gap-2 mt-3 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                          <AlertCircle size={14} /> {tErrors('invalidUrl')}
                        </div>
                      )}

                      {/* 可点击示例卡片 */}
                      <div className="flex flex-col items-center gap-3 mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                          {selectedMode === 'summary' ? t('input.supportsSummary') : t('input.tryExample')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {selectedMode === 'download' ? (
                            <>
                              <button
                                onClick={() => { setUrls('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); setIsFocused(true); textareaRef.current?.focus(); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                              >
                                <Play size={12} /> Single Video
                              </button>
                              <button
                                onClick={() => { setUrls('https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME'); setIsFocused(true); textareaRef.current?.focus(); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                              >
                                <ListVideo size={12} /> Playlist
                              </button>
                              <button
                                onClick={() => { setUrls('https://www.youtube.com/@Google'); setIsFocused(true); textareaRef.current?.focus(); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                              >
                                <Radio size={12} /> Channel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => { setUrls('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); setIsFocused(true); textareaRef.current?.focus(); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-500 hover:border-purple-300 hover:bg-purple-100 hover:text-purple-700 transition-all cursor-pointer"
                            >
                              <Play size={12} /> Try a demo video
                            </button>
                          )}
                        </div>

                        {/* 快捷键提示 + 积分 */}
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-400">⌘V</kbd>
                            <span>to paste</span>
                          </div>
                          <span className="text-slate-200">·</span>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <Info size={11} className="text-blue-500" />
                            {user ? t('credits.remaining', { count: user.credits ?? 0 }) : t('credits.signup')}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
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

              {(videoResults.length > 0 || downloadedContent) && (
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
              )}
            </div>

            <div className="mt-8">
              {!user ? (
                <div className="space-y-3 text-center">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-amber-800 font-semibold">⚠️ <strong>{tAuth('registrationRequired')}</strong></p>
                    <p className="text-xs text-amber-700 mt-1">{tAuth('registrationNote')}</p>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{tAuth('noCardRequired')} • {t('bulkExtraction')}</p>
                </div>
              ) : videoResults.length === 0 ? (
                <RecentHistory />
              ) : (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">{t('ready')}</p>
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