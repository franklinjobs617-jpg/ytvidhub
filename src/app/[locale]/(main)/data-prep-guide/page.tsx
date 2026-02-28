"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import DataPrepGuideSchema from "@/components/seo/DataPrepGuideSchema";

export default function DataPrepGuidePage() {
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
      <DataPrepGuideSchema />

      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Engineering Blog: Subtitle Data Prep</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            LLM Data Preparation Mastery Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Mastering bulk extraction, cleaning noisy ASR data, and structuring output for modern AI pipelines.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <img src="./image/icon.webp" className="w-8 h-8 rounded-full border border-slate-200" alt="Franklin Jobs" />
              <span>Franklin Jobs</span>
            </div>
            <span>Updated Oct 2025</span>
            <span>8 Min Read</span>
          </div>
        </header>

        {/* 1. Hidden Cost */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">The Hidden Cost of Dirty Data</h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8">
            <p>
              If you are looking to scale your LLM or NLP projects using real-world conversational data from YouTube, you know the hidden cost isn&apos;t just time—it&apos;s the <strong>quality of your training set</strong>.
            </p>
            <p>
              We built <Link href="/" className="text-blue-600 hover:underline">YTVidHub</Link> because generic subtitle downloaders fail at the critical second step: <strong>data cleaning</strong>. This guide breaks down exactly how to treat raw transcript data to achieve production-level readiness using our <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-600 hover:underline">bulk subtitle extraction tools</Link>.
            </p>
          </div>
        </article>

        {/* 2. Pipeline */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">Why Raw SRT Files Slow Down Your Pipeline</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Many tools offer bulk download, but they often deliver messy output. For Machine Learning, this noise can be catastrophic, leading to poor model performance and wasted compute cycles.
          </p>
          <div className="space-y-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Timestamp Overload</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Raw SRT files are riddled with time codes that confuse tokenizers and inflate context windows unnecessarily.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Speaker Label Interference</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Automatically inserted speaker tags (e.g., [MUSIC], [SPEAKER_01]) need removal or intelligent tagging.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Accuracy Discrepancies</h3>
              <p className="text-sm text-slate-500 leading-relaxed">The challenge of automatically generated subtitles requires a robust verification layer.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="./image/data-prep-pipeline-flowchart.webp" alt="LLM data preparation pipeline flowchart" className="w-full h-auto" />
            <p className="text-center text-xs text-slate-400 py-3">Figure 1: Production Pipeline Architecture</p>
          </div>
        </article>

        {/* 3. Structured Data */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">From Bulk Download to Structured Data</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The key to efficiency is integrating the download and cleaning steps into a seamless pipeline. This is where a dedicated tool like our <Link href="/youtube-subtitle-downloader" className="text-blue-600 hover:underline">YouTube subtitle downloader</Link> shines over managing complex custom scripts.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Format Analysis</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Comparing SRT vs VTT vs TXT specifically for transformer-based model ingestion.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">JSON Normalization</h3>
              <p className="text-sm text-slate-500 leading-relaxed">How we convert non-standard ASR output into machine-readable JSON structures.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img src="./image/subtitle-format-comparison-table.webp" alt="SRT vs VTT vs TXT comparison" className="w-full h-auto" />
            <p className="text-center text-xs text-slate-400 py-3">Figure 2: Subtitle Format Comparison Matrix</p>
          </div>
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">Pro Tip from YTVidHub</p>
            <p className="text-slate-900 font-medium leading-relaxed">
              &quot;For most modern LLM fine-tuning, a clean, sequential TXT file (like our Research-Ready TXT) is superior to timestamped files. Focus on data density and semantic purity, not metadata overhead.&quot;
            </p>
          </div>
        </article>

        {/* 4. RAG Application */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">RAG Systems Application</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            One of the most powerful applications of clean, bulk transcript data is in building robust Retrieval-Augmented Generation (RAG) systems. By feeding a large corpus into a vector database, you can provide your LLM with real-time context.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img src="./image/llm-rag-data-injection.webp" alt="RAG system workflow" className="w-full h-auto" />
            <p className="text-center text-xs text-slate-400 py-3">Figure 3: RAG Injection Architecture</p>
          </div>
        </article>

        {/* 5. Technical Q&A */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Technical Q&amp;A</h2>
          <div className="space-y-5">
            {[
              { q: "Why is data cleaning essential for LLMs?", a: "LLMs are sensitive to 'noise' in data. Timestamps and speaker tags increase token consumption and can mislead the model's understanding of sentence structure and flow. Clean data leads to better training efficiency and model performance." },
              { q: "What is the best format for fine-tuning?", a: "Clean TXT is generally best for fine-tuning as it maximizes data density. For RAG systems, JSON or VTT may be preferred to maintain source traceability." },
              { q: "How do you handle ASR noise in YouTube transcripts?", a: "Remove timestamps, speaker labels ([MUSIC], [SPEAKER_01]), and metadata tags. Focus on preserving semantic content while eliminating formatting artifacts." },
              { q: "What's the difference between SRT and clean TXT for AI training?", a: "SRT files contain timestamps and formatting that increase token count without adding semantic value. Clean TXT maximizes data density and reduces noise." },
              { q: "How much data do I need for effective LLM fine-tuning?", a: "It depends on your use case, but generally 10,000-100,000 high-quality examples work well for domain adaptation. YouTube provides vast amounts of conversational data across all domains." },
              { q: "Can I use YouTube data for commercial AI applications?", a: "Always check YouTube's terms of service and the specific video licenses. For research and educational purposes, transcript extraction is generally acceptable." },
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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Master Your Data Protocol</h2>
            <p className="text-slate-400 mb-8">Join elite research teams using clean data for the next generation of LLMs. Industrial extraction starts here.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" onClick={handleAction} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Start Bulk Extraction
              </Link>
              <Link href="/bulk-youtube-subtitle-downloader" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">
                Platform Guide
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-500">Optimized for: JSONL · CSV · TXT · PARQUET</p>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
