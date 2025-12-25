"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function Sidebar({ videos, activeId, onSelect }: any) {
  return (
    <div className="w-[72px] bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 gap-5 overflow-y-auto overflow-x-hidden">
      {videos.map((v: any) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className="relative group"
        >
          {/* 激活状态的左侧指示器 */}
          {activeId === v.id && (
            <motion.div 
              layoutId="activeIndicator"
              className="absolute -left-3 top-2 bottom-2 w-1 bg-violet-600 rounded-r-full"
            />
          )}
          
          <div className={`
            w-12 h-12 rounded-2xl overflow-hidden transition-all duration-300
            ${activeId === v.id ? "rounded-xl shadow-lg shadow-violet-200 scale-105" : "opacity-60 hover:opacity-100 hover:rounded-xl"}
          `}>
            <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
            {activeId === v.id && (
              <div className="absolute inset-0 bg-violet-600/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
            )}
          </div>
          
          {/* 悬浮提示框 */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            {v.title}
          </div>
        </button>
      ))}
    </div>
  );
}