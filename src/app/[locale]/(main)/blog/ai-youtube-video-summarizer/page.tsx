import Link from "next/link";
import { Brain, Search, Video, Zap, CheckCircle2, Sparkles } from "lucide-react";

export default function AISummaryBlogPage() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">AI Innovation</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Decode YouTube Videos With AI Intelligence
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Our AI engine transforms YouTube transcripts into actionable knowledge, insights, and searchable text blocks.
          </p>
        </header>

        {/* Feature image */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/blog-ai-summary-interface.webp"
              alt="YTVidHub AI Summary interface"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Features */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            AI-Powered Study Insights
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our <strong>AI YouTube summarizer</strong> uses advanced reasoning to extract the core value of any video. Stop skimming through hours of footage—get the facts instantly.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {[
              { title: "Structured Analysis", desc: "Automated extraction of key insights and concepts into organized sections.", icon: <Zap size={20} /> },
              { title: "Deep Insights", desc: "Summaries that understand context, tone, and the 'Why' behind the content.", icon: <Brain size={20} /> },
              { title: "Knowledge Sync", desc: "One-click export to Notion, Obsidian, or Markdown.", icon: <CheckCircle2 size={20} /> },
              { title: "Language Support", desc: "Supports summarizing YouTube videos in 50+ languages.", icon: <Sparkles size={20} /> },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <div className="text-blue-600 mb-3">{item.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Smart Transcripts */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <img
              src="/image/blog-smart-transcript-search.webp"
              alt="YTVidHub Smart Transcript Area"
              className="w-full h-auto"
            />
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Smart Transcripts for Professional Research
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            YTVidHub converts raw <strong>YouTube video transcripts to text</strong> with semantic grouping, making them perfect for <strong>LLM training datasets</strong> or deep-dive content analysis.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-blue-600 font-semibold mb-2">Search</p>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Deep-Text Keyword Search</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Instantly locate any word across hours of video. One click takes you to the exact timestamp.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <p className="text-xs text-blue-600 font-semibold mb-2">Processing</p>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Semantic Time-Grouping</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Related sentences grouped into logical paragraphs, preserving the speaker's flow.</p>
            </div>
          </div>
        </article>

        {/* Use Cases */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Who Benefits Most?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Whether you're building datasets or studying for exams, YTVidHub adapts to your workflow.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: <Search size={20} />, title: "AI Researchers", desc: "Build clean, noise-free text corpora from YouTube channels for AI fine-tuning." },
              { icon: <Video size={20} />, title: "Content Creators", desc: "Turn any video into an SEO-optimized blog post with one click using AI summaries." },
              { icon: <Zap size={20} />, title: "Rapid Learners", desc: "Skip the fluff. Get straight to the insights and structured analysis." },
            ].map((box, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <div className="text-blue-600 mb-3">{box.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-1">{box.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              { q: "How does the AI YouTube summarizer help with study?", a: "By extracting structured insights and organized notes, YTVidHub automates the content analysis process, saving students hours of manual note-taking." },
              { q: "Can I export YouTube transcripts for AI training?", a: "Yes. Our tool is optimized to provide 'Clean TXT' exports, which strip out music cues and artifacts, leaving you with a pristine text dataset." },
              { q: "Does YTVidHub support YouTube playlist summaries?", a: "Combined with our Bulk Downloader, you can process entire playlists and generate summaries for multiple videos at once." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Master Any Video?
            </h2>
            <p className="text-slate-400 mb-8">
              Don't just watch videos. Extract the knowledge with YTVidHub AI.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try AI Summary Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
