import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Copy,
  FileText,
  Languages,
  NotebookPen,
  SearchCheck,
} from "lucide-react";

const steps = [
  {
    title: "Step 1: Copy the YouTube URL",
    description: "Open any YouTube video and copy the URL from your browser.",
    icon: <Copy size={18} className="text-blue-600" />,
  },
  {
    title: "Step 2: Extract on YTVidHub",
    description:
      "Paste the URL, select TXT format, and click Extract to get clean transcript text with no timestamps.",
    icon: <FileText size={18} className="text-blue-600" />,
  },
  {
    title: "Step 3: Paste into ChatGPT",
    description: "Copy the transcript and paste it into ChatGPT with your prompt.",
    icon: <Bot size={18} className="text-blue-600" />,
  },
];

const useCases = [
  {
    title: "Summarize Long Videos",
    desc: "Paste a long lecture or podcast transcript and ask for concise key takeaways.",
    prompt: '"Summarize this transcript in 5 bullet points:"',
    icon: <FileText size={18} className="text-blue-600" />,
  },
  {
    title: "Translate to Any Language",
    desc: "Extract in one language and translate into Spanish, Japanese, or others.",
    prompt: '"Translate this transcript to Spanish:"',
    icon: <Languages size={18} className="text-blue-600" />,
  },
  {
    title: "Generate Blog Posts",
    desc: "Turn a YouTube video transcript into an article draft for content repurposing.",
    prompt: '"Write a blog post based on this transcript:"',
    icon: <NotebookPen size={18} className="text-blue-600" />,
  },
  {
    title: "Create Study Notes",
    desc: "Extract key concepts, definitions, and examples from educational videos.",
    prompt: '"Extract all key concepts and definitions from this:"',
    icon: <Bot size={18} className="text-blue-600" />,
  },
  {
    title: "Fact-Check Claims",
    desc: "Identify claims that require verification from a transcript-based source list.",
    prompt: '"List all factual claims in this transcript:"',
    icon: <SearchCheck size={18} className="text-blue-600" />,
  },
  {
    title: "Build Custom GPTs",
    desc: "Use multiple transcripts as knowledge files for your custom GPT assistant.",
    prompt: "Upload as knowledge files in GPT Builder",
    icon: <Bot size={18} className="text-blue-600" />,
  },
];

const faqs = [
  {
    q: "Can ChatGPT read YouTube videos directly?",
    a: "No. ChatGPT cannot watch or listen to YouTube videos directly. You need transcript text first.",
  },
  {
    q: "Does this work on videos without manual subtitles?",
    a: "Yes. Auto-generated captions are supported when available on YouTube.",
  },
  {
    q: "What format should I use for ChatGPT?",
    a: "Use TXT for the cleanest prompt input. SRT/VTT contain timestamps and can add noise.",
  },
  {
    q: "Is there a video length limit?",
    a: "YTVidHub supports long videos. For very long transcripts, split content into chunks before prompting.",
  },
  {
    q: "Does it work with Claude and Gemini too?",
    a: "Yes. Transcript text works with ChatGPT, Claude, Gemini, and most LLM tools.",
  },
];

const relatedGuides = [
  {
    href: "/guide/youtube-subtitles-for-llm-data",
    title: "YouTube Subtitles for LLM Training Data",
    sub: "Fine-tune your own models",
  },
  {
    href: "/bulk-youtube-subtitle-downloader",
    title: "Bulk YouTube Subtitle Downloader",
    sub: "Download entire playlists",
  },
  {
    href: "/what-is-an-srt-file",
    title: "What is an SRT File?",
    sub: "Format guide & syntax",
  },
];

export default function YouTubeTranscriptForChatGPTPage() {
  return (
    <div className="relative isolate min-h-screen bg-white text-slate-700 antialiased article-body">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,white_40%)]" />
        <div className="absolute left-1/2 top-[-180px] h-[340px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/35 blur-3xl" />
      </div>

      <main className="pb-20">
        <header className="border-b border-slate-200">
          <div className="container mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-20 md:pb-20">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Free Tool
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight article-h1">
                YouTube Transcript for ChatGPT
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
                Extract transcript text from any YouTube video and use it with ChatGPT,
                Claude, or Gemini for summarization, translation, and analysis.
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Extract Transcript Free
                  <ArrowRight size={16} />
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                No account needed · Works on any YouTube video
              </p>
            </div>
          </div>
        </header>

        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight article-h2">
                3 steps to use YouTube videos with ChatGPT
              </h2>
              <p className="mt-3 text-slate-600">
                ChatGPT cannot watch videos, but it can reason over transcript text.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight article-h2">
                What you can do with transcript text
              </h2>
              <p className="mt-3 text-slate-600">
                Turn video content into reusable structured assets.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <code className="mt-3 block rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
                    {item.prompt}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight article-h2">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="flex list-none cursor-pointer items-center justify-between font-semibold text-slate-900">
                    {item.q}
                    <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 article-h2">
              Related Guides
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {relatedGuides.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 px-8 py-14 text-center text-white md:px-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight article-h2">
              Ready to extract your first transcript?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Free, instant, and built for transcript-to-LLM workflows.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Extract Transcript Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
