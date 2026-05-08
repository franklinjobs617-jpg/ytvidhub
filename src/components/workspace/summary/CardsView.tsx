"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Clock,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { StudyCard, getTypeInfo } from "./SummaryArea.utils";
import { LoadingState } from "./SummaryStates";

// 卡片视图组件 - NotebookLM风格重设计
export function CardsView({
  cards,
  isLoading,
  isCardsLoading,
  cardsStatus,
  onSeek,
  videoUrl,
  onGenerateCards,
}: any) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [studyMode, setStudyMode] = useState<"browse" | "study">("browse");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { success, error: showError, info: showInfo } = useToast();

  const [masteredCards, setMasteredCards] = useState<Set<number>>(() => {
    if (typeof window === "undefined" || !videoUrl) return new Set();
    try {
      const saved = localStorage.getItem(`study-progress-${videoUrl}`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleMastered = (index: number) => {
    setMasteredCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      if (videoUrl) {
        try {
          localStorage.setItem(
            `study-progress-${videoUrl}`,
            JSON.stringify([...next]),
          );
        } catch {}
      }
      return next;
    });
  };

  if (isCardsLoading && cards.length === 0) {
    return (
      <LoadingState
        title="Generating Study Cards"
        subtitle={cardsStatus || "Creating contextual flashcards"}
      />
    );
  }

  if (cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden">
        <div className="w-full max-w-[420px] flex flex-col items-center relative z-10">
          {/* 实用图标容器 - 与 Summary 保持一致 */}
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
            <BookOpen size={22} className="text-slate-600" />
          </div>

          {/* 标题与描述 */}
          <h2 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">
            Study Cards Ready to Generate
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-8 max-w-[320px]">
            Generate AI flashcards to test your knowledge and retain key
            concepts from this video.
          </p>

          {/* CTA 按钮 - 与 Summary 保持一致的蓝色 */}
          <button
            onClick={onGenerateCards}
            disabled={isCardsLoading}
            className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 outline-none rounded-lg text-white text-[13px] font-semibold transition-all shadow-sm w-full max-w-[260px]"
          >
            {isCardsLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} className="opacity-90" />
            )}
            <span>
              {isCardsLoading ? "Generating Cards..." : "Generate Study Cards"}
            </span>
          </button>

          <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
            <Clock size={12} className="text-slate-400" />
            Estimated processing time: ~45 seconds (1 Credit)
          </p>
        </div>
      </div>
    );
  }

  // 按类型分组卡片
  const cardsByType = cards.reduce((acc: any, card: any) => {
    const type = card.type || "general";
    if (!acc[type]) acc[type] = [];
    acc[type].push(card);
    return acc;
  }, {});

  const filteredCards =
    selectedType === "all" ? cards : cardsByType[selectedType] || [];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Study Cards</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isCardsLoading ? (
                <span className="text-blue-600 font-medium animate-pulse">
                  {cardsStatus || `${cards.length} cards generated...`}
                </span>
              ) : (
                <>
                  <span className="text-green-600 font-semibold">
                    {masteredCards.size}
                  </span>
                  mastered &middot; {cards.length - masteredCards.size} remaining
                </>
              )}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setStudyMode("browse")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                studyMode === "browse"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => {
                setStudyMode("study");
                setCurrentCardIndex(0);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                studyMode === "study"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Study
            </button>
          </div>
        </div>

        {/* Mastery progress bar */}
        <div className="flex gap-0.5">
          {cards.map((_: StudyCard, i: number) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${masteredCards.has(i) ? "bg-green-500" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({cards.length})
          </button>
          {Object.entries(cardsByType).map(
            ([type, typeCards]: [string, any]) => {
              const typeInfo = getTypeInfo(type);
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedType === type
                      ? `${typeInfo.bgActive} ${typeInfo.textActive}`
                      : `${typeInfo.bg} ${typeInfo.text}`
                  }`}
                >
                  <span>{typeInfo.icon}</span>
                  {typeInfo.label} ({typeCards.length})
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {studyMode === "browse" ? (
          <BrowseCards
            cards={filteredCards}
            onSeek={onSeek}
            toast={{ success, error: showError, info: showInfo }}
            masteredCards={masteredCards}
            onToggleMastered={toggleMastered}
          />
        ) : (
          <StudyCards
            cards={filteredCards}
            currentIndex={currentCardIndex}
            setCurrentIndex={setCurrentCardIndex}
            onSeek={onSeek}
            masteredCards={masteredCards}
            onToggleMastered={toggleMastered}
          />
        )}
      </div>
    </div>
  );
}

// 浏览模式 - 显示所有卡片
function BrowseCards({
  cards,
  onSeek,
  toast,
  masteredCards,
  onToggleMastered,
}: {
  cards: StudyCard[];
  onSeek: (time: string) => void;
  toast: { success: (msg: string) => void; error: (msg: string) => void; info: (msg: string) => void };
  masteredCards: Set<number>;
  onToggleMastered: (index: number) => void;
}) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6 space-y-3">
        {cards.map((card: StudyCard, index: number) => (
          <EnhancedCardItem
            key={index}
            card={card}
            index={index}
            onSeek={onSeek}
            toast={toast}
            isMastered={masteredCards.has(index)}
            onToggleMastered={() => onToggleMastered(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 学习模式 - 专注单卡片学习，支持3D翻牌 + 掌握标记
function StudyCards({
  cards,
  currentIndex,
  setCurrentIndex,
  onSeek,
  masteredCards,
  onToggleMastered,
}: {
  cards: StudyCard[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onSeek: (time: string) => void;
  masteredCards: Set<number>;
  onToggleMastered: (index: number) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // 切换卡片时重置翻转状态
  const goTo = (index: number) => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(index), 50);
  };

  // 完成屏：所有卡片都过完了
  if (currentIndex >= cards.length) {
    return (
      <CompletionScreen
        cards={cards}
        masteredCards={masteredCards}
        onRestart={() => goTo(0)}
      />
    );
  }

  const currentCard = cards[currentIndex];

  const handleMastered = () => {
    onToggleMastered(currentIndex);
    setTimeout(() => goTo(currentIndex + 1), 350);
  };

  const handleStillLearning = () => {
    setTimeout(() => goTo(currentIndex + 1), 200);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50/20">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">
              {currentIndex + 1} / {cards.length}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {masteredCards.size} mastered
            </span>
          </div>
          <div className="flex gap-0.5">
            {cards.map((_: StudyCard, i: number) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  masteredCards.has(i)
                    ? "bg-green-500"
                    : i < currentIndex
                      ? "bg-slate-300"
                      : i === currentIndex
                        ? "bg-blue-400"
                        : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3D Flip Card */}
        <StudyCardItem
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(true)}
          onMastered={handleMastered}
          onStillLearning={handleStillLearning}
          isMastered={masteredCards.has(currentIndex)}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => goTo(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            Skip
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// 完成屏
function CompletionScreen({
  cards,
  masteredCards,
  onRestart,
}: {
  cards: StudyCard[];
  masteredCards: Set<number>;
  onRestart: () => void;
}) {
  const total = cards.length;
  const mastered = masteredCards.size;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-green-50/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Session Complete
        </h2>
        <p className="text-slate-500 mb-2">
          You mastered
          <span className="font-bold text-green-600">{mastered}</span> of
          <span className="font-bold text-slate-700">{total}</span> cards
        </p>
        <p className="text-4xl font-black text-slate-900 mb-8">{pct}%</p>

        <div className="flex gap-0.5 mb-8">
          {cards.map((_: StudyCard, i: number) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${masteredCards.has(i) ? "bg-green-500" : "bg-slate-200"}`}
            />
          ))}
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
        >
          Study Again
        </button>
      </motion.div>
    </div>
  );
}

