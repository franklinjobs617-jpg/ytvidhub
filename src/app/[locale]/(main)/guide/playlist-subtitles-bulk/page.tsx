"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function PlaylistBulkDownloadGuide() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Power User Guide</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Download Every Playlist Subtitle in One Click
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Stop wasting hours on manual downloads. Here&apos;s the definitive method to get every subtitle from any playlist as a single, clean ZIP file.
          </p>
        </header>

        {/* The Dilemma */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Data Collector&apos;s Dilemma
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Manually processing a 50-video playlist is a nightmare of inefficiency. It&apos;s slow, tedious, and delivers messy results. There is a better way.
          </p>
          <div className="space-y-5 mb-8">
            {[
              { title: "150+ Clicks", desc: "Repetitive, mind-numbing navigation for each video in the sequence." },
              { title: "Hours Wasted", desc: "Time lost to tedious tasks that should be automated for research focus." },
              { title: "Messy Files", desc: "Raw SRTs full of timestamps and junk that require manual post-cleaning." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-rose-100 bg-rose-50">
                <h4 className="font-semibold text-rose-900 mb-1">{item.title}</h4>
                <p className="text-sm text-rose-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/youtube-playlist-subtitles-bulk-download-efficiency.webp"
              alt="Manual vs. YTVidHub: Efficiency comparison for bulk downloading all YouTube playlist subtitles in one ZIP file."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* 3-Step Solution */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The 3-Step Solution
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Our Bulk Engine transforms hours of work into seconds. Follow this simple workflow to get all your subtitles instantly.
          </p>
          <ol className="space-y-6 mb-8">
            {[
              { title: "Paste Your Playlist URL", desc: "Navigate to the YTVidHub Bulk Downloader and paste the full URL of the YouTube playlist you need. Our engine recursively scans for every video ID." },
              { title: "Select Your Desired Format", desc: "Choose your output format—we recommend Clean TXT for research or JSON for development. The files are delivered ready-to-use." },
              { title: "Download Your Single ZIP File", desc: "Click 'Download.' YTVidHub processes everything server-side and packages all subtitles into one organized ZIP file. One click, one file, project done." },
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
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/ytvidhub-playlist-export-formats-clean-txt.webp"
              alt="Screenshot of YTVidHub's bulk export: Clean TXT, JSON, and SRT files contained within the single downloaded ZIP archive."
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* A Smarter Workflow */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            A Smarter Workflow
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Built for Speed", desc: "Server-side processing means the entire playlist is handled in seconds, regardless of its size." },
              { title: "Research-Ready Data", desc: "Our 'Clean TXT' format strips away all timestamps and metadata, giving you pure text." },
              { title: "No API Headaches", desc: "Forget complex code, authentication, and restrictive quotas. Just paste a URL and download." },
              { title: "One Organized File", desc: "All subtitles are packaged into a single, logically named ZIP file. No more scattered downloads." },
            ].map((feature, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Technical Q&amp;A
          </h2>
          <div className="space-y-5">
            {[
              { q: "Does YTVidHub handle all languages in a playlist?", a: "Yes. Our bulk downloader detects all available languages (both original and auto-generated) for every video in the playlist, allowing you to select the required language before you download." },
              { q: "Can I download subtitles for a whole YouTube Channel?", a: "Our Bulk Engine is optimized for Playlist URLs. To download all videos from a Channel, simply place the Channel's videos into a temporary playlist on YouTube and use our tool with that URL." },
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
              Ready for Pro Data Prep?
            </h2>
            <p className="text-slate-400 mb-8">
              Downloading is just the start. Build a robust data pipeline for LLM training or advanced research with our industrial-strength extraction tools.
            </p>
            <Link
              href="/data-prep-guide"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Read The Data Prep Guide
            </Link>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
