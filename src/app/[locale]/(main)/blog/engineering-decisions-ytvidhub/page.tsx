"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModel";

export default function EngineeringDecisionsBlogPage() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Engineering Blog</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            From Pain Point to Production
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            The core architectural decisions that transformed a simple idea into the YTVidHub you use today.
          </p>
          <p className="text-sm text-slate-400 mt-4">By YTVidHub Engineering · Updated Oct 26, 2025</p>
        </header>

        {/* Intro */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            When we introduced the concept of a dedicated <strong>Bulk YouTube Subtitle Downloader</strong>, the response was immediate. Researchers, data analysts, and AI builders confirmed a universal pain point: gathering transcripts for large projects is a &quot;massive time sink.&quot;
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            This is the story of how community feedback and tough engineering choices shaped YTVidHub.
          </p>
        </article>

        {/* Section 1 */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            1. Scalability Meets Stability
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The primary hurdle for a true bulk downloader isn&apos;t just downloading one file; it&apos;s reliably processing hundreds or thousands simultaneously without failure.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img
              src="/image/ytvidhub-bulk-downloader-architecture-flow.png"
              alt="Conceptual diagram of YTVidHub architecture for parallel batch processing"
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-slate-400 text-center mb-8">Figure 1: Decoupled Backend Parallel Processing</p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our solution involves a <strong>decoupled, asynchronous job queue</strong>. When you submit a list, our front-end sends video IDs to a message broker. A fleet of backend workers then picks up these jobs independently and processes them in parallel. This ensures that even if one video fails, it doesn&apos;t crash the entire batch.
          </p>
        </article>

        {/* Section 2 */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            2. Data: More Than Just SRT
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            For most analysts, raw SRT files—with timestamps and sequence numbers—are actually &quot;dirty data.&quot; They require an extra, tedious pre-processing step before they can be used in analysis tools or RAG systems.
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-6 py-2 mb-8">
            <p className="text-slate-800 text-lg italic leading-relaxed">
              &quot;I don&apos;t need timestamps 99% of the time. I just want a clean block of text to feed into my model. Having to write a Python script to clean every single SRT file is a huge waste of time.&quot;
            </p>
          </blockquote>
          <p className="text-lg text-slate-600 leading-relaxed">
            This direct feedback was a turning point. We made a crucial decision: to treat the <strong>TXT output as a first-class citizen</strong>. Our system doesn&apos;t just convert SRT to TXT; it runs a dedicated cleaning pipeline to strip all timestamps, metadata, empty lines, and formatting tags.
          </p>
        </article>

        {/* Section 3 */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            3. The Accuracy Dilemma
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            YouTube&apos;s auto-generated (ASR) captions are a fantastic baseline, but they often fall short for high-stakes research. We&apos;ve adopted a two-pronged strategy:
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-emerald-600 font-semibold mb-2">Phase 1: Live Now</p>
              <h4 className="font-semibold text-slate-900 mb-1">Free Baseline Data</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Unlimited bulk downloads of all official YouTube subtitles (Manual + ASR) at unmatched speed.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900 text-white">
              <p className="text-xs text-blue-400 font-semibold mb-2">Phase 2: In Development</p>
              <h4 className="font-semibold text-white mb-1">Pro Transcription</h4>
              <ul className="text-sm text-slate-400 leading-relaxed space-y-1">
                <li>· OpenAI Whisper Integration</li>
                <li>· Contextual Keyword Awareness</li>
                <li>· Audio Silent-Segment Removal</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Conclusion */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Conclusion
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            Our journey from a simple pain point to a robust production tool has always been guided by the needs of the research community. We&apos;re excited to continue building for you.
          </p>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Quick FAQ
          </h2>
          <div className="space-y-5">
            {[
              { q: "What is the primary benefit of the decoupled architecture?", a: "By using an asynchronous queue, YTVidHub can handle massive batch requests (1000+ URLs) without timing out, ensuring that transient YouTube API glitches don't fail your entire job." },
              { q: "Is the clean TXT output really ready for LLMs?", a: "Yes. We specifically strip structural noise (ASR confidence scores, timestamps, line numbers) so your model focus remains 100% on semantic content." },
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
              Automate Your Workflow
            </h2>
            <p className="text-slate-400 mb-8">
              The unlimited bulk downloader and clean TXT output are live now. Stop the manual work and start saving hours today.
            </p>
            <Link
              href="/"
              onClick={handleAction}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Bulk Downloader Now
            </Link>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