// 增强版卡片组件 - 浏览模式
function EnhancedCardItem({
  card,
  index,
  onSeek,
  toast,
  isMastered,
  onToggleMastered,
}: {
  card: StudyCard;
  index: number;
  onSeek: (time: string) => void;
  toast: { success: (msg: string) => void; error: (msg: string) => void; info: (msg: string) => void };
  isMastered: boolean;
  onToggleMastered: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = getTypeInfo(card.type);
  const questionPreview =
    card.question.length > 80
      ? card.question.slice(0, 80) + "…"
      : card.question;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden ${isMastered ? "border-green-200" : "border-slate-200"}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${typeInfo.bg}`}
            >
              {typeInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${typeInfo.bg} ${typeInfo.text}`}
                >
                  {typeInfo.label}
                </span>
                {isMastered && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-600 border border-green-200">
                    <Check size={10} />
                    Mastered
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {questionPreview}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {card.time && (
              <button
                onClick={() => onSeek(card.time!)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg text-xs font-medium transition-all"
              >
                {card.time}
              </button>
            )}
            <button
              onClick={onToggleMastered}
              className={`p-1.5 rounded-lg transition-all ${isMastered ? "text-green-600 bg-green-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
              title={isMastered ? "Mark as not mastered" : "Mark as mastered"}
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            >
              <ChevronRight
                size={15}
                className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-5 pt-4 bg-slate-50/60">
              <div className="mb-4">
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                  Answer
                </span>
                <p className="mt-2 text-slate-700 leading-relaxed text-sm">
                  {card.answer}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Q: ${card.question}\n\nA: ${card.answer}`,
                  );
                  toast.success("Card copied to clipboard");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-all"
              >
                <Copy size={12} />
                Copy Card
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 学习模式专用卡片组件 - CSS 3D 翻牌
function StudyCardItem({
  card,
  isFlipped,
  onFlip,
  onMastered,
  onStillLearning,
  isMastered,
}: {
  card: StudyCard;
  isFlipped: boolean;
  onFlip: () => void;
  onMastered: () => void;
  onStillLearning: () => void;
  isMastered: boolean;
}) {
  const typeInfo = getTypeInfo(card.type);

  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          minHeight: "300px",
        }}
        className="w-full"
      >
        {/* Front - Question */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer group"
          onClick={onFlip}
        >
          {isMastered && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
              <Check size={12} className="text-green-600" />
              <span className="text-xs font-semibold text-green-600">
                Mastered
              </span>
            </div>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${typeInfo.bg} mb-6`}
          >
            <span className={`text-sm font-bold ${typeInfo.text}`}>
              {typeInfo.icon}
            </span>
            <span className={`text-xs font-semibold ${typeInfo.text}`}>
              {typeInfo.label}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Question
          </p>
          <h2 className="text-xl font-semibold text-slate-900 text-center leading-relaxed max-w-lg">
            {card.question}
          </h2>
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-600 transition-colors">
            <div className="w-4 h-4 border border-current rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full" />
            </div>
            Tap to reveal answer
          </div>
        </div>

        {/* Back - Answer */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 bg-white rounded-2xl border border-green-200 shadow-lg p-8 flex flex-col"
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-5">
              Answer
            </p>
            <p className="text-lg text-slate-700 leading-relaxed text-center max-w-lg">
              {card.answer}
            </p>
          </div>
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={onStillLearning}
              className="flex-1 py-3 border-2 border-orange-200 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all text-sm"
            >
              Still Learning
            </button>
            <button
              onClick={onMastered}
              className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all shadow-sm text-sm"
            >
              Got it &#x2713;
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
