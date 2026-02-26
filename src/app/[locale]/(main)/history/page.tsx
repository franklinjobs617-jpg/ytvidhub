"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subtitleApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import {
  History,
  Sparkles,
  FileText,
  Play,
  Clock,
  Filter,
} from "lucide-react";

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

type FilterType = "all" | "ai_summary" | "subtitle_download";

function formatDuration(seconds?: number) {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-video rounded-xl bg-slate-100 animate-pulse" />
      <div className="space-y-1.5 px-0.5">
        <div className="h-3 bg-slate-100 rounded animate-pulse" />
        <div className="h-2.5 bg-slate-100 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    subtitleApi
      .getHistory(50)
      .then((data) => setHistory(data))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  const filtered =
    filter === "all" ? history : history.filter((h) => h.lastAction === filter);

  const aiCount = history.filter((h) => h.lastAction === "ai_summary").length;
  const subCount = history.filter(
    (h) => h.lastAction === "subtitle_download"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <History size={20} className="text-slate-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Watch History</h1>
            <p className="text-sm text-slate-500">
              {history.length} videos analyzed
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Filter size={13} className="text-slate-400" />
          {(
            [
              { key: "all", label: `All (${history.length})` },
              { key: "ai_summary", label: `AI Summary (${aiCount})` },
              {
                key: "subtitle_download",
                label: `Subtitles (${subCount})`,
              },
            ] as { key: FilterType; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === tab.key
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Clock size={40} className="text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No history yet</p>
            <p className="text-sm text-slate-300 mt-1">
              Videos you analyze will appear here
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Start Analyzing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <button
                key={item.videoId}
                onClick={() => {
                  const params = new URLSearchParams({ urls: item.videoUrl, from: "history" });
                  if (item.lastAction === "ai_summary")
                    params.set("mode", "summary");
                  router.push(`/workspace?${params.toString()}`);
                }}
                className="group text-left focus:outline-none"
              >
                {/* Thumbnail */}
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

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                      <Play size={9} className="text-slate-700 fill-slate-700" />
                      <span className="text-[10px] font-bold text-slate-700">
                        Open
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  {item.duration && (
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded-md">
                      {formatDuration(item.duration)}
                    </span>
                  )}

                  {/* Action badge */}
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

                {/* Title + meta */}
                <div className="mt-2 px-0.5">
                  <p className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-900 line-clamp-2 leading-tight transition-colors duration-150">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-[10px] text-slate-400">
                      {timeAgo(item.updatedAt)}
                    </p>
                    {item.accessCount > 1 && (
                      <>
                        <span className="text-slate-200">·</span>
                        <p className="text-[10px] text-slate-400">
                          {item.accessCount}x
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
