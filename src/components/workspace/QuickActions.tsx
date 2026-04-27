"use client";

import { Download, Copy, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { subtitleApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { savePendingAction } from "@/lib/pendingAction";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
import { CREDIT_COSTS } from "@/config/credits";

interface QuickActionsProps {
  videoUrl: string;
  videoTitle: string;
  onCopyAll: () => void;
  onGenerateAiSummary?: () => void;
  hasAiSummary?: boolean;
  isGeneratingAi?: boolean;
  onTranslate?: () => void;
  lang?: string;
  isTranscriptLoading?: boolean;
  isTranscriptReady?: boolean;
  onDownloadSuccess?: () => void;
}

export function QuickActions({
  videoUrl,
  videoTitle,
  onCopyAll,
  onGenerateAiSummary,
  hasAiSummary,
  isGeneratingAi,
  lang = "en",
  isTranscriptLoading = false,
  isTranscriptReady = false,
  onDownloadSuccess,
}: QuickActionsProps) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const { user, refreshUser, openLoginModal } = useAuth();
  const router = useRouter();
  const canDownload = isTranscriptReady && !isTranscriptLoading;
  const currentCredits =
    typeof user?.credits === "string"
      ? parseInt(user.credits, 10) || 0
      : user?.credits || 0;
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  const shouldRenderMenu =
    isDownloadOpen &&
    !isDownloading &&
    canDownload &&
    !!menuPosition &&
    typeof document !== "undefined";

  const shouldRenderCreditsModal =
    isCreditsModalOpen && typeof document !== "undefined";

  useEffect(() => {
    if (!canDownload) {
      setIsDownloadOpen(false);
    }
  }, [canDownload]);

  useEffect(() => {
    if (!isDownloadOpen) return;

    const handleViewportChange = () => {
      setIsDownloadOpen(false);
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isDownloadOpen]);

  const handleDownload = useCallback(
    async (format: "srt" | "vtt" | "txt") => {
      if (!canDownload) {
        toast.info("Subtitles are still generating. Please wait.");
        return;
      }

      if (!user) {
        savePendingAction({
          type: "download_single",
          payload: {
            videoUrl,
            title: videoTitle,
            format,
            lang,
          },
        });
        toast.info("Please login. We will continue your download automatically.");
        openLoginModal();
        return;
      }

      if ((user.credits || 0) <= 0) {
        setIsDownloadOpen(false);
        setIsCreditsModalOpen(true);
        toast.error("Insufficient credits", {
          action: {
            label: "Get Credits",
            onClick: () => router.push("/pricing"),
          },
        });
        return;
      }

      setIsDownloading(true);
      setIsDownloadOpen(false);

      try {
        toast.info(`Preparing ${format.toUpperCase()} download...`);

        const blob = await subtitleApi.downloadSingle({
          url: videoUrl,
          lang,
          format,
          title: videoTitle,
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${videoTitle}.${format}`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);

        toast.success(`${format.toUpperCase()} downloaded successfully!`);
        onDownloadSuccess?.();

        refreshUser();
        setTimeout(() => refreshUser(), 1000);
        setTimeout(() => refreshUser(), 2000);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "";
        if (message.includes("Insufficient credits") || message.includes("credit")) {
          setIsDownloadOpen(false);
          setIsCreditsModalOpen(true);
          toast.error("Download Failed", {
            description: "You don't have enough credits.",
            action: {
              label: "Get Credits",
              onClick: () => router.push("/pricing"),
            },
          });
        } else {
          toast.error(message || "Download failed");
        }
      } finally {
        setIsDownloading(false);
      }
    },
    [
      canDownload,
      lang,
      onDownloadSuccess,
      openLoginModal,
      refreshUser,
      router,
      user,
      videoTitle,
      videoUrl,
    ]
  );

  useEffect(() => {
    const handleUnlockDownload = () => {
      void handleDownload("vtt");
    };

    window.addEventListener("downloadTranscriptForUnlock", handleUnlockDownload);
    return () => {
      window.removeEventListener("downloadTranscriptForUnlock", handleUnlockDownload);
    };
  }, [handleDownload]);

  const toggleDownloadMenu = () => {
    if (!canDownload) return;

    if (isDownloadOpen) {
      setIsDownloadOpen(false);
      return;
    }

    const buttonRect = downloadButtonRef.current?.getBoundingClientRect();
    if (!buttonRect) {
      setIsDownloadOpen(true);
      return;
    }

    const menuWidth = 144;
    const menuHeight = 116;
    const gap = 6;

    const shouldOpenUp =
      window.innerHeight - buttonRect.bottom < menuHeight + gap &&
      buttonRect.top > menuHeight + gap;

    const top = shouldOpenUp
      ? Math.max(8, buttonRect.top - menuHeight - gap)
      : Math.min(window.innerHeight - menuHeight - 8, buttonRect.bottom + gap);

    const left = Math.min(
      Math.max(8, buttonRect.right - menuWidth),
      window.innerWidth - menuWidth - 8
    );

    setMenuPosition({ top, left, width: menuWidth });
    setIsDownloadOpen(true);
  };

  return (
    <>
      <div className="border-t border-slate-100 bg-white/95 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="flex flex-wrap items-center gap-2">
          {onGenerateAiSummary && !hasAiSummary && (
            <button
              onClick={onGenerateAiSummary}
              disabled={isGeneratingAi}
              className="flex min-w-[108px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50 sm:flex-none"
            >
              {isGeneratingAi ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Sparkles size={14} />
              )}
              <span>{isGeneratingAi ? "Analyzing..." : "AI Summary"}</span>
            </button>
          )}

          <div className="relative">
            <button
              ref={downloadButtonRef}
              onClick={toggleDownloadMenu}
              disabled={isDownloading || !canDownload}
              title={!canDownload ? "Wait until subtitles finish loading" : undefined}
              className="flex min-w-[108px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {isDownloading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              <span>{isTranscriptLoading ? "Generating..." : "Download"}</span>
              <ChevronDown
                size={12}
                className={`transition-transform ${isDownloadOpen ? "rotate-180" : ""}`}
              />
            </button>

            {shouldRenderMenu &&
              createPortal(
                <>
                  <div className="fixed inset-0 z-[110]" onClick={() => setIsDownloadOpen(false)} />
                  <div
                    className="fixed z-[120] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl"
                    style={{
                      top: menuPosition.top,
                      left: menuPosition.left,
                      width: menuPosition.width,
                    }}
                  >
                    <button
                      onClick={() => handleDownload("srt")}
                      className="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50"
                    >
                      SRT Format
                    </button>
                    <button
                      onClick={() => handleDownload("vtt")}
                      className="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50"
                    >
                      VTT Format
                    </button>
                    <button
                      onClick={() => handleDownload("txt")}
                      className="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50"
                    >
                      TXT Format
                    </button>
                  </div>
                </>,
                document.body
              )}
          </div>

          <button
            onClick={onCopyAll}
            className="flex min-w-[108px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-green-50 hover:text-green-600 sm:flex-none"
          >
            <Copy size={14} />
            <span>Copy All</span>
          </button>
        </div>

        {!canDownload && (
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Download unlocks after subtitles are ready.
          </p>
        )}
      </div>

      {shouldRenderCreditsModal &&
        createPortal(
          <InsufficientCreditsModal
            isOpen={isCreditsModalOpen}
            onClose={() => setIsCreditsModalOpen(false)}
            requiredAmount={CREDIT_COSTS.download}
            featureName="Subtitle Download"
            currentAmount={currentCredits}
          />,
          document.body
        )}
    </>
  );
}

