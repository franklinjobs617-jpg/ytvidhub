"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Check, Loader2 } from "lucide-react";

// 加载状态组件 - 具体化、工程化风格 (Deterministic & Practical)
export function LoadingState({
  title = "Processing",
  subtitle = "Extracting and structuring",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white">
      <div className="w-full max-w-[340px] flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
              <Loader2 size={18} className="text-blue-600 animate-spin" />
            </div>
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900">
                {title}
              </h2>
              <p className="text-[11px] text-slate-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 shadow-sm">
              <Clock size={12} className="text-slate-400" />
              <span className="text-[11px] font-medium font-mono tabular-nums">
                {elapsed}s / ~45s
              </span>
            </div>
          </div>
        </div>

        {/* Progress tracks (Fake steps to make it feel deterministic) */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <Check size={14} className="text-green-500" /> Initializing Task
              </span>
              <span className="text-slate-400">Done</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-900 flex items-center gap-2">
                <Loader2 size={14} className="text-blue-600 animate-spin" />
                Heavy Processing
              </span>
              <span className="text-blue-600 font-medium">
                {Math.min(99, Math.floor((elapsed / 45) * 100))}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: "5%" }}
                animate={{ width: "95%" }}
                transition={{ duration: 45, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 opacity-40">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" />
                Finalizing Result
              </span>
              <span className="text-slate-400">Waiting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 空状态组件 - 实用工具风格 (Practical Tool Style)
export function EmptyState({ onStartAnalysis }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white relative overflow-hidden text-center">
      <div className="w-full max-w-[420px] flex flex-col items-center relative z-10">
        {/* 实用图标容器 */}
        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
          <FileText size={22} className="text-slate-600" />
        </div>

        {/* 标题与描述 */}
        <h2 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">
          Study Notes Ready to Generate
        </h2>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-8 max-w-[320px]">
          Convert this video into structured notes and interactive flashcards to
          accelerate your learning.
        </p>

        {/* CTA 按钮: 更明确的动作与时间 */}
        <button
          onClick={onStartAnalysis}
          className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 outline-none rounded-lg text-white text-[13px] font-semibold transition-all shadow-sm w-full max-w-[260px]"
        >
          <FileText size={16} className="opacity-90" />
          <span>Generate Notes</span>
        </button>

        <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
          <Clock size={12} className="text-slate-400" />
          Estimated processing time: ~45 seconds
        </p>
      </div>
    </div>
  );
}
