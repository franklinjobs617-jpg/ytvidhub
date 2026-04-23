import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  CheckCircle2,
  Chrome,
  Languages,
  ListVideo,
  MousePointerClick,
  ScanSearch,
} from "lucide-react";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export const metadata: Metadata = {
  title: "YouTube Subtitle Downloader Chrome Extension - YTVidHub",
  description:
    "Download YouTube subtitles directly from the video page with the YTVidHub Chrome Extension. Supports SRT, VTT, and clean TXT formats with one click.",
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

const EXTENSION_CARDS = [
  {
    title: "YouTube Subtitle Downloader Chrome Extension",
    desc: "Download YouTube subtitles in SRT, VTT, or clean TXT directly on the video page with one click.",
    href: "/add-on/youtube-subtitle-download",
    cta: "Open Subtitle Downloader",
    icon: MousePointerClick,
  },
  {
    title: "YouTube Transcript Generator Chrome Extension",
    desc: "Generate readable YouTube transcripts quickly for notes, research, and content workflows.",
    href: "/youtube-transcript-generator",
    cta: "Open Transcript Generator",
    icon: ScanSearch,
  },
];

const USE_CASES = [
  {
    title: "AI / LLM Training Data",
    desc: "Collect and normalize transcript text for prompt testing, corpora building, and model data pipelines.",
    icon: CheckCircle2,
  },
  {
    title: "Learning & Knowledge Capture",
    desc: "Convert long videos into searchable text for revision notes and structured learning workflows.",
    icon: Languages,
  },
  {
    title: "Content Creation",
    desc: "Turn transcripts into outlines, drafts, and repurposed social or blog content with less manual work.",
    icon: ListVideo,
  },
  {
    title: "Research & Data Preparation",
    desc: "Extract multi-video subtitle text for topic analysis, trend mapping, and multilingual review.",
    icon: ScanSearch,
  },
];

const FAQ_ITEMS = [
  {
    q: "What type of Chrome extensions are listed on this page?",
    a: "This page lists YTVidHub official YouTube extensions, including a subtitle downloader and a transcript generator.",
  },
  {
    q: "Are these extensions free to install?",
    a: "Yes. They are free to install from Chrome Web Store, and usage follows your YTVidHub workflow and available limits.",
  },
  {
    q: "Do I need to log in before using them?",
    a: "You can start quickly without heavy setup, and account features can be used when needed for extended workflows.",
  },
  {
    q: "Which formats are supported for subtitle export?",
    a: "The subtitle workflow supports SRT, VTT, and clean TXT formats for editing, analysis, and AI/LLM data preparation.",
  },
  {
    q: "Do the extensions support multiple languages?",
    a: "Yes. They can work with multilingual subtitle tracks available on YouTube, including translated tracks when provided.",
  },
  {
    q: "Where can I find all YTVidHub extension tools?",
    a: "Use the /add-on/ page as the central hub, and visit the YTVidHub homepage to access web tools and related resources.",
  },
];

export default function AddOnPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-slate-700">
      <main>
        <header className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_72%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:py-20 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                <Chrome className="h-3.5 w-3.5" />
                Official Browser Extensions
              </div>
              <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[56px]">
                Chrome Extensions for YouTube
              </h1>
              <p className="mb-4 text-base font-semibold text-[var(--brand-600)] md:text-lg">
                Subtitle Downloader + Transcript Generator
              </p>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
                Install official YTVidHub extensions to download subtitles and generate transcripts
                directly on YouTube.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_20px_30px_-20px_rgba(37,99,235,1)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
                >
                  <Chrome className="h-4 w-4" />
                  Install Extension
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[var(--brand-700)]"
                >
                  Visit YTVidHub homepage
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-xl flex-1 lg:max-w-2xl">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_50px_-34px_rgba(15,23,42,0.65)] ring-1 ring-blue-100/60">
                <Image
                  src="/image/chorme/ytvidhub-chrome-store-listing.png"
                  alt="YTVidHub Chrome extension listing preview"
                  width={800}
                  height={500}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Official Extension Cards
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Choose the extension that matches your workflow and open its detail page.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {EXTENSION_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_24px_36px_-30px_rgba(37,99,235,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5 transition-transform group-hover:scale-105" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
                    <span className="mt-5 inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors group-hover:bg-blue-100">
                      {card.cta}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Why / What / How
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Why</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  YouTube subtitle and transcript extraction improves note quality, saves manual
                  time, and supports downstream AI/data workflows.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">What</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  YTVidHub provides one extension for subtitle download and one for transcript
                  generation, both focused on fast YouTube-native workflows.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">How</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  1) Open the detail page and install from Chrome Web Store. 2) Open YouTube and
                  run subtitle download or transcript generation in a few clicks.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Use Cases
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {USE_CASES.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">
              Start from{" "}
              <Link href="/add-on" className="font-semibold text-[var(--brand-700)] hover:underline">
                /add-on/
              </Link>{" "}
              or go to the{" "}
              <Link href="/" className="font-semibold text-[var(--brand-700)] hover:underline">
                YTVidHub homepage
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-900 px-8 py-14 text-center text-white md:px-12 md:py-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to optimize your YouTube workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Install the official YTVidHub extension and move from manual copy-paste to structured
              subtitle and transcript operations.
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-slate-100"
            >
              <Chrome className="h-4 w-4" />
              Install Now
            </a>
          </div>
        </section>

        <UnifiedFaqSection
          title="FAQ"
          items={FAQ_ITEMS}
          sectionClassName="border-t border-slate-200 bg-white py-24"
          containerClassName="max-w-4xl px-6 lg:px-6"
        />
      </main>
    </div>
  );
}
