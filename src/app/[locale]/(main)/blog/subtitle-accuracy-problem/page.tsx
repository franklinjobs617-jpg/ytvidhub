"use client";

import Link from "next/link";

export default function SubtitleAccuracyBlogPage() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Data Strategy</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            The Hidden Problem in Your Data Pipeline
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            YTVidHub can download any language, but we must talk about the quality of the data you actually get.
          </p>
          <p className="text-sm text-slate-400 mt-4">By YTVidHub Engineering · Oct 16, 2025</p>
        </header>

        {/* Feature image */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/Conceptual diagram illustrating.png"
              alt="Conceptual diagram illustrating low accuracy in auto-generated subtitles for complex languages"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Intro */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            As the developer of YTVidHub, we are frequently asked: <strong>&quot;Do you support languages other than English?&quot;</strong> The answer is a definitive <strong>Yes.</strong>
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Our <Link href="/" className="text-blue-600 hover:underline font-medium">batch YouTube subtitle downloader</Link> accesses all available subtitle files provided by YouTube—Spanish, German, Japanese, and crucial languages like Mandarin Chinese.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            However, this comes with a major warning: <strong className="italic">The ability to download is not the same as the ability to use.</strong> For researchers and data analysts, the quality of the data inside the file creates the single biggest bottleneck in their workflow.
          </p>
        </article>

        {/* Quality Tiers */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Three Data Quality Tiers
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Your data analysis success depends entirely on knowing which tier you are downloading.
          </p>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50">
              <h4 className="font-semibold text-emerald-900 mb-1">Tier 1: The Reliable Gold Standard</h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Manually uploaded captions prepared by the creator. Verified for accuracy and the best data source for LLM fine-tuning or research.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50">
              <h4 className="font-semibold text-amber-900 mb-1">Tier 2: The Unreliable ASR Source</h4>
              <p className="text-sm text-amber-700 leading-relaxed mb-3">
                YouTube&apos;s Automatic Speech Recognition. While good for English, it fails dramatically in niche or non-Western languages.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-amber-600">
                <span>· Complex Tonal Languages</span>
                <span>· Accents &amp; High Speed</span>
                <span>· ~85% Accuracy Cap</span>
                <span>· Manual Cleaning Required</span>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50">
              <h4 className="font-semibold text-rose-900 mb-1">Tier 3: The Error Multiplier</h4>
              <p className="text-sm text-rose-700 leading-relaxed">
                Auto-translated captions. These translate already error-prone ASR files, merely multiplying the mistakes. Avoid for all serious applications.
              </p>
            </div>
          </div>
        </article>

        {/* Real Cost */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Real Cost of Cleaning
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The time you save by bulk downloading is often lost 10x over in the necessary cleaning process.
          </p>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">1. The SRT Formatting Mess</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-2">SRT files are for players, not data scientists. They contain:</p>
              <ul className="text-sm text-slate-500 space-y-1 font-mono">
                <li>· Timecode debris (00:00:03 -- 00:00:06)</li>
                <li>· Timing-based text fragmentation</li>
                <li>· Non-speech tags like [Music] or (Laughter)</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">2. Garbage In, Garbage Out</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">
                For academic research or competitive analysis, inaccurate data leads to flawed conclusions. If your Chinese transcript contains misidentified characters due to ASR errors, your sentiment analysis will fail.
              </p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Building a Solution for Usable Data
            </h2>
            <p className="text-slate-400 mb-4">
              We solve the problem of access. Now, we are solving the problem of <strong className="text-blue-400">Accuracy</strong> and <strong className="text-blue-400">Ready-to-use Formats</strong>.
            </p>
            <p className="text-slate-500 mb-8 text-sm">
              We are working on a Pro service for near human-level transcription. Meanwhile, try our <Link href="/" className="text-blue-400 hover:underline">playlist subtitle downloader</Link> for bulk processing.
            </p>
            <Link
              href="mailto:franklinjobs617@gmail.com"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Join Mailing List for Updates
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-600 hover:underline">Back to Bulk Downloader →</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
