"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function DataPrepToolkitPage() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Advanced Data Engineering</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            The Advanced Data Prep Toolkit
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            The definitive guide for researchers and developers. Master bulk processing, clean raw transcripts, and bypass API limits with structured JSON output.
          </p>
        </header>

        {/* Workflow Inefficiency */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Why Your Current Workflow Is Inefficient
          </h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8">
            <p>
              If you&apos;re a developer, researcher, or data scientist, you know that raw subtitle data from YouTube is useless. It&apos;s a swamp of ASR errors, messy formatting, and broken timestamps. This guide is for those who need <strong>advanced YouTube Subtitle Data Preparation</strong>—the tools and methods to convert noise into clean, structured data ready for LLMs, databases, and large-scale analysis.
            </p>
            <p>
              You cannot manually clean thousands of files. You also can&apos;t afford the YouTube Data API quota limits. If you need data from 50+ videos, you need <strong>batch processing</strong>. Our toolkit centers around resolving this efficiency bottleneck.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h4 className="font-semibold text-slate-900 mb-1">The Case for a Truly Clean Transcript</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              A <strong>YouTube transcript without subtitles</strong> is often just raw output riddled with errors. Our method ensures the final output is 99% clean, standardized text, perfect for training AI models.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/An infographic illustrating the advanced workflow.webp"
              alt="Workflow diagram illustrating advanced YouTube data preparation from a Playlist to structured output."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Batch Processing */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Power of Batch Processing
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Downloading subtitles from an entire playlist is the only way to scale your project. Manual URL-by-URL extraction creates insurmountable bottlenecks.
          </p>
          <div className="space-y-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Recursive Ingestion</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Input the playlist URL. Our tool queues every video in the list automatically, harvesting links recursively.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Structured Output</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Developers demand structured data. We offer <strong>JSON export</strong> with segment IDs, acting as a free API alternative.</p>
            </div>
          </div>
          <ol className="space-y-6">
            {[
              { title: "Activate Bulk Mode", desc: "Switch to playlist/channel ingestion mode." },
              { title: "JSON Selection", desc: "Choose structured fields to bypass parsing scripts." },
              { title: "ZIP Packing", desc: "Initiate archive for massive dataset portability." },
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

        {/* API Bypassing */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Bypassing API Limits
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Why pay hundreds of dollars in API quota when you only need the text? We provide superior output compared to raw extraction methods.
          </p>
          <div className="space-y-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">The yt-dlp Alternative</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                For power users, yt-dlp is excellent, but it still requires cleaning scripts. Our tool automates the cleaning <em>before</em> the download, saving days of manual scripting.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">Real-World Impact</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { val: "80%", label: "Cost Reduction", desc: "Saved $500/mo on API costs" },
                  { val: "5min", label: "vs 3hrs", desc: "100-video playlist automation" },
                  { val: "95%", label: "Automated", desc: "Minimized manual work" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-lg font-bold text-blue-600">{item.val}</div>
                    <div className="text-xs font-semibold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Summarizer Myth */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Summarizer Myth
          </h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8">
            <p>
              Many people search for a <strong>youtube video summarizer ai without subtitles</strong>. This logic is fundamentally flawed. Any AI summarizer is only as good as the input data.
            </p>
            <p>
              If your input is a raw, ASR-generated transcript, your summary will be riddled with errors. <strong>Our core value is providing the clean input that makes AI tools actually useful.</strong>
            </p>
          </div>
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50 mb-8">
            <h4 className="font-semibold text-amber-900 mb-1">Garbage In, Garbage Out</h4>
            <p className="text-sm text-amber-700 leading-relaxed italic">
              &quot;When an AI summarizer is fed raw ASR transcripts, it cannot distinguish between meaningful content and noise. Misidentified terms and run-on sentences are interpreted as factual.&quot;
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/ytvidhub-bulk-playlist-json-export-for-developers.webp"
              alt="JSON Export feature"
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Conclusion */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Conclusion
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            Data prep is the invisible 90% of any successful data project. Stop settling for messy output that costs you time and money. Our toolkit is designed by professionals, for professionals.
          </p>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Technical Q&amp;A
          </h2>
          <div className="space-y-5">
            {[
              { q: "What makes JSON better for developers?", a: "JSON provides key-value pairs (timestamps, text, segment IDs) that allow developers to programmatically inject YouTube data into vector databases or LLM prompt chains without complex regex parsing." },
              { q: "Can I process more than 1,000 URLs?", a: "Yes. Our Pro and Researcher plans allow for large-scale ingestion. If you need 10,000+ URLs processed, please contact our support for a custom enterprise solution with dedicated infrastructure." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Scale Your Data Pipeline
            </h2>
            <p className="text-slate-400 mb-8">
              Stop wrestling with API quotas. Unlock advanced bulk and JSON features now.
            </p>
            <Link
              href="/"
              onClick={handleAction}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Unlock Pro Features
            </Link>
            <p className="mt-6 text-sm text-slate-500">
              Export to: JSONL · CSV · TXT · PARQUET
            </p>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            <Link href="/data-prep-guide" className="text-blue-600 hover:underline">Advanced LLM Data Ingestion Guide →</Link>
          </p>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
