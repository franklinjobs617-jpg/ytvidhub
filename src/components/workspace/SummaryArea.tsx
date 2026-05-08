"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  BookOpen,
  FileText,
} from "lucide-react";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
import { extractVideoId } from "@/lib/youtube";
import { subtitleApi } from "@/lib/api";
import { StudyCard, cardsCache, extractCards } from "./summary/SummaryArea.utils";
import { LoadingState, EmptyState } from "./summary/SummaryStates";
import { SummaryContent } from "./summary/SummaryContent";
import { CardsView } from "./summary/CardsView";
import { ExportDropdown } from "./summary/ExportDropdown";
import { ReAnalyzeButton } from "./summary/ReAnalyzeButton";

interface SummaryAreaProps {
  data: string;
  isLoading: boolean;
  onSeek: (time: string) => void;
  onStartAnalysis: () => void;
  onRegenerate: () => void;
  mobileSubTab?: string;
  videoUrl?: string;
}

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  onRegenerate,
  mobileSubTab: _mobileSubTab,
  videoUrl,
}: SummaryAreaProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"summary" | "cards">("summary");
  const [cardsData, setCardsData] = useState<StudyCard[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [cardsStatus, setCardsStatus] = useState("");
  const {
    toasts,
    removeToast,
    success,
    error: showError,
    info: showInfo,
  } = useToast();

  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    required: 1,
    current: 0,
    feature: "this feature",
  });

  // 视频切换时检查缓存和数据库历史
  useEffect(() => {
    if (!videoUrl) return;

    // 1. 先查内存缓存
    const cached = cardsCache.get(videoUrl);
    if (cached && cached.length > 0) {
      setCardsData(cached);
      return;
    }

    // 2. 再查数据库历史
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      subtitleApi
        .getHistoryContent(videoId)
        .then((content) => {
          if (content.studyCards) {
            try {
              const parsed = JSON.parse(content.studyCards);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setCardsData(parsed);
                cardsCache.set(videoUrl, parsed);
              }
            } catch (e) {
              console.error("Failed to parse study cards from history:", e);
            }
          }
        })
        .catch(() => {});
    }
  }, [videoUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data || "");
    setCopied(true);
    success("Analysis copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCards = async () => {
    if (!videoUrl || isCardsLoading) return;

    // 再次确认缓存
    const cached = cardsCache.get(videoUrl);
    if (cached && cached.length > 0) {
      setCardsData(cached);
      setViewMode("cards");
      return;
    }

    setIsCardsLoading(true);
    setCardsData([]);
    setCardsStatus("");

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      if (!token) {
        showError(
          "Authentication Required",
          "Authentication is required to perform this action.",
        );
        return;
      }

      const res = await fetch("/api/study-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: videoUrl, transcript: data }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        if (res.status === 402) {
          const currentCredits =
            typeof window !== "undefined"
              ? parseInt(localStorage.getItem("user_credits") || "0")
              : 0;
          setModalConfig({
            required: 1,
            current: currentCredits,
            feature: "Study Cards",
          });
          setIsCreditsModalOpen(true);
        } else {
          showError(
            "Generation Failed",
            json.error || "An error occurred. Please try again later.",
          );
        }
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let buffer = "";
      let allParsedCards: StudyCard[] = [];
      setViewMode("cards");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes("__STATUS__:")) {
          const parts = chunk.split("__STATUS__:");
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue;
            if (i > 0) {
              const lineEnd = part.indexOf("\n");
              if (lineEnd !== -1) {
                setCardsStatus(part.substring(0, lineEnd).trim());
                buffer += part.substring(lineEnd + 1);
              }
            } else {
              buffer += part;
            }
          }
        } else if (chunk.includes("__ERROR__:")) {
          showError(
            chunk.split("__ERROR__:")[1] || "Failed to generate study cards",
          );
          return;
        } else {
          buffer += chunk;
        }

        const result = extractCards(buffer);
        if (result.cards.length > 0) {
          allParsedCards = [...allParsedCards, ...result.cards];
          setCardsData([...allParsedCards]);
          buffer = result.remaining;
        }
      }

      const final = extractCards(buffer, true);
      if (final.cards.length > 0) {
        allParsedCards = [...allParsedCards, ...final.cards];
        setCardsData(allParsedCards);
      }

      if (allParsedCards.length > 0) {
        cardsCache.set(videoUrl, allParsedCards);

        // 【关键】保存到历史记录
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
          const title = document.title.split(" - ")[0] || "Unknown Video";

          subtitleApi
            .upsertHistory({
              videoId,
              videoUrl,
              title,
              lastAction: "ai_summary",
              studyCards: JSON.stringify(allParsedCards),
            })
            .catch(() => {});
        }
      }

      setCardsStatus("");
    } catch (err: any) {
      showError(
        "Generation Failed",
        "An error occurred. Please try again later.",
      );
    } finally {
      setIsCardsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="flex h-[52px] border-b border-slate-100 bg-white items-center justify-between shrink-0 sticky top-0 z-30 px-2 lg:px-4">
        <div className="flex items-center h-full">
          <button
            onClick={() => setViewMode("summary")}
            className={`
              relative flex items-center h-full px-4 lg:px-6 text-[13px] lg:text-sm font-semibold transition-all duration-300
              ${viewMode === "summary" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            {viewMode === "summary" && (
              <motion.div
                layoutId="summaryActiveTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-1px_10px_rgba(37,99,235,0.3)]"
              />
            )}
            <FileText
              size={16}
              className={`mr-2.5 transition-transform duration-300 ${viewMode === "summary" ? "scale-110 text-blue-600" : "text-slate-400"}`}
            />
            Summary
          </button>

          {/* Study (Cards) Tab */}
          <button
            onClick={() => setViewMode("cards")}
            disabled={!videoUrl}
            className={`
              relative flex items-center h-full px-4 lg:px-6 text-[13px] lg:text-sm font-semibold transition-all duration-300
              ${
                !videoUrl
                  ? "text-slate-200 cursor-not-allowed opacity-50"
                  : viewMode === "cards"
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
              }
            `}
          >
            {viewMode === "cards" && (
              <motion.div
                layoutId="summaryActiveTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-1px_10px_rgba(37,99,235,0.3)]"
              />
            )}
            <BookOpen
              size={16}
              className={`mr-2.5 transition-transform duration-300 ${viewMode === "cards" ? "scale-110 text-blue-600" : "text-slate-400"}`}
            />
            Study
            {cardsData.length > 0 && (
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm ${
                  viewMode === "cards"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {cardsData.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {data && !isLoading && (
            <ReAnalyzeButton
              onRegenerate={onRegenerate}
              toast={{ success, error: showError, info: showInfo }}
            />
          )}

          {data && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
              >
                {copied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>

              <ExportDropdown
                data={data}
                toast={{ success, error: showError, info: showInfo }}
              />
            </>
          )}
        </div>
      </header>

      {/* Content Area - Keep mounted to avoid remount/reload on tab switch */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            viewMode === "summary"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {!data && !isLoading ? (
            <EmptyState onStartAnalysis={onStartAnalysis} />
          ) : isLoading && !data ? (
            <LoadingState
              title="Generating Summary"
              subtitle="Synthesizing video content"
            />
          ) : (
            <SummaryContent
              data={data}
              isLoading={isLoading}
              onGenerateCards={generateCards}
              isCardsLoading={isCardsLoading}
              hasCards={cardsData.length > 0}
              onViewCards={() => setViewMode("cards")}
            />
          )}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            viewMode === "cards"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <CardsView
            cards={cardsData}
            isLoading={isLoading}
            isCardsLoading={isCardsLoading}
            cardsStatus={cardsStatus}
            onSeek={onSeek}
            videoUrl={videoUrl}
            onGenerateCards={generateCards}
          />
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <InsufficientCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        requiredAmount={modalConfig.required}
        featureName={modalConfig.feature}
        currentAmount={modalConfig.current}
      />
    </div>
  );
}
