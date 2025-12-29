"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Download, Quote, Sparkles } from "lucide-react";
import * as htmlToImage from "html-to-image";

export function FlashcardView({ cards, isLoading, onSeek }: any) {
  if (isLoading && cards.length === 0) {
    return (
      <div className="space-y-6 px-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-40 bg-white rounded-3xl border border-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    // 关键修复：px-4 确保移动端左右有空隙，max-w-2xl 确保大屏不会太宽
    <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 pb-20 px-4 sm:px-0">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Knowledge Repository ({cards.length})
        </h3>
      </div>

      {cards.map((card: any, index: number) => (
        <FlomoCard key={index} card={card} index={index} onSeek={onSeek} />
      ))}
    </div>
  );
}

function FlomoCard({ card, index, onSeek }: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        backgroundColor: "#F9FAFB",
        style: { padding: "30px" },
      });
      const link = document.createElement("a");
      link.download = `ytvidhub-card-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Save image failed", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative w-full"
    >
      <div
        ref={cardRef}
        className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 p-5 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 w-full overflow-hidden"
      >
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-8 md:h-8 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-100 shrink-0">
              <Quote size={14} className="text-white fill-current md:size-16" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] md:text-[10px] font-black text-slate-800 uppercase tracking-wider truncate">
                Insight Card
              </p>
              <p className="text-[9px] font-bold text-violet-400 uppercase italic leading-none">
                Card #{index + 1}
              </p>
            </div>
          </div>
          {card.time && (
            <button
              onClick={() => onSeek(card.time)}
              className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-slate-50 hover:bg-violet-600 text-slate-400 hover:text-white rounded-full transition-all shrink-0"
            >
              <Clock size={10} strokeWidth={3} />
              <span className="text-[9px] md:text-[10px] font-black">
                {card.time}
              </span>
            </button>
          )}
        </div>

        <h4 className="text-base md:text-lg font-bold text-slate-800 leading-snug mb-3 md:mb-4">
          {card.question}
        </h4>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-100 rounded-full" />
          <p className="pl-4 md:pl-6 text-slate-600 text-sm leading-relaxed antialiased">
            {card.answer}
          </p>
        </div>

        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={10} className="text-violet-300" />
            <span className="text-[8px] md:text-[9px] font-bold text-slate-300 tracking-tight uppercase">
              YTvidHub.com
            </span>
          </div>
          <div className="text-[8px] md:text-[9px] font-medium text-slate-200 italic hidden xs:block">
            AI-Powered Intelligence
          </div>
        </div>
      </div>

      {/* 桌面端保存按钮，移动端建议常驻一个小的保存图标或长按保存 */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 z-10 hidden md:block">
        <button
          onClick={handleSaveImage}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-violet-600 transition-all"
        >
          <Download size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Save Image
          </span>
        </button>
      </div>

      {/* 移动端快捷保存按钮：常驻在右下角（可选） */}
      <button
        onClick={handleSaveImage}
        className="md:hidden absolute bottom-4 right-4 p-2 bg-slate-50 text-slate-300 rounded-full active:bg-violet-600 active:text-white transition-colors"
      >
        <Download size={14} />
      </button>
    </motion.div>
  );
}
