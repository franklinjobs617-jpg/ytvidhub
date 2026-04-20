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

  const t = useTranslations("transcriptPage");
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

      toast.success(t("generating") + "...", {
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
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.free")}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.accurate")}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.fast")}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.formats")}
              </div>
            </div>
          </div>

          {/* Main Generator Interface */}
          <div className="max-w-4xl mx-auto">
            <div
              className={`relative bg-white rounded-2xl border shadow-xl overflow-hidden transition-all duration-300 ${
                inputError
                  ? "border-red-300 shadow-red-100 ring-4 ring-red-50"
                  : "border-slate-200 shadow-slate-200/60"
              }`}
            >
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Youtube size={18} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      {t("interface.title")}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t("interface.subtitle")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 md:p-8">
                <div className="relative group/input">
                  {/* Input Container */}
                  <div
                    className={`relative flex items-center rounded-2xl border bg-white transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] ${
                      isFocused
                        ? "border-blue-400 shadow-lg shadow-blue-100/50 ring-2 ring-blue-50"
                      : inputError
                          ? "border-red-400"
                          : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Icon */}
                    <div className="pl-5 flex-shrink-0">
                      <Youtube size={24} className="text-red-500" />
                    </div>

                    {/* Input */}
                    <textarea
                      ref={textareaRef}
                      value={url}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => !url && setIsFocused(false)}
                      rows={1}
                      className={`flex-1 py-4 px-3 bg-transparent text-lg text-slate-800 outline-none resize-none placeholder:text-slate-400 leading-relaxed ${
                        inputError ? "caret-red-500" : "caret-blue-600"
                      }`}
                      placeholder={
                        isFocused || url
                          ? t("interface.placeholder")
                          : typedPlaceholder || "|"
                      }
                      spellCheck={false}
                    />

                    {/* Generate Button */}
                    <div className="pr-3 pt-3 pb-3 flex-shrink-0">
                      <button
                        onClick={handleGenerateTranscript}
                        disabled={!url.trim() || isAnalyzing}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-wide transition-all whitespace-nowrap ${
                          url.trim() && !isAnalyzing
                            ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
                            : "bg-blue-50 text-blue-300 cursor-not-allowed"
                        }`}
                      >
                        {isAnalyzing ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                        <span className="hidden sm:inline">
                          {t("interface.generate")}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {inputError && (
                  <div className="flex items-center gap-2 mt-3 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={14} /> {tErrors("invalidUrl")}
                  </div>
                )}

                {/* Example Links */}
                <div className="flex flex-col items-center gap-3 mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    {t("interface.tryExample")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                    >
                      <Play size={12} /> Music Video
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "https://www.youtube.com/watch?v=9bZkp7q19f0",
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                    >
                      <FileText size={12} /> Tutorial
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "https://www.youtube.com/watch?v=jNQXAC9IVRw",
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                    >
                      <Globe size={12} /> Documentary
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  2.4M+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.transcripts")}
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  100+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.languages")}
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  99.5%
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.accuracy")}
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  &lt;30s
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.speed")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
