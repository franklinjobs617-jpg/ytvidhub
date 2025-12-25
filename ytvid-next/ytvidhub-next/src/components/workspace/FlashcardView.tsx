"use client";

import { useState } from "react";
import { Download, PlayCircle, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export function FlashcardView({ cards, isLoading, onSeek }: any) {
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  const copyCard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopyIndex(index);
    setTimeout(() => setCopyIndex(null), 2000);
  };

  const exportToAnki = () => {
    const csv = "Question;Answer\n" + cards.map((c: any) => `"${c.question}";"${c.answer}"`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "video_cards.csv";
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-slate-800">Quiz Cards</h2>
        {cards.length > 0 && (
          <button onClick={exportToAnki} className="text-[10px] font-bold px-3 py-1.5 bg-slate-900 text-white rounded-lg flex items-center gap-1.5">
            <Download size={12} /> Export CSV
          </button>
        )}
      </div>

      <div className="space-y-4">
        {cards.map((c: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-2xl p-5 group relative shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">CARD {i+1}</span>
              <div className="flex gap-2">
                <button onClick={() => copyCard(`${c.question}\n\n${c.answer}`, i)} className="text-slate-300 hover:text-slate-600">
                  {copyIndex === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                {c.time && <button onClick={() => onSeek(c.time)} className="text-slate-300 hover:text-violet-600 flex items-center gap-1 text-[10px] font-bold"><PlayCircle size={14} /> {c.time}</button>}
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 leading-tight">{c.question}</h3>
            <div className="text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{c.answer}</ReactMarkdown>
            </div>
          </motion.div>
        ))}
        {isLoading && <div className="p-10 text-center text-slate-300 font-bold text-[10px] uppercase animate-pulse">Generating cards...</div>}
      </div>
    </div>
  );
}