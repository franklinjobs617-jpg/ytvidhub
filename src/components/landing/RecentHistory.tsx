"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subtitleApi } from "@/lib/api";
import { History, Sparkles, FileText, Play } from "lucide-react";

interface HistoryItem {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  lastAction: string;
  format?: string;
  accessCount: number;
  updatedAt: string;
}

function formatDuration(seconds?: number) {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `${hours}h ago`;
  const mins = Math.floor(diff / 60000);
  return mins > 0 ? `${mins}m ago` : "just now";
}

export function RecentHistory() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subtitleApi.getHistory(6).then((data) => {
      setHistory(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Recently Analyzed</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-44">
              <div className="aspect-video rounded-xl bg-slate-100 animate-pulse" />
              <div className="mt-2 space-y-1.5 px-0.5">
                <div className="h-2.5 bg-slate-100 rounded animate-pulse" />
                <div className="h-2 bg-slate-100 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (history.length === 0) return null;

  return (
    <div className="w-full">
      {/* 分隔线标题 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 bg-slate-100" />
        <div className="flex items-center gap-1.5">
          <History size={11} className="text-slate-300" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            Recently Analyzed
          </span>
        </div>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {/* 横向滚动行 */}
      <div
        className="flex gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {history.map((item) => (
          <button
            key={item.videoId}
            onClick={() => {
              const params = new URLSearchParams({ urls: item.videoUrl });
              if (item.lastAction === "ai_summary") params.set("mode", "summary");
              router.push(`/workspace?${params.toString()}`);
            }}
            className="group flex-shrink-0 w-44 text-left focus:outline-none"
          >
            {/* 缩略图区域 */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/60 group-hover:ring-violet-300 transition-all duration-200">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play size={20} className="text-slate-300" />
                </div>
              )}

              {/* 悬停遮罩 + Open 按钮 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <Play size={9} className="text-slate-700 fill-slate-700" />
                  <span className="text-[10px] font-bold text-slate-700">Open</span>
                </div>
              </div>

              {/* 时长角标 */}
              {item.duration && (
                <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded-md">
                  {formatDuration(item.duration)}
                </span>
              )}

              {/* 操作类型角标 */}
              <div className="absolute top-1.5 left-1.5">
                {item.lastAction === "ai_summary" ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold bg-violet-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full">
                    <Sparkles size={8} />
                    AI
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold bg-blue-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full">
                    <FileText size={8} />
                    {item.format?.toUpperCase() ?? "SUB"}
                  </span>
                )}
              </div>
            </div>

            {/* 标题 + 时间 */}
            <div className="mt-2 px-0.5">
              <p className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800 line-clamp-2 leading-tight transition-colors duration-150">
                {item.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">{timeAgo(item.updatedAt)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
