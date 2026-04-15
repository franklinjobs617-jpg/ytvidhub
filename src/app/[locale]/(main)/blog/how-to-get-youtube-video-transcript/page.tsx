import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
export default function HowToGetYouTubeTranscriptPage() {
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
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700 article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 article-shell article-hero">
          <p className="text-sm text-blue-600 font-medium mb-4">
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
        </header>
        {/* Why You Need Transcripts */}
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
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
        </article>
        {/* Method 1 */}
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
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
                title: 'Select"Show Transcript"',
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
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            Method 2: The Fast Way with YTVidHub
          </h2>
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
                title: 'Click"Download Transcript"',
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
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
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
                    "Bulk processing, AI projects",
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
        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
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
        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 article-h2">
              Get YouTube Transcripts the Smart Way
            </h2>
            <p className="text-slate-400 mb-8">
              Whether for AI training, content repurposing, or language
              learning, YTVidHub makes it fast and easy.
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
          </div>
        </section>
      </main>
    </div>
  );
}
