"use client";

import { Heart, MessageSquare, TrendingUp, Clock } from "lucide-react";
import type { Stats } from "@/lib/commentsApi";

type Props = {
  stats: Stats | null;
  loading: boolean;
};

export default function StatsCards({ stats, loading }: Props) {
  const fmt = (n: number | undefined, fractionDigits?: number) =>
    n === undefined
      ? "-"
      : n.toLocaleString(
          undefined,
          fractionDigits !== undefined
            ? { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }
            : undefined
        );

  const cards = [
    {
      key: "comments",
      label: "Top-level comments",
      value: fmt(stats?.topLevelComments),
      icon: MessageSquare,
    },
    {
      key: "likes",
      label: "Total likes",
      value: fmt(stats?.totalLikes),
      icon: Heart,
    },
    {
      key: "avgPerDay",
      label: "Avg comments per day",
      value: fmt(stats?.avgPerDay, 2),
      icon: Clock,
    },
    {
      key: "avgLikes",
      label: "Avg likes per comment",
      value: fmt(stats?.avgLikes, 2),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ key, label, value, icon: Icon }) => (
        <div key={key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Icon className="h-3.5 w-3.5" />
            {label}
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">
            {loading ? <span className="text-slate-300">…</span> : value}
          </div>
        </div>
      ))}
    </div>
  );
}
