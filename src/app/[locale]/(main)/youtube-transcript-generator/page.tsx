import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { buildCanonicalUrl } from "@/lib/url";
import TranscriptGeneratorHero from "@/components/transcript/TranscriptGeneratorHero";
import ScrollToTopButton from "@/components/transcript/ScrollToTopButton";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import LandingSectionHeader from "@/components/landing/LandingSectionHeader";
import {
  BarChart3,
  Bot,
  Clapperboard,
  FileText,
  GraduationCap,
  Languages,
  NotebookTabs,
  PenSquare,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const PAGE_TITLE =
  "YouTube Transcript Generator | Free Online TXT, SRT, VTT, JSON Export";
const PAGE_DESCRIPTION =
  "Free online YouTube transcript generator for basic use. Generate transcript from YouTube video and export clean TXT, SRT, VTT, or JSON for notes, research, and subtitle workflows.";
const PAGE_KEYWORDS = [
  "youtube transcript generator",
  "youtube video transcript generator",
  "generate transcript from youtube video",
  "free youtube transcript generator",
  "youtube transcript generator free",
  "generate youtube transcript",
  "youtube transcript download",
  "online youtube transcript generator",
];
const LAST_UPDATED = "May 5, 2026";

const HOW_TO_STEPS = [
  {
    title: "Paste the YouTube video URL",
    description:
      "Drop in a public YouTube video link and open the transcript workflow without extra setup.",
  },
  {
    title: "Choose language and export format",
    description:
      "Select the available language track, then export as TXT, SRT, VTT, or JSON based on your workflow.",
  },
  {
    title: "Download clean text or timestamped subtitles",
    description:
      "Use TXT for reading and AI tools, or keep timestamps when you need subtitle editing and QA.",
  },
];

const TRANSCRIPT_TYPES = [
  {
    title: "Creator-uploaded captions",
    description:
      "Best when you need the most reliable wording, speaker intent, or finalized subtitle timing.",
  },
  {
    title: "YouTube auto-generated captions",
    description:
      "Useful for many public videos, but quality can drop with noisy audio, heavy accents, or rapid speech.",
  },
  {
    title: "Auto-translated tracks",
    description:
      "Helpful for discovery and quick reading, but not ideal when you need quote-level precision.",
  },
  {
    title: "Videos with no transcript track",
    description:
      "If YouTube does not expose a caption track, download results depend on transcript availability for that video.",
  },
];

const FORMAT_ROWS = [
  {
    format: "TXT",
    bestFor: "Reading, notes, ChatGPT, Claude, clean archives",
    includes: "Plain text without timestamps",
  },
  {
    format: "SRT",
    bestFor: "Editors, subtitle QA, media workflows",
    includes: "Timestamped subtitle blocks",
  },
  {
    format: "VTT",
    bestFor: "Web players, browser video, HTML5 caption tracks",
    includes: "WebVTT timestamps and cues",
  },
  {
    format: "JSON",
    bestFor: "Structured pipelines, AI/data workflows, custom parsing",
    includes: "Machine-friendly transcript data",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Best use case",
    youtube: "One-off reading inside YouTube",
    ytvidhub: "Export and reuse transcript files",
    basic: "Single-file subtitle download",
  },
  {
    feature: "Output options",
    youtube: "Copy from transcript panel",
    ytvidhub: "TXT, SRT, VTT, JSON",
    basic: "Usually subtitle files only",
  },
  {
    feature: "Clean text workflow",
    youtube: "Manual cleanup required",
    ytvidhub: "Fast export for reading and notes",
    basic: "Varies by tool",
  },
  {
    feature: "Repeated work",
    youtube: "Slow for repeated jobs",
    ytvidhub: "Better for recurring research or content work",
    basic: "Often optimized for basic downloads",
  },
  {
    feature: "When quality drops",
    youtube: "No explanation layer",
    ytvidhub: "Page guidance explains transcript limits",
    basic: "Usually limited troubleshooting",
  },
];

const USE_CASES = [
  {
    title: "Content repurposing",
    description:
      "Turn interviews, tutorials, and long-form videos into blog outlines, newsletters, and clips faster.",
    icon: PenSquare,
  },
  {
    title: "Research and AI datasets",
    description:
      "Archive readable transcript text before you classify, clean, or chunk it for downstream analysis.",
    icon: Bot,
  },
  {
    title: "Language learning",
    description:
      "Compare spoken video language with readable transcript text to review vocabulary and pacing.",
    icon: Languages,
  },
  {
    title: "Subtitle editing",
    description:
      "Keep timestamps in SRT or VTT when you need to review timing, merge lines, or QA captions.",
    icon: Clapperboard,
  },
  {
    title: "Lecture notes and study packs",
    description:
      "Export clean transcript text from long videos and convert it into searchable notes or summaries.",
    icon: GraduationCap,
  },
  {
    title: "Competitive and market analysis",
    description:
      "Extract spoken claims from videos, compare messaging patterns, and build transcript evidence libraries.",
    icon: BarChart3,
  },
];

const FAQ_ITEMS = [
  {
    q: "What does this YouTube Transcript Generator actually do?",
    a: "It helps you get a YouTube transcript and export it as TXT, SRT, VTT, or JSON for reading, analysis, subtitle editing, and structured workflows.",
  },
  {
    q: "How do I generate transcript from YouTube video?",
    a: "Paste a public YouTube URL, choose the available language track, then export the transcript as TXT, SRT, VTT, or JSON based on your workflow.",
  },
  {
    q: "Can I download a YouTube transcript without timestamps?",
    a: "Yes. Export as TXT when you want plain transcript text for notes, documents, or AI tools without subtitle timing.",
  },
  {
    q: "Is this a free YouTube transcript generator?",
    a: "It is available as a free online YouTube transcript generator for basic use, so you can test transcript export without a signup flow before deciding whether the workflow fits your needs.",
  },
  {
    q: "Can I export timestamped subtitles too?",
    a: "Yes. Use SRT or VTT when you need subtitle timing for video editing, caption review, or web players.",
  },
  {
    q: "Can I use it as an online YouTube transcript generator without installing anything?",
    a: "Yes. The core workflow runs on the web. If you prefer a browser-side workflow, YTVidHub also has a dedicated Chrome extension page for that use case.",
  },
  {
    q: "What happens if a YouTube video has no transcript?",
    a: "If YouTube does not expose a usable caption track, transcript output may not be available for that video. This usually happens on videos without captions or with restricted transcript access.",
  },
  {
    q: "Is a transcript the same as subtitles or captions?",
    a: "Not exactly. A transcript focuses on readable spoken text, while subtitles and captions usually preserve timing for playback. Captions may also include non-speech cues.",
  },
  {
    q: "Which format should I use for ChatGPT or Claude?",
    a: "TXT is the simplest option for reading and prompting. JSON is better when you need structured transcript blocks in a custom pipeline.",
  },
  {
    q: "Does this work for Arabic or Hindi YouTube transcript tracks?",
    a: "It can work with available language tracks, including Arabic or Hindi, when those transcript tracks are exposed on the YouTube video.",
  },
  {
    q: "Can I use this for more than one video workflow?",
    a: "Yes. This page is designed for recurring transcript tasks, and you can also move to our bulk subtitle and transcript workflows when volume grows.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/youtube-transcript-generator";
  const canonicalUrl = buildCanonicalUrl({ locale, pathname });

  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: PAGE_KEYWORDS,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: buildCanonicalUrl({ locale: "en", pathname }),
        "x-default": buildCanonicalUrl({ locale: "en", pathname }),
      },
    },
  };
}

