"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
export default function FAQPage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700 article-body">
      <script type="application/ld+json">
        {`{"@context":"https://schema.org","@type":"FAQPage","mainEntity": [ {"@type":"Question","name":"Is YTVidHub completely free to use?","acceptedAnswer": {"@type":"Answer","text":"The basic functionality is free. We provide a complimentary 5 Credits per day to all users." } } ] }`}
      </script>
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 article-shell article-hero">
          <p className="text-sm text-blue-600 font-medium mb-4">Help Center</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Your questions, answered. Find everything you need to know about
            using YTVidHub below.
          </p>
        </header>
        <UnifiedFaqSection
          title="General Questions"
          items={[
            {
              q: "Is YTVidHub completely free to use?",
              a: (
                <>
                  The basic functionality is free. We provide a complimentary
                  <strong>5 Credits per day</strong> to all users, which is enough
                  to bulk download 5 YouTube URLs. Premium access for high-volume
                  use and our AI Transcription feature requires a subscription to
                  manage our server and processing costs.
                </>
              ),
            },
            {
              q: "Do I need to create an account to use the service?",
              a: "No registration is required for basic use. YTVidHub is designed to be as simple as possible. Just visit our site, paste your URL(s), and download your files instantly within the free daily limit.",
            },
            {
              q: "Is this service legal?",
              a: "Downloading publicly available subtitles for personal use, such as for accessibility, language learning, or research, generally falls under fair use. However, you should always respect the copyright of the content creator.",
            },
          ]}
          sectionClassName="max-w-3xl mx-auto px-6 mb-16 article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        <UnifiedFaqSection
          title="Using the Tool"
          items={[
            {
              q: "How do I download subtitles for a single video?",
              a: (
                <>
                  Simply copy the URL of the YouTube video you&apos;re interested
                  in, paste it into the input box on our{" "}
                  <Link href="/" className="text-blue-600 hover:underline">
                    homepage
                  </Link>
                  , and click the &apos;Analyze&apos; button.
                </>
              ),
            },
            {
              q: "How does the bulk subtitle downloader work?",
              a: "To download subtitles from multiple videos at once, paste each YouTube URL on a new line in the input box. Our tool will process all of them and package the files into a single, convenient ZIP archive.",
            },
            {
              q: "What&apos;s the difference between SRT, VTT, and TXT formats?",
              a: (
                <>
                  <strong>SRT</strong> files include timestamps for video players.
                  <strong>VTT</strong> is a modern standard for web videos.
                  <strong>TXT</strong> files are plain text transcripts without
                  timing, ideal for reading or LLM analysis.
                </>
              ),
            },
          ]}
          sectionClassName="max-w-3xl mx-auto px-6 mb-16 article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        <UnifiedFaqSection
          title="Troubleshooting"
          items={[
            {
              q: "Why does the tool say &quot;Subtitles not found&quot;?",
              a: "This means the video either doesn&apos;t have manual subtitles uploaded by the creator, or the owner has disabled subtitle access. Our tool can only retrieve publicly available caption tracks.",
            },
            {
              q: "The download isn&apos;t working. What should I do?",
              a: "First, double-check that the URL is a valid YouTube link. Then try clearing your browser cache, disabling any ad-blockers, and refreshing the page. Also ensure you haven&apos;t exceeded your free daily credit limit.",
            },
            {
              q: "Can I download subtitles for private or age-restricted videos?",
              a: "No. YTVidHub can only access subtitles from publicly available YouTube content. Private, unlisted, or age-restricted videos are not supported.",
            },
          ]}
          sectionClassName="max-w-3xl mx-auto px-6 mb-16 article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        <UnifiedFaqSection
          title="Privacy &amp; Security"
          items={[
            {
              q: "Do you store my data or the videos I download?",
              a: (
                <>
                  No. We have a strict privacy-first policy. We do not store the
                  URLs you submit, the subtitles you download, or any personal
                  browsing data. For full details, please read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              ),
            },
          ]}
          sectionClassName="max-w-3xl mx-auto px-6 mb-16 article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Still Have Questions?
            </h2>
            <p className="text-slate-400 mb-8">
              Our team is here to help. Reach out or try our tool for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:admin@ytvidhub.com"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Contact Support
              </a>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Try Bulk Downloader
              </Link>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <RelatedTools currentPath="/faq" />
        </div>
      </main>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
