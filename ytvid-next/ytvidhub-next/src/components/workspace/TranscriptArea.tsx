"use client";

import { useEffect, useState, useMemo } from "react";
import { subtitleApi } from "@/lib/api";
import { Search, AlignLeft, List, Copy, Check, Clock } from "lucide-react";
import {
  parseVtt,
  groupTranscriptByTime,
  formatTime,
  highlightText,
} from "@/utils/transcriptUtils";

export function TranscriptArea({
  videoUrl,
  currentTime,
}: {
  videoUrl: string;
  currentTime: number;
}) {
  const [transcriptVtt, setTranscriptVtt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // 模式状态：true = 智能聚合(NoteGPT), false = 原始列表
  const [isSmartMode, setIsSmartMode] = useState(true);

  useEffect(() => {
    if (!videoUrl) return;
    setLoading(true);
    // 只下载 VTT 即可，因为它包含所有信息
    subtitleApi
      .downloadSingle({
        url: videoUrl,
        lang: "en",
        format: "vtt",
        title: "transcript",
      })
      .then(async (blob) => setTranscriptVtt(await blob.text()))
      .catch(() => setTranscriptVtt(""))
      .finally(() => setLoading(false));
  }, [videoUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText("Please implement full copy logic");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔥 核心逻辑：根据模式计算显示内容
  const displayItems = useMemo(() => {
    if (!transcriptVtt) return [];

    // 1. 基础解析 (得到带时间戳的每一行)
    const rawItems = parseVtt(transcriptVtt);

    let finalItems;

    // 2. 根据模式决定数据结构
    if (isSmartMode) {
      // 智能模式：聚合
      finalItems = groupTranscriptByTime(rawItems);
    } else {
      // 列表模式：直接使用原始行
      finalItems = rawItems.map((item) => ({
        startTime: item.start,
        text: item.text,
      }));
    }

    // 3. 搜索过滤
    if (searchQuery) {
      return finalItems.filter((i) =>
        i.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return finalItems;
  }, [transcriptVtt, isSmartMode, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100/50">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100 shrink-0 bg-white z-10">
        <div className="flex bg-slate-100 p-0.5 rounded-lg shrink-0 border border-slate-200/50">
          <button
            onClick={() => setIsSmartMode(true)}
            className={`p-1.5 rounded-md transition-all ${
              isSmartMode
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Smart View (Grouped)"
          >
            <AlignLeft size={14} />
          </button>
          <button
            onClick={() => setIsSmartMode(false)}
            className={`p-1.5 rounded-md transition-all ${
              !isSmartMode
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="List View (Raw)"
          >
            <List size={14} />
          </button>
        </div>

        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-transparent rounded-lg text-xs outline-none focus:bg-white focus:border-violet-200 focus:ring-2 focus:ring-violet-50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar scroll-smooth bg-white">
        {loading ? (
          <div className="space-y-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-12 bg-slate-100 rounded" />
                <div className="h-3 bg-slate-50 rounded w-full" />
                <div className="h-3 bg-slate-50 rounded w-[80%]" />
              </div>
            ))}
          </div>
        ) : displayItems.length > 0 ? (
          <div
            className={`
             ${isSmartMode ? "space-y-6" : "space-y-3"} 
          `}
          >
            {displayItems.map((item, i) => (
              <div key={i} className="group relative">
                {isSmartMode ? (
                  <div className="mb-1.5">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-100 transition-colors">
                      {formatTime(item.startTime)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="shrink-0 text-[10px] font-mono text-slate-400 w-10 text-right">
                      {formatTime(item.startTime)}
                    </span>
                  </div>
                )}

                {/* 文本内容 */}
                <div
                  className={`
                    text-slate-700 transition-colors
                    ${
                      isSmartMode
                        ? "text-sm leading-6 text-justify"
                        : "text-sm leading-snug pl-12 -mt-5"
                    }
                `}
                >
                  {isSmartMode ? (
                    <p>{highlightText(item.text, searchQuery)}</p>
                  ) : (
                    <div className="flex gap-3">
                      <p className="text-slate-600 hover:text-slate-900">
                        {highlightText(item.text, searchQuery)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="h-10" />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
            <p className="text-sm">No transcript available</p>
          </div>
        )}
      </div>
    </div>
  );
}
