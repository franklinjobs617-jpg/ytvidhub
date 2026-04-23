import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { buildCanonicalUrl } from "@/lib/url";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

type Props = {
  params: { locale: string };
};

export default function HowToGetYouTubeTranscriptPage({ params }: Props) {
  const canonicalUrl = buildCanonicalUrl({
    locale: params.locale,
    pathname: "/blog/how-to-get-youtube-video-transcript",
  });

  const faqItems = [
    {
      q: "How to get transcript of YouTube video for free?",
      a: "Open the video on YouTube, click the three-dot menu, and choose Show transcript. For faster export, use YTVidHub to download transcript files directly as TXT, SRT, or VTT.",
    },
    {
      q: "How to download transcript from YouTube instead of copying manually?",
      a: "Use a transcript download tool, paste the YouTube URL, select TXT, SRT, or VTT, and export in one click. This is much faster than manual copy for repeated workflows.",
    },
    {
      q: "Can I get transcripts in languages other than English?",
      a: "Yes. You can access creator-uploaded or auto-generated tracks in many languages, depending on video availability and the language tracks provided by YouTube.",
    },
    {
      q: "Can I remove timestamps and keep only clean text?",
      a: "Yes. Export as plain text (TXT) or use a clean-transcript workflow to remove timestamps and non-speech noise for AI training, notes, and analysis.",
    },
    {
      q: "Can I download transcripts from multiple videos at once using YouTube's built-in feature?",
      a: "No. You need to repeat the steps for each video. With YTVidHub, you can bulk download transcripts from playlists or entire channels.",
    },
    {
      q: "How does YTVidHub compare to AI tools that summarize YouTube videos?",
      a: "YTVidHub provides the raw, structured transcript, ideal for AI training data, content repurposing, and bulk analysis, not just a summary.",
    },
    {
      q: "Can AI tools replace transcript batch export workflows?",
      a: "Not for bulk extraction. AI tools can summarize video content, but YTVidHub is built for high-volume transcript export and structured data workflows.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Get Transcript of YouTube Video: 3 Easy Ways in 2026",
    author: {
      "@type": "Organization",
      name: "YTVidHub Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "YTVidHub",
    },
    url: canonicalUrl,
    inLanguage: params.locale,
    datePublished: "2026-01-08",
    dateModified: "2026-01-08",
    mainEntityOfPage: canonicalUrl,
  };
  return (
    <div className="editorial-page article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="editorial-main">
        {/* Hero */}
        <header className="article-shell article-hero">
          <p className="article-kicker">
            SEO Guide 2026
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            How to Get Transcript of YouTube Video: 3 Easy Ways in 2026
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            If you are wondering how to get transcript of YouTube video quickly,
            this guide compares YouTube&apos;s built-in method, manual copy, and
            fast download workflows for TXT, SRT, and VTT output.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            By YTVidHub Editorial Team | Last reviewed Jan 2026
          </p>
        </header>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Quick Answer
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              Use YouTube&apos;s native transcript panel when you only need one
              quick copy.
            </li>
            <li>
              Use a downloader workflow when you need reusable TXT, SRT, or VTT
              files.
            </li>
            <li>
              For repeated jobs, bulk extraction is significantly faster and
              reduces manual copy mistakes.
            </li>
            <li>
              For AI and research teams who need bulk transcripts,{" "}
              <Link
                href="/bulk-youtube-subtitle-downloader"
                className="text-blue-600 hover:text-blue-700"
              >
                YTVidHub is the fastest way to get there
              </Link>
              .
            </li>
          </ul>
        </article>
        {/* Why You Need Transcripts */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Why You Need YouTube Transcripts
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "AI Training Data",
                desc: "Clean transcripts provide high-quality text data for training machine learning models and fine-tuning LLMs.",
              },
              {
                title: "Content Repurposing",
                desc: "Turn video content into blog posts, newsletters, and other written formats with minimal effort.",
              },
              {
                title: "Language Learning",
                desc: "Use transcripts to improve listening skills, vocabulary, and comprehension in foreign languages.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <h4 className="font-semibold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mt-6">
            For AI teams and researchers, YTVidHub offers faster, bulk-friendly
            transcript extraction -{" "}
            <Link
              href="/bulk-youtube-subtitle-downloader"
              className="text-blue-600 hover:text-blue-700"
            >
              link to our tool
            </Link>
            .
          </p>
        </article>
        {/* Method 1 */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Method 1: Using YouTube&apos;s Built-in Feature
          </h2>
          <ol className="space-y-6 mb-8">
            {[
              {
                title: "Open the YouTube Video",
                desc: "Go to YouTube.com and navigate to the video you want a transcript for.",
              },
              {
                title: "Click on the Three Dots Menu",
                desc: "Below the video player, click on the three vertical dots (...) to open the menu options.",
              },
              {
                title: 'Select "Show transcript"',
                desc: 'From the menu, select "Show transcript" to open the transcript panel on the right side.',
              },
              {
                title: "Copy the Transcript",
                desc: 'Use your mouse to select the entire transcript, then right-click and choose "Copy".',
              },
              {
                title: "Paste and Format",
                desc: "Paste the transcript into a text editor like Notepad or Google Docs and format as needed.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
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
              </li>
            ))}
          </ol>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-700">
              This method takes approximately 3-5 minutes per video.
            </p>
          </div>
        </article>
        {/* Method 2 */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Method 2: The Fast Way with YTVidHub
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            If you&apos;re already getting transcripts from YouTube manually or
            using AI tools that only summarize videos, YTVidHub can save you
            90% of your time with batch exports and structured transcript data.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            If you need transcripts quickly, especially for multiple videos,
            YTVidHub offers the fastest solution with bulk transcript extraction
            in just a few clicks.
          </p>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 mb-8">
            <h3 className="font-semibold text-slate-900 mb-3">
              Why Choose YTVidHub
            </h3>
            <ul className="space-y-2">
              {[
                "Bulk Download: Extract transcripts from entire playlists at once",
                "LLM-Ready Formats: Clean TXT and structured JSON exports",
                "No Login Required: Get transcripts without signing in",
                "Fast Processing: Transcripts in seconds, not minutes",
                "Multiple Languages: Support for YouTube's automatic translations",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2
                    size={16}
                    className="text-blue-600 mt-0.5 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ol className="space-y-6 mb-8">
            {[
              {
                title: "Go to YTVidHub's Transcript Extractor",
                desc: "Navigate to our tool where you can extract transcripts from videos, playlists, and channels.",
              },
              {
                title: "Paste the YouTube Video URL",
                desc: "Copy the URL of the YouTube video and paste it into the input field.",
              },
              {
                title: "Select Your Preferred Format",
                desc: "Choose from TXT (clean transcript), JSON (structured data), SRT, and VTT.",
              },
              {
                title: 'Click "Download Transcript"',
                desc: "Hit the download button and YTVidHub will automatically extract the transcript.",
              },
              {
                title: "Save and Use Your Transcript",
                desc: "The transcript will be downloaded to your device, ready for use in your projects.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
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
              </li>
            ))}
          </ol>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-700">
              This method takes approximately 10-30 seconds per video.
            </p>
          </div>
        </article>
        {/* Comparison Table */}
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Comparison: Manual vs. Automatic
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Manual (YouTube)
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-blue-600">
                    YTVidHub
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ["Speed", "3-5 min/video", "10-30 sec/video"],
                  ["Batch Processing", "Not supported", "Entire playlists"],
                  ["Format Options", "Plain text only", "TXT, JSON, SRT, VTT"],
                  ["Ease of Use", "Manual steps", "1-click process"],
                  ["Login Required", "Yes", "No"],
                  [
                    "Ideal For",
                    "Occasional, single videos",
                    "Bulk processing, AI projects. Best for bulk transcripts, AI training data, and enterprise teams who need fast, clean exports.",
                  ],
                ].map(([feature, manual, auto], i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {feature}
                    </td>
                    <td className="py-3 px-4">{manual}</td>
                    <td className="py-3 px-4">{auto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Keyword Workflow: How to Get Transcript of YouTube Video at Scale
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            If your target query is <strong>how to get transcript of YouTube video</strong>,
            users usually have three intents: quick copy from one video,
            <strong> download transcript from YouTube </strong>
            for repeated work, or export
            <strong> YouTube transcript to text </strong>
            for AI and SEO workflows. The fastest way to satisfy all three is a
            mixed process: use native transcript view for one-off checks, then
            switch to batch extraction when volume increases.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            In production teams, we recommend defining output by use case first.
            Pick TXT for writing and embedding pipelines, SRT or VTT for media
            editing, and JSON when you need structured timestamps. This avoids
            duplicate export work and keeps your transcript archive reusable
            across content operations, subtitle QA, and model-ready dataset
            preparation.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            A practical rule: if you process more than five videos per week,
            move from manual copy to a downloader workflow. It reduces handling
            time, decreases formatting mistakes, and gives you cleaner files for
            downstream publishing.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            AI tools can summarize videos, but YTVidHub is the only way to get
            bulk, structured transcripts for AI training data and enterprise
            workflows.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Troubleshooting Transcript Download Issues
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              No transcript visible: some videos disable captions, so check an
              alternative video source or language track.
            </li>
            <li>
              Wrong language output: select the desired subtitle track before
              export, especially on multilingual channels.
            </li>
            <li>
              Text looks noisy: remove timestamps and non-speech tags before NLP
              or blog repurposing.
            </li>
            <li>
              Missing segments: compare transcript against playback around key
              timestamps to verify completeness.
            </li>
          </ul>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Accuracy and Source Reliability Notes
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            This guide is based on our product support logs and repeated
            transcript export tests across single videos and playlist workflows.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>
              Steps are tested on real YouTube pages and YTVidHub export flows.
            </li>
            <li>
              Method speed, output formats, and common failure points are
              compared directly.
            </li>
            <li>
              Recommendations are transparent about limitations of manual copy
              and auto-generated captions.
            </li>
          </ul>
        </article>
        <UnifiedFaqSection
          title="Frequently Asked Questions"
          items={faqItems}
          sectionClassName="article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Related Reading
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/blog/subtitle-accuracy-problem",
                title: "Why YouTube Subtitles Are Sometimes Wrong",
                desc: "Understand where ASR subtitle errors come from and how to reduce quality risk before analysis.",
              },
              {
                href: "/blog/ai-youtube-video-summarizer",
                title: "Decode YouTube Videos With AI Intelligence",
                desc: "Turn transcripts into structured summaries while keeping important claims grounded in source text.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                  Related Article
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
                <span className="mt-3 inline-flex text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-0.5">
                  Read article -&gt;
                </span>
              </Link>
            ))}
          </div>
        </article>
        {/* CTA */}
        <section className="article-shell article-section text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Get YouTube Transcripts the Smart Way
            </h2>
            <p className="text-slate-400 mb-8">
              Whether for AI training, content repurposing, or language
              learning, YTVidHub makes it fast and easy.
            </p>
            <p className="text-slate-300 mb-8">
              For AI teams, researchers, and content creators who need bulk
              transcripts for training, analysis, or repurposing, YTVidHub is
              the fastest way to get there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/download-subs-from-youtube"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Try YTVidHub Free
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader"
                className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Bulk Download Transcripts
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              YTVidHub handles bulk exports and batch processing - AI can&apos;t
              do that for you.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
