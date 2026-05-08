"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

// 重新分析按钮组件
export function ReAnalyzeButton({ onRegenerate, toast }: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegenerate = () => {
    setShowConfirm(false);
    toast.info("Starting new analysis...");
    onRegenerate();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
      >
        <Sparkles size={16} />
        Re-analyze
      </button>

      {showConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-50"
            onClick={() => setShowConfirm(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Generate New Analysis?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This will create a fresh AI analysis of the video content.
                  This action will consume credits.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerate}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
