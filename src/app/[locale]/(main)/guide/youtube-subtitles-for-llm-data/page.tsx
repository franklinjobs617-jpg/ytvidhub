"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import {
  Database,
  Zap,
  ShieldCheck,
  FileJson,
  Cpu,
  ArrowRight,
  BarChart3,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";

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
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 text-slate-900 antialiased">
      <main>
        {/* === HERO SECTION === */}
        <section className="relative pt-28 pb-24 overflow-hidden bg-[#0a0c10] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
                  Technical Documentation v2.0
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.95]">
              Scaling AI with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 italic">
                Clean Video Data
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
              Transforming YouTube's unstructured dialogue into high-fidelity
              training corpora for Large Language Models (LLMs). Optimize your
              signal-to-noise ratio at an industrial scale.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 border border-slate-800 px-4 py-2 rounded-lg bg-slate-900/50">
                <CheckCircle2 size={14} className="text-indigo-500" /> GPT-4o
                Ready
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 border border-slate-800 px-4 py-2 rounded-lg bg-slate-900/50">
                <CheckCircle2 size={14} className="text-indigo-500" /> Llama-3
                Optimized
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 border border-slate-800 px-4 py-2 rounded-lg bg-slate-900/50">
                <CheckCircle2 size={14} className="text-indigo-500" /> JSONL /
                Parquet Export
              </div>
            </div>
          </div>
        </section>

        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            {/* === INTRODUCTION: THE DATA GAP === */}
            <section className="max-w-4xl mx-auto mb-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-slate-100"></div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                  Introduction
                </span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-10 text-center uppercase tracking-tight">
                Beyond Static Text: The Power of Conversational Data
              </h2>
              <div className="prose prose-slate max-w-none prose-lg text-slate-600">
                <p>
                  In the current era of LLM development, the quality of{" "}
                  <strong>Instruction Fine-Tuning (IFT)</strong> data is more
                  important than the raw volume of pre-training tokens. While
                  Wikipedia and textbooks provide factual knowledge, they lack
                  the{" "}
                  <strong>
                    nuance of human reasoning, multi-turn problem-solving, and
                    domain-specific vernacular
                  </strong>{" "}
                  found in professional YouTube content.
                </p>
                <p>
                  YouTube subtitles represent a "Conversational Gold Mine."
                  However, standard extractors produce "Dirty Data"—saturated
                  with timestamps, filler words, and broken syntax—which
                  significantly degrades model perplexity.
                </p>
              </div>
            </section>

            {/* === IMAGE 1: TECHNICAL ARCHITECTURE === */}
            <section className="mb-32">
              <div className="bg-slate-50 rounded-[3rem] p-6 md:p-12 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Layers size={200} />
                </div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-6">
                      The YTVidHub Sanitization Pipeline
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Our proprietary extraction logic doesn't just "scrape"—it
                      sanitizes. We handle the complex task of removing
                      non-lexical artifacts to produce high-signal text datasets
                      ready for tokenization.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Metadata stripping (removing headers, footers, ad-tags)",
                        "Non-lexical sound effect filtering (e.g., [Music], [Applause])",
                        "Time-stamp normalization and alignment",
                        "Bulk ingestion via Playlist and Channel crawlers",
                      ].map((text, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm font-medium text-slate-700"
                        >
                          <Zap
                            size={16}
                            className="text-indigo-600 mt-1 shrink-0"
                          />{" "}
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* IMAGE PLACEHOLDER */}
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 overflow-hidden">
                    <img
                      src="/image/llm-data-pipeline-architecture.webp"
                      alt="Technical diagram of the YTVidHub sanitization pipeline showing raw YouTube URL conversion to clean JSONL dataset"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* === PHASE 1: MASSIVE SCALE INGESTION === */}
            <section className="mb-32 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  {/* IMAGE PLACEHOLDER */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <img
                      src="/image/bulk-downloader-ui-llm.webp"
                      alt="YTVidHub Bulk Downloader interface processing 500+ YouTube video URLs simultaneously for AI dataset preparation"
                      className="relative rounded-3xl shadow-2xl border border-slate-200 w-full h-auto"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-black mb-4 uppercase tracking-[0.2em] text-xs italic">
                    Phase 01: Ingestion
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-black uppercase text-slate-900 mb-8 leading-tight">
                    Industrial-Scale <br /> Batch Processing
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    Researchers building domain-specific models (e.g., Legal AI
                    or Medical LLMs) cannot afford manual data collection.
                    YTVidHub Pro allows for{" "}
                    <strong>concurrency-safe ingestion</strong> of thousands of
                    video links.
                  </p>
                  <div className="p-8 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600">
                    <h4 className="font-black text-slate-900 uppercase text-sm mb-2">
                      Researcher Advantage
                    </h4>
                    <p className="text-sm text-slate-600 italic leading-relaxed">
                      "Using YTVidHub, we reduced our data preparation time for
                      our coding-assistant LLM by 85%. Extracting 1,200 hours of
                      technical tutorials took minutes, not days."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* === PHASE 2: NOISE VS SIGNAL === */}
            <section className="mb-32 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 font-black mb-4 uppercase tracking-[0.2em] text-xs italic">
                    Phase 02: Sanitization
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-black uppercase text-slate-900 mb-8 leading-tight">
                    Maximizing <br /> Token Efficiency
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    Training on "dirty" transcripts wastes tokens and increases
                    compute costs. Every "um," "uh," or timestamp is a token
                    that costs money but provides zero semantic value. Our{" "}
                    <strong>Clean Transcript Logic</strong> ensures every token
                    contributes to the model's intelligence.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 border border-slate-100 rounded-2xl">
                      <BarChart3 className="text-indigo-600 mb-4" size={24} />
                      <p className="text-2xl font-black text-slate-900">-40%</p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Token Overhead
                      </p>
                    </div>
                    <div className="p-6 border border-slate-100 rounded-2xl">
                      <Filter className="text-indigo-600 mb-4" size={24} />
                      <p className="text-2xl font-black text-slate-900">
                        99.2%
                      </p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Signal Accuracy
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  {/* IMAGE PLACEHOLDER: Before vs After */}
                  <img
                    src="/image/transcript-cleaning-comparison.webp"
                    alt="Comparison of raw YouTube VTT subtitles vs YTVidHub's clean TXT output optimized for LLM tokenization"
                    className="rounded-[2rem] shadow-xl w-full h-auto border border-slate-100"
                  />
                </div>
              </div>
            </section>

            {/* === DEEP TECH: FORMATTING FOR RLHF & FINE-TUNING === */}
            <section className="mb-32 bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-6xl font-display font-black uppercase mb-12 italic tracking-tighter">
                  Ready for the Training Loop
                </h2>
                <p className="text-slate-400 text-lg mb-16 leading-relaxed">
                  We support modern data architectures. Whether you are using{" "}
                  <strong>Supervised Fine-Tuning (SFT)</strong> or building
                  preference models for <strong>RLHF</strong>, our exports fit
                  seamlessly into your pipeline.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                    <FileJson className="text-indigo-400 mb-6" size={32} />
                    <h4 className="text-xl font-bold uppercase mb-4 tracking-tight">
                      Structured JSONL
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Perfect for OpenAI, Anthropic, or Mistral API fine-tuning.
                      Each video becomes an atomic object with metadata and
                      clean content.
                    </p>
                  </div>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                    <Cpu className="text-indigo-400 mb-6" size={32} />
                    <h4 className="text-xl font-bold uppercase mb-4 tracking-tight">
                      Pure Markdown / TXT
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Ideal for RAG (Retrieval-Augmented Generation) systems.
                      Native support for chunking and embedding in vector
                      databases like Pinecone or Milvus.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* === FINAL CALL TO ACTION === */}
            <section className="max-w-4xl mx-auto text-center py-20">
              <div className="inline-block p-4 bg-indigo-50 rounded-2xl mb-8">
                <Database size={40} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display uppercase font-black text-slate-900 mb-8">
                Fuel Your Model Today
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 font-medium">
                The difference between a "good" model and a "great" model is the
                data. Don't settle for noisy crawls.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/"
                  onClick={handleAction}
                  className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Start Bulk Extraction <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="bg-white text-slate-900 border-2 border-slate-200 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Enterprise & Pro Plans
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
