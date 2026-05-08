"use client";

import { Sparkles, BookOpen } from "lucide-react";
import { StreamingText } from "./StreamingText";

// 摘要内容组件 - P1 优化：使用流式显示
export function SummaryContent({
  data,
  isLoading,
  onGenerateCards,
  isCardsLoading,
  hasCards,
  onViewCards,
}: any) {
  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {/* P1: 使用流式显示组件 */}
          <StreamingText content={data || ""} isLoading={isLoading} />

          {/* Generate Study Cards 按钮 - 仅在摘要完成后显示 */}
          {!isLoading && data && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              {hasCards ? (
                <button
                  onClick={onViewCards}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                  <BookOpen size={16} />
                  View Study Cards
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={onGenerateCards}
                    disabled={isCardsLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    {isCardsLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Cards...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Generate Study Cards
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400">Uses 1 credit</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
