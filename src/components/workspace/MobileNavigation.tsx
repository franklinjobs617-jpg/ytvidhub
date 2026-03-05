"use client";

import { motion } from "framer-motion";
import { Video, Sparkles } from "lucide-react";

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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-[70] safe-area-inset-bottom">
      <div className="grid grid-cols-2 gap-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.id === "analysis" && !hasAnalysis && !isAnalyzing;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onTabChange(tab.id)}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center justify-center gap-1 py-3 transition-colors
                ${isDisabled ? "opacity-40" : ""}
              `}
            >
              <tab.icon
                size={22}
                className={`transition-colors ${
                  isActive ? "text-violet-600" : "text-slate-400"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`
                text-xs font-medium transition-colors
                ${isActive ? "text-violet-600" : "text-slate-500"}
              `}>
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-violet-600"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {tab.id === "analysis" && isAnalyzing && (
                <div className="absolute top-2 right-1/4 w-1.5 h-1.5 bg-violet-600 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
