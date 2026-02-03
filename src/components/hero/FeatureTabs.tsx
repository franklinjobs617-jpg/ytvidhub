"use client";

import { Download, Sparkles, Brain, Languages } from "lucide-react";
import { useState } from "react";

export type FeatureMode = "download" | "summary" | "mindmap" | "translate";

export function FeatureTabs({ currentMode, onChange }: any) {
  const [hoveredProTab, setHoveredProTab] = useState<string | null>(null);

  const tabs = [
    { id: "download", label: "Bulk YouTube Subtitle Download", icon: Download, desc: "SRT / VTT / TXT", pro: true,soon:false },
    { id: "summary", label: "AI Summary", icon: Sparkles, desc: "Insights & TL;DR", pro: true },
    // { id: "mindmap", label: "Mind Map", icon: Brain, desc: "Visual Structure", pro: true, soon: true },
    // { id: "translate", label: "Translation", icon: Languages, desc: "Dual Subtitles", pro: true, soon: true },
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
              {/* Enhanced PRO Badge with breathing animation */}
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
                      : `bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm
                         animate-pulse hover:animate-none hover:shadow-lg hover:shadow-amber-200
                         hover:scale-110`
                    }
                  `}
                >
                  {tab.soon ? "SOON" : "PRO"}
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
                  Free trial included - Get 5 credits to start
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
