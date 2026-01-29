"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock, Download, Lightbulb, BookOpen, Target,
  ChevronRight, Play, Pause, RotateCcw, Check,
  Brain, Quote, Zap, ArrowRight
} from "lucide-react";
import * as htmlToImage from "html-to-image";

export function FlashcardView({ cards, isLoading, onSeek }: any) {
  if (isLoading && cards.length === 0) {
    return (
      <div className="space-y-6 px-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 bg-white rounded-2xl border border-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!isLoading && cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
          <Brain size={32} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 mb-2">
          No Content Available
        </h3>
        <p className="text-slate-500 text-sm max-w-sm">
          This feature is no longer available. 
          Please use the Overview tab for detailed analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Content Analysis</h2>
            <p className="text-sm text-slate-500">Feature no longer available</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            <Brain size={16} />
            {cards.length} cards
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8">
        {cards.map((card: any, index: number) => (
          <NotebookLMCard key={index} card={card} index={index} onSeek={onSeek} />
        ))}
      </div>
    </div>
  );
}

function NotebookLMCard({ card, index, onSeek }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudied, setIsStudied] = useState(false);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        backgroundColor: "#ffffff",
        style: { padding: "20px" },
      });
      const link = document.createElement("a");
      link.download = `study-card-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Save image failed", err);
    }
  };

  const cardTypes = [
    { type: 'concept', icon: Lightbulb, color: 'blue', label: 'Key Concept' },
    { type: 'definition', icon: BookOpen, color: 'green', label: 'Definition' },
    { type: 'insight', icon: Zap, color: 'purple', label: 'Insight' },
    { type: 'takeaway', icon: Target, color: 'orange', label: 'Key Takeaway' }
  ];

  // 根据内容智能判断卡片类型
  const getCardType = () => {
    const question = card.question?.toLowerCase() || '';
    const answer = card.answer?.toLowerCase() || '';

    if (question.includes('what is') || question.includes('define') || answer.includes('definition')) {
      return cardTypes[1]; // definition
    }
    if (question.includes('why') || question.includes('how') || answer.includes('because')) {
      return cardTypes[2]; // insight
    }
    if (question.includes('key') || question.includes('important') || question.includes('main')) {
      return cardTypes[3]; // takeaway
    }
    return cardTypes[0]; // concept
  };

  const cardType = getCardType();
  const IconComponent = cardType.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div
        ref={cardRef}
        className={`
          relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
          ${isStudied ? 'border-green-200 bg-green-50/30' : 'border-slate-200 hover:border-slate-300'}
          ${isFlipped ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
        `}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between p-4 pb-0">
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              ${cardType.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
              ${cardType.color === 'green' ? 'bg-green-100 text-green-600' : ''}
              ${cardType.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
              ${cardType.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
            `}>
              <IconComponent size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`
                  text-xs font-bold px-2 py-1 rounded-full
                  ${cardType.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                  ${cardType.color === 'green' ? 'bg-green-100 text-green-700' : ''}
                  ${cardType.color === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
                  ${cardType.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                `}>
                  {cardType.label}
                </span>
                {isStudied && (
                  <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <Check size={12} />
                    Studied
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Card {index + 1}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {card.time && (
              <button
                onClick={() => onSeek(card.time)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg transition-all text-xs font-medium"
              >
                <Play size={12} />
                {card.time}
              </button>
            )}

            <button
              onClick={() => setIsStudied(!isStudied)}
              className={`
                p-2 rounded-lg transition-all
                ${isStudied
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                }
              `}
            >
              <Check size={14} />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 pt-4">
          <div className={`transition-all duration-500 ${isFlipped ? 'transform rotate-y-180' : ''}`}>
            {!isFlipped ? (
              // Question Side
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Quote size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Question</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {card.question}
                  </h3>
                </div>

                <button
                  onClick={() => setIsFlipped(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium text-sm group"
                >
                  Show Answer
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              // Answer Side
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Answer</span>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed">
                      {card.answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all font-medium text-sm"
                  >
                    <RotateCcw size={14} />
                    Back to Question
                  </button>

                  <button
                    onClick={() => {
                      setIsStudied(true);
                      setIsFlipped(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium text-sm"
                  >
                    <Check size={14} />
                    Mark as Studied
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
          <div
            className={`h-full transition-all duration-300 ${isStudied ? 'bg-green-500 w-full' : isFlipped ? 'bg-blue-500 w-1/2' : 'bg-slate-300 w-1/4'
              }`}
          />
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 z-10">
        <button
          onClick={handleSaveImage}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-all text-xs font-medium"
        >
          <Download size={12} />
          Save
        </button>
      </div>
    </motion.div>
  );
}
