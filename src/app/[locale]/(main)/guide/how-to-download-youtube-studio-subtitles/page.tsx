import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildCanonicalUrl } from "@/lib/url";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/guide/how-to-download-youtube-studio-subtitles";
  const canonicalUrl = buildCanonicalUrl({ locale, pathname });
  const title =
    "How to Download YouTube Studio Subtitles (Step-by-Step Guide) | YTVidHub";
  const description =
    "Learn how to download subtitles from YouTube Studio with a clear step-by-step workflow, plus a faster method for batch subtitle extraction and export.";

  return {
    title,
    description,
    keywords:
      "how to download youtube studio subtitles, youtube studio subtitle export, youtube caption download guide, subtitle workflow for creators",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: "/image/guides/youtube-studio-subtitles-download-guide-cover.webp",
          width: 1536,
          height: 1024,
          alt: "How to download subtitles from YouTube Studio guide",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/guides/youtube-studio-subtitles-download-guide-cover.webp"],
    },
  };
}

export default async function GuideYoutubeStudio() {
  return (
    <div className="editorial-page article-body">
      <main className="editorial-main">
        {/* Hero */}
        <header className="article-shell article-hero">
          <p className="article-kicker">
            Creator&apos;s Guide
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            How to Download Subtitles from YouTube Studio
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            The definitive guide to exporting captions from your own channel,
            plus a faster method to download from any video you don&apos;t own.
          </p>
        </header>
        {/* Quick Summary */}
        <article className="article-shell article-section">
          <div className="p-5 rounded-xl border border-blue-100 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Quick Summary</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>Method 1 (Official):</strong> Free, but manual. Only
                works for YOUR videos one by one.
              </p>
              <p>
                <strong>Method 2 (YTVidHub):</strong> Free, instant, supports
                Batch/Playlist download for ANY video.
              </p>
            </div>
          </div>
        </article>
        {/* Method 1: Official Way */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Method 1: The Official Way (YouTube Studio)
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Downloading subtitles from your own YouTube videos is a common task
            for creators who want to repurpose content or back up their work.
            However, YouTube hides this feature deep within the Studio
            interface.
          </p>
          <div className="space-y-6 mb-8">
            {[
              {
                title: "Access Subtitles Menu",
                desc: "Log in to YouTube Studio. In the left sidebar, click on 'Content' or 'Subtitles'.",
                image: "/image/guide/youtube-studio/step-1-list.png",
                alt: "YouTube Studio Channel Subtitles List showing videos",
              },
              {
                title: "Click Your Video",
                desc: "Click on the specific video title or thumbnail to open its language settings.",
                image: "/image/guide/youtube-studio/step-2-details.png",
                alt: "YouTube Studio Video Subtitle Details Page",
              },
              {
                title: "Hover to Reveal Options",
                desc: "Hover your mouse over the language row (far right side). The 'three vertical dots' (Options) are HIDDEN until you hover!",
                image: "/image/guide/youtube-studio/step-3-dropdown.png",
                alt: "YouTube Studio Language Options Menu",
              },
              {
                title: "Download File",
                desc: "Click the three dots, select 'Download', and pick .srt format.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <div className="flex gap-4 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {step.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={step.image}
                      alt={step.alt || step.title}
                      width={1200}
                      height={800}
                      unoptimized
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
        {/* Pain Points */}
        <article className="article-shell article-section">
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">
              The Problem with YouTube Studio
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-blue-800">
              <p>× You can ONLY download captions for videos you own.</p>
              <p>× You must download one video at a time (No Batch mode).</p>
              <p>× Navigating through menus takes 5-10 clicks per video.</p>
              <p>× You cannot download from entire playlists or channels.</p>
            </div>
          </div>
        </article>
        {/* Method 2: YTVidHub */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Method 2: The Fast Way (Batch &amp; Any Video)
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Forget clicking through studio menus. Simply paste a link to any
            video, playlist, or channel and get all subtitles instantly.
          </p>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h4 className="font-semibold text-slate-900 mb-3">
              Why Choose YTVidHub
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
              <p>✓ Batch / Playlist Support</p> <p>✓ Works on ANY Video</p>
              <p>✓ Clean SRT / TXT Output</p> <p>✓ No Login Required</p>
            </div>
          </div>
        </article>
        {/* Comparison Table */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Feature Comparison
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    YouTube Studio
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-blue-600">
                    YTVidHub
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ["Download Own Videos", "✓", "✓"],
                  ["Download Others' Videos", "×", "✓"],
                  ["Batch / Playlist Download", "×", "✓"],
                  ["Clean TXT Format", "×", "✓"],
                  ["Download Speed (100+ items)", "2+ Hours", "2 Minutes"],
                ].map(([feature, studio, tool], i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {feature}
                    </td>
                    <td className="py-3 px-4">{studio}</td>
                    <td className="py-3 px-4">{tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <UnifiedFaqSection
          title="Frequently Asked Questions"
          items={[
            {
              q: "Can I download subtitles from YouTube Studio in bulk?",
              a: "No, YouTube Studio currently only allows downloading subtitles one video at a time. To download multiple subtitles or entire playlists at once, use a dedicated tool like YTVidHub Batch Downloader.",
            },
            {
              q: "What format does YouTube Studio export?",
              a: "YouTube Studio typically exports captions in .sbv (proprietary), .srt (standard), or .vtt (web) formats. .SBV is rarely supported by video editors, so always choose .SRT if available.",
            },
            {
              q: "How do I download auto-generated captions?",
              a: "In YouTube Studio, go to the Subtitles tab, find the 'Automatic' language track (often labeled 'English (Automatic)'), hover over the row, click the three dots, and select Download.",
            },
          ]}
          sectionClassName="article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        {/* CTA */}
        <section className="article-shell article-section text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Skip the Studio. Download Instantly.
            </h2>
            <p className="text-slate-400 mb-8">
              Get subtitles from any video, playlist, or channel — no login
              required.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Bulk Downloader Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
