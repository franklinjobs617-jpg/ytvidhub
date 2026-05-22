"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import { buildCanonicalUrl } from "@/lib/url";

type Props = {
  params: { locale: string };
};

export default function CreatorTutorialsBlogPage({ params }: Props) {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const canonicalUrl = buildCanonicalUrl({
    locale: params.locale,
    pathname: "/blog/creator-tutorials",
  });

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const faqItems = [
    {
      q: "Can I repurpose one YouTube video into multiple content formats?",
      a: "Yes. Extract transcript once, then derive short-form posts, newsletter summaries, and long-form blog drafts from the same source text.",
    },
    {
      q: "What transcript format is best for creator workflows?",
      a: "Clean TXT is usually best for writing and editing. Keep SRT/VTT in parallel only when you need timestamp references.",
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
    headline: "How to Repurpose YouTube Transcripts into Blog Posts, Social Media & More",
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
    datePublished: "2025-10-28",
    dateModified: "2025-10-28",
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
          <p className="article-kicker">Creator Tutorials</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            How to Repurpose YouTube Transcripts into Blog Posts, Social Media & More
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            A practical creator workflow for turning YouTube transcripts into blog posts, social media content, and reusable publishing assets.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            By YTVidHub Editorial Team | Last reviewed Oct 2025
          </p>
        </header>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Why Creators Need a Transcript-First Workflow
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            For content teams, rewatching full videos to pull quotes and points
            is expensive. A transcript-first workflow lets you search, extract,
            and repurpose in minutes.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            This guide focuses on repeatable operations that reduce production
            time while preserving content accuracy.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Creator Pipeline: 4 Practical Steps
          </h2>
          <ol className="space-y-6 mb-8">
            {[
              {
                title: "Ingest",
                desc: "Collect video URLs and export clean transcript text for each source video.",
              },
              {
                title: "Segment",
                desc: "Split transcript by topic blocks to identify hooks, insights, and quote candidates.",
              },
              {
                title: "Repurpose",
                desc: "Generate short posts, long-form article outlines, and newsletter snippets from the same transcript.",
              },
              {
                title: "Review",
                desc: "Cross-check generated content against source transcript passages before publishing.",
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
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            YouTube Subtitles for Content Creation
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Creators usually need a practical answer: how to turn one video
            into many publishable assets while preserving meaning and source
            accuracy. A clean transcript gives writers a searchable base for
            blog posts, newsletters, social clips, and internal notes.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Start with task-first guidance. Cover ingestion, segmentation,
            drafting, and verification with real execution details, then keep
            the original transcript close enough that every claim can be checked
            against the source video.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            If your team publishes frequently, keep a transcript library by
            topic. Reusing structured transcript blocks improves output speed
            and keeps narrative consistency across blog, newsletter, and short
            video captions.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Production Checklist Before Publishing
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>Confirm key claims are supported by transcript evidence.</li>
            <li>Remove timestamp noise and non-speech labels from drafts.</li>
            <li>Add at least two internal links to related workflow guides.</li>
            <li>Include author/date signals to strengthen trust for readers.</li>
          </ul>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Repurposing Matrix: One Transcript, Many Assets
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Output Type
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Best Transcript Slice
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Main Goal
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Blog Post</td>
                  <td className="py-3 px-4">Thesis + evidence sections</td>
                  <td className="py-3 px-4">Explain a topic with source-backed detail</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Newsletter</td>
                  <td className="py-3 px-4">Key lessons + takeaway summary</td>
                  <td className="py-3 px-4">Keep subscribers updated with concise takeaways</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Short-Form Script</td>
                  <td className="py-3 px-4">Hooks + quotable lines</td>
                  <td className="py-3 px-4">Create fast hooks for social discovery</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Knowledge Base Note</td>
                  <td className="py-3 px-4">Definitions + process blocks</td>
                  <td className="py-3 px-4">Make ideas easy for the team to find again</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Weekly Operating Rhythm for Creator Teams
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            A transcript-first pipeline works best when publishing and research
            cadence are fixed. On Monday, ingest and segment source transcripts.
            On Tuesday, produce draft outlines for blog and newsletter formats.
            On Wednesday, generate and review short-form derivatives. On
            Thursday, finalize copy with source verification. On Friday, publish
            and collect feedback signals for next-week ideation.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            This rhythm turns subtitle extraction into a repeatable content
            engine rather than a one-off production task. Over time, transcript
            archives become an editorial asset: you can re-query old material,
            refresh evergreen topics, and ship updates quickly when search
            intent shifts.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            For teams publishing on a schedule, align each piece with one clear
            reader question and a small set of supporting subtopics. Then map
            transcript evidence blocks directly to those sections to reduce
            generic writing and improve editorial depth.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Common Pitfalls in Transcript Repurposing
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              Publishing near-raw transcript dumps with no structure, summary,
              examples, or reader-focused sections.
            </li>
            <li>
              Repeating identical keyword phrases without adding task-level
              guidance or examples.
            </li>
            <li>
              Missing trust signals such as author byline, review date, and
              transparent process notes.
            </li>
            <li>
              Forgetting related reading links, which makes it harder for
              readers to continue the workflow.
            </li>
          </ul>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Detailed Workflow Example: From Video to Ranking Blog Post
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Suppose a creator publishes a 40-minute tutorial. The first step is
            transcript extraction and cleanup. Next, segment the transcript into
            problem, method, results, and mistakes. Then map those segments to
            reader sections: quick answer, step-by-step method,
            troubleshooting, and FAQ. This structure transforms raw spoken
            content into a page format that is easier to scan and use.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            The same transcript can then feed short-form content. Pull one
            insight for social, one practical workflow for newsletter, and one
            deeper angle for long-form blog. By centralizing transcript evidence
            in one source document, teams reduce contradictory claims across
            channels and preserve editorial consistency.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Finally, run a publish review: clear headings, related guide links,
            source-backed claims, author byline, and review date. This closes
            the loop between production speed and content quality.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Scaling Content Ops Without Losing Quality
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            As creator teams grow, the biggest risk is inconsistent editing
            standards. A transcript-first SOP solves this by giving every writer
            the same source baseline. It also makes quality audits faster because
            editors can trace each section back to transcript evidence rather
            than rewatching full videos.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            If you publish several pieces each month, give each page one clear
            reader problem and a few supporting questions. Then maintain a
            simple update cadence: refresh examples every quarter, add new FAQ
            items from user support questions, and improve related links
            whenever new guides are published.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Quality Checklist for Repurposed Content
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              Include real examples from your own uploaded videos.
            </li>
            <li>
              Explain editing decisions and why specific excerpts were selected.
            </li>
            <li>
              Link major claims back to source transcript sections where
              possible.
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
                href: "/blog/how-to-get-youtube-video-transcript",
                title: "How to Get Transcript of YouTube Video",
                desc: "Start with a reliable extraction workflow before transcript repurposing.",
              },
              {
                href: "/blog/ai-youtube-video-summarizer",
                title: "Decode YouTube Videos With AI Intelligence",
                desc: "Use transcript-driven summarization to speed up creator planning and publishing.",
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

        <section className="article-shell article-section text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Ready to Systemize Your Creator Workflow?
            </h2>
            <p className="text-slate-400 mb-8">
              Reduce manual copy work and move from transcript to publishable
              assets faster.
            </p>
            <Link
              href="/"
              onClick={handleAction}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try the Workflow
            </Link>
          </div>
        </section>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
