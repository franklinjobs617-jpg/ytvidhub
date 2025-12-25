"use client";

import { Download, Sparkles, Brain, Languages } from "lucide-react";

export type FeatureMode = "download" | "summary" | "mindmap" | "translate";

export function FeatureTabs({ currentMode, onChange }: any) {
  const tabs = [
    { id: "download", label: "Bulk Download", icon: Download, desc: "SRT / VTT / TXT", pro: true,soon:false },
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
          <button
            key={tab.id}
            onClick={() => !isSoon && onChange(tab.id)}
            className={`
              relative rounded-xl border transition-all duration-200
              px-3 py-3 md:p-5
              ${isActive
                ? "bg-white border-blue-600 shadow-sm md:shadow-lg md:shadow-blue-50"
                : "bg-white border-slate-100 hover:border-slate-200"}
              ${isSoon ? "cursor-not-allowed opacity-70 grayscale-[0.4]" : "cursor-pointer"}
            `}
          >
            {/* Badge */}
            {(tab.pro || tab.soon) && (
              <span
                className={`
                  absolute top-1.5 right-1.5 md:top-2 md:right-2
                  text-[10px] md:text-[12px] font-black px-1.5 py-0.5 rounded-md
                  ${tab.soon ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}
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
        );
      })}
    </div>
  );
}
