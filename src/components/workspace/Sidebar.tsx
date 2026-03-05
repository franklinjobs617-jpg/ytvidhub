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
    <div className="w-64 bg-white border-r border-slate-200/40 flex flex-col">
      {/* 视频列表 */}
      <div className="flex-1 overflow-y-auto">
        {videos.map((v: any) => {
          const isActive = activeId === v.id;

          return (
            <div
              key={v.id}
              onClick={() => !isLoading && onSelect(v)}
              className={`
                relative group flex items-center gap-3 p-3 transition-colors border-b border-slate-50
                ${isActive ? "bg-blue-50" : "hover:bg-slate-50"}
                ${isLoading && !isActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {/* 激活指示器 */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                />
              )}

              {/* 缩略图 */}
              <img
                src={v.thumbnail}
                alt=""
                className="w-20 h-11 object-cover rounded flex-shrink-0 bg-slate-100"
              />

              {/* 标题 */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs leading-tight line-clamp-2 ${
                  isActive ? "font-semibold text-slate-900" : "font-medium text-slate-600"
                }`}>
                  {v.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
