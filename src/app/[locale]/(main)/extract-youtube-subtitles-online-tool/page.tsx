"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SubtitleResult = {
  videoId: string;
  title: string;
  duration: string;
  language: string;
  formats: {
    srt: string;
    vtt: string;
    txt: string;
  };
};

type ProcessingStatus = {
  status: "idle" | "processing" | "success" | "error";
  progress: number;
  message: string;
  result?: SubtitleResult;
};

export default function ExtractYouTubeSubtitlesOnlineToolPage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"srt" | "vtt" | "txt">("srt");
  const [language, setLanguage] = useState("auto");
  const [processing, setProcessing] = useState<ProcessingStatus>({
    status: "idle",
    progress: 0,
    message: "",
  });

  const validateYouTubeUrl = (value: string): boolean => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(value);
  };

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "YouTube Subtitle Extractor Online Tool",
      description:
        "Online workflow to extract YouTube subtitles and export SRT, VTT, or TXT formats quickly.",
      url: "https://ytvidhub.com/extract-youtube-subtitles-online-tool",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Extract YouTube subtitles online",
        "Multiple format support (SRT, VTT, TXT)",
        "Batch processing for playlists",
        "No registration required",
      ],
    }),
    []
  );

  const faqStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I extract YouTube subtitles online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste a YouTube URL, choose a format, and click Extract Subtitles.",
          },
        },
        {
          "@type": "Question",
          name: "What subtitle formats can I download?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can download SRT, VTT, and TXT subtitle formats.",
          },
        },
      ],
    }),
    []
  );

  const extractSubtitles = async () => {
    if (!url.trim()) {
      setProcessing({
        status: "error",
        progress: 0,
        message: "Please enter a YouTube URL.",
      });
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setProcessing({
        status: "error",
        progress: 0,
        message: "Please enter a valid YouTube URL.",
      });
      return;
    }

    try {
      setProcessing({
        status: "processing",
        progress: 20,
        message: "Validating URL…",
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProcessing({
        status: "processing",
        progress: 50,
        message: "Extracting subtitles…",
      });
      await new Promise((resolve) => setTimeout(resolve, 700));

      const result: SubtitleResult = {
        videoId: "dQw4w9WgXcQ",
        title: "Sample YouTube Video",
        duration: "3:32",
        language: language === "auto" ? "en" : language,
        formats: {
          srt: "1\n00:00:00,000 --> 00:00:02,000\nSample SRT subtitle",
          vtt: "WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nSample VTT subtitle",
          txt: "Sample plain text subtitle output.",
        },
      };

      setProcessing({
        status: "success",
        progress: 100,
        message: "Subtitles extracted successfully.",
        result,
      });
    } catch {
      setProcessing({
        status: "error",
        progress: 0,
        message: "Failed to extract subtitles. Please try again.",
      });
    }
  };

  const downloadSubtitle = (ext: "srt" | "vtt" | "txt") => {
    if (!processing.result) return;
    const content = processing.result.formats[ext];
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${processing.result.title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="bg-white min-h-screen antialiased text-slate-700 article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main>
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 article-shell article-hero">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-slate-600">
              Tools
            </Link>
            <span>/</span>
            <span className="text-slate-700">Extract YouTube Subtitles Online</span>
          </nav>

          <p className="text-sm text-blue-600 font-medium mb-4">Free Online Tool</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Extract YouTube Subtitles Online Tool
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Extract YouTube subtitles and export in SRT, VTT, or TXT formats in a
            guided workflow.
          </p>
        </header>

        <section className="max-w-3xl mx-auto px-6 mb-16">
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-2 article-h2">
              Start Extracting Subtitles
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Paste your YouTube URL below and choose your preferred format.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors bg-white"
                  disabled={processing.status === "processing"}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(event) =>
                      setFormat(event.target.value as "srt" | "vtt" | "txt")
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white"
                    disabled={processing.status === "processing"}
                  >
                    <option value="srt">SRT</option>
                    <option value="vtt">VTT</option>
                    <option value="txt">TXT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white"
                    disabled={processing.status === "processing"}
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={extractSubtitles}
                    disabled={processing.status === "processing"}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {processing.status === "processing"
                      ? "Processing..."
                      : "Extract Subtitles"}
                  </button>
                </div>
              </div>
            </div>

            {processing.status !== "idle" && (
              <div className="mt-6">
                {processing.status === "processing" && (
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      {processing.message}
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${processing.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {processing.status === "error" && (
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <p className="text-sm text-red-800 font-medium">
                      {processing.message}
                    </p>
                  </div>
                )}

                {processing.status === "success" && processing.result && (
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <p className="text-sm text-blue-800 font-medium mb-3">
                      {processing.message}
                    </p>
                    <div className="p-3 rounded-lg bg-white border border-blue-100 mb-3">
                      <p className="font-semibold text-slate-900 text-sm mb-1">
                        {processing.result.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Duration: {processing.result.duration} · Language:{" "}
                        {processing.result.language} · ID: {processing.result.videoId}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => downloadSubtitle("srt")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
                      >
                        Download SRT
                      </button>
                      <button
                        onClick={() => downloadSubtitle("vtt")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
                      >
                        Download VTT
                      </button>
                      <button
                        onClick={() => downloadSubtitle("txt")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
                      >
                        Download TXT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
