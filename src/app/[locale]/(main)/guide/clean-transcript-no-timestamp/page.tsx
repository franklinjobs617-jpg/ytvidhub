"use client";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "@/components/LoginModel";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
export default function CleanTranscriptGuidePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const faqItems = [
    {
      q: "How to download YouTube transcript as text?",
      a: "Use a transcript downloader, choose TXT output, and export the file. TXT gives you plain text without subtitle timing syntax.",
    },
    {
      q: "How do I remove timestamps from a YouTube transcript?",
      a: "Choose clean TXT export or run a timestamp-removal pipeline that strips timecodes, numbering, and subtitle tags from SRT/VTT.",
    },
    {
      q: "Is no-timestamp transcript better for AI training?",
      a: "Yes. Clean no-timestamp text reduces formatting noise, improves token quality, and is easier to use for RAG, summarization, and LLM fine-tuning.",
    },
    {
      q: "Should I keep SRT or convert to TXT?",
      a: "Keep SRT when you need subtitle timing for editing. Convert to TXT when you need readable text for analysis, notes, and AI workflows.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <div className="editorial-page article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="editorial-main">
        {/* Hero */}
        <header className="article-shell article-hero">
          <p className="article-kicker">
            Data Science Guide
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Download YouTube Transcript as Text Without Timestamps
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            If you need to download YouTube transcript as text, this guide shows
            how to remove timestamps and ASR noise to create clean,
            analysis-ready transcript files for LLM and research use.
          </p>
        </header>
        {/* Problem */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            The Pitfall of Raw SRT/VTT Files
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Subtitle files are designed for video players, not data pipelines.
            Using them directly introduces noise that corrupts your analysis.
          </p>
          <div className="space-y-5 mb-8">
            {[
              {
                title: "Timestamps & Tags",
                desc: "Timecodes like 00:01:23.456 and HTML-style tags (<i>, <b>) pollute your text corpus and skew token counts.",
              },
              {
                title: "ASR Noise",
                desc: "Auto-generated captions inject artifacts like [Music], (Applause), and repeated filler words that degrade model performance.",
              },
              {
                title: "Inconsistent Formatting",
                desc: "Line breaks mid-sentence, duplicate lines, and encoding issues create fragmented, unusable text blocks.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <h4 className="font-semibold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
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
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Our Three-Step Cleaning Pipeline
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            YTVidHub&apos;s &quot;Clean TXT&quot; export runs every file through
            a dedicated pipeline to deliver analysis-ready text.
          </p>
          <ol className="space-y-6 mb-8">
            {[
              {
                title: "Structural Tag Elimination",
                desc: "All SRT/VTT structural elements—sequence numbers, timecodes, position tags, and HTML formatting—are stripped completely.",
              },
              {
                title: "ASR Noise Filtering",
                desc: "Non-speech markers like [Music], (Laughter), and ♪ symbols are identified and removed using pattern matching.",
              },
              {
                title: "Format Unification",
                desc: "Fragmented lines are merged into coherent paragraphs. Duplicate lines and encoding artifacts are cleaned for a consistent output.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>
        <UnifiedFaqSection
          title="Frequently Asked Questions"
          items={faqItems}
          sectionClassName="article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        {/* CTA */}
        <section className="article-shell article-section text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Ready for Analysis-Grade Text?
            </h2>
            <p className="text-slate-400 mb-8">
              Skip the manual cleaning. Export pristine, timestamp-free
              transcripts directly from YTVidHub.
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
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
