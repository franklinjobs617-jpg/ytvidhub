import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import TranscriptGeneratorHero from "@/components/transcript/TranscriptGeneratorHero";
import ScrollToTopButton from "@/components/transcript/ScrollToTopButton";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import {
  Zap,
  FileText,
  ShieldCheck,
  PenSquare,
  GraduationCap,
  Bot,
  Clapperboard,
  Accessibility,
  BarChart3,
} from "lucide-react";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "transcriptPage" });
  const canonicalUrl = buildCanonicalUrl({
    locale,
    pathname: "/youtube-transcript-generator",
  });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: buildCanonicalUrl({
          locale: "en",
          pathname: "/youtube-transcript-generator",
        }),
        "x-default": buildCanonicalUrl({
          locale: "en",
          pathname: "/youtube-transcript-generator",
        }),
      },
    },
  };
}
export default async function YouTubeTranscriptGeneratorPage({
  params,
}: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "transcriptPage" });
  const faqT = await getTranslations({ locale, namespace: "transcriptFaq" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Transcript Generator",
    description: t("description"),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "AI-powered transcription",
      "Multiple export formats: SRT, VTT, TXT",
      "Adaptive noise cancellation",
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ["extract", "what", "formats", "free", "accuracy"].map(
      (key) => {
        return {
          "@type": "Question",
          name: faqT(`questions.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: faqT(`questions.${key}.answer`),
          },
        };
      },
    ),
  };
  return (
    <div className="bg-white min-h-screen article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TranscriptGeneratorHero />
      {/* BLUF Introduction - SEO Critical First 100 Words */}
      <section className="bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl py-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong>
                Need a YouTube transcript generator for video transcripts?
              </strong>{" "}
              Get transcripts for YouTube videos in under 30 seconds. Download
              video transcript generator outputs for AI training, research,
              accessibility, and content repurposing. Download transcript
              outputs in TXT, SRT, or VTT for AI training, research,
              accessibility, and content workflows. You can get youtube video
              transcript, transcript for youtube videos, transcript youtube, and
              video transcript generator outputs in one click.
            </p>
          </div>
        </div>
      </section>
      {/* Main Content Area */}
      <main className="pb-24 pt-16 md:pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          {/* Features Grid */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 article-h2">
                {t("features.title")}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("features.ai.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("features.accurate.description")} YTVidHub is a video
                  transcript generator that can generate AI-powered transcripts
                  from YouTube videos in seconds.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("features.formats.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("features.formats.description")} YTVidHub supports TXT,
                  SRT, VTT, and JSON for all YouTube video transcript needs.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("features.fast.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("features.fast.description")} YTVidHub is the fastest way
                  to get transcript youtube outputs — 30 seconds per video.
                </p>
              </div>
            </div>
          </section>
          {/* Product Demo GIF */}
          <section className="mb-32">
            <div className="max-w-5xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 article-h2">
                    See It In Action
                  </h2>
                  <p className="text-slate-600">
                    Watch how easy it is to generate YouTube transcripts in
                    seconds
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-white shadow-xl">
                  <img
                    src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57.gif"
                    alt="YouTube Transcript Generator Demo - Converting video to text in real-time"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Use Cases Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 article-h2">
                Who Uses YouTube Transcript Generators?
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                From content creators to researchers, discover how professionals
                leverage transcripts
              </p>
              <p className="text-slate-600 text-base max-w-3xl mx-auto mt-4">
                For AI teams, researchers, and content creators who need video
                transcript generator outputs, YTVidHub provides bulk transcripts
                for YouTube videos.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Content Creators",
                  desc: "Repurpose video content into blog posts, social media, and SEO-optimized articles from youtube video transcript outputs.",
                  icon: <PenSquare size={22} className="text-blue-600" />,
                },
                {
                  title: "Educators & Students",
                  desc: "Create study materials, lecture notes, and accessible learning resources from transcript for youtube videos.",
                  icon: <GraduationCap size={22} className="text-blue-600" />,
                },
                {
                  title: "AI Researchers",
                  desc: "Build training datasets for machine learning models and NLP applications from video transcript generator outputs.",
                  icon: <Bot size={22} className="text-blue-600" />,
                },
                {
                  title: "Video Editors",
                  desc: "Generate accurate SRT/VTT subtitles for professional video production using youtube video transcript outputs.",
                  icon: <Clapperboard size={22} className="text-blue-600" />,
                },
                {
                  title: "Accessibility Teams",
                  desc: "Ensure content compliance with WCAG standards for hearing-impaired audiences using transcript youtube outputs.",
                  icon: <Accessibility size={22} className="text-blue-600" />,
                },
                {
                  title: "Market Researchers",
                  desc: "Analyze video content, extract insights, and perform sentiment analysis from transcript for youtube videos.",
                  icon: <BarChart3 size={22} className="text-blue-600" />,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Performance Stats */}
          <section className="mb-32">
            <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-white border border-slate-800">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 article-h2">
                  {t("performance.title")}
                </h2>
                <p className="text-slate-400 text-lg mb-12">
                  {t("performance.description")}
                </p>
                <p className="text-slate-400 text-sm mb-8">
                  These performance stats apply to all YouTube video transcript,
                  video transcript generator, and transcript for youtube videos
                  use cases we support.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      99.9%
                    </div>
                    <div className="text-slate-400">Shorts / TikToks</div>
                    <div className="text-sm text-slate-500 mt-1">
                      Instant transcript youtube outputs under 1 second.
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      99.7%
                    </div>
                    <div className="text-slate-400">EdTech Courses</div>
                    <div className="text-sm text-slate-500 mt-1">~15s / hr</div>
                    <div className="text-sm text-slate-500 mt-1">
                      99.7% accuracy for youtube video transcript outputs.
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      99.5%
                    </div>
                    <div className="text-slate-400">Long-form Video</div>
                    <div className="text-sm text-slate-500 mt-1">
                      &lt;30s / hr
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      99.5% accuracy for transcript for youtube videos outputs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Comparison Table */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 article-h2">
                {t("comparison.title")}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {t("comparison.subtitle")}
              </p>
              <p className="text-slate-600 text-base max-w-3xl mx-auto mt-4">
                This comparison shows why YTVidHub is the best YouTube video
                transcript generator compared to other tools.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      {t("comparison.headers.feature")}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                      YTVidHub
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                      {t("comparison.headers.others")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {t("comparison.features.speed")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                      {t("comparison.ytvidhub.speed")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {t("comparison.others.speed")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {t("comparison.features.accuracy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                      {t("comparison.ytvidhub.accuracy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {t("comparison.others.accuracy")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {t("comparison.features.formats")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                      {t("comparison.ytvidhub.formats")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {t("comparison.others.formats")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {t("comparison.features.languages")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                      {t("comparison.ytvidhub.languages")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {t("comparison.others.languages")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Best For
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                      YTVidHub: Best for youtube video transcript, transcript
                      youtube, and video transcript generator use cases.
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      Generic transcript use only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* How It Works */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 article-h2">
                {faqT("subtitle")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      {i}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {t(`howItWorks.step${i}.title` as never)}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t(`howItWorks.step${i}.description` as never)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {(() => {
            const baseItems = ["what", "how", "formats", "free", "accuracy"].map(
              (key) => ({
                q: faqT(`questions.${key}.question`),
                a: faqT(`questions.${key}.answer`),
              }),
            );
            const extraItems = [
              {
                q: "What is a YouTube video transcript generator?",
                a: "A YouTube video transcript generator is a tool that lets you get transcripts from YouTube videos in seconds. YTVidHub does this for all types of YouTube videos.",
              },
              {
                q: "How is YTVidHub different from other video transcript generators?",
                a: "Unlike generic video transcript generators, YTVidHub focuses on YouTube videos and provides TXT, SRT, VTT, and JSON outputs for AI, research, and content workflows.",
              },
              {
                q: "Can I get transcript for youtube videos in bulk?",
                a: "Yes, YTVidHub lets you bulk download transcripts from YouTube videos, playlists, or entire channels.",
              },
              {
                q: "Is YTVidHub free for transcript youtube exports?",
                a: "Yes, basic features are free for all YouTube video transcript exports, with paid options for advanced features.",
              },
            ];
            return (
              <UnifiedFaqSection
                title={faqT("title")}
                subtitle={faqT("subtitle")}
                items={[...baseItems, ...extraItems]}
                sectionClassName="mb-32 py-0 bg-transparent"
                containerClassName="max-w-4xl px-0 lg:px-0"
              />
            );
          })()}
          {/* Final CTA */}
          <section className="text-center">
            <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-white border border-slate-800">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 article-h2">
                {t("cta.title")}
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <p className="text-slate-300 text-base mb-8 max-w-3xl mx-auto">
                For AI teams, researchers, educators, and content creators who
                need video transcript generator outputs for YouTube videos,
                YTVidHub is the fastest way to get clean, structured text in
                seconds.
              </p>
              <ScrollToTopButton> {t("cta.button")} </ScrollToTopButton>
              <p className="text-slate-400 text-sm mt-4 max-w-3xl mx-auto">
                Get your youtube video transcript, transcript for youtube
                videos, transcript youtube, and video transcript generator
                outputs now — in one click.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
