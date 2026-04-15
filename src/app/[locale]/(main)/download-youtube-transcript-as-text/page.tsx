import { Link } from "@/i18n/routing";
const faqItems = [
  {
    q: "How do I download YouTube transcript as text?",
    a: "Paste the YouTube URL, choose TXT output, and export the transcript. TXT format removes subtitle timing syntax and gives you plain text.",
  },
  {
    q: "How do I download YouTube transcript without timestamps?",
    a: "Use a clean transcript workflow that strips timecodes, sequence numbers, and subtitle tags. This produces no-timestamp text for analysis and AI tasks.",
  },
  {
    q: "Is TXT better than SRT or VTT for AI workflows?",
    a: "For AI prompting, RAG, and notes, TXT is usually better because it is cleaner and easier to parse. Keep SRT/VTT when you need subtitle timing for editing.",
  },
  {
    q: "Can I still get SRT or VTT if needed?",
    a: "Yes. Use the subtitle downloader page when you need timestamped subtitle files for video players or editing software.",
  },
];
export default function DownloadYouTubeTranscriptAsTextPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700 article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 article-shell article-hero">
          <p className="text-sm text-blue-600 font-medium mb-4">
            Transcript Workflow Guide
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Download YouTube Transcript as Text Without Timestamps
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            This page is built for users who need to download YouTube transcript
            as text. If your goal is clean, no-timestamp TXT for AI, notes, or
            research, this is the right workflow.
          </p>
        </header>
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Quick Steps
          </h2>
          <div className="space-y-5">
            {[
              {
                step: "Step 1",
                title: "Paste YouTube Video URL",
                desc: "Use a public YouTube URL from a video that has available captions.",
              },
              {
                step: "Step 2",
                title: "Select TXT Output",
                desc: "Choose TXT to export plain transcript text without subtitle timing syntax.",
              },
              {
                step: "Step 3",
                title: "Clean No-Timestamp Text",
                desc: "Use the cleaned transcript output for AI prompts, RAG ingestion, and structured notes.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">
                  {item.step}
                </p>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 article-h2">
            Choose the Right Format
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-x-auto bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Format
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-900">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">TXT</td>
                  <td className="py-3 px-4">
                    AI prompts, RAG, note-taking, summarization
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">SRT</td>
                  <td className="py-3 px-4">
                    Video editing and subtitle timing workflows
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">VTT</td>
                  <td className="py-3 px-4">
                    Web players and browser subtitle rendering
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 article-h2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </article>
        <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="rounded-2xl bg-slate-900 p-10 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Related Tools
            </h2>
            <p className="text-slate-400 mb-8">
              Use the right page by intent to avoid workflow friction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/download-subs-from-youtube"
                className="inline-block px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Transcript Download Tool
              </Link>
              <Link
                href="/youtube-subtitle-downloader"
                className="inline-block px-7 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Subtitle Downloader
              </Link>
              <Link
                href="/extract-youtube-subtitles-online-tool"
                className="inline-block px-7 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Subtitle Extractor
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
