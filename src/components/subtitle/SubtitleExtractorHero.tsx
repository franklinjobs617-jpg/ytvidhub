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
  "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy...",
  "https://www.youtube.com/@ChannelName",
];

export default function SubtitleExtractorHero() {
  const router = useRouter();

  const t = useTranslations("subtitleExtractorPage");
  const tActions = useTranslations("actions");
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

  const handleExtractSubtitle = async () => {
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

      toast.success(tActions("opening") + "...", {
        position: "top-center",
        duration: 2000,
      });

      router.push(
        `/workspace?urls=${encodeURIComponent(normalizedUrl)}&from=subtitle-extractor&mode=download`,
      );
    } catch (error) {
      console.error(error);
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

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <section className="relative pt-16 pb-20 md:pt-20 md:pb-28 article-hero">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 article-shell">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide text-slate-900 leading-tight mb-6 drop-shadow-sm article-h1">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.bulk")}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.formats")}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.languages")}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle size={16} className="text-blue-600" />
                {t("hero.benefits.instant")}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className={`relative bg-white rounded-2xl border shadow-xl overflow-hidden transition-all duration-300 ${
                inputError
                  ? "border-red-300 shadow-red-100 ring-4 ring-red-50"
                  : "border-slate-200 shadow-blue-100/50"
              }`}
            >
              <div className="bg-slate-50/80 border-b border-slate-200 px-4 py-3">
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

              <div className="p-6 md:p-8">
                <div className="relative group/input">
                  <div
                    className={`absolute -inset-0.5 rounded-2xl transition-all duration-500 ${
                      isFocused
                        ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-100"
                        : inputError
                          ? "bg-red-400 opacity-100"
                          : "bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 opacity-40 group-hover/input:opacity-70"
                    } blur-sm`}
                  />

                  <div
                    className={`relative flex items-center rounded-2xl border bg-white transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] ${
                      isFocused
                        ? "border-blue-400 shadow-xl shadow-blue-100/50"
                        : inputError
                          ? "border-red-400"
                          : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="pl-5 flex-shrink-0">
                      <Youtube size={24} className="text-red-500" />
                    </div>

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

                    <div className="pr-3 pt-3 pb-3 flex-shrink-0">
                      <button
                        onClick={handleExtractSubtitle}
                        disabled={!url.trim() || isAnalyzing}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                          url.trim() && !isAnalyzing
                            ? "bg-slate-900 text-white hover:bg-black hover:shadow-lg hover:-translate-y-0.5"
                            : "bg-blue-50 text-blue-300 cursor-not-allowed"
                        }`}
                      >
                        {isAnalyzing ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                        <span className="hidden sm:inline">
                          {t("interface.extract")}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {inputError && (
                  <div className="flex items-center gap-2 mt-3 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={14} /> {tErrors("invalidUrl")}
                  </div>
                )}

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
                      <Play size={12} /> Single Video
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME",
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                    >
                      <FileText size={12} /> Playlist
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick("https://www.youtube.com/@Google")
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                    >
                      <Globe size={12} /> Channel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">5M+</div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.extracted")}
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
                <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                <div className="text-xs text-slate-500 font-medium">
                  {t("stats.formats")}
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  &lt;5s
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
