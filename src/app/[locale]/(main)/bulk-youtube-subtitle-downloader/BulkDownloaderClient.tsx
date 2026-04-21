"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import BulkDownloaderSchema from "@/components/seo/BulkDownloaderSchema";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import {
  ArrowRight,
  CheckCheck,
  AlertCircle,
  Download,
  FileText,
  FolderArchive,
  History as HistoryIcon,
  Layers,
  LifeBuoy,
  Youtube,
  Zap,
} from "lucide-react";

const featureCards = [
  {
    icon: <Youtube className="text-blue-600" size={20} />,
    title: "Playlist & Channel Ingestion",
    desc: "Paste a playlist, channel, or multiple video URLs. The batch engine automatically expands and prepares all links.",
  },
  {
    icon: <Zap className="text-blue-600" size={20} />,
    title: "High-Speed Batch Processing",
    desc: "Process large sets of videos in one workflow, so you avoid manual one-by-one subtitle downloads.",
  },
  {
    icon: <FileText className="text-blue-600" size={20} />,
    title: "SRT, VTT, and Clean TXT",
    desc: "Export standard subtitle formats for players, editors, SEO content workflows, and AI/LLM datasets.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Paste Sources",
    desc: "Add playlist, channel, or video links in one input area.",
    img: "/image/Generated Image October 14, 2025 - 12_19PM.webp",
    icon: <Layers size={18} className="text-blue-600" />,
  },
  {
    step: "02",
    title: "Choose Output Format",
    desc: "Select SRT, VTT, or Clean TXT based on your scenario.",
    img: "/image/bulk-guide-step2-paste-list.webp",
    icon: <FileText size={18} className="text-blue-600" />,
  },
  {
    step: "03",
    title: "Download Organized ZIP",
    desc: "Get one archive with clear file names mapped to video titles.",
    img: "/image/Generated Image October 14, 2025 - 12_24PM.webp",
    icon: <Download size={18} className="text-blue-600" />,
  },
];

const faqItems = [
  {
    q: "How do I download an entire YouTube playlist with subtitles?",
    a: "Paste the playlist URL into YTVidHub. The system expands all videos, extracts available captions, and packages results in one ZIP.",
  },
  {
    q: "Can I extract subtitles from multiple YouTube videos at once?",
    a: "Yes. You can paste multiple video URLs, a playlist URL, or a channel URL in one batch job.",
  },
  {
    q: "What file formats are supported?",
    a: "You can export SRT, VTT, and Clean TXT. Clean TXT removes timestamps and is suitable for reading or model training data prep.",
  },
  {
    q: "Does it support auto-generated subtitles?",
    a: "Yes. The extractor supports both creator-uploaded captions and YouTube auto-generated captions when available.",
  },
  {
    q: "Is there a bulk limit?",
    a: "Free users have daily limits. Pro plans are built for high-volume batch extraction workflows.",
  },
];

