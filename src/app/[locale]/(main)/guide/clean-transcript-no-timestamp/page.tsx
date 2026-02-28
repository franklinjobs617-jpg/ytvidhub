"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModel";

export default function CleanTranscriptGuidePage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Data Science Guide</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Clean Subtitles, Flawless Data
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Data quality is non-negotiable for LLM training and academic research. Learn the professional method to remove timestamps and ASR noise for truly pristine text data.
          </p>
        </header>

        {/* Problem */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Pitfall of Raw SRT/VTT Files
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Subtitle files are designed for video players, not data pipelines. Using them directly introduces noise that corrupts your analysis.
          </p>
          <div className="space-y-5 mb-8">
            {[
              { title: "Timestamps & Tags", desc: "Timecodes like 00:01:23.456 and HTML-style tags (<i>, <b>) pollute your text corpus and skew token counts." },
              { title: "ASR Noise", desc: "Auto-generated captions inject artifacts like [Music], (Applause), and repeated filler words that degrade model performance." },
              { title: "Inconsistent Formatting", desc: "Line breaks mid-sentence, duplicate lines, and encoding issues create fragmented, unusable text blocks." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/clean-transcript-no-timestamp-before-after.webp"
              alt="Before and after comparison of cleaning a raw subtitle file"
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* How It Works */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Our Three-Step Cleaning Pipeline
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            YTVidHub&apos;s &quot;Clean TXT&quot; export runs every file through a dedicated pipeline to deliver analysis-ready text.
          </p>
          <ol className="space-y-6 mb-8">
            {[
              { title: "Structural Tag Elimination", desc: "All SRT/VTT structural elements—sequence numbers, timecodes, position tags, and HTML formatting—are stripped completely." },
              { title: "ASR Noise Filtering", desc: "Non-speech markers like [Music], (Laughter), and ♪ symbols are identified and removed using pattern matching." },
              { title: "Format Unification", desc: "Fragmented lines are merged into coherent paragraphs. Duplicate lines and encoding artifacts are cleaned for a consistent output." },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Ready for Analysis-Grade Text?
            </h2>
            <p className="text-slate-400 mb-8">
              Skip the manual cleaning. Export pristine, timestamp-free transcripts directly from YTVidHub.
            </p>
            <Link
              href="/data-prep-guide"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Explore the Full Data Prep Guide
            </Link>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
