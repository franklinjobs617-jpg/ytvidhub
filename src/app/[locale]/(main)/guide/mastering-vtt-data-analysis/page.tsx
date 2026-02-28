"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function MasteringVttAnalysisGuide() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Developer Technical Guide</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Mastering Clean VTT Data
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            If you&apos;re reading this, you&apos;re past the point of casual YouTube viewing. You understand that video subtitles are not just captions; they are <strong>raw, structured data</strong>.
          </p>
        </header>

        {/* VTT Quality Crisis */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            1. The VTT Data Quality Crisis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The standard WebVTT (<code>.vtt</code>) file downloaded from most sources is toxic to a clean database. It contains layers of metadata, timecodes, and ASR noise markers that destroy the purity of the linguistic data.
          </p>

          <div className="rounded-xl bg-slate-900 p-6 mb-8 overflow-x-auto">
            <pre className="font-mono text-sm text-blue-300 leading-relaxed">
              <code>{`WEBVTT
Kind: captions
Language: en

1:23.456 --> 1:25.789 align:start position:50%
[Music]

1:26.001 --> 1:28.112
>> Researcher: Welcome to the data hygiene`}</code>
            </pre>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Your time is the most expensive variable in this equation. If you are still writing regex scripts to scrub this debris, your methodology is inefficient. The solution isn&apos;t better cleaning scripts; it&apos;s better extraction.
          </p>

          <div className="p-5 rounded-xl border border-blue-100 bg-blue-50 mb-8">
            <h4 className="font-semibold text-blue-900 mb-1">Real-World Performance Data</h4>
            <p className="text-sm text-blue-800 leading-relaxed italic">
              &quot;On a corpus of 50 technical conference talks, raw files required 5.1s per file for scrubbing. YTVidHub&apos;s clean output dropped this to 0.3s—a 17x throughput gain allowing for datasets 5x larger in the same timeframe.&quot;
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/ytvidhub-raw-vtt-vs-clean-vtt-comparison.webp"
              alt="Side-by-side comparison of a raw, messy WebVTT file and the clean VTT output from the YTVidHub extractor."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* VTT vs SRT */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            2. WebVTT vs. SRT
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The choice between <code>.vtt</code> and <code>.srt</code> is crucial for HTML5 media players and advanced data analysis.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">Feature</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">SRT (.srt)</th>
                  <th className="py-3 px-4 text-left font-semibold text-blue-600">WebVTT (.vtt)</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">Structure</td>
                  <td className="py-3 px-4">Index &amp; Timecode</td>
                  <td className="py-3 px-4">Timecode + <strong>Optional Metadata</strong></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">Punctuation</td>
                  <td className="py-3 px-4">Basic</td>
                  <td className="py-3 px-4 font-semibold">Supports Advanced Markers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Standard</td>
                  <td className="py-3 px-4">Informal</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold">W3C STANDARD</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/ytvidhub-vtt-download-clean-mode-settings.webp"
              alt="Screenshot showing the YTVidHub interface where users select the VTT subtitle format and activate the Clean Mode option."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Bulk Downloader Strategies */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            3. Bulk Downloader Strategies
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Your research project requires not one VTT file, but one hundred. This is where the YouTube Data API becomes a catastrophic workflow bottleneck.
          </p>
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50 mb-8">
            <h4 className="font-semibold text-amber-900 mb-1">Critical Insight: The API Quota Wall</h4>
            <p className="text-sm text-amber-700 leading-relaxed italic">
              &quot;Relying on the official API for bulk acquisition is a flawed O(N²) solution. You pay quota dollars per request AND pay developers to write scrubbing scripts that YTVidHub performs internally for free.&quot;
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/ytvidhub-bulk-playlist-vtt-downloader.webp"
              alt="Visual representation of the bulk subtitle downloader processing a YouTube playlist URL into multiple, clean VTT files."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Step-by-Step Guide */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            4. Step-by-Step Guide
          </h2>
          <ol className="space-y-6">
            {[
              { title: "Input the Target", desc: "Paste the URL of a single video, or paste a Playlist URL for recursive harvesting of all video IDs." },
              { title: "Configure Output", desc: "Set target language, choose VTT format, and ensure the 'Clean Mode' toggle is active." },
              { title: "Process & Notify", desc: "For large batches, our server processes asynchronously. You'll receive a notification when the package is ready." },
              { title: "Structured Data Delivery", desc: "The final ZIP contains pre-cleaned VTT files, logically organized for your processing scripts." },
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

        {/* VTT Output */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            5. The VTT Output
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { title: "Tokenization", desc: "Feed directly into custom LLM pipelines without wasting tokens on timecode noise." },
              { title: "Topic Modeling", desc: "Identify dominant themes across clusters unimpeded by technical structural junk." },
              { title: "JSON Export", desc: "Easily convert the sanitized VTT into JSON objects for database storage." },
            ].map((card, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{card.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/clean-vtt-to-json-output-structure.webp"
              alt="Example of clean VTT data converted into a structured JSON object for data analysis."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Stop Scrapers, Start Analyzing
            </h2>
            <p className="text-slate-400 mb-8">
              Extraction built by data scientists, for data scientists. Unlock bulk VTT downloads and clean mode today.
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Start Your Bulk Download
            </Link>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
