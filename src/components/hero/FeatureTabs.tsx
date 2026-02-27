"use client";

import { Download, Sparkles } from "lucide-react";
import { useTranslations } from 'next-intl';

export type FeatureMode = "download" | "summary" | "mindmap" | "translate";

export function FeatureTabs({ currentMode, onChange, summaryIsFree }: { currentMode: FeatureMode; onChange: (mode: FeatureMode) => void; summaryIsFree?: boolean }) {
  const t = useTranslations('features.tabs');

  const tabs = [
    { id: "download", label: t('download.label'), icon: Download, soon: false },
    { id: "summary", label: t('summary.label'), icon: Sparkles, soon: false },
  ];

  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => {
        const isActive = currentMode === tab.id;
        const isSoon = tab.soon;

        return (
          <button
            key={tab.id}
            onClick={() => !isSoon && onChange(tab.id as FeatureMode)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200
              ${isActive
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"}
              ${isSoon ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            <tab.icon size={15} className={isActive ? "text-blue-600" : "text-slate-400"} />
            <span>{tab.label}</span>

            {/* Badge */}
            {tab.id === "summary" && (
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none ${
                summaryIsFree
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              }`}>
                {summaryIsFree ? "FREE" : "PRO"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
