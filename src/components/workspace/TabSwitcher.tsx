"use client";

import { motion } from "framer-motion";
import { Video, Sparkles } from "lucide-react";

interface TabSwitcherProps {
  activeTab: "video" | "analysis";
  onTabChange: (tab: "video" | "analysis") => void;
  hasAnalysis: boolean;
  isAnalyzing: boolean;
}

export function TabSwitcher({ activeTab, onTabChange, hasAnalysis, isAnalyzing }: TabSwitcherProps) {
  const tabs = [
    { id: "video" as const, label: "Video", icon: Video },
    { id: "analysis" as const, label: "AI Summary", icon: Sparkles },
  ];

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
      <div className="inline-flex items-center bg-slate-100 rounded-full p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.id === "analysis" && !hasAnalysis && !isAnalyzing;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onTabChange(tab.id)}
              disabled={isDisabled}
              className={`
                relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${isActive
                  ? "text-slate-900"
                  : isDisabled
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <tab.icon size={16} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              <span className="relative z-10">{tab.label}</span>

              {tab.id === "analysis" && isAnalyzing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative z-10 w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
