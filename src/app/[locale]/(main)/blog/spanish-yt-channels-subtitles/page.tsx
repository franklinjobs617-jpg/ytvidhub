import Link from "next/link";

export default function SpanishYTChannelsBlogPage() {
  const channels = [
    {
      title: "Easy Spanish",
      desc: "Street interviews with clear, authentic pronunciation and high-quality subtitles.",
      icon: "ES",
    },
    {
      title: "SpanishPod101",
      desc: "Structured lessons for all levels, often featuring dual-language subtitles.",
      icon: "POD",
    },
    {
      title: "Luisito Comunica",
      desc: "High-energy travel vlogs for advanced learners practicing natural fast speech.",
      icon: "TRAVEL",
    },
    {
      title: "La Cocina de Elena",
      desc: "Everyday vocabulary and cooking terms with authentic Spanish recipes.",
      icon: "FOOD",
    },
    {
      title: "Draw My Life en Espanol",
      desc: "Simple narrative storytelling with visuals that aid comprehension.",
      icon: "DRAW",
    },
    {
      title: "Curiosamente",
      desc: "Animated educational videos that help expand topic-specific vocabulary.",
      icon: "EDU",
    },
    {
      title: "Noticias Telemundo",
      desc: "Formal broadcast Spanish news reports for advanced listening practice.",
      icon: "NEWS",
    },
    {
      title: "EnchufeTV",
      desc: "Comedy sketches for modern slang and faster dialogue patterns.",
      icon: "COMEDY",
    },
    {
      title: "BookBox Spanish",
      desc: "Animated stories with highly readable subtitles, ideal for beginners.",
      icon: "BOOK",
    },
    {
      title: "TED en Espanol",
      desc: "Talks with academic and professional language exposure.",
      icon: "TALK",
    },
  ];

  const faqItems = [
    {
      q: "What subtitle quality should I prioritize for language learning?",
      a: "Prioritize videos with manually prepared subtitles or consistently accurate caption tracks so your vocabulary extraction remains reliable.",
    },
    {
      q: "How do I turn subtitle files into study material?",
      a: "Export clean TXT transcripts, select sentence-level examples, and convert them into spaced-repetition cards with context.",
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
    "@type": "Article",
    headline: "Top Spanish Immersion Channels on YouTube",
    author: {
      "@type": "Organization",
      name: "YTVidHub Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "YTVidHub",
    },
    dateModified: "2025-10-20",
    mainEntityOfPage:
      "https://ytvidhub.com/blog/spanish-yt-channels-subtitles/",
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
          <p className="article-kicker">Language Learning Guide</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Top Spanish Immersion Channels on YouTube
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We curated useful YouTube channels with reliable subtitles so you
            can extract text and speed up Spanish learning.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            By YTVidHub Editorial Team | Last reviewed Oct 2025
          </p>
        </header>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Selection Criteria
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li>Consistent subtitle availability and readability.</li>
            <li>Content diversity for practical and academic vocabulary.</li>
            <li>
              Repeatable learning workflow compatibility (transcript export and
              card creation).
            </li>
          </ul>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Our Curated Top 10 Channels
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Each channel provides subtitle-friendly material suitable for
            vocabulary extraction and listening reinforcement.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {channels.map((channel, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4"
              >
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {channel.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {channel.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            The Subtitle-to-Anki Workflow
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Watching is passive. Faster progress comes from active extraction
            and spaced review.
          </p>
          <ol className="space-y-6 mb-8">
            {[
              {
                title: "Download Subtitles",
                desc: "Paste the URL into YTVidHub and select Clean TXT to export pure text without timestamps.",
              },
              {
                title: "Identify Vocabulary",
                desc: "Pick useful sentence patterns and idiomatic expressions from the transcript.",
              },
              {
                title: "Create Anki Cards",
                desc: "Put Spanish on the front and translation on the back, then review daily.",
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
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/language-learning-anki-youtube-workflow.webp"
              alt="Language learning workflow using YouTube subtitles"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Keyword Intent: Spanish YouTube Channels With Subtitles
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            People searching
            <strong> Spanish YouTube channels with subtitles </strong>
            usually want reliable immersion resources, not random channel lists.
            The highest-value format is a curated set linked to clear learning
            outcomes: listening speed, vocabulary type, and subtitle
            consistency.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            This also aligns with long-tail variations such as
            <strong> learn Spanish with YouTube subtitles</strong> and
            <strong> Spanish immersion channels for beginners</strong>. Adding
            method sections, proficiency guidance, and transcript workflow
            examples helps this page satisfy informational and practical intent
            at the same time.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            If you are building weekly study plans, combine one slow channel,
            one medium-speed explainer channel, and one fast conversational
            channel. That progression creates measurable listening gains while
            keeping subtitle-assisted review manageable.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Channel Selection by Level
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Level
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Recommended Style
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Goal
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Beginner</td>
                  <td className="py-3 px-4">Narrated and visual storytelling</td>
                  <td className="py-3 px-4">Build core vocabulary and rhythm</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Intermediate</td>
                  <td className="py-3 px-4">Educational and interview channels</td>
                  <td className="py-3 px-4">Improve comprehension in real speech</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Advanced</td>
                  <td className="py-3 px-4">Fast news and comedy formats</td>
                  <td className="py-3 px-4">Handle slang and high-speed dialogue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            30-Day Study Plan With Subtitle Workflows
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            For learners using Spanish YouTube channels with subtitles, the
            fastest improvement usually comes from consistent short sessions.
            Week 1 should focus on subtitle-assisted listening at slower speed.
            Week 2 adds transcript extraction and sentence mining. Week 3 shifts
            toward replay without subtitles first, then verification with text.
            Week 4 emphasizes production: speaking drills, paraphrasing, and
            writing short summaries from transcript memory.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            This progression keeps cognitive load manageable while still
            increasing exposure difficulty. It also turns subtitles into an
            active learning asset instead of a passive crutch. If your goal is
            long-term retention, prioritize repeated sentence patterns rather
            than isolated vocabulary lists.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            A practical benchmark is simple: if you can understand 70 percent of
            a five-minute clip with limited subtitle checks, move to the next
            channel difficulty tier.
          </p>
        </article>
        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Common Learning Mistakes and Corrections
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              Mistake: only watching with subtitles always on. Correction:
              alternate between no-subtitle pass and transcript verification.
            </li>
            <li>
              Mistake: memorizing single words without context. Correction: mine
              complete sentence patterns from transcripts.
            </li>
            <li>
              Mistake: switching channels too often. Correction: stay with a
              stable set for at least two weeks to build rhythm.
            </li>
            <li>
              Mistake: skipping review logs. Correction: track recurring grammar
              and listening misses each week.
            </li>
          </ul>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Related Reading
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/blog/how-to-get-youtube-video-transcript",
                title: "How to Get Transcript of YouTube Video",
                desc: "Extract subtitle text quickly before building your language-learning deck.",
              },
              {
                href: "/blog/subtitle-accuracy-problem",
                title: "The Hidden Problem in Your Data Pipeline",
                desc: "Understand caption quality limits when using subtitles for vocabulary study.",
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
              Ready to Build Your Vocabulary Library?
            </h2>
            <p className="text-slate-400 mb-8">
              Extract subtitles from an entire channel playlist for faster
              vocabulary mining with bulk workflows.
            </p>
            <Link
              href="/tools/playlist-subtitles-bulk"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Read The Bulk Download Guide
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
