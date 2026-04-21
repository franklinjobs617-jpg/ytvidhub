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

export default function EngineeringDecisionsBlogPage({ params }: Props) {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const canonicalUrl = buildCanonicalUrl({
    locale: params.locale,
    pathname: "/blog/engineering-decisions-ytvidhub",
  });

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const faqItems = [
    {
      q: "What is the main benefit of a decoupled queue architecture?",
      a: "It isolates failures and allows high concurrency. One failing video job does not collapse the full batch.",
    },
    {
      q: "Why does clean TXT matter for LLM pipelines?",
      a: "Removing timestamps and structural subtitle noise improves chunking quality and reduces preprocessing overhead.",
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
    headline: "From Pain Point to Production",
    author: {
      "@type": "Organization",
      name: "YTVidHub Engineering",
    },
    publisher: {
      "@type": "Organization",
      name: "YTVidHub",
    },
    url: canonicalUrl,
    inLanguage: params.locale,
    datePublished: "2025-10-26",
    dateModified: "2025-10-26",
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
          <p className="article-kicker">Engineering Blog</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            From Pain Point to Production
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            The architectural decisions that moved YTVidHub from a simple idea
            to a resilient subtitle operation pipeline.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            By YTVidHub Engineering | Updated Oct 26, 2025
          </p>
        </header>

        <article className="article-shell article-section">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            When we introduced a dedicated
            <strong> bulk YouTube subtitle downloader</strong>, user feedback
            was immediate: collecting transcript data at scale was still too
            manual and fragile.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            This write-up covers the engineering choices that addressed
            reliability, throughput, and data usability.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            1. Scalability Meets Stability
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Bulk subtitle extraction is not only about speed. It requires
            predictable behavior under bursty loads and partial failures.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img
              src="/image/ytvidhub-bulk-downloader-architecture-flow.png"
              alt="Conceptual diagram of YTVidHub architecture for parallel batch processing"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-slate-400 text-center mb-8">
            Figure 1: Decoupled backend workers with queue-based orchestration.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We use an asynchronous queue and worker fleet. Client requests push
            video IDs into a broker; workers fetch jobs independently and run in
            parallel. This isolates faults and avoids all-or-nothing failure
            behavior.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            2. Data: More Than SRT
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Raw SRT often behaves like dirty data for analysis tasks. It carries
            timing scaffolding and formatting that add cleanup overhead.
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-6 py-2 mb-8">
            <p className="text-slate-800 text-lg italic leading-relaxed">
              “I just need clean text for model input. Writing another cleanup
              script for every batch wastes time.”
            </p>
          </blockquote>
          <p className="text-lg text-slate-600 leading-relaxed">
            That feedback changed the roadmap. We treated
            <strong> clean TXT output as first-class</strong> and added a
            dedicated cleaning stage for timestamp and metadata removal.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            3. The Accuracy Dilemma
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Auto-generated captions provide baseline coverage but can underperform
            on specialized or multilingual content. Our strategy runs in phases.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-blue-600 font-semibold mb-2">
                Phase 1: Live Now
              </p>
              <h4 className="font-semibold text-slate-900 mb-1">
                Free Baseline Data
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Unlimited bulk downloads of official YouTube subtitle tracks
                (manual + ASR) with fast queue execution.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900 text-white">
              <p className="text-xs text-blue-400 font-semibold mb-2">
                Phase 2: In Development
              </p>
              <h4 className="font-semibold text-white mb-1">
                Pro Transcription
              </h4>
              <ul className="text-sm text-slate-400 leading-relaxed space-y-1">
                <li>• OpenAI Whisper integration</li>
                <li>• Context-aware correction signals</li>
                <li>• Silent-segment removal</li>
              </ul>
            </div>
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Keyword Coverage: Bulk YouTube Subtitle Downloader Architecture
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            This engineering page supports technical search intents around
            <strong> bulk YouTube subtitle downloader architecture</strong>,
            queue reliability, and scalable transcript processing. Readers in
            this segment care less about UI features and more about retry
            strategy, fault isolation, and predictable throughput.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            To meet those intents, the article highlights three proof points:
            asynchronous queue orchestration, clean TXT data shaping, and
            accuracy trade-offs for ASR tracks. These are the elements that
            usually decide whether a subtitle pipeline can be trusted in
            high-volume analytics or model-ingestion workflows.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We also position this content as a bridge between product and
            engineering audiences: practical architecture language for builders,
            with enough operational context for content and research teams.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Operational Lessons From Production
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>Keep retry logic idempotent to prevent duplicate exports.</li>
            <li>
              Separate queue health metrics from transcript quality metrics.
            </li>
            <li>
              Store clean-text and timed-text outputs together for traceability.
            </li>
            <li>
              Surface partial-failure states clearly so users can recover fast.
            </li>
          </ul>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Retry, Idempotency, and Failure Budget
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            For high-volume subtitle jobs, retries are inevitable. The key
            design rule is idempotency: repeating the same job should not create
            duplicate exports or inconsistent result states. We enforce this by
            hashing job inputs, storing deterministic output keys, and applying
            completion guards before write operations.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            We also operate with a failure budget mindset. Not every external
            caption fetch error should page the team, but repeated upstream
            failures in a region or language group should trigger degradation
            mode and user-visible notices. This keeps reliability honest while
            avoiding alert fatigue.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            In practice, this approach reduces hidden data corruption risk and
            improves trust for users who rely on predictable batch outcomes.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Observability Metrics That Matter
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Queue Metrics</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>Time-to-start per job batch</li>
                <li>Retry rate by source and language</li>
                <li>Worker saturation and wait depth</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">
                Data Quality Metrics
              </h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>Transcript completeness ratio</li>
                <li>Noise density in clean TXT output</li>
                <li>Low-confidence segment concentration</li>
              </ul>
            </div>
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Why This Matters for SEO and Content Systems
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Reliable subtitle infrastructure is not only an engineering win. It
            directly affects content velocity, update freshness, and trust in
            AI-assisted publishing flows. Better pipeline stability means fewer
            blocked drafts, faster refresh cycles, and stronger topical
            authority over time.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            End-to-End Request Lifecycle
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            A request begins with one URL or a full playlist. The system
            normalizes input, validates payload shape, and creates queue jobs
            with deterministic identifiers. This keeps retries safe and reduces
            accidental duplicate exports.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Workers process each job in stages: caption retrieval, format
            transformation, quality checks, and artifact persistence. Every
            stage emits progress metadata so users can track status and recover
            partial failures without rerunning completed tasks.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            The result is a traceable processing chain where each output can be
            mapped to source, transformation stage, and quality flags.
          </p>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Design Principles We Keep Applying
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>Prefer deterministic output contracts over implicit formatting.</li>
            <li>Keep failure domains small and isolated.</li>
            <li>Separate speed metrics from quality metrics.</li>
            <li>Treat quality metadata as a core output artifact.</li>
            <li>Build for replay and auditability at scale.</li>
          </ul>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Engineering Validation Notes
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              Architecture reflects production behavior under large batch
              workloads.
            </li>
            <li>
              Decisions prioritize fault isolation, throughput, and downstream
              data usability.
            </li>
            <li>
              Limitations of ASR-based tracks are documented instead of hidden
              behind marketing claims.
            </li>
          </ul>
        </article>

        <UnifiedFaqSection
          title="Quick FAQ"
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
                title: "The Hidden Problem in Your Data Pipeline",
                desc: "Review subtitle quality risks that influence the reliability of downstream systems.",
              },
              {
                href: "/blog/creator-tutorials",
                title: "Creator Tutorials",
                desc: "See practical transcript-first workflows used by content teams after extraction.",
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
              Automate Your Workflow
            </h2>
            <p className="text-slate-400 mb-8">
              The unlimited bulk downloader and clean TXT output are live now.
              Stop manual copy work and save hours.
            </p>
            <Link
              href="/"
              onClick={handleAction}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Bulk Downloader Now
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
