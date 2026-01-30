"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Play, Check, RotateCcw, ArrowLeft, ArrowRight,
  Shuffle, BookOpen, Target, Zap, Copy, Download
} from "lucide-react";
import * as htmlToImage from "html-to-image";

export function FlashcardView({ cards, isLoading, onSeek }: any) {
  const [studyMode, setStudyMode] = useState<'browse' | 'study'>('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [showSummary, setShowSummary] = useState(false);

  if (isLoading && cards.length === 0) {
    return (
      <div className="h-full bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
          <Brain size={32} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 mb-2">
          No Content Available
        </h3>
        <p className="text-slate-500 text-sm max-w-sm">
          This feature is no longer available. 
          Try the Overview tab for detailed analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {/* Header with controls */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Brain size={20} className="text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">AI Analysis</h2>
                <p className="text-sm text-slate-500">
                  {cards.length} sections analyzed
                </p>
              </div>
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                showSummary 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BookOpen size={16} />
              {showSummary ? 'Hide Summary' : 'Show Summary'}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Study Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setStudyMode('browse')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  studyMode === 'browse' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => setStudyMode('study')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  studyMode === 'study' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Study Mode
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(studiedCards.size / cards.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {Math.round((studiedCards.size / cards.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {showSummary ? (
          <SummaryView cards={cards} onSeek={onSeek} />
        ) : (
          <>
            {studyMode === 'browse' ? (
              <BrowseMode 
                cards={cards} 
                studiedCards={studiedCards}
                setStudiedCards={setStudiedCards}
                onSeek={onSeek} 
              />
            ) : (
              <StudyMode 
                cards={cards}
                currentIndex={currentCardIndex}
                setCurrentIndex={setCurrentCardIndex}
                studiedCards={studiedCards}
                setStudiedCards={setStudiedCards}
                onSeek={onSeek}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Browse Mode - 显示所有卡片的网格视图
function BrowseMode({ cards, studiedCards, setStudiedCards, onSeek }: any) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card: any, index: number) => (
          <BrowseCard 
            key={index}
            card={card}
            index={index}
            isStudied={studiedCards.has(index)}
            onToggleStudied={() => {
              const newStudied = new Set(studiedCards);
              if (newStudied.has(index)) {
                newStudied.delete(index);
              } else {
                newStudied.add(index);
              }
              setStudiedCards(newStudied);
            }}
            onSeek={onSeek}
          />
        ))}
      </div>
    </div>
  );
}

// Study Mode - 单卡片学习模式
function StudyMode({ cards, currentIndex, setCurrentIndex, studiedCards, setStudiedCards, onSeek }: any) {
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[currentIndex];
  
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const markAsStudied = () => {
    const newStudied = new Set(studiedCards);
    newStudied.add(currentIndex);
    setStudiedCards(newStudied);
    nextCard();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-600">
              {currentIndex + 1} of {cards.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <StudyCard 
          card={currentCard}
          showAnswer={showAnswer}
          onToggleAnswer={() => setShowAnswer(!showAnswer)}
          onSeek={onSeek}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Show Answer
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowAnswer(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg"
                >
                  Hide Answer
                </button>
                <button
                  onClick={markAsStudied}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Check size={16} />
                  Got it!
                </button>
              </>
            )}
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Browse Card Component
function BrowseCard({ card, index, isStudied, onToggleStudied, onSeek }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${
        isStudied 
          ? 'border-green-200 bg-green-50/30' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Card {index + 1}
          </span>
          <div className="flex items-center gap-2">
            {card.time && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(card.time);
                }}
                className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded text-xs font-medium"
              >
                <Play size={10} />
                {card.time}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStudied();
              }}
              className={`p-1.5 rounded-lg transition-all ${
                isStudied 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Check size={12} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[120px] flex flex-col justify-center"
            >
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-3">
                {card.question}
              </h3>
              <p className="text-xs text-slate-500">Click to reveal answer</p>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[120px] flex flex-col justify-center"
            >
              <p className="text-sm text-slate-700 line-clamp-4">
                {card.answer}
              </p>
              <p className="text-xs text-slate-500 mt-2">Click to show question</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Study Card Component
function StudyCard({ card, showAnswer, onToggleAnswer, onSeek }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="p-8">
        <AnimatePresence mode="wait">
          {!showAnswer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 leading-relaxed">
                {card.question}
              </h2>
              {card.time && (
                <button
                  onClick={() => onSeek(card.time)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-all"
                >
                  <Play size={14} />
                  Jump to {card.time}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={24} className="text-green-600" />
              </div>
              <div className="prose prose-slate max-w-none text-center">
                <p className="text-slate-700 leading-relaxed">
                  {card.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}