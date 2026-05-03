import { buildCanonicalUrl } from "@/lib/url";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

type Props = {
  params: { locale: string };
};

export default function AISummaryBlogPage({ params }: Props) {
  const canonicalUrl = buildCanonicalUrl({
    locale: params.locale,
    pathname: "/blog/ai-youtube-video-summarizer",
  });

  const faqItems = [
    {
      q: "What is an AI YouTube video summarizer?",
      a: "An AI YouTube video summarizer turns a full YouTube transcript into a concise summary so you can understand key points faster.",
    },
    {
      q: "Do I need to log in or register?",
      a: "No. YTVidHub offers a free no-login workflow, so you can summarize YouTube videos in seconds without signing up.",
    },
    {
      q: "Can I summarize multiple videos or playlists?",
      a: "Yes. You can use bulk processing for multiple videos and playlist workflows when you need summaries at scale.",
    },
    {
      q: "Does it support multiple languages?",
      a: "Yes. This multi-lingual YouTube transcript summarizer workflow supports videos across many languages.",
    },
    {
      q: "Can I export the summary as text or Markdown?",
      a: "Yes. You can export summaries as clean text or Markdown for documents, note apps, and content workflows.",
    },
    {
      q: "Is the summary generated from YouTube transcript content?",
      a: "Yes. The summary is generated from YouTube transcript content, which helps keep the result grounded in the original video.",
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
    headline:
      "AI YouTube Video Summarizer – Instant Summaries in Seconds (No Login)",
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
    datePublished: "2025-12-02",
    dateModified: "2025-12-02",
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
        <header className="article-shell article-hero">
          <p className="article-kicker">AI Innovation</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            AI YouTube Video Summarizer – Instant Summaries in Seconds (No
            Login)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Struggling to digest hours of YouTube videos fast? YTVidHub&apos;s AI
            YouTube video summarizer instantly transforms any YouTube video into
            a concise summary in seconds. No login required.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            By YTVidHub Editorial Team | Last reviewed Dec 2025
          </p>
        </header>

        <section className="article-shell article-section pt-0">
          <a
            className="btn-primary inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            href="https://ytvidhub.com/"
          >
            Try the AI YouTube video summarizer now
          </a>
        </section>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Why Use an AI YouTube Video Summarizer?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Watching full videos for every topic is slow when you only need the
            core ideas, insights, and action points. A strong
            <strong> YouTube video summarizer </strong>
            helps you understand more content in less time without manual
            note-taking fatigue. YTVidHub offers a free
            <strong> AI YouTube summarizer </strong>
            built for speed and practical use.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            You can also explore other
            <a
              className="text-blue-600 hover:text-blue-700 ml-1"
              href="https://ytvidhub.com"
            >
              YTVidHub tools
            </a>
            . Ready to try it?
            <a
              className="text-blue-600 hover:text-blue-700 ml-1"
              href="https://ytvidhub.com/"
            >
              Launch the tool now.
            </a>
          </p>
        </article>

        <div className="article-shell article-section">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/blog-ai-summary-interface.webp"
              alt="YTVidHub AI Summary interface"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            The workflow is simple: video link in, structured summary out. This
            <strong> YouTube summary tool </strong>
            keeps the process clear so you can focus on the result, not complex
            setup.
          </p>
          <ol className="space-y-3 text-slate-600 mb-6">
            <li>
              <strong>1.</strong> Paste a YouTube video link into the tool.
            </li>
            <li>
              <strong>2.</strong> The system extracts and cleans the YouTube
              transcript.
            </li>
            <li>
              <strong>3.</strong> AI analyzes the transcript and identifies the
              most important points.
            </li>
            <li>
              <strong>4.</strong> You receive a concise summary you can read,
              reuse, and export.
            </li>
          </ol>
          <p className="text-lg text-slate-600 leading-relaxed">
            Need transcript-first workflows?
            <a
              className="text-blue-600 hover:text-blue-700 ml-1"
              href="/youtube-transcript-generator"
            >
              See the YouTube transcript extraction guide.
            </a>
            <a
              className="text-blue-600 hover:text-blue-700 ml-1"
              href="https://ytvidhub.com/"
            >
              Try this step-by-step in the YTVidHub tool.
            </a>
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Use Cases
          </h2>
          <ul className="space-y-4 text-slate-600">
            <li>
              You can use it for learning and exam prep when lecture videos are
              long and dense.
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try YTVidHub now.
              </a>
            </li>
            <li>
              You can use it for research screening to compare multiple sources
              before deep analysis.
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try it now.
              </a>
            </li>
            <li>
              You can use it for content creation to generate outlines and brief
              talking points from long videos.
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try YTVidHub.
              </a>
            </li>
            <li>
              You can use it for business analysis to summarize webinars,
              interviews, and market updates quickly.
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try it now.
              </a>
            </li>
          </ul>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Step-by-Step Guide (How to Summarize a YouTube Video)
          </h2>
          <ol className="space-y-4 text-slate-600 mb-8">
            <li>
              <strong>1) Define the goal first.</strong> Decide whether the
              summary is for studying, editorial planning, or research
              extraction. Need this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
            <li>
              <strong>2) Start from clean transcript text.</strong> Remove
              timing artifacts, duplicate lines, and non-speech tags so the
              model focuses on meaning. Need this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
            <li>
              <strong>3) Ask for structured output.</strong> Request sections
              such as thesis, evidence, key quotes, and action items for easier
              reuse. Need this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
            <li>
              <strong>4) Force evidence linkage.</strong> Require key claims to
              map back to transcript passages to improve trustworthiness. Need
              this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
            <li>
              <strong>5) Run a contradiction pass.</strong> Ask the model to
              flag uncertain claims before publishing or sharing output. Need
              this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
            <li>
              <strong>6) Export by downstream use.</strong> Keep a concise
              executive summary, detailed notes version, and quote list for
              repurposing. Need this in action?
              <a
                className="text-blue-600 hover:text-blue-700 ml-1"
                href="https://ytvidhub.com/"
              >
                Try the tool now.
              </a>
            </li>
          </ol>
          <a
            className="btn-primary inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            href="https://ytvidhub.com/"
          >
            Launch Tool
          </a>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Benefits
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              Fast output in seconds, ideal when you need immediate video
              understanding.
            </li>
            <li>
              Free no-login required flow, so you can start without account
              friction.
            </li>
            <li>
              Bulk processing support for multiple videos and playlist-level
              tasks.
            </li>
            <li>
              Multi-lingual support for cross-language YouTube transcript
              summarizer workflows.
            </li>
            <li>
              Export-ready output in text or Markdown for notes, docs, and
              content systems.
            </li>
          </ul>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed">
            Want these benefits now?
            <a
              className="text-blue-600 hover:text-blue-700 ml-1"
              href="https://ytvidhub.com/"
            >
              Launch the tool.
            </a>
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            How to Use YTVidHub&apos;s AI YouTube Summarizer (Call to Action)
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Ready to summarize your YouTube videos? Start using YTVidHub&apos;s AI
            YouTube video summarizer for free.
          </p>
          <a
            className="btn-primary inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            href="https://ytvidhub.com/"
          >
            Launch Tool
          </a>
        </article>

        <UnifiedFaqSection
          title="FAQ"
          items={faqItems}
          sectionClassName="article-shell article-section py-0 bg-transparent"
          containerClassName="max-w-none px-0 lg:px-0"
        />
      </main>
    </div>
  );
}
