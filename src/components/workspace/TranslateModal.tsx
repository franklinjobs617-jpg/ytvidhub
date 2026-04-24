"use client";

import { useState, useEffect } from "react";
import { X, Download, Loader2, Languages } from "lucide-react";
import {
  parseSRT,
  parseVTT,
  generateBilingualSRT,
  SubtitleEntry,
} from "@/lib/subtitle-parser";
import { translateSubtitles } from "@/lib/translator";
import { subtitleApi } from "@/lib/api";
import { readTranscriptCache, writeTranscriptCache } from "@/lib/transcriptCache";

interface TranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export function TranslateModal({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
}: TranslateModalProps) {
  const [entries, setEntries] = useState<SubtitleEntry[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [targetLang, setTargetLang] = useState("zh");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subtitleContent, setSubtitleContent] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen && videoUrl) {
      setIsLoading(true);
      setError("");

      // 先尝试从缓存加载
      try {
        const cached = sessionStorage.getItem(
          `ytvidhub_transcript_${videoUrl}`,
        );
        if (cached) {
          const { text, format } = JSON.parse(cached);
          setSubtitleContent(text);

          let parsed: SubtitleEntry[] = [];
          if (format === "srt") {
            parsed = parseSRT(text);
          } else if (format === "vtt") {
            parsed = parseVTT(text);
          }

          if (parsed.length > 0) {
            setEntries(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to load from cache:", error);
      }

      // 缓存没有，主动加载字幕
      subtitleApi
        .downloadSingle({
          url: videoUrl,
          lang: "en",
          format: "vtt",
          title: videoTitle,
          isPreview: true,
        })
        .then(async (blob) => {
          const text = await blob.text();
          console.log("Loaded subtitle text:", text.substring(0, 500));
          setSubtitleContent(text);
          const parsed = parseVTT(text);
          console.log("Parsed entries:", parsed.length);

          if (parsed.length === 0) {
            setError(
              `Failed to parse subtitles. First 500 chars: ${text.substring(0, 500)}`,
            );
          } else {
            setEntries(parsed);
            // 保存到缓存
            try {
              sessionStorage.setItem(
                `ytvidhub_transcript_${videoUrl}`,
                JSON.stringify({ text, format: "vtt" }),
              );
            } catch {}
          }
        })
        .catch((error) => {
          console.error("Failed to load subtitles:", error);
          setError(error.message || "Failed to load subtitles");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, videoUrl, videoTitle]);

  const handleTranslate = async () => {
    if (entries.length === 0) return;

    setIsTranslating(true);
    setProgress(0);

    const texts = entries.map((e) => e.text);
    const translated = await translateSubtitles(
      texts,
      "en",
      targetLang,
      (current, total) => {
        setProgress((current / total) * 100);
      },
    );

    setTranslations(translated);
    setIsTranslating(false);
  };

  const handleDownload = () => {
    const bilingual = generateBilingualSRT(entries, translations);
    const blob = new Blob([bilingual], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${videoTitle}_bilingual.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">
              Bilingual Subtitles
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 border-b flex items-center gap-3">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            disabled={isTranslating}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="zh">Chinese (中文)</option>
            <option value="es">Spanish (Español)</option>
            <option value="fr">French (Français)</option>
            <option value="de">German (Deutsch)</option>
            <option value="ja">Japanese (日本語)</option>
            <option value="ko">Korean (한국어)</option>
          </select>

          <button
            onClick={handleTranslate}
            disabled={isTranslating || entries.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm font-medium"
          >
            {isTranslating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Languages className="w-4 h-4" />
            )}
            {isTranslating ? `${Math.round(progress)}%` : "Translate"}
          </button>

          {translations.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {isLoading ? (
            <div className="text-center text-gray-500 py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
              <div>Loading subtitles...</div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <div className="font-semibold mb-2">Error</div>
              <div className="text-sm">{error}</div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No subtitles available
            </div>
          ) : (
            entries.map((entry, i) => (
              <div key={i} className="border-b pb-3">
                <div className="text-xs text-gray-500 mb-1">
                  {entry.startTime} → {entry.endTime}
                </div>
                <div className="text-sm text-gray-900">{entry.text}</div>
                {translations[i] && (
                  <div className="text-sm text-blue-600 mt-1">
                    {translations[i]}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
