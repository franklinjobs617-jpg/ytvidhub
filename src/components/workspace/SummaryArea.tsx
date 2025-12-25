"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Copy, Check } from "lucide-react";
import { FlashcardView } from "./FlashcardView";

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  mobileSubTab,
}: any) {
  const [activeTab, setActiveTab] = useState("analysis");
  const scrollRef = useRef<HTMLDivElement>(null);
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
    const analysis = parts[0] || "";
    const rawCards = parts[1] || "";

    const cards: any[] = [];
    if (rawCards) {
      const blocks = rawCards.split("---").filter((b: any) => b.includes("Q:"));
      blocks.forEach((block: any) => {
        const q = block.match(/Q:\s?([\s\S]*?)(?=A:|$)/)?.[1]?.trim();
        const a = block.match(/A:\s?([\s\S]*?)(?=T:|$)/)?.[1]?.trim();
        const t = block.match(/T:\s?\[?(\d{1,3}:\d{2})\]?/)?.[1]?.trim();
        if (q) cards.push({ question: q, answer: a || "Thinking...", time: t });
      });
    }
    return { meta: metaData, analysisContent: analysis, flashcards: cards };
  }, [data]);

  const components = {
    p: ({ children }: any) => (
      <p className="leading-7 text-slate-600 mb-4">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg font-bold mt-8 mb-4 text-slate-800 border-l-4 border-violet-500 pl-3">
        {children}
      </h2>
    ),
    li: ({ children }: any) => (
      <li className="mb-2 text-slate-600 list-disc ml-4">{children}</li>
    ),
  };

  return (
    <div className="h-full flex flex-col bg-[#fcfcfd]">
      <header className="flex h-12 px-6 border-b border-slate-100 bg-white items-center justify-between shrink-0">
        <div className="flex gap-6 h-full">
          {[
            { id: "analysis", label: "Analysis", icon: Sparkles },
            { id: "flashcards", label: "Cards", icon: Brain },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                activeTab === t.id ? "text-violet-600" : "text-slate-400"
              }`}
            >
              <t.icon size={14} /> {t.label}
              {activeTab === t.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600"
                />
              )}
            </button>
          ))}
        </div>
        {activeTab === "analysis" && data && (
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} className="text-slate-400" />
            )}
          </button>
        )}
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10">
        <AnimatePresence mode="wait">
          {!data && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <Sparkles size={40} className="text-violet-200 mb-6" />
              <h2 className="text-xl font-bold mb-4 text-slate-800">
                No Analysis Found
              </h2>
              <button
                onClick={onStartAnalysis}
                className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-100"
              >
                Analyze Now
              </button>
            </div>
          ) : activeTab === "analysis" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              {meta.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {meta.tags
                    .replace(/[\[\]]/g, "")
                    .split(",")
                    .map((t: any, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white border border-slate-100 text-slate-400 text-[10px] font-bold rounded-md"
                      >
                        #{t.trim()}
                      </span>
                    ))}
                </div>
              )}
              <article className="prose prose-slate max-w-none prose-sm">
                <ReactMarkdown
                  components={components as any}
                  remarkPlugins={[remarkGfm]}
                >
                  {analysisContent}
                </ReactMarkdown>
              </article>
              {isLoading && (
                <div className="mt-8 flex items-center gap-2 text-violet-500 font-bold animate-pulse text-[10px] uppercase tracking-widest">
                  <span className="w-1.5 h-4 bg-violet-500 rounded-full" /> AI
                  is thinking...
                </div>
              )}
            </motion.div>
          ) : (
            <FlashcardView
              cards={flashcards}
              isLoading={isLoading}
              onSeek={onSeek}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
