"use client";

import { Download, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export type FeatureMode = "download" | "summary" | "mindmap" | "translate";

export function FeatureTabs({ currentMode, onChange, summaryIsFree }: { currentMode: FeatureMode; onChange: (mode: FeatureMode) => void; summaryIsFree?: boolean }) {
  const [hoveredProTab, setHoveredProTab] = useState<string | null>(null);
  const t = useTranslations('features.tabs');
  const tTooltip = useTranslations('features');

  const tabs = [
    { id: "download", label: t('download.label'), icon: Download, desc: t('download.description'), pro: true,soon:false },
    { id: "summary", label: t('summary.label'), icon: Sparkles, desc: t('summary.description'), pro: true },
    // { id: "mindmap", label: t('mindmap.label'), icon: Brain, desc: t('mindmap.description'), pro: true, soon: true },
    // { id: "translate", label: t('translate.label'), icon: Languages, desc: t('translate.description'), pro: true, soon: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 text-center">
      {tabs.map((tab) => {
        const isActive = currentMode === tab.id;
        const isSoon = tab.soon;

        return (
          <div key={tab.id} className="relative">
            <button
              onClick={() => !isSoon && onChange(tab.id)}
              className={`
                relative rounded-xl border transition-all duration-200 w-full
                px-3 py-3 md:p-5
                ${isActive
                  ? "bg-white border-blue-600 shadow-sm md:shadow-lg md:shadow-blue-50"
                  : "bg-white border-slate-100 hover:border-slate-200"}
                ${isSoon ? "cursor-not-allowed opacity-70 grayscale-[0.4]" : "cursor-pointer"}
              `}
            >
              {/* Badge: FREE (first-time) > SOON > PRO */}
              {(tab.pro || tab.soon) && (
                <span
                  onMouseEnter={() => tab.pro && !tab.soon && setHoveredProTab(tab.id)}
                  onMouseLeave={() => setHoveredProTab(null)}
                  className={`
                    absolute top-1.5 right-1.5 md:top-2 md:right-2
                    text-[10px] md:text-[12px] font-black px-1.5 py-0.5 rounded-md
                    transition-all duration-300 cursor-help
                    ${tab.soon
                      ? "bg-blue-100 text-blue-700"
                      : tab.id === "summary" && summaryIsFree
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-sm animate-pulse hover:animate-none hover:shadow-lg hover:shadow-green-200 hover:scale-110"
                        : `bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm
                           animate-pulse hover:animate-none hover:shadow-lg hover:shadow-amber-200
                           hover:scale-110`
                    }
                  `}
                >
                  {tab.soon ? "SOON" : tab.id === "summary" && summaryIsFree ? "FREE" : "PRO"}
                </span>
              )}

              {/* Content */}
              <div className="flex items-center gap-2 md:block">
                <tab.icon
                  size={18}
                  className={`${isActive ? "text-blue-600" : "text-slate-400"} md:mb-3`}
                />

                <div>
                  <div
                    className={`text-xs md:text-sm font-bold ${
                      isActive ? "text-blue-600" : "text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-400 leading-tight">
                    {tab.desc}
                  </div>
                </div>
              </div>
            </button>

            {/* PRO Tooltip */}
            {hoveredProTab === tab.id && tab.pro && !tab.soon && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  {tTooltip('tooltip')}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
