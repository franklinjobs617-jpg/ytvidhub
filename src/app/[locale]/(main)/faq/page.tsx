"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function FAQPage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is YTVidHub completely free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The basic functionality is free. We provide a complimentary 5 Credits per day to all users."
              }
            }
          ]
        }`}
      </script>

      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Help Center</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Your questions, answered. Find everything you need to know about using YTVidHub below.
          </p>
        </header>

        {/* General Questions */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">General Questions</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Is YTVidHub completely free to use?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">The basic functionality is free. We provide a complimentary <strong>5 Credits per day</strong> to all users, which is enough to bulk download 5 YouTube URLs. Premium access for high-volume use and our AI Transcription feature requires a subscription to manage our server and processing costs.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Do I need to create an account to use the service?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">No registration is required for basic use. YTVidHub is designed to be as simple as possible. Just visit our site, paste your URL(s), and download your files instantly within the free daily limit.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Is this service legal?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Downloading publicly available subtitles for personal use, such as for accessibility, language learning, or research, generally falls under fair use. However, you should always respect the copyright of the content creator.</p>
            </div>
          </div>
        </article>

        {/* Using the Tool */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Using the Tool</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">How do I download subtitles for a single video?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Simply copy the URL of the YouTube video you&apos;re interested in, paste it into the input box on our <Link href="/" className="text-blue-600 hover:underline">homepage</Link>, and click the &apos;Analyze&apos; button.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">How does the bulk subtitle downloader work?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">To download subtitles from multiple videos at once, paste each YouTube URL on a new line in the input box. Our tool will process all of them and package the files into a single, convenient ZIP archive.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">What&apos;s the difference between SRT, VTT, and TXT formats?</h3>
              <p className="text-sm text-slate-500 leading-relaxed"><strong>SRT</strong> files include timestamps for video players. <strong>VTT</strong> is a modern standard for web videos. <strong>TXT</strong> files are plain text transcripts without timing, ideal for reading or LLM analysis.</p>
            </div>
          </div>
        </article>

        {/* Troubleshooting */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Troubleshooting</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Why does the tool say &quot;Subtitles not found&quot;?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">This means the video either doesn&apos;t have manual subtitles uploaded by the creator, or the owner has disabled subtitle access. Our tool can only retrieve publicly available caption tracks.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">The download isn&apos;t working. What should I do?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">First, double-check that the URL is a valid YouTube link. Then try clearing your browser cache, disabling any ad-blockers, and refreshing the page. Also ensure you haven&apos;t exceeded your free daily credit limit.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Can I download subtitles for private or age-restricted videos?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">No. YTVidHub can only access subtitles from publicly available YouTube content. Private, unlisted, or age-restricted videos are not supported.</p>
            </div>
          </div>
        </article>

        {/* Privacy & Security */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Privacy &amp; Security</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Do you store my data or the videos I download?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">No. We have a strict privacy-first policy. We do not store the URLs you submit, the subtitles you download, or any personal browsing data. For full details, please read our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-slate-400 mb-8">Our team is here to help. Reach out or try our tool for free.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:admin@ytvidhub.com" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Contact Support
              </a>
              <Link href="/" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">
                Try Bulk Downloader
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
