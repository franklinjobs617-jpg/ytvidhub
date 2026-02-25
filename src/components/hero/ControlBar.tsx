"use client";

import { Coins, Download, RotateCcw, Zap, Sparkles, ChevronDown, Check, FileText, Settings2, Globe } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';

export function ControlBar({
  userCredits,
  format,
  setFormat,
  availableFormats,
  lang,
  setLang,
  availableLangs,
  onReset,
  onAction,
  canReset,
  canAction,
  actionLabel,
  isDownloading,
  isActionClicked = false,
  mode = "download",
}: any) {
  const t = useTranslations('credits');
  const tDownloader = useTranslations('downloader');
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const formatMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const langLabels: Record<string, string> = {
    en: "English", zh: "中文", es: "Español", fr: "Français",
    de: "Deutsch", ja: "日本語", ko: "한국어", pt: "Português",
    ru: "Русский", ar: "العربية", hi: "हिन्दी", it: "Italiano",
    nl: "Nederlands", pl: "Polski", tr: "Türkçe", vi: "Tiếng Việt",
    id: "Bahasa Indonesia", th: "ภาษาไทย",
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formatMenuRef.current && !formatMenuRef.current.contains(event.target as Node)) {
        setShowFormatMenu(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine State: Analysis (Initial) vs Download (Results Ready)
  // We use actionLabel text as a proxy since we don't have explicit state passed in
  const isAnalysisState = actionLabel.toLowerCase().includes('analyze');
  const isDownloadState = !isAnalysisState;

  // Format Display Names
  const formatLabels: Record<string, string> = {
    srt: "SubRip (.srt)",
    vtt: "WebVTT (.vtt)",
    txt: "Plain Text (.txt)",
  };

  // State A: Initial Analysis View
  if (isAnalysisState) {
    return (
      <div className="flex flex-col items-end gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-full flex justify-end">
          <button
            onClick={onAction}
            disabled={!canAction || isDownloading}
            className={`
              relative group overflow-hidden px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg
              ${canAction
                ? "bg-slate-900 text-white hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }
            `}
          >
            <div className="relative z-10 flex items-center gap-3">
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                mode === "summary" ? <Sparkles size={16} className={canAction ? "text-purple-400" : ""} /> : <Settings2 size={16} />
              )}
              <span>{isDownloading ? tDownloader('analyzing') : actionLabel}</span>
            </div>

            {/* Subtle Shine Effect */}
            {canAction && (
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // State B: Download / Action View (Results Available)
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">

        {/* --- Left: Configuration (Format) --- */}
        <div className="flex items-center gap-4 w-full md:w-auto pl-2">
          {mode === 'download' && (
            <>
              <div className="relative" ref={formatMenuRef}>
                <button
                  onClick={() => setShowFormatMenu(!showFormatMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all text-xs font-bold text-slate-700 uppercase tracking-wide min-w-[140px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" />
                    {format.toUpperCase()}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {showFormatMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-bottom-left">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {tDownloader('selectFormat')}
                    </div>
                    {availableFormats.map((f: string) => (
                      <button
                        key={f}
                        onClick={() => { setFormat(f); setShowFormatMenu(false); }}
                        className="w-full text-left px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between group"
                      >
                        <span>{formatLabels[f] || f.toUpperCase()}</span>
                        {format === f && <Check size={14} className="text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {availableLangs?.length > 0 && (
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all text-xs font-bold text-slate-700 uppercase tracking-wide min-w-[120px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} className="text-slate-400" />
                      {langLabels[lang] || lang.toUpperCase()}
                    </span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {showLangMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-bottom-left max-h-60 overflow-y-auto">
                      <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0">
                        {tDownloader('selectLanguage')}
                      </div>
                      {availableLangs.map((l: string) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setShowLangMenu(false); }}
                          className="w-full text-left px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between group"
                        >
                          <span>{langLabels[l] || l.toUpperCase()}</span>
                          {lang === l && <Check size={14} className="text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {mode === 'summary' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-lg text-xs font-bold text-purple-700 uppercase tracking-wide">
              <Sparkles size={14} /> {tDownloader('aiMode')}
            </div>
          )}

          {/* Credits Indicator (Small) */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-l border-slate-200 pl-4 h-6">
            <Coins size={12} />
            <span>{t('cost', { amount: mode === 'summary' ? '7' : '1' })}{mode !== 'summary' ? t('perVid') : ''}</span>
          </div>
        </div>

        {/* --- Right: Primary Action --- */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {canReset && (
            <button
              onClick={onReset}
              className="px-4 py-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <RotateCcw size={14} />
            </button>
          )}

          <button
            onClick={onAction}
            disabled={isDownloading}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20
              ${mode === 'summary'
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/30 hover:scale-[1.02]"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
              }
            `}
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : mode === "summary" ? (
              <Sparkles size={14} />
            ) : (
              <Download size={14} />
            )}
            <span>{isDownloading ? tDownloader('processing') : actionLabel}</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-3 px-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${parseInt(userCredits) > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
          <span>{t('balance', { amount: userCredits })}</span>
          <Link href="/pricing" className="ml-2 text-blue-600 hover:underline">{t('topUp')}</Link>
        </div>
        {mode === 'download' && (
          <div className="text-[9px] text-slate-300 font-mono">
            {tDownloader('batchEnabled')}
          </div>
        )}
      </div>
    </div>
  );
}
