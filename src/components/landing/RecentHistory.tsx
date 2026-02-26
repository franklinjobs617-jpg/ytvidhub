"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subtitleApi } from "@/lib/api";
import { Clock, Sparkles, Download, Play } from "lucide-react";

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
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
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
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Recent</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="text-slate-400" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Recent</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {history.map((item) => (
          <button
            key={item.videoId}
            onClick={() => router.push(`/workspace?urls=${encodeURIComponent(item.videoUrl)}`)}
            className="group text-left bg-white border border-slate-100 hover:border-violet-200 hover:shadow-md rounded-xl overflow-hidden transition-all"
          >
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
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
              {item.duration && (
                <span className="absolute bottom-1 right-1 text-[10px] font-bold bg-black/70 text-white px-1 rounded">
                  {formatDuration(item.duration)}
                </span>
              )}
              <div className="absolute top-1 left-1">
                {item.lastAction === "ai_summary" ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold bg-violet-600 text-white px-1.5 py-0.5 rounded-full">
                    <Sparkles size={8} />
                    AI
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                    <Download size={8} />
                    {item.format?.toUpperCase() ?? "SUB"}
                  </span>
                )}
              </div>
            </div>
            <div className="px-2 py-1.5">
              <p className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-tight">
                {item.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{timeAgo(item.updatedAt)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
