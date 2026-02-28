"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function SubtitleExtractorPage() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Engineering Insight</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            The Essential YouTube Subtitle Extractor
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We&apos;ve all been there: needing a quote or transcript, only to fight with clunky tools.
            This is a reliable, lightning-fast extractor that delivers <strong>clean, structured text</strong> every single time.
          </p>
        </header>

        {/* Section 1: Why Your Tool Is Failing */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">1. Why Your Current Subtitle Tool Is Failing You</h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            Most free tools are just scraping raw data. They don&apos;t clean it. If you&apos;re seeing timestamps, speaker notes, or automatic speech recognition (ASR) errors in your final file, your current workflow is fundamentally broken.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8">
            Our extraction process targets the final, official caption track and strips out everything irrelevant. We don&apos;t just &quot;download&quot; — we <strong>sanitize</strong> the data for immediate professional use.
          </p>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">The Right Format for the Job</h3>
          <p className="text-slate-500 leading-relaxed mb-6">
            Your workflow dictates your format. Don&apos;t download an SRT file if all you need is a plain TXT for Large Language Model (LLM) training.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">Extract into Clean TXT</p>
              <p className="text-sm text-slate-500 leading-relaxed">When research or LLM data preparation is the goal, <strong>TXT is king</strong>. Pure text ready for semantic analysis. This is our most requested feature.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">Pro-Grade SRT/VTT</p>
              <p className="text-sm text-slate-500 leading-relaxed">SRT is the industry standard for re-uploading subtitles or video editing. We ensure correct formatting and precise time-alignment.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-2">
            <img
              src="https://ytvidhub.com/image/ytvidhub-clean-txt-research-data.webp"
              alt="Comparison showing raw VTT format data versus the clean TXT output from the YouTube Subtitle Extractor Online."
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-xs text-slate-400 font-medium">
            Figure 1: Side-by-side comparison of a messy, raw subtitle file vs. a clean, research-ready TXT file.
          </p>
        </article>

        {/* Section 2: 3-Step Workflow */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">2. Our 3-Step Extraction Workflow: Fast, Clean, Done.</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Here is the exact workflow I use—and the one the tool follows—to guarantee perfect subtitle extraction every time.
          </p>
          <div className="space-y-5">
            {[
              { step: "Step 1", title: "Input the Video URL", desc: "Paste the YouTube link. The tool instantly detects available subtitle tracks, including both official and community-contributed captions." },
              { step: "Step 2", title: "Choose Your Output Format", desc: "Select SRT, VTT, or Pure TXT. If you choose TXT, our proprietary cleaning algorithm automatically engages to remove all timestamps." },
              { step: "Step 3", title: "Download Your Clean File", desc: "No queues, no sign-ups for basic features. Get your file immediately. We've optimized download speeds for even the longest 4K webinars." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">{item.step}</p>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-blue-200 bg-blue-50">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">Developer Note: User Experience</p>
            <p className="text-slate-700 font-medium italic leading-relaxed">
              &quot;Our latest interface highlights URL input and format selection to ensure the user path is under 10 seconds from landing to file download.&quot;
            </p>
          </div>
        </article>

        {/* Section 3: Accuracy */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">3. Experience Injection: The Accuracy Breakthrough</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            I&apos;ve tested dozens of tools, and the primary failure point is <strong>ASR (Automatic Speech Recognition)</strong> accuracy combined with poor cleaning. If you rely on raw auto-captions, you&apos;re dealing with 15-30% contextual noise.
          </p>

          <div className="p-6 rounded-xl border border-amber-200 bg-amber-50 mb-8">
            <p className="text-xs text-amber-700 font-medium uppercase tracking-wider mb-3">Why &quot;Clean Text&quot; Mode is Non-Negotiable</p>
            <p className="text-slate-700 font-medium italic leading-relaxed mb-4">
              &quot;Our cleaning engine goes beyond simple removal of [Music] or timestamps; it standardizes punctuation and handles line-breaks intelligently to create smooth paragraphs, not broken fragments.&quot;
            </p>
            <div className="p-4 rounded-lg bg-white border border-amber-100">
              <p className="text-xs text-blue-600 font-medium uppercase mb-1">Accuracy Test Data</p>
              <p className="text-sm text-slate-500">Educational video tests showed a 48% reduction in contextual noise post-cleaning compared to raw VTT files.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-2">
            <img
              src="https://ytvidhub.com/image/ytvidhub-5-daily-credits-freemium-show.webp"
              alt="YTVidHub successful download confirmation for extracted subtitles in TXT format."
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-xs text-slate-400 font-medium">
            Successful download confirmation showing file format and size details.
          </p>
        </article>

        {/* Section 4: Beyond Single Files */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">4. Expert Insight: Beyond Single Files</h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            A single-file download tool is fine for casual use, but professionals hit a wall fast. The moment you need to <strong>download an entire YouTube playlist with subtitles</strong> or handle <strong>API integration</strong>, a simple online tool falls apart.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8">
            <strong>Batch processing</strong> is the only way to scale research. Most users don&apos;t realize that manual URL-by-URL extraction creates insurmountable bottlenecks that waste 80% of your engineering time.
          </p>
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Critical View on Single-URL Tools</p>
            <p className="text-slate-600 font-medium italic leading-relaxed">
              &quot;Single-URL extractors are &apos;toys&apos; for casual fans. For data scientists, we&apos;ve implemented recursive playlist harvesting to allow 1000+ URL injections in a single session.&quot;
            </p>
          </div>
        </article>

        {/* Section 5: Conclusion + CTA */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">5. Conclusion</h2>
          <p className="text-slate-500 leading-relaxed mb-8 italic">
            Stop wrestling with raw VTT files. If your goal is clean, usable data from YouTube, you need a professional extraction tool. I&apos;ve built the one I wish I had for years.
          </p>
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16 text-center">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Ready to Get Clean Data?</h3>
            <p className="text-slate-400 mb-8">Extraction built by researchers, for researchers. Try our advanced bulk features today.</p>
            <Link href="/" onClick={handleAction} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Try The Subtitle Extractor
            </Link>
          </div>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Technical Q&amp;A</h2>
          <div className="space-y-5">
            {[
              { q: "What makes this 'Extractor' different from a standard downloader?", a: "Most downloaders just provide the raw file. Our extractor focuses on the 'cleaning' stage—standardizing punctuation, removing speaker cue noise, and handling line-breaks so the text is immediately readable for human analysis or LLM ingestion." },
              { q: "Does it support auto-generated YouTube subtitles?", a: "Yes. We can extract both manually uploaded CC and auto-generated tracks. For auto-generated tracks, our cleaning engine is particularly effective at removing [Music] and [Applause] tags." },
              { q: "Can I extract subtitles in multiple languages at once?", a: "Currently, you can select any individual language track available. For Pro users, we offer a dual-subtitle mode and bulk extraction for all languages available on a specific video." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </article>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
