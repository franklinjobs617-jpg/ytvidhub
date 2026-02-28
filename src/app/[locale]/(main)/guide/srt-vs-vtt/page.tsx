"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import SrtVsVttSchema from "@/components/seo/SrtVsVttSchema";

export default function SrtVsVttTechnicalMastery() {
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
      <SrtVsVttSchema />
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Technical Specification</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            SRT vs VTT: The Complete Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            A comprehensive technical analysis of <strong className="text-slate-700">SubRip (SRT) and WebVTT formats</strong> for AI training, bulk subtitle extraction, and multilingual content localization. Discover why <Link href="/" className="text-blue-600 hover:underline">professionals choose SRT for clean data pipelines</Link> while VTT powers interactive web experiences.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "99.8%", label: "SRT Parser Compatibility" },
              { value: "Zero", label: "Metadata Overhead" },
              { value: "100K+", label: "Bulk Extraction Limit" },
              { value: "20+", label: "Export Formats" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                <div className="text-xl font-bold text-slate-900">{item.value}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Overview */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The DNA of Digital Captions: SRT &amp; WebVTT
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            In the realm of <strong>subtitle data extraction for machine learning</strong>, the choice between SRT (SubRip) and WebVTT extends far beyond simple playback compatibility. SRT remains the <strong>universal standard for bulk transcription pipelines</strong> due to its minimalist, predictable structure. WebVTT, while essential for modern web accessibility, introduces CSS styling and metadata that can create noise in AI training datasets.
          </p>
          <div className="space-y-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">For AI/ML Researchers</h4>
              <p className="text-sm text-slate-500 leading-relaxed">SRT provides the cleanest dialogue corpus with maximum signal-to-noise ratio, essential for fine-tuning LLMs and building RAG systems.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">For Web Developers</h4>
              <p className="text-sm text-slate-500 leading-relaxed">VTT enables rich, accessible video experiences with positioning, styling, and chapter markers for enhanced user engagement.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/srt-vs-vtt-comparison-matrix.webp" alt="SRT vs VTT comparison" className="w-full h-auto" />
          </div>
        </article>

        {/* Syntax Laboratory */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Syntax Laboratory: Structural Analysis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The fundamental parsing differences that impact <strong>automated data extraction pipelines</strong> and <strong>subtitle converter accuracy</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="rounded-xl bg-slate-900 p-6">
              <p className="text-xs text-slate-400 font-semibold mb-3">.srt Legacy Format</p>
              <pre className="font-mono text-xs text-slate-300 leading-loose">
{`1
00:01:12,450 --> 00:01:15,000
The comma delimiter is mandatory.`}
              </pre>
              <div className="mt-4 space-y-1 text-xs text-slate-500">
                <p>· Comma for milliseconds</p>
                <p>· Often UTF-8 with BOM</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-900 p-6">
              <p className="text-xs text-blue-400 font-semibold mb-3">.vtt Modern Standard</p>
              <pre className="font-mono text-xs text-slate-300 leading-loose">
{`WEBVTT

00:01:12.450 --> 00:01:15.000
The dot delimiter is web-native.`}
              </pre>
              <div className="mt-4 space-y-1 text-xs text-slate-500">
                <p>· Dot for milliseconds</p>
                <p>· Supports CSS classes</p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Technical Note:</strong> When extracting subtitles at scale (10,000+ videos), the SRT format&apos;s consistency ensures <strong>higher parsing success rates</strong>. WebVTT&apos;s flexibility requires additional normalization steps for <strong>AI training datasets</strong>.
            </p>
          </div>
        </article>

        {/* Technical Deep Dive */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Technical Deep Dive
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { title: "Timestamping", points: ["SRT: Comma (00:01:12,450)", "VTT: Dot (00:01:12.450)", "Conversion errors cause AI misalignment", "System normalizes to ms precision"] },
              { title: "Encoding & BOM", points: ["SRT often includes BOM (Byte Order)", "BOM causes parsing failures in Python", "VTT follows modern UTF-8 standards", "Auto-BOM stripping is essential"] },
              { title: "Error Recovery", points: ["SRT: Strict sequence reliance", "VTT: Cue ID fragmented parsing", "Overlapping timestamp logic", "LLM-ready validation mandatory"] },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-3">{item.title}</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  {item.points.map((p, j) => (
                    <li key={j}>· {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-slate-900 text-sm text-slate-300 leading-relaxed">
            When using our <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-400 hover:underline">bulk YouTube subtitle extractor</Link>, the system automatically detects format inconsistencies, normalizes timestamps to milliseconds precision, and outputs clean SRT files optimized for machine learning.
          </div>
        </article>

        {/* Comparison Matrix */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Technical Comparison Matrix
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">Parameter</th>
                  <th className="py-3 px-4 text-center font-semibold text-slate-900">SRT (SubRip)</th>
                  <th className="py-3 px-4 text-center font-semibold text-blue-600">WebVTT</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ["Timestamp Format", "00:01:12,450 (comma)", "00:01:12.450 (dot)"],
                  ["Styling & Positioning", "Minimal HTML tags", "Full CSS classes"],
                  ["Metadata Support", "None (Pure text)", "Headers & Chapters"],
                  ["LLM Data Signal", "99.8% Quality", "88.2% Quality"],
                  ["Browser Native", "Requires Library", "Native <track>"],
                  ["BOM Byte Order", "Commonly present", "Rarely used"],
                  ["Processing Speed", "Max Efficiency", "Validation Heavy"],
                  ["Error Recovery", "Format Sensitive", "Cue ID Robust"],
                ].map(([param, srt, vtt], i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 px-4 font-medium text-slate-900">{param}</td>
                    <td className="py-3 px-4 text-center font-mono text-xs">{srt}</td>
                    <td className="py-3 px-4 text-center font-mono text-xs">{vtt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* When to Choose */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">When to Choose SRT</h4>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>· AI/ML training datasets</li>
                <li>· Bulk extraction for research</li>
                <li>· Multilingual translation projects</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">When to Choose WebVTT</h4>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>· Modern web video implementation</li>
                <li>· Web accessibility compliance</li>
                <li>· Styled captions &amp; positioning</li>
              </ul>
            </div>
          </div>
        </article>

        {/* AI Research Edge */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Clean Dialogue is Competitive Edge
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Elite AI labs standardize on SRT for LLM fine-tuning because <strong>every token costs money.</strong> SRT&apos;s minimal structure prevents &quot;token bloat&quot; from metadata, ensuring models train on pure dialogue signals.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { stat: "63%", label: "Preprocessing reduction" },
              { stat: "2.4M", label: "Files processed monthly" },
              { stat: "98.7%", label: "Success Rate" },
              { stat: "47", label: "Languages" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                <div className="text-xl font-bold text-slate-900">{item.stat}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h4 className="font-semibold text-slate-900 mb-2">Case Study: Global Dataset Production</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our <Link href="/" className="text-blue-600 hover:underline">bulk subtitle extraction pipeline</Link> processed 2.4 million YouTube videos across 47 languages. The consistent SRT format reduced preprocessing complexity by approximately 14 days compared to handling mixed VTT metadata.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/srt-format-technical-breakdown.webp" alt="Subtitle technical breakdown" className="w-full h-auto" />
          </div>
        </article>

        {/* Extraction Workflow */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Industrial Bulk Workflow
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Our optimized pipeline for massive scale data extraction and deployment.
          </p>
          <ol className="space-y-6">
            {[
              { title: "Intelligent Ingestion", desc: "Paste YouTube playlist URLs or video IDs into our bulk subtitle downloader. Automatic language detection and format recognition." },
              { title: "Normalization Engine", desc: "Our system fixes timestamp inconsistencies, removes BOM characters, and standardizes formatting—converting VTT to clean SRT." },
              { title: "Vector Deployment", desc: "Export to JSONL for Hugging Face or direct integration with vector databases via webhook automation." },
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

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Expert Q&amp;A
          </h2>
          <div className="space-y-5">
            {[
              { q: "What is the main difference between SRT and VTT?", a: "SRT uses comma separators for milliseconds (00:01:12,450) while VTT uses dots (00:01:12.450). VTT also supports CSS styling and metadata, while SRT is purely text-based, making it ideal for AI training and bulk processing." },
              { q: "Which format is better for AI training?", a: "SRT is generally better for AI training because it has minimal metadata overhead and provides cleaner text data with 99.8% signal quality. The lack of styling information means more pure dialogue content for machine learning models." },
              { q: "Can I convert between SRT and VTT formats?", a: "Yes, you can convert between formats, but be aware that VTT's styling and metadata will be lost when converting to SRT. Our bulk subtitle downloader can automatically convert between formats while preserving essential timing information." },
              { q: "Which format has better browser support?", a: "VTT has native browser support through the HTML5 track element, while SRT requires conversion or JavaScript libraries for web playback. For web video players, VTT is the preferred choice." },
              { q: "How do I choose the right format for my project?", a: "Choose SRT for AI training, bulk data processing, and offline video editing. Choose VTT for web video players, accessibility features, and when you need styling or positioning control." },
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
              Master Your Data Pipeline
            </h2>
            <p className="text-slate-400 mb-8">
              The difference between a messy dataset and a production-ready knowledge base is the precision of your extraction tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                onClick={handleAction}
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Start Free Extraction
              </Link>
              <Link
                href="/data-prep-guide"
                className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Read LLM Data Prep Guide
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              No credit card required · 100 Free videos monthly · Export to JSONL, CSV, TXT
            </p>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
