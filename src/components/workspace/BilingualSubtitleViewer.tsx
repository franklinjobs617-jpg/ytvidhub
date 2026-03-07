"use client";

import { useState } from "react";
import { Download, Languages, Loader2 } from "lucide-react";
import { parseSRT, parseVTT, generateBilingualSRT, SubtitleEntry } from "@/lib/subtitle-parser";
import { translateSubtitles } from "@/lib/translator";

interface BilingualSubtitleViewerProps {
  subtitleContent: string;
  format: "srt" | "vtt";
  videoTitle?: string;
}

export function BilingualSubtitleViewer({ subtitleContent, format, videoTitle }: BilingualSubtitleViewerProps) {
  const [entries, setEntries] = useState<SubtitleEntry[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [targetLang, setTargetLang] = useState("zh");
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleParse = () => {
    const parsed = format === "srt" ? parseSRT(subtitleContent) : parseVTT(subtitleContent);
    setEntries(parsed);
  };

  const handleTranslate = async () => {
    if (entries.length === 0) handleParse();

    setIsTranslating(true);
    setProgress(0);

    const texts = entries.map(e => e.text);
    const translated = await translateSubtitles(texts, "en", targetLang, (current, total) => {
      setProgress((current / total) * 100);
    });

    setTranslations(translated);
    setIsTranslating(false);
  };

  const handleDownload = () => {
    const bilingual = generateBilingualSRT(entries, translations);
    const blob = new Blob([bilingual], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${videoTitle || "subtitle"}_bilingual.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center gap-3 mb-4">
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
          disabled={isTranslating}
        >
          <option value="zh">Chinese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </select>

        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm font-medium"
        >
          {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
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

      <div className="max-h-96 overflow-y-auto space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className="border-b pb-3">
            <div className="text-xs text-gray-500 mb-1">{entry.startTime} → {entry.endTime}</div>
            <div className="text-sm text-gray-900">{entry.text}</div>
            {translations[i] && <div className="text-sm text-blue-600 mt-1">{translations[i]}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
