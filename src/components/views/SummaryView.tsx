"use client";

import React, { useEffect, useRef } from "react";
import { VideoResult } from "./EnhancedDownloaderView";
import { Check, Copy, Sparkles } from "lucide-react";
import { useTranslations } from 'next-intl';
import { MarkdownContent } from "@/components/ui/MarkdownContent";

interface SummaryViewProps {
  videos: VideoResult[];
  activeVideoId: string | null;
  onSelectVideo: (id: string) => void;
  summaryData: string;
  isLoading: boolean;
}

export function SummaryView({
  videos,
  activeVideoId,
  onSelectVideo,
  summaryData,
  isLoading,
}: SummaryViewProps) {
  const t = useTranslations('downloaderView');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isLoading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [summaryData, isLoading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[600px] bg-slate-50/50 animate-in fade-in duration-500">
      {/* --- 左侧队列：Master --- */}
      <div className="w-1/3 border-r border-slate-200 bg-white/50 backdrop-blur-sm flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('videoQueue')}</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVideo(v.id)}
              className={`w-full group p-2 rounded-xl transition-all flex gap-3 items-center ${activeVideoId === v.id
                ? "bg-white shadow-md ring-1 ring-slate-200"
                : "hover:bg-white/80"
                }`}
            >
              <div className="relative w-20 h-12 flex-shrink-0 rounded-lg overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all">
                <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className={`text-[11px] font-bold truncate ${activeVideoId === v.id ? "text-violet-600" : "text-slate-500"
                  }`}>
                  {v.title}
                </h4>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">{v.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- 右侧内容区：Detail --- */}
      <div className="flex-1 flex flex-col bg-transparent relative">
        {activeVideoId ? (
          <>
            {/* Header: 功能操作栏 */}
            <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md text-[10px] font-black text-slate-500 uppercase">
                  <Sparkles className="w-3 h-3 text-violet-500" />
                  DeepSeek-V3
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <nav className="flex items-center gap-4">
                  <button className="text-[10px] font-black text-violet-600 uppercase border-b-2 border-violet-600 pb-1">{t('summary')}</button>
                </nav>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 内容滚动区：使用卡片包裹渲染内容 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="max-w-3xl mx-auto">
                {/* 这里是白色的卡片容器 */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-10">
                  {isLoading && !summaryData ? (
                    <div className="space-y-4">
                      <div className="h-8 bg-slate-100 animate-pulse rounded-lg w-1/2" />
                      <div className="h-32 bg-slate-50 animate-pulse rounded-2xl w-full" />
                      <div className="h-4 bg-slate-100 animate-pulse rounded-lg w-3/4" />
                    </div>
                  ) : (
                    <>
                      <MarkdownContent content={summaryData} />
                      {isLoading && (
                        <div className="flex items-center gap-2 mt-4 text-violet-500">
                          <span className="w-2 h-5 bg-violet-500 animate-pulse rounded-full" />
                          <span className="text-xs font-bold animate-pulse">{t('aiIsTyping')}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm font-medium">{t('selectVideoToSummary')}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}