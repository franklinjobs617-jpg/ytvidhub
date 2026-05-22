import React from "react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
type Props = { params: Promise<{ locale: string }> };

const singleVideoChecks = [
  ["Use a direct video URL", "Paste a regular YouTube video link instead of a playlist link when you only need one subtitle file."],
  ["Check available tracks", "Some videos include manual subtitles, some only have auto-generated captions, and some have no captions at all."],
  ["Pick the output before downloading", "Choose SRT for editors, VTT for web players, or TXT for readable transcript text."],
];

const relatedWorkflows = [
  {
    href: "/youtube-caption-downloader",
    title: "Need closed captions or CC tracks?",
    desc: "Use the caption downloader when your task is accessibility review, CC export, or caption quality checking.",
    cta: "Open caption downloader",
  },
  {
    href: "/bulk-youtube-subtitle-downloader",
    title: "Need subtitles from many videos?",
    desc: "Use the bulk downloader for playlists, channels, or repeated subtitle exports in one organized package.",
    cta: "Open bulk downloader",
  },
  {
    href: "/youtube-vtt-downloader",
    title: "Need WebVTT for a website?",
    desc: "Use the VTT-focused page for HTML5 video, web players, and browser caption workflows.",
    cta: "Open VTT downloader",
  },
  {
    href: "/youtube-transcript-generator",
    title: "Need plain transcript text?",
    desc: "Use the transcript generator when you want readable text without subtitle timestamps.",
    cta: "Open transcript generator",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "subtitleDownloaderPage",
  });
  const pathname = "/youtube-subtitle-downloader";
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: buildAlternates(locale, pathname),
  };
}
export default async function YouTubeSubtitleDownloaderPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-blue-100 text-slate-800 antialiased article-body">
      {/* Structured Data */} <SubtitleDownloaderSchema />
      <main>
        {/* === 1. HERO SECTION === */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden article-hero">
          <div className="absolute top-[-10%] left-[-10%] w-[25rem] h-[25rem] bg-blue-400/10 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[20rem] h-[20rem] bg-blue-400/10 rounded-full blur-[80px] animate-pulse"></div>
          <div className="relative pt-16 pb-20 text-center px-6 z-10 article-shell">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight article-h1">
              Free <span className="text-blue-600">YouTube Subtitle</span>
              Downloader
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8 leading-relaxed">
              Extract <strong>YouTube captions</strong> in SRT, VTT, and TXT
              formats instantly. Keep timestamps for editing and playback, or
              export clean transcript text for notes, research, and reuse.
            </p>
            <p className="text-sm text-slate-500 mb-10">
              Need plain transcript text without timestamps? Use{" "}
              <Link
                href="/youtube-transcript-generator"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                YouTube Transcript Generator
              </Link>
              .
            </p>
            <div className="mx-auto mb-10 grid max-w-4xl gap-3 text-left md:grid-cols-3">
              {[
                ["Best for", "Downloading YouTube subtitles, captions, and CC tracks from a single video."],
                ["Formats", "Export SRT for editors, VTT for web players, or TXT for clean transcript text."],
                ["Setup", "No browser extension or desktop software is required for basic subtitle downloads."],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-blue-100 bg-white/80 p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <SubtitleDownloaderWidget />
          </div>
        </section>
        <section className="py-14 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 article-h2">
                Quick Answer: How do you download YouTube subtitles online?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                To download YouTube subtitles online, copy the video URL, paste
                it into YTVidHub, choose an available caption language, then
                export the file as SRT, VTT, or TXT. SRT is best for video
                editors and players, VTT is best for web video, and TXT is best
                when you need readable transcript text without subtitle timing
                markup.
              </p>
            </div>
          </div>
        </section>
        {/* === 2. WHAT IS YOUTUBE SUBTITLE DOWNLOADER === */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center article-h2">
              What is a YouTube Subtitle Downloader?
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <p className="mb-6">
                A <strong>YouTube subtitle downloader</strong> is a specialized
                tool that extracts closed captions and subtitles from YouTube
                videos. These captions can be either manually uploaded by
                content creators or automatically generated by YouTube&apos;s
                speech recognition technology.
              </p>
              <p className="mb-6">
                Our <strong>YouTube caption downloader</strong> supports
                multiple formats including SRT (SubRip), VTT (WebVTT), and clean
                TXT files, making it perfect for video editing, accessibility
                compliance, language learning, and AI training datasets.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center article-h2">
              Which Subtitle Format Should You Download?
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Format</th>
                    <th className="px-4 py-3 font-semibold">Use it for</th>
                    <th className="px-4 py-3 font-semibold">Best next step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">SRT</td>
                    <td className="px-4 py-3">Premiere Pro, VLC, translation, accessibility upload.</td>
                    <td className="px-4 py-3">Use when your video editor or player expects timecoded subtitles.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">VTT</td>
                    <td className="px-4 py-3">HTML5 video, web players, browser-based caption workflows.</td>
                    <td className="px-4 py-3">Use when subtitles need to work in a browser or online course player.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">TXT</td>
                    <td className="px-4 py-3">Reading, notes, AI prompts, content repurposing, research.</td>
                    <td className="px-4 py-3">Use when you want readable text without subtitle timing markup.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <h2 className="article-h2 text-3xl font-bold text-slate-900">
                  Best for Single-Video Subtitle Downloads
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  This page is built for one YouTube video at a time. It is the
                  right place when you need a single subtitle file for editing,
                  playback, translation, accessibility review, or clean text
                  notes.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  If the source is a playlist, channel, or a long list of URLs,
                  move to the{" "}
                  <Link href="/bulk-youtube-subtitle-downloader" className="font-semibold text-blue-600 hover:text-blue-700">
                    Bulk YouTube Subtitle Downloader
                  </Link>{" "}
                  so you do not repeat the same download steps manually.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Before you download
                </h3>
                <div className="mt-5 space-y-4">
                  {singleVideoChecks.map(([title, desc]) => (
                    <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <h4 className="font-semibold text-slate-900">{title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* === 3. SUPPORTED FORMATS === */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center article-h2">
              Supported Formats: SRT, VTT, and TXT
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Choose the right format for editing, web playback, notes,
              research, or structured text workflows.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* SRT Format */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-lg">SRT</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  SRT Subtitles
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Standard SubRip format with precise timestamps. Perfect for
                  video players, editing software, and media production.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                  1<br /> 00:00:01,000 --&gt; 00:00:04,000
                  <br /> Welcome to our tutorial...
                </div>
              </div>
              {/* VTT Format */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-lg">VTT</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  VTT Captions
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  WebVTT format for web players and HTML5 video. Includes
                  cue formatting for browser-based video.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                  WEBVTT
                  <br />
                  <br /> 00:01.000 --&gt; 00:04.000
                  <br /> Welcome to our tutorial...
                </div>
              </div>
              {/* TXT Format */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-lg">TXT</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Clean Text
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Pure transcript without timestamps. Ideal for AI training,
                  content analysis, and text processing applications.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                  Welcome to our tutorial on machine learning fundamentals.
                  Today we&apos;ll explore...
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* === 4. HOW TO USE === */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center article-h2">
              How to Extract Captions from Any YouTube Video
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "Copy YouTube URL",
                      desc: "Copy the URL of any YouTube video that has captions or subtitles available.",
                    },
                    {
                      step: "2",
                      title: "Paste and Select Format",
                      desc: "Paste the URL into our tool and choose your preferred format: SRT, VTT, or TXT.",
                    },
                    {
                      step: "3",
                      title: "Download Instantly",
                      desc: "Click download and get your subtitle file immediately. No registration required for basic use.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500 mb-2">YouTube URL</p>
                      <p className="font-mono text-sm text-slate-700">
                        https://youtube.com/watch?v=example
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                        SRT
                      </button>
                      <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        VTT
                      </button>
                      <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        TXT
                      </button>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">
                      Download Subtitles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* === 5. USE CASES === */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center article-h2">
              Why Use a Free Subtitle Downloader?
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              From accessibility to AI training, discover the many uses for
              YouTube captions
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🎬",
                  title: "Video Editing",
                  desc: "Import subtitles into editing software for professional video production and post-processing.",
                },
                {
                  icon: "♿",
                  title: "Accessibility",
                  desc: "Ensure content is accessible to deaf and hard-of-hearing audiences with proper captions.",
                },
                {
                  icon: "🤖",
                  title: "AI Training",
                  desc: "Create clean text datasets for machine learning models and natural language processing.",
                },
                {
                  icon: "🌍",
                  title: "Translation",
                  desc: "Use transcripts as source material for translating content into multiple languages.",
                },
                {
                  icon: "📚",
                  title: "Research",
                  desc: "Analyze video content for academic research, content analysis, and data mining.",
                },
                {
                  icon: "📝",
                  title: "Content Creation",
                  desc: "Repurpose video content into blog posts, articles, and social media content.",
                },
                {
                  icon: "🎓",
                  title: "Education",
                  desc: "Create study materials and course transcripts for educational purposes.",
                },
                {
                  icon: "🔍",
                  title: "Searchable Archives",
                  desc: "Turn spoken video content into text that can be searched, organized, and reused later.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* === TESTIMONIALS SECTION === */} <TestimonialSection />
        {/* === 6. FEATURES COMPARISON === */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center article-h2">
              Why Choose YTVidHub for YouTube Subtitle Downloads?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                    ✕
                  </span>
                  Other Tools
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span> Limited to
                    single video downloads
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span> Poor format
                    support and quality
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span> Ads and
                    registration required
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span> Slow processing
                    and unreliable
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span> No bulk or
                    playlist support
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">
                <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  YTVidHub
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </span>
                  Our Solution
                </h3>
                <ul className="space-y-3 text-blue-900 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span> Single videos
                    + bulk playlist downloads
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span> High-quality
                    SRT, VTT, and TXT formats
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span> Free tier with
                    no ads or registration
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span> Lightning-fast
                    cloud processing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span> Advanced bulk
                    and AI-ready features
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* === 7. TECHNICAL SPECIFICATIONS === */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center article-h2">
              Subtitle Download Technical Specs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Supported Video Types
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Public YouTube videos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Unlisted videos (with URL)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Auto-generated captions
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Manual uploaded subtitles
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Multiple language tracks
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Output Formats
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    SRT (SubRip) with timestamps
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    VTT (WebVTT) for web players
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    TXT (Plain text) clean format
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    UTF-8 encoding support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Customizable formatting options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <UnifiedFaqSection
          id="faq"
          title="Frequently Asked Questions"
          items={[
            {
              q: "Is it legal to download YouTube subtitles?",
              a: "Yes, downloading subtitles for personal use, research, accessibility, or educational purposes is generally legal. However, always respect copyright laws and YouTube's terms of service.",
            },
            {
              q: "What subtitle formats do you support?",
              a: "We support SRT (SubRip), VTT (WebVTT), and clean TXT formats. SRT is best for video editing and players, VTT is best for web players, and TXT is best for readable transcript text.",
            },
            {
              q: "Can I download subtitles from entire YouTube playlists?",
              a: "Yes. Use the Bulk YouTube Subtitle Downloader when you need subtitles from playlists, channels, or multiple video URLs in one package.",
            },
            {
              q: "Does this work with different languages?",
              a: "Absolutely! Our tool can download subtitles in any language available on the YouTube video, including both auto-generated and manually uploaded captions.",
            },
            {
              q: "What if I only need transcript text without timestamps?",
              a: "Use the YouTube Transcript Generator when you want no-timestamp TXT output for reading, notes, summaries, or text review.",
            },
            {
              q: "Why does a video sometimes show no subtitle tracks?",
              a: "A YouTube video may not have captions enabled, or the available tracks may be restricted. Try another language track if one is available, or use a different source video.",
            },
            {
              q: "Are there any download limits?",
              a: "Free users get 5 daily credits for subtitle downloads. Pro members enjoy unlimited bulk downloads for large-scale projects and commercial use.",
            },
          ]}
          sectionClassName="py-16 bg-white"
          containerClassName="max-w-4xl px-6 lg:px-6"
        />
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center article-h2">
              Choose the Right Subtitle Workflow
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {relatedWorkflows.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-blue-600">
                    {item.cta}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
