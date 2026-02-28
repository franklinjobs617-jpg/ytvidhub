"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function HowToUsePage() {
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
          <p className="text-sm text-blue-600 font-medium mb-4">Documentation</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            How to Use Our Downloader
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Everything you need to know about YTVidHub, from single extractions to industrial-scale batch processing.
          </p>
        </header>

        {/* Single Video Download */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            1. Single Video Download
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            For any single YouTube video, getting subtitles is a breeze. Our tool is designed to be as fast and straightforward as possible.
          </p>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h4 className="font-semibold text-slate-900 mb-1">Copy &amp; Paste URL</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Simply find the YouTube video you need, copy its URL, and paste it directly into the input box on our homepage.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57.gif" alt="Single Video Download Demo" className="w-full h-auto" />
          </div>
        </article>

        {/* Mastering Bulk Downloads */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            2. Mastering Bulk Downloads
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">For Free Users</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Every user gets free daily credits, allowing you to process small batches of URLs (one per line).</p>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <img src="/image/fa96f3b2-faf1-433f-9210-e095bb8cb5a7.gif" alt="Free Bulk download" className="w-full h-auto" />
              </div>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-2">For Pro Members</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">The batch limit is <strong>completely removed</strong>. Paste hundreds—or even thousands—of URLs at once. No restrictions, no waiting.</p>
              <p className="text-sm text-slate-500 italic leading-relaxed">&quot;Pro members can process entire YouTube channels or massive research datasets in a single click.&quot;</p>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-grow">
              <h4 className="font-semibold text-slate-900 mb-1">Remove All Restrictions</h4>
              <p className="text-sm text-slate-500">Unlock the full potential of YTVidHub Pro with unlimited bulk processing.</p>
            </div>
            <Link href="/pricing" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
              Upgrade to Pro
            </Link>
          </div>
        </article>

        {/* Understanding Formats */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            3. Understanding Formats
          </h2>
          <div className="space-y-5">
            {[
              { name: "SRT (SubRip)", desc: "Contains precise timestamps, perfect for video editors (Adobe Premiere, Final Cut) and media players (VLC)." },
              { name: "TXT (Transcript)", desc: "Pure spoken words without any timing information. Ideal for blog posts, study notes, or LLM analysis." },
              { name: "VTT (WebVTT)", desc: "Standard for HTML5 video players. Supports advanced styling and web accessibility features." },
            ].map((format, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-blue-600 mb-1">{format.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{format.desc}</p>
              </div>
            ))}
          </div>
        </article>
        
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            4. Quick Troubleshooting
          </h2>
          <div className="space-y-5">
            {[
              { q: "Why does the tool say \"Subtitles not found\"?", a: "This message appears if the YouTube video either does not have captions enabled or is set to private. Our tool can only access publicly available subtitles." },
              { q: "What's the difference between auto-generated and manual subtitles?", a: "Auto-generated subtitles are created by YouTube's AI and may contain errors. Manual subtitles are uploaded by the video creator and are usually 99% accurate." },
              { q: "My bulk download failed. What should I do?", a: "Ensure each URL is on a separate line. If it persists, try a smaller batch. Pro members with 1000+ URLs should ensure a stable connection during submission." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </article>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
