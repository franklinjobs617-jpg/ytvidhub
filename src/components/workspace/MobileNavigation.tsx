"use client";

import { Video, Sparkles, Loader2 } from "lucide-react";

interface MobileNavigationProps {
  activeTab: "video" | "analysis";
  onTabChange: (tab: "video" | "analysis") => void;
  hasAnalysis: boolean;
  isAnalyzing: boolean;
}

const TABS = [
  { id: "video" as const, label: "Video", icon: Video },
  { id: "analysis" as const, label: "AI Summary", icon: Sparkles },
];

export function MobileNavigation({
  activeTab,
  onTabChange,
  hasAnalysis,
  isAnalyzing
}: MobileNavigationProps) {
  return (
    <nav
      className="md:hidden fixed left-0 right-0 z-[70] px-4 pointer-events-none"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)" }}
    >
      <div
        className="pointer-events-auto mx-auto grid max-w-[360px] grid-cols-2 gap-1 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-[0_10px_36px_-20px_rgba(15,23,42,0.5)] backdrop-blur"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const showPulse = tab.id === "analysis" && isAnalyzing;
          const analysisReady = tab.id === "analysis" && hasAnalysis;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 transition-all
                ${isActive
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:bg-slate-50"}
              `}
            >
              {showPulse ? (
                <Loader2 size={16} className={`animate-spin ${isActive ? "text-white" : "text-violet-600"}`} />
              ) : (
                <tab.icon size={16} className={isActive ? "text-white" : "text-slate-500"} />
              )}
              <span className={`text-xs font-semibold tracking-tight ${isActive ? "text-white" : "text-slate-700"}`}>
                {tab.label}
              </span>
              {!isActive && analysisReady && tab.id === "analysis" && (
                <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                  Ready
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
