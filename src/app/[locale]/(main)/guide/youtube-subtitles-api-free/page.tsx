"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function YouTubeApiAlternativeGuide() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Developer Documentation</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Ditch the API. Get Subtitles Directly.
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            API quotas and complexity are major hurdles for data projects. Discover a professional, no-API alternative to get structured JSON or clean TXT data instantly.
          </p>
        </header>

        {/* API Bottleneck */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The YouTube API Bottleneck
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The official YouTube Data API v3 is powerful but introduces significant friction for subtitle-focused projects. Here are the three biggest pain points developers face.
          </p>
          <div className="space-y-5 mb-8">
            {[
              { title: "High Quota Costs", desc: "Every captions.download call costs 200 quota units. With a daily limit of 10,000 units, you can only fetch ~50 subtitle files per day before hitting the wall." },
              { title: "Complex OAuth Setup", desc: "Downloading captions requires OAuth 2.0 user authorization—not just an API key. This adds significant development overhead for a simple text extraction task." },
              { title: "Aggressive Rate Limiting", desc: "Burst requests trigger 403 errors and temporary bans. Bulk extraction of 1,000+ videos becomes a multi-day, error-prone process." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/youtube-api-quota-vs-export-cost.webp" alt="YouTube API quota costs vs direct export" className="w-full h-auto" />
          </div>
        </article>

        {/* No-API Alternative */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The No-API Alternative
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Skip the API entirely. Our tool extracts subtitle data directly and delivers it in developer-ready formats—no keys, no OAuth, no quota limits.
          </p>
          <div className="space-y-5 mb-8">
            {[
              { title: "Structured JSON Output", desc: "Get subtitle data as clean JSON with segment IDs, timestamps, and text fields—ready for direct injection into vector databases or LLM prompt chains." },
              { title: "Built for Bulk Ingestion", desc: "Paste a playlist or channel URL and extract subtitles from hundreds of videos in a single operation. No rate limits, no 403 errors." },
              { title: "Guaranteed Clean Data", desc: "Every export runs through our normalization pipeline: BOM stripping, ASR noise removal, and timestamp standardization included by default." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* JSON Structure Preview */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            What Your Data Looks Like
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Every export delivers structured, machine-readable data. No parsing scripts required—just clean JSON ready for your pipeline.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img src="/image/clean-json-data-structure-for-llm.webp" alt="Clean JSON data structure for LLM ingestion" className="w-full h-auto" />
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Developer Tip:</strong> Use our JSON export with segment-level timestamps to build searchable video indexes, RAG knowledge bases, or fine-tuning datasets without any intermediate processing.
            </p>
          </div>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Developer Q&amp;A
          </h2>
          <div className="space-y-5">
            {[
              { q: "How does this avoid YouTube API rate limits?", a: "Our tool doesn't use the YouTube Data API v3 at all. It extracts subtitle data directly, so there are no quota units consumed, no OAuth required, and no 403 rate-limit errors." },
              { q: "Can I extract subtitles in multiple languages?", a: "Yes. If a video has subtitles available in multiple languages, you can select your preferred language or download all available tracks in a single batch operation." },
              { q: "Is this compliant with YouTube's Terms of Service?", a: "Our tool accesses publicly available subtitle data that YouTube makes accessible for video playback. We do not bypass any DRM or access restricted content." },
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
              Stop Fighting the API
            </h2>
            <p className="text-slate-400 mb-8">
              Get structured subtitle data in seconds. No API key, no OAuth, no quota limits.
            </p>
            <Link
              href="/"
              onClick={handleAction}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Start Free Extraction
            </Link>
            <p className="mt-6 text-sm text-slate-500">
              No credit card required · JSON, SRT, TXT exports · Bulk playlist support
            </p>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