export default function BulkDownloaderClient({ locale }: { locale: string }) {
  void locale;
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-page)] font-sans text-slate-800 antialiased selection:bg-blue-100">
      <BulkDownloaderSchema />

      <main className="relative">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_72%)]" />
          <div className="container mx-auto max-w-6xl px-6 pt-16 pb-20">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
                <CheckCheck size={12} className="text-blue-600" />
                Bulk Subtitle Pipeline
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Bulk YouTube Subtitle Downloader
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
                Extract subtitles from playlists, channels, and multiple videos in one flow.
                Export clean <strong>SRT, VTT, and TXT</strong> files for operations, content,
                and AI/LLM data preparation.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  onClick={handleAction}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-7 py-3 text-sm font-semibold text-white shadow-[0_20px_28px_-18px_rgba(37,99,235,1)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
                >
                  Start Batch Download
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_-22px_rgba(15,23,42,0.8)] transition-colors hover:border-blue-200 hover:bg-slate-50 hover:text-blue-700"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input Types
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">Video · Playlist · Channel</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">SRT · VTT · Clean TXT</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Delivery
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">One Organized ZIP Package</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Built for high-volume subtitle extraction
              </h2>
              <p className="mt-4 text-slate-600">
                A practical, production-style bulk YouTube subtitle downloader for teams and
                individual operators.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featureCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.65)] transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_24px_36px_-30px_rgba(37,99,235,0.45)]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Manual workflow vs batch workflow
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Replace repetitive copy-paste operations with a single batch pipeline.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
                    <AlertCircle size={18} className="text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Manual Method</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Open many tabs and process videos one by one.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Manually click subtitle download repeatedly.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Spend time renaming and organizing files.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-[var(--surface-page)] p-8 shadow-[0_16px_28px_-24px_rgba(37,99,235,0.45)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    <FolderArchive size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">YTVidHub Batch Pipeline</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Paste playlist/channel URL once and run bulk extraction.
                  </li>
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Export SRT/VTT/TXT in one consistent package.
                  </li>
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Receive clean file names mapped to original titles.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                3-step batch process
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                A clear flow from URL ingestion to final ZIP delivery.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {processSteps.map((item) => (
                <article
                  key={item.step}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_30px_-26px_rgba(15,23,42,0.55)]"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {item.icon}
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Use cases that convert</h2>
              <p className="mt-4 text-slate-300">
                The bulk downloader solves practical work, not just demo-style extraction.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_34px_-30px_rgba(15,23,42,0.9)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                  <Layers size={18} className="text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold">AI & LLM Data Prep</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Build large clean-text corpora from YouTube channels and playlists for training
                  and evaluation.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_34px_-30px_rgba(15,23,42,0.9)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                  <FileText size={18} className="text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold">Content Repurposing</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Turn subtitle archives into article drafts, notes, and structured knowledge assets.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_34px_-30px_rgba(15,23,42,0.9)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                  <HistoryIcon size={18} className="text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold">Compliance & Archive</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Keep subtitle records organized for accessibility review, translation audits, and
                  long-term archives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Output format clarity
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Choose the right format for playback, editing, or dataset use.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.52)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">For AI & Research</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Clean TXT</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Timestamp-free transcript text for reading, semantic processing, and dataset
                  ingestion workflows.
                </p>
                <pre className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-[11px] text-slate-500">
Welcome to our deep dive into the future of media...
              </pre>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.52)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">For Players & Editing</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">SRT / VTT</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Timecoded subtitle files for upload, synchronization, and video production tools.
                </p>
                <pre className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-[11px] text-slate-500">
1
00:00:01,000 --&gt; 00:00:04,000
Welcome to our deep dive...
              </pre>
              </div>
            </div>
          </div>
        </section>

        <UnifiedFaqSection
          id="bulk-faq"
          title="FAQ"
          subtitle="Everything important about bulk subtitle extraction."
          items={faqItems}
          sectionClassName="border-y border-slate-200 bg-white py-20"
          containerClassName="max-w-4xl px-6 lg:px-6"
        />

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Related tools
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Explore adjacent workflows across subtitle extraction and preparation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <Zap size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Single Video Downloader</h3>
                <p className="mt-2 text-sm text-slate-600">
                  For one-off extractions when you do not need a batch workflow.
                </p>
                <Link href="/youtube-subtitle-downloader" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Explore Tool <ArrowRight size={14} />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <LifeBuoy size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Data Preparation Guide</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Learn practical rules for converting transcripts into high-quality training data.
                </p>
                <Link href="/data-prep-guide" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Explore Guide <ArrowRight size={14} />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <FileText size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">SRT vs VTT Guide</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Compare subtitle formats and select the correct output standard for your workflow.
                </p>
                <Link href="/guide/srt-vs-vtt" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Read Comparison <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-6">
          <div className="mx-auto max-w-6xl rounded-3xl bg-slate-900 px-8 py-14 text-center text-white md:px-14">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Ready to scale subtitle extraction?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Move from manual downloads to a structured bulk pipeline built for repeatable output.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                onClick={handleAction}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Start Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
