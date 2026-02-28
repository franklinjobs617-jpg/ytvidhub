"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function LLMTechnicalGuide() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Technical Documentation</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Scaling AI with Clean Video Data
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Transforming YouTube&apos;s unstructured dialogue into high-fidelity training corpora for Large Language Models (LLMs). Optimize your signal-to-noise ratio at an industrial scale.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "GPT-4o", label: "Ready" },
              { value: "Llama-3", label: "Optimized" },
              { value: "JSONL", label: "Parquet Export" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                <div className="text-xl font-bold text-slate-900">{item.value}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Introduction */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Beyond Static Text: The Power of Conversational Data
          </h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8">
            <p>
              In the current era of LLM development, the quality of <strong>Instruction Fine-Tuning (IFT)</strong> data is more important than the raw volume of pre-training tokens. While Wikipedia and textbooks provide factual knowledge, they lack the <strong>nuance of human reasoning, multi-turn problem-solving, and domain-specific vernacular</strong> found in professional YouTube content.
            </p>
            <p>
              YouTube subtitles represent a &quot;Conversational Gold Mine.&quot; However, standard extractors produce &quot;Dirty Data&quot;—saturated with timestamps, filler words, and broken syntax—which significantly degrades model perplexity.
            </p>
          </div>
        </article>

        {/* Pipeline Architecture */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The YTVidHub Sanitization Pipeline
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Our extraction logic doesn&apos;t just &quot;scrape&quot;—it sanitizes. We handle the complex task of removing non-lexical artifacts to produce high-signal text datasets ready for tokenization.
          </p>
          <div className="space-y-3 mb-8">
            {[
              "Metadata stripping (removing headers, footers, ad-tags)",
              "Non-lexical sound effect filtering (e.g., [Music], [Applause])",
              "Time-stamp normalization and alignment",
              "Bulk ingestion via Playlist and Channel crawlers",
            ].map((text, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm text-slate-700">
                · {text}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/llm-data-pipeline-architecture.webp" alt="Technical diagram of the YTVidHub sanitization pipeline showing raw YouTube URL conversion to clean JSONL dataset" className="w-full h-auto" />
          </div>
        </article>

        {/* Phase 1: Batch Processing */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Phase 01: Ingestion</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Industrial-Scale Batch Processing
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Researchers building domain-specific models (e.g., Legal AI or Medical LLMs) cannot afford manual data collection. YTVidHub Pro allows for <strong>concurrency-safe ingestion</strong> of thousands of video links.
          </p>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h4 className="font-semibold text-slate-900 mb-2">Researcher Advantage</h4>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              &quot;Using YTVidHub, we reduced our data preparation time for our coding-assistant LLM by 85%. Extracting 1,200 hours of technical tutorials took minutes, not days.&quot;
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/bulk-downloader-ui-llm.webp" alt="YTVidHub Bulk Downloader interface processing 500+ YouTube video URLs simultaneously for AI dataset preparation" className="w-full h-auto" />
          </div>
        </article>

        {/* Phase 2: Token Efficiency */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Phase 02: Sanitization</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Maximizing Token Efficiency
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Training on &quot;dirty&quot; transcripts wastes tokens and increases compute costs. Every &quot;um,&quot; &quot;uh,&quot; or timestamp is a token that costs money but provides zero semantic value. Our <strong>Clean Transcript Logic</strong> ensures every token contributes to the model&apos;s intelligence.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { value: "-40%", label: "Token Overhead" },
              { value: "99.2%", label: "Signal Accuracy" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                <div className="text-xl font-bold text-slate-900">{item.value}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/transcript-cleaning-comparison.webp" alt="Comparison of raw YouTube VTT subtitles vs YTVidHub's clean TXT output optimized for LLM tokenization" className="w-full h-auto" />
          </div>
        </article>

        {/* RLHF & Fine-Tuning */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready for the Training Loop
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            We support modern data architectures. Whether you are using <strong>Supervised Fine-Tuning (SFT)</strong> or building preference models for <strong>RLHF</strong>, our exports fit seamlessly into your pipeline.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">Structured JSONL</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Perfect for OpenAI, Anthropic, or Mistral API fine-tuning. Each video becomes an atomic object with metadata and clean content.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">Pure Markdown / TXT</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ideal for RAG (Retrieval-Augmented Generation) systems. Native support for chunking and embedding in vector databases like Pinecone or Milvus.
              </p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Fuel Your Model Today
            </h2>
            <p className="text-slate-400 mb-8">
              The difference between a &quot;good&quot; model and a &quot;great&quot; model is the data. Don&apos;t settle for noisy crawls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                onClick={handleAction}
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Start Bulk Extraction
              </Link>
              <Link
                href="/pricing"
                className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Enterprise &amp; Pro Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
