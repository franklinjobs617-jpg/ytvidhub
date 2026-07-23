"use client";

import { useState, useRef } from "react";
import { Youtube, Download, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { normalizeYoutubeUrl } from "@/lib/youtube";
import { subtitleApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { promptLoginForGuestLimit } from "@/lib/guestLimitPrompt";

const FORMAT_OPTIONS = [
  { value: "srt", label: "SRT", desc: "With timestamps" },
  { value: "vtt", label: "VTT", desc: "Web player" },
  { value: "txt", label: "TXT", desc: "Plain text" },
] as const;

const LANG_OPTIONS = [
  { value: "en", label: "English" },
  { value: "zh-Hans", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "auto", label: "Auto-detect" },
];

export default function SubtitleDownloaderWidget() {
  const router = useRouter();
  const { openLoginModal } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"srt" | "vtt" | "txt">("srt");
  const [lang, setLang] = useState<string>("auto");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadedFilename, setDownloadedFilename] = useState("");
  const [downloadedSize, setDownloadedSize] = useState(0);

  const isValidUrl = (u: string) =>
    /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/.test(u.trim());

  const handleDownload = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMsg("Please enter a YouTube URL.");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setStatus("error");
      setErrorMsg("Invalid YouTube URL. Please check and try again.");
      return;
    }

    const normalized = normalizeYoutubeUrl(trimmed);
    setStatus("loading");
    setErrorMsg("");

    try {
      const blob = await subtitleApi.guestDownload(normalized, lang, format);
      if (blob.size === 0) {
        setStatus("error");
        setErrorMsg("No subtitles found for this video. It may not have captions available.");
        return;
      }
      const ext = format === "txt" ? "txt" : format;
      const filename = `subtitles.${ext}`;
      setDownloadedFilename(filename);
      setDownloadedSize(blob.size);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      setStatus("success");
    } catch (err) {
      if (promptLoginForGuestLimit(err, openLoginModal)) {
        setStatus("error");
        setErrorMsg("Guest credits are used up. Please login to continue.");
        return;
      }
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Download failed. The video may not have subtitles."
      );
    }
  };

  const handleReset = () => {
    setUrl("");
    setStatus("idle");
    setErrorMsg("");
    setDownloadedFilename("");
    setDownloadedSize(0);
    inputRef.current?.focus();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-6 sm:p-8">
        {/* URL Input */}
        <div className="relative mb-5">
          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            placeholder="Paste YouTube video URL here..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            disabled={status === "loading"}
          />
        </div>

        {/* Format & Language Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              Format
            </label>
            <div className="flex gap-2">
              {FORMAT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFormat(opt.value)}
                  disabled={status === "loading"}
                  title={opt.desc}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    format === opt.value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:w-40">
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              Language
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              disabled={status === "loading"}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            >
              {LANG_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Download Button */}
        {status !== "success" && (
          <button
            onClick={handleDownload}
            disabled={status === "loading" || !url.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === "loading" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} />
                Download Subtitles
              </>
            )}
          </button>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="text-center animate-in fade-in">
            <div className="inline-flex items-center gap-2 text-green-600 font-semibold mb-2">
              <CheckCircle size={20} />
              Download complete!
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {downloadedFilename} ({formatFileSize(downloadedSize)})
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                Download Another
              </button>
              <button
                onClick={() => router.push(`/workspace?urls=${encodeURIComponent(normalizeYoutubeUrl(url.trim()))}&from=subtitle-downloader`)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
              >
                Open in Workspace
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && errorMsg && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Guest access includes 3 starter credits. Each subtitle download uses 1 credit.
      </p>
    </div>
  );
}
