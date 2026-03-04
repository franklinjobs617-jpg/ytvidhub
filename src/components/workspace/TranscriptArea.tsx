"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { subtitleApi } from "@/lib/api";
import { Search, Copy, Check, ClipboardCopy, Download, ChevronUp, ChevronDown } from "lucide-react";
import {
  parseVtt,
  groupTranscriptByTime,
  formatTime,
  highlightText,
} from "@/utils/transcriptUtils";

export function TranscriptArea({
  videoUrl,
  currentTime,
  onSeek,
  searchInputRef,
}: {
  videoUrl: string;
  currentTime: number;
  onSeek?: (time: number) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}) {
  const [transcriptVtt, setTranscriptVtt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(true);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const internalSearchRef = useRef<HTMLInputElement>(null);
  const searchRef = searchInputRef || internalSearchRef;

  useEffect(() => {
    if (!videoUrl) return;
    try {
      const cached = sessionStorage.getItem(`ytvidhub_transcript_${videoUrl}`);
      if (cached) {
        const { text, format } = JSON.parse(cached);
        if (format === 'vtt') { setTranscriptVtt(text); return; }
        if (format === 'srt') {
          setTranscriptVtt('WEBVTT\n\n' + text.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2'));
          return;
        }
        if (format === 'txt') {
          setTranscriptVtt(`WEBVTT\n\n00:00:00.000 --> 99:59:59.000\n${text}`);
          return;
        }
      }
    } catch {}
    setLoading(true);
    subtitleApi
      .downloadSingle({ url: videoUrl, lang: "en", format: "vtt", title: "transcript", isPreview: true })
      .then(async (blob) => {
        const text = await blob.text();
        setTranscriptVtt(text);
        // 存入缓存
        try {
          sessionStorage.setItem(`ytvidhub_transcript_${videoUrl}`, JSON.stringify({ text, format: 'vtt' }));
        } catch {}
      })
      .catch(() => setTranscriptVtt(""))
      .finally(() => setLoading(false));
  }, [videoUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayItems.map(item => item.text).join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // P2: 增强的导出功能
  const handleExportWithTimestamps = () => {
    const videoTitle = document.title || 'YouTube Video';
    const exportContent = [
      `# ${videoTitle}`,
      `Source: ${videoUrl}`,
      `Exported: ${new Date().toLocaleString()}`,
      '',
      ...displayItems.map(item => `[${formatTime(item.startTime)}] ${item.text}`)
    ].join('\n');
    
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayItems = useMemo(() => {
    if (!transcriptVtt) return [];
    const rawItems = parseVtt(transcriptVtt);
    const finalItems = isSmartMode
      ? groupTranscriptByTime(rawItems)
      : rawItems.map((item) => ({ startTime: item.start, text: item.text }));
    if (searchQuery) {
      return finalItems.filter((i) => i.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return finalItems;
  }, [transcriptVtt, isSmartMode, searchQuery]);

  // P1: 搜索结果统计和导航
  const searchResults = useMemo(() => {
    if (!searchQuery || !transcriptVtt) return { total: 0, matches: [] };
    const rawItems = parseVtt(transcriptVtt);
    const finalItems = isSmartMode
      ? groupTranscriptByTime(rawItems)
      : rawItems.map((item) => ({ startTime: item.start, text: item.text }));
    
    const matches = finalItems
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((i) => i.text.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return { total: matches.length, matches };
  }, [transcriptVtt, isSmartMode, searchQuery]);

  // P1: 搜索导航功能
  const navigateSearch = (direction: 'prev' | 'next') => {
    if (searchResults.total === 0) return;
    
    if (direction === 'next') {
      setCurrentSearchIndex((prev) => (prev + 1) % searchResults.total);
    } else {
      setCurrentSearchIndex((prev) => (prev - 1 + searchResults.total) % searchResults.total);
    }
  };

  // 重置搜索索引当搜索词改变时
  useEffect(() => {
    setCurrentSearchIndex(0);
  }, [searchQuery]);

  const activeItemRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(() => {
    if (!currentTime || searchQuery || displayItems.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < displayItems.length; i++) {
      if (displayItems[i].startTime <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, searchQuery, displayItems]);

  useEffect(() => {
    if (activeIndex >= 0 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex]);

  // 监听外部触发的复制事件
  useEffect(() => {
    const handleCopyEvent = () => {
      handleCopy();
    };
    window.addEventListener('copyAllTranscript', handleCopyEvent);
    return () => window.removeEventListener('copyAllTranscript', handleCopyEvent);
  }, [displayItems]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Tab Header — YouMind style */}
      <div className="flex items-center px-4 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex">
          {[{ label: "Smart", value: true }, { label: "Line by Line", value: false }].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setIsSmartMode(value)}
              className={`px-3 py-3 text-xs font-medium border-b-2 transition-colors ${
                isSmartMode === value
                  ? "border-violet-500 text-violet-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar - P1 优化 */}
      <div className="px-4 py-2 border-b border-slate-100 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-9 pr-20 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          
          {searchQuery && searchResults.total > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* 匹配计数 */}
              <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 bg-white border border-slate-200 rounded">
                {currentSearchIndex + 1} / {searchResults.total}
              </span>
              
              {/* 导航按钮 */}
              <div className="flex">
                <button
                  onClick={() => navigateSearch('prev')}
                  className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title="Previous match"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={() => navigateSearch('next')}
                  className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title="Next match"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>
          )}
          
          {searchQuery && searchResults.total === 0 && (
            <span className="absolute right-7 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">No matches</span>
          )}
          
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-sm"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="px-4 py-4 space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-3 w-10 bg-slate-200 rounded shrink-0 mt-1" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : displayItems.length > 0 ? (
          <div className="py-2">
            {displayItems.map((item, i) => {
              const isActive = i === activeIndex;
              const isCurrentSearchResult = searchQuery && searchResults.total > 0 && 
                searchResults.matches[currentSearchIndex]?.startTime === item.startTime;
              
              return (
                <div
                  key={i}
                  ref={isActive ? activeItemRef : undefined}
                  className={`group relative flex gap-3 px-4 py-2.5 transition-all cursor-default ${
                    isCurrentSearchResult
                      ? "bg-yellow-50 border-l-2 border-yellow-500 ring-1 ring-yellow-200"
                      : isActive
                      ? "bg-violet-50 border-l-2 border-violet-500"
                      : `border-l-2 border-transparent ${activeIndex >= 0 ? "opacity-55 hover:opacity-100" : "hover:bg-slate-50"}`
                  }`}
                >
                  {/* Timestamp */}
                  <span
                    onClick={() => onSeek?.(item.startTime)}
                    className={`shrink-0 text-[11px] font-mono mt-0.5 cursor-pointer transition-colors ${
                      isCurrentSearchResult
                        ? "text-yellow-600 font-semibold"
                        : isActive 
                        ? "text-violet-500 font-semibold" 
                        : "text-slate-400 hover:text-violet-500"
                    }`}
                  >
                    {formatTime(item.startTime)}
                  </span>

                  {/* Text */}
                  <p className={`text-sm leading-6 flex-1 ${
                    isCurrentSearchResult
                      ? "text-slate-900 font-medium"
                      : isActive 
                      ? "text-slate-900 font-medium" 
                      : "text-slate-600"
                  }`}>
                    {highlightText(item.text, searchQuery).map((seg, j) =>
                      seg.isMatch
                        ? <mark key={j} className={`rounded px-0.5 ${
                            isCurrentSearchResult 
                              ? "bg-yellow-300 text-yellow-900 font-semibold" 
                              : "bg-yellow-200 text-yellow-900"
                          }`}>{seg.part}</mark>
                        : seg.part
                    )}
                  </p>

                  {/* P1: 增强的悬浮复制按钮 */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`[${formatTime(item.startTime)}] ${item.text}`);
                      // 简单的复制反馈
                      const btn = document.activeElement as HTMLButtonElement;
                      if (btn) {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg> Copied!';
                        setTimeout(() => {
                          btn.innerHTML = originalText;
                        }, 1000);
                      }
                    }}
                    className="absolute right-3 top-2.5 opacity-0 group-hover:opacity-100 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 hover:text-violet-600 hover:border-violet-300 transition-all shadow-sm"
                  >
                    <ClipboardCopy size={10} /> Copy
                  </button>
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p className="text-sm">No transcript available</p>
          </div>
        )}
      </div>
    </div>
  );
}
