"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { subtitleApi } from "@/lib/api";
import { Search, Copy, Check, ClipboardCopy } from "lucide-react";
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
}: {
  videoUrl: string;
  currentTime: number;
  onSeek?: (time: number) => void;
}) {
  const [transcriptVtt, setTranscriptVtt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

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
      .then(async (blob) => setTranscriptVtt(await blob.text()))
      .catch(() => setTranscriptVtt(""))
      .finally(() => setLoading(false));
  }, [videoUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayItems.map(item => item.text).join('\n\n'));
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

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Tab Header — YouMind style */}
      <div className="flex items-center justify-between px-4 border-b border-slate-100 shrink-0 bg-white">
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
        <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 border-b border-slate-100 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-9 pr-16 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          {searchQuery && (
            <>
              <span className="absolute right-7 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{displayItems.length}</span>
              <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-sm">×</button>
            </>
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
              return (
                <div
                  key={i}
                  ref={isActive ? activeItemRef : undefined}
                  className={`group relative flex gap-3 px-4 py-2.5 transition-all cursor-default ${
                    isActive
                      ? "bg-violet-50 border-l-2 border-violet-500"
                      : `border-l-2 border-transparent ${activeIndex >= 0 ? "opacity-55 hover:opacity-100" : "hover:bg-slate-50"}`
                  }`}
                >
                  {/* Timestamp */}
                  <span
                    onClick={() => onSeek?.(item.startTime)}
                    className={`shrink-0 text-[11px] font-mono mt-0.5 cursor-pointer transition-colors ${
                      isActive ? "text-violet-500 font-semibold" : "text-slate-400 hover:text-violet-500"
                    }`}
                  >
                    {formatTime(item.startTime)}
                  </span>

                  {/* Text */}
                  <p className={`text-sm leading-6 flex-1 ${isActive ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                    {highlightText(item.text, searchQuery).map((seg, j) =>
                      seg.isMatch
                        ? <mark key={j} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{seg.part}</mark>
                        : seg.part
                    )}
                  </p>

                  {/* Hover copy */}
                  <button
                    onClick={() => navigator.clipboard.writeText(`[${formatTime(item.startTime)}] ${item.text}`)}
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
