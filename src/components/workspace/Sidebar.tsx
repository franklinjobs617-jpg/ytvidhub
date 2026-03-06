"use client";

import { motion } from "framer-motion";

interface SidebarProps {
  videos: any[];
  activeId: string;
  onSelect: (video: any) => void;
  isLoading?: boolean;
}

export function Sidebar({ videos, activeId, onSelect, isLoading }: SidebarProps) {
  return (
    <div className="w-[84px] bg-slate-50/30 flex flex-col transition-all shrink-0 z-10 hidden sm:flex">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {videos.map((v: any) => {
          const isActive = activeId === v.id;

          return (
            <div
              key={v.id}
              onClick={() => !isLoading && onSelect(v)}
              className={`
                relative group flex items-center justify-center transition-all
                ${isLoading && !isActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              title={v.title}
            >
              <div className={`
                w-[60px] aspect-video shrink-0 rounded-md overflow-hidden relative transition-all duration-300
                ${isActive ? "ring-2 ring-violet-500 shadow-md ring-offset-2 ring-offset-slate-50" : "ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-sm opacity-60 hover:opacity-100"}
              `}>
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
