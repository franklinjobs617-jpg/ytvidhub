"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  Copy,
  Check,
  Share2,
  Download,
  Terminal,
} from "lucide-react";
import { FlashcardView } from "./FlashcardView"; // 见下方代码

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  mobileSubTab,
}: any) {
  const [activeTab, setActiveTab] = useState("analysis");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mobileSubTab)
      setActiveTab(mobileSubTab === "quiz" ? "flashcards" : "analysis");
  }, [mobileSubTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 解析数据逻辑
  const { meta, analysisContent, flashcards } = useMemo(() => {
    if (!data) return { meta: {}, analysisContent: "", flashcards: [] };
    let currentData = data;
    const metaData: Record<string, string> = {};

    const metaMatch = currentData.match(/^---([\s\S]*?)---/);
    if (metaMatch) {
      currentData = currentData.replace(metaMatch[0], "").trim();
      metaMatch[1]
        .trim()
        .split("\n")
        .forEach((row: any) => {
          const [k, ...v] = row.split(":");
          if (k && v.length) metaData[k.trim()] = v.join(":").trim();
        });
    }

    const parts = currentData.split("---START_CARDS---");
    return {
      meta: metaData,
      analysisContent: parts[0] || "",
      flashcards: parseCards(parts[1] || ""),
    };
  }, [data]);

  function parseCards(raw: string) {
    const cards: any[] = [];
    const blocks = raw.split("---").filter((b: any) => b.includes("Q:"));
    blocks.forEach((block: any) => {
      const q = block.match(/Q:\s?([\s\S]*?)(?=A:|$)/)?.[1]?.trim();
      const a = block.match(/A:\s?([\s\S]*?)(?=T:|$)/)?.[1]?.trim();
      const t = block.match(/T:\s?\[?(\d{1,3}:\d{2})\]?/)?.[1]?.trim();
      if (q) cards.push({ question: q, answer: a || "Thinking...", time: t });
    });
    return cards;
  }

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      <header className="flex h-14 px-6 border-b border-slate-100 bg-white/80 backdrop-blur-md items-center justify-between shrink-0 sticky top-0 z-30">
        <div className="flex gap-8 h-full">
          {[
            { id: "analysis", label: "Insights", icon: Sparkles },
            { id: "flashcards", label: "Cards", icon: Brain },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative h-full flex items-center gap-2 text-xs font-bold tracking-tight transition-all ${
                activeTab === t.id
                  ? "text-violet-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <t.icon size={16} strokeWidth={activeTab === t.id ? 2.5 : 2} />
              {t.label}
              {activeTab === t.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600"
                />
              )}
            </button>
          ))}
        </div>

        {data && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-all active:scale-95"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {!data && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mb-6 animate-bounce">
                <Sparkles size={32} className="text-violet-500" />
              </div>
              <h2 className="text-xl font-black text-slate-800 mb-2">
                Ready to Decode?
              </h2>
              <p className="text-slate-500 text-sm max-w-[240px] mb-8">
                Click analyze to transform this video into structured knowledge
                cards.
              </p>
              <button
                onClick={onStartAnalysis}
                className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-violet-600 transition-all shadow-xl shadow-slate-200"
              >
                Analyze Now{" "}
                <Terminal
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          ) : activeTab === "analysis" ? (
            <div className="p-6 md:p-10 max-w-2xl mx-auto w-full">
              <AnalysisBody
                isLoading={isLoading}
                content={analysisContent}
                tags={meta.tags}
              />
            </div>
          ) : (
            <div className="py-6 md:py-10 w-full">
              {" "}
              <FlashcardView
                cards={flashcards}
                isLoading={isLoading}
                onSeek={onSeek}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 独立的总结内容渲染组件，包含 Skeleton
function AnalysisBody({ isLoading, content, tags }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 md:p-10"
    >
      {tags && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags
            .replace(/[\[\]]/g, "")
            .split(",")
            .map((t: any, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-violet-50 text-violet-600 text-[10px] font-black rounded-full uppercase"
              >
                #{t.trim()}
              </span>
            ))}
        </div>
      )}

      {/* 当正在加载且没数据时，显示占位 */}
      {isLoading && !content ? (
        <div className="space-y-6">
          <div className="h-8 bg-slate-200 rounded-md w-3/4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse" />
          </div>
          <div className="h-40 bg-slate-50 rounded-2xl w-full animate-pulse" />
        </div>
      ) : (
        <article className="prose prose-slate max-w-none prose-sm sm:prose-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          {isLoading && (
            <div className="mt-8 flex items-center gap-3 py-4 border-t border-slate-50 text-violet-500 font-bold italic animate-pulse">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
              </div>
              AI is capturing more insights...
            </div>
          )}
        </article>
      )}
    </motion.div>
  );
}
