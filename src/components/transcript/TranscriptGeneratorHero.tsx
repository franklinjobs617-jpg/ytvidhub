"use client";

import { useState, useEffect, useRef } from "react";
import { useSubtitleDownloader } from "@/hook/useSubtitleDownloader";
import { normalizeYoutubeUrl } from "@/lib/youtube";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Youtube,
  ArrowRight,
  Play,
  FileText,
  Globe,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const isValidYoutubeUrl = (url: string) => {
  if (!url) return false;
  const trimmed = url.trim();
  return /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/.test(
    trimmed,
  );
};

const PLACEHOLDER_EXAMPLES = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtu.be/jNQXAC9IVRw",
  "https://www.youtube.com/watch?v=9bZkp7q19f0",
];

export default function TranscriptGeneratorHero() {
  const router = useRouter();

  const tErrors = useTranslations("errors");

  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  useEffect(() => {
    if (isFocused || url) return;
    const target = PLACEHOLDER_EXAMPLES[placeholderIndex];
    let charIndex = 0;
    let pauseTimer: ReturnType<typeof setTimeout>;
    setTypedPlaceholder("");

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedPlaceholder(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        pauseTimer = setTimeout(() => {
          setPlaceholderIndex(
            (prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length,
          );
        }, 2000);
      }
    }, 35);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(pauseTimer);
    };
  }, [placeholderIndex, isFocused, url]);

  const { isAnalyzing } = useSubtitleDownloader();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setUrl(val);
    if (inputError) setInputError(false);
  };

  const handleGenerateTranscript = async () => {
    try {
      if (!url.trim()) {
        setInputError(true);
        toast.error(tErrors("enterUrl"), { position: "top-center" });
        return;
      }

      if (!isValidYoutubeUrl(url.trim())) {
        setInputError(true);
        toast.error(tErrors("invalidUrl"), { position: "top-center" });
        return;
      }

      const normalizedUrl = normalizeYoutubeUrl(url.trim());
      if (!normalizedUrl.startsWith("http")) return;

      toast.success("Generating transcript...", {
        position: "top-center",
        duration: 2000,
      });

      router.push(
        `/workspace?urls=${encodeURIComponent(normalizedUrl)}&from=transcript-generator&mode=download`,
      );
    }
    catch (error) {
      console.error("Error generating transcript:", error);
      toast.error(tErrors("generationFailed"), { position: "top-center" });
    }
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setIsFocused(true);
    textareaRef.current?.focus();
  };

  return (
    <div className="relative isolate bg-white">
      <Toaster richColors closeButton position="top-center" />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,white_45%)]" />
        <div className="absolute left-1/2 top-[-180px] h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/35 blur-3xl" />
      </div>

      <section className="relative pt-16 pb-20 md:pt-20 md:pb-24 article-hero">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 article-shell">
          {/* Hero Header */}
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-6xl font-display tracking-tight text-slate-900 leading-tight mb-6 article-h1">
              YouTube Transcript Generator
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Use this free online YouTube transcript generator for basic use
              when you need export-ready text. Generate transcript from YouTube
              video into clean TXT for notes and AI workflows, or keep
              timestamps for SRT and VTT subtitle work.
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                Free online for basic use
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                TXT, SRT, VTT, JSON
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                Clean text or timestamps
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                Reusable transcript exports
              </div>
            </div>
          </div>

          {/* Main Generator Interface */}
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-3xl border bg-white/95 backdrop-blur transition-all duration-300 ${
                isFocused
                  ? "border-[var(--brand-400)] ring-4 ring-[var(--brand-50)] shadow-[0_30px_65px_-40px_rgba(37,99,235,0.75)]"
                  : inputError
                    ? "border-red-300 ring-4 ring-red-50"
                    : "border-slate-200 shadow-[0_28px_65px_-44px_rgba(15,23,42,0.7)] hover:border-slate-300 hover:shadow-[0_30px_70px_-42px_rgba(37,99,235,0.32)]"
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
                  value={url}
                  onChange={(e) => {
                    handleInputChange(e);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 240)}px`;
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => !url && setIsFocused(false)}
                  rows={1}
                  className={`min-h-[46px] w-full flex-1 resize-none bg-transparent text-base font-medium leading-relaxed text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 md:text-[21px] ${
                    inputError ? "caret-red-500" : "caret-blue-600"
                  }`}
                  placeholder={
                    isFocused || url
                      ? "Paste YouTube video URL here..."
                      : typedPlaceholder || "|"
                  }
                  spellCheck={false}
                />
              </div>

              <div className="h-px w-full bg-slate-100" />

              <div className="flex flex-col items-center justify-between gap-4 rounded-b-3xl bg-white px-5 py-4 sm:flex-row sm:px-7">
                <div className="flex w-full items-center gap-2 text-[13px] font-medium text-slate-400 sm:w-auto">
                  <Info size={14} className="text-slate-300" />
                  Basic transcript export without extra setup
                </div>

                <button
                  onClick={handleGenerateTranscript}
                  disabled={!url.trim() || isAnalyzing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isAnalyzing ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  Generate Transcript
                </button>
              </div>
            </div>

            {inputError && (
              <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-[13px] font-semibold text-red-600 shadow-sm">
                  <AlertCircle size={14} /> {tErrors("invalidUrl")}
                </span>
              </div>
            )}

            <div className="relative z-10 mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <span className="text-[13px] font-semibold text-slate-400">
                Try these examples:
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {[
                  {
                    label: "Music Video",
                    icon: Play,
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  },
                  {
                    label: "Tutorial",
                    icon: FileText,
                    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
                  },
                  {
                    label: "Documentary",
                    icon: Globe,
                    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
                  },
                ].map((item, index, arr) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center">
                      <button
                        onClick={() => handleExampleClick(item.url)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)]"
                      >
                        <Icon size={12} />
                        {item.label}
                      </button>
                      {index !== arr.length - 1 ? (
                        <span className="mx-2 text-slate-200">/</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                <div className="mb-1 text-2xl font-bold text-blue-600">
                  2.4M+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Transcript exports
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                <div className="mb-1 text-2xl font-bold text-blue-500">
                  100+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Language tracks
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                <div className="mb-1 text-2xl font-bold text-blue-600">
                  4
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Output formats
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                <div className="mb-1 text-2xl font-bold text-blue-700">
                  &lt;30s
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Typical export time*
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">
              * Typical speed when a transcript track is available on the video.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