export default async function YouTubeTranscriptGeneratorPage({
  params,
}: Props) {
  const { locale } = await params;
  const canonicalUrl = buildCanonicalUrl({
    locale,
    pathname: "/youtube-transcript-generator",
  });

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YTVidHub YouTube Transcript Generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Export YouTube transcripts as TXT, SRT, VTT, or JSON",
      "Choose the available transcript language track",
      "Download clean text for notes and AI workflows",
      "Keep timestamps for subtitle editing and QA",
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a transcript from a YouTube video",
    description:
      "Paste a YouTube URL, choose the available language and export format, then download the transcript as TXT, SRT, VTT, or JSON.",
    step: HOW_TO_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TranscriptGeneratorHero />

      <section className="border-y border-black/5 bg-[#fbfbfa]">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-black/5 bg-white px-6 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:px-8">
            <p className="text-sm font-medium text-slate-500">
              By YTVidHub Editorial Team | Last updated {LAST_UPDATED}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              <strong>Quick answer:</strong> use this page when you need a{" "}
              YouTube transcript you can actually export and reuse. YTVidHub
              works as a free online YouTube transcript generator for basic use
              and helps you generate transcript from YouTube video into
              readable TXT, SRT, VTT, or JSON so you can move from watching to
              writing, editing, or analysis faster.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-[#fbfbfa] pb-24">
        <section className="border-y border-black/5 bg-[#fbfbfa]">
          <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8 md:py-16">
            <div className="grid gap-8 rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
              <div>
                <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Last Updated {LAST_UPDATED}
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Generate a reusable YouTube transcript, not just a copied
                  transcript panel
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  This page works best when you need export-ready transcript
                  text with a clear next use: reading, note-taking, AI
                  workflows, subtitle editing, or structured archive work. The
                  goal is to move from URL to usable output with less cleanup.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                  {[
                    "Free online for basic use",
                    "TXT, SRT, VTT, JSON",
                    "Readable text or timestamps",
                    "Works with available language tracks",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/5 bg-[#fbfbfa] px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-[24px] border border-black/5 bg-[#fcfcfb] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Best fit for this page
                </p>
                <div className="mt-5 space-y-4">
                  {[
                    "You need a YouTube transcript you can export instead of manually copy.",
                    "You want clean TXT for notes, prompts, summaries, or research review.",
                    "You still need SRT or VTT when subtitle timing matters later.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 border-b border-black/5 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <LandingSectionHeader
              badge="Formats"
              title="Choose the output, then judge the transcript source"
              description="The page should feel useful before it feels long. Start by deciding the export format you need, then check what type of transcript track is actually available on the video."
            />

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="border-b border-black/5 px-6 py-6 md:px-8">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    Which format should you export?
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    If your search intent is <strong>generate YouTube transcript</strong>,
                    the real choice is usually between plain reading text,
                    subtitle timing, or structured data.
                  </p>
                </div>

                <div className="divide-y divide-black/5">
                  {FORMAT_ROWS.map((row) => (
                    <div
                      key={row.format}
                      className="grid gap-3 px-6 py-5 md:grid-cols-[88px_1fr_1fr] md:px-8"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                        {row.format}
                      </div>
                      <div className="text-sm text-slate-700">{row.bestFor}</div>
                      <div className="text-sm text-slate-500">{row.includes}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/5 bg-[#f7f7f5] px-6 py-6 md:px-8">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Transcript vs subtitle vs caption
                  </h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Transcript",
                        description:
                          "Best for reading, note-taking, summarization, and moving spoken content into documents.",
                        icon: FileText,
                      },
                      {
                        title: "Subtitle",
                        description:
                          "Best when you need timing for playback, editing, translation, or caption file delivery.",
                        icon: NotebookTabs,
                      },
                      {
                        title: "Caption",
                        description:
                          "Often similar to subtitles, but may include non-speech cues such as music or sound effects.",
                        icon: ShieldCheck,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="space-y-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 ring-1 ring-black/5">
                            <Icon size={18} />
                          </div>
                          <h4 className="text-base font-semibold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>

              <article className="rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <span className="text-sm font-bold uppercase tracking-[0.1em] text-blue-600">
                  Source Tracks
                </span>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  What kind of YouTube transcript will you get?
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Transcript quality depends on the source track first. That is
                  why two pages both claiming to be a YouTube transcript
                  generator can behave very differently on the same video.
                </p>

                <div className="mt-8 space-y-5">
                  {TRANSCRIPT_TYPES.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-2 border-blue-200 pl-5"
                    >
                      <h4 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 rounded-[22px] border border-black/5 bg-[#f7f7f5] px-5 py-4 text-sm leading-relaxed text-slate-600">
                  Language-specific workflows can still work here. If the video
                  exposes Arabic or Hindi transcript tracks, this page can use
                  those tracks without changing the overall export flow.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <LandingSectionHeader
              badge="Workflow"
              title="How to generate transcript from YouTube video"
              description="Keep the flow close to the input box and close to the action. This section mirrors the homepage rhythm instead of breaking the experience into more isolated cards."
            />

            <article className="mt-16 grid gap-10 rounded-[32px] border border-black/5 bg-[#fcfcfb] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div className="overflow-hidden rounded-[24px] border border-black/5 bg-white">
                <Image
                  src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57.gif"
                  alt="YTVidHub transcript workflow showing YouTube transcript export"
                  width={1280}
                  height={720}
                  className="h-auto w-full"
                />
              </div>

              <div>
                <div className="space-y-8">
                  {HOW_TO_STEPS.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-[0_12px_24px_-16px_rgba(37,99,235,0.95)]">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[22px] border border-blue-100 bg-blue-50/75 px-5 py-4 text-sm leading-relaxed text-blue-900">
                  If you only need a one-off copy, YouTube&apos;s transcript panel
                  can work. If you need exportable files, cleaner text, or a
                  repeated workflow, this page is the better fit.
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <LandingSectionHeader
              badge="Compare"
              title="Compare the workflow before you export"
              description="The page should explain why the workflow is different, not just say it is better. Comparison and quality notes now sit in one visual block instead of two separate card-heavy sections."
            />

            <article className="mt-16 rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full ">
                  <thead className="border-b border-black/5">
                    <tr className="text-left">
                      <th className="pb-4 text-sm font-semibold text-slate-900">
                        Feature
                      </th>
                      <th className="pb-4 text-sm font-semibold text-slate-600">
                        YouTube panel
                      </th>
                      <th className="pb-4 text-sm font-semibold text-blue-700">
                        YTVidHub
                      </th>
                      <th className="pb-4 text-sm font-semibold text-slate-600">
                        Basic tools
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature}>
                        <td className="py-4 pr-4 text-sm font-semibold text-slate-900">
                          {row.feature}
                        </td>
                        <td className="py-4 pr-4 text-sm leading-relaxed text-slate-500">
                          {row.youtube}
                        </td>
                        <td className="py-4 pr-4 text-sm font-medium leading-relaxed text-blue-700">
                          {row.ytvidhub}
                        </td>
                        <td className="py-4 text-sm leading-relaxed text-slate-500">
                          {row.basic}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <LandingSectionHeader
              badge="Use Cases"
              title="Where this page is most useful"
              description="Use cases and internal navigation work better as guided lists than as another wall of equal-weight cards."
            />

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="rounded-[32px] border border-black/5 bg-[#fbfbfa] p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="space-y-5">
                  {USE_CASES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 border-b border-black/5 pb-5 last:border-b-0 last:pb-0"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 ring-1 ring-black/5">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>

              <aside className="rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-blue-600">
                  Continue with the right next step
                </p>
                <div className="mt-6 divide-y divide-black/5">
                  {[
                    {
                      href: "/blog/how-to-get-youtube-video-transcript",
                      title: "How to Get a Transcript of a YouTube Video",
                      description:
                        "Compare manual transcript copy inside YouTube with export-focused workflows.",
                    },
                    {
                      href: "/youtube-subtitle-downloader",
                      title: "YouTube Subtitle Downloader",
                      description:
                        "Switch to subtitle-first workflows when you need caption files rather than clean reading text.",
                    },
                    {
                      href: "/bulk-youtube-subtitle-downloader",
                      title: "Bulk YouTube Subtitle Downloader",
                      description:
                        "Move to playlist and repeated workflows when transcript volume starts growing.",
                    },
                    {
                      href: "/blog/subtitle-accuracy-problem",
                      title: "Why Subtitle Accuracy Drops",
                      description:
                        "Review common transcript and subtitle error patterns before analysis or publication.",
                    },
                    {
                      href: "/add-on/youtube-transcript-generator",
                      title: "YouTube Transcript Generator Chrome Extension",
                      description:
                        "Use the extension workflow when your query intent is browser-side transcript generation on YouTube pages.",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block py-5 first:pt-0 last:pb-0"
                    >
                      <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 pt-24 md:px-6 lg:px-8">
          <UnifiedFaqSection
            title="Frequently Asked Questions"
            subtitle="Answers to the questions users usually have before exporting a YouTube transcript."
            items={FAQ_ITEMS}
            sectionClassName="mb-24 py-0 bg-transparent"
            containerClassName="max-w-4xl px-0 lg:px-0"
          />

          <section className="text-center">
            <div className="rounded-[32px] border border-slate-900 bg-slate-900 p-12 text-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] md:p-16">
              <h2 className="article-h2 mb-4 text-3xl font-bold md:text-4xl">
                Ready to export a YouTube transcript?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
                Start with clean transcript text when you need readable output.
                Keep timestamps only when your next step depends on them.
              </p>
              <div className="mb-8 flex flex-col items-center justify-center gap-3 text-sm text-slate-400 md:flex-row">
                <span className="inline-flex items-center gap-2">
                  <Waypoints size={16} />
                  TXT for notes and AI tools
                </span>
                <span className="inline-flex items-center gap-2">
                  <Waypoints size={16} />
                  SRT/VTT for subtitle work
                </span>
                <span className="inline-flex items-center gap-2">
                  <Waypoints size={16} />
                  JSON for structured pipelines
                </span>
              </div>
              <ScrollToTopButton>{`Back to Top`}</ScrollToTopButton>
            </div>
          </section>

          <RelatedTools currentPath="/youtube-transcript-generator" count={2} />
        </div>
      </main>
    </div>
  );
}
