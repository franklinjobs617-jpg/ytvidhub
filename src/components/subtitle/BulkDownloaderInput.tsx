"use client";

import { useState, useRef } from "react";
import { Youtube, ArrowRight, AlertCircle } from "lucide-react";
import { normalizeYoutubeUrl } from "@/lib/youtube";
import { useRouter } from "next/navigation";

const isValidYoutubeUrl = (url: string) =>
  /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/.test(url.trim());

const EXAMPLES = [
  { label: "Single Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { label: "Playlist (Bulk)", url: "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME" },
  { label: "Channel (Bulk)", url: "https://www.youtube.com/@Google" },
];

export default function BulkDownloaderInput() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [urls, setUrls] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const lines = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    if (lines.length === 0) {
      setError("Please enter at least one YouTube URL.");
      return;
    }
    const invalid = lines.filter((l) => !isValidYoutubeUrl(l));
    if (invalid.length > 0) {
      setError("One or more URLs are invalid. Please check and try again.");
      return;
    }

    const normalized = lines.map((l) => normalizeYoutubeUrl(l));
    router.push(`/workspace?urls=${encodeURIComponent(normalized.join(","))}&from=bulk-downloader`);
  };

  const handleExampleClick = (url: string) => {
    setUrls(url);
    setError("");
    setIsFocused(true);
    textareaRef.current?.focus();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`rounded-2xl border bg-white/95 backdrop-blur transition-all duration-300 ${
          isFocused
            ? "border-blue-400 ring-4 ring-blue-50 shadow-[0_30px_65px_-40px_rgba(37,99,235,0.75)]"
            : error
              ? "border-red-300 ring-4 ring-red-50"
              : "border-slate-200 shadow-[0_28px_65px_-44px_rgba(15,23,42,0.7)] hover:border-slate-300"
        }`}
      >
        <div className="flex items-start px-5 pb-5 pt-6 sm:px-7">
          <Youtube
            className={`mr-3 mt-1 h-6 w-6 shrink-0 transition-colors ${
              isFocused ? "text-red-500" : "text-slate-300"
            }`}
          />
          <textarea
            ref={textareaRef}
            value={urls}
            onChange={(e) => {
              setUrls(e.target.value);
              if (error) setError("");
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !urls && setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
            className="min-h-[46px] w-full resize-none bg-transparent text-sm font-medium leading-relaxed text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 md:text-base"
            placeholder="Paste YouTube URLs here (one per line for bulk)..."
            spellCheck={false}
          />
        </div>

        <div className="h-px w-full bg-slate-100" />

        <div className="flex flex-col items-center justify-between gap-4 rounded-b-2xl bg-white px-5 py-4 sm:flex-row sm:px-7">
          <p className="text-xs font-medium text-slate-400">
            Single video, playlist, or channel URL — one per line for bulk
          </p>
          <button
            onClick={handleSubmit}
            disabled={!urls.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <ArrowRight size={16} />
            Start
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-600">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => handleExampleClick(ex.url)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
