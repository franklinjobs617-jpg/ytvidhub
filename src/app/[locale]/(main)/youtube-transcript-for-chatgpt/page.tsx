import Link from 'next/link';
import { ArrowRight, Copy, FileText, Zap, MessageSquare, Globe, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';

export default function YouTubeTranscriptForChatGPTPage() {
    return (
        <div className="bg-white min-h-screen text-slate-800">

            {/* HERO */}
            <section className="pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-violet-50 text-violet-600 text-xs font-bold uppercase tracking-widest border border-violet-100 mb-6">
                        <Zap size={12} /> Free Tool
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                        YouTube Transcript<br />
                        <span className="text-violet-600">for ChatGPT</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Extract the full transcript of any YouTube video and use it with ChatGPT, Claude, or Gemini.
                        Summarize, translate, or analyze — in seconds, no login required.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
                    >
                        Extract Transcript Free <ArrowRight size={20} />
                    </Link>
                    <p className="text-sm text-slate-400 mt-4">No account needed · Works on any YouTube video</p>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">3 Steps to Use YouTube Videos with ChatGPT</h2>
                    <p className="text-slate-500 text-center mb-12">ChatGPT can&apos;t watch videos — but it can read transcripts. Here&apos;s how.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                icon: <Copy size={24} className="text-violet-600" />,
                                title: 'Copy the YouTube URL',
                                desc: 'Open any YouTube video and copy the URL from your browser.',
                            },
                            {
                                step: '2',
                                icon: <FileText size={24} className="text-violet-600" />,
                                title: 'Extract on YTVidHub',
                                desc: 'Paste the URL here, select TXT format, and click Extract. Get a clean transcript with no timestamps.',
                            },
                            {
                                step: '3',
                                icon: <MessageSquare size={24} className="text-violet-600" />,
                                title: 'Paste into ChatGPT',
                                desc: 'Copy the transcript and paste it into ChatGPT with your prompt. Done.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="text-center p-6 rounded-2xl border border-slate-100 bg-slate-50">
                                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <div className="text-xs font-black text-violet-500 uppercase tracking-widest mb-2">Step {item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                            Try It Now — Free <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* USE CASES */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">What Can You Do With a YouTube Transcript in ChatGPT?</h2>
                    <p className="text-slate-500 text-center mb-12">Once you have the transcript, the possibilities are wide open.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <BookOpen size={20} className="text-blue-600" />,
                                title: 'Summarize Long Videos',
                                desc: 'Paste a 2-hour lecture or podcast transcript and ask ChatGPT for a concise summary with key takeaways.',
                                prompt: '"Summarize this transcript in 5 bullet points:"',
                            },
                            {
                                icon: <Globe size={20} className="text-green-600" />,
                                title: 'Translate to Any Language',
                                desc: 'Extract a transcript in English and ask ChatGPT to translate it to Spanish, Japanese, or any other language.',
                                prompt: '"Translate this transcript to Spanish:"',
                            },
                            {
                                icon: <Lightbulb size={20} className="text-yellow-600" />,
                                title: 'Generate Blog Posts',
                                desc: 'Turn a YouTube video into a full blog article. Great for content creators who want to repurpose video content.',
                                prompt: '"Write a blog post based on this transcript:"',
                            },
                            {
                                icon: <MessageSquare size={20} className="text-violet-600" />,
                                title: 'Create Study Notes',
                                desc: 'Extract key concepts, definitions, and examples from educational videos for faster studying.',
                                prompt: '"Extract all key concepts and definitions from this:"',
                            },
                            {
                                icon: <CheckCircle size={20} className="text-red-500" />,
                                title: 'Fact-Check Claims',
                                desc: 'Paste a transcript and ask ChatGPT to identify claims that need verification.',
                                prompt: '"List all factual claims in this transcript:"',
                            },
                            {
                                icon: <Zap size={20} className="text-orange-500" />,
                                title: 'Build Custom GPTs',
                                desc: 'Use transcripts from multiple videos as knowledge base documents for a custom ChatGPT assistant.',
                                prompt: 'Upload as knowledge files in GPT Builder',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    {item.icon}
                                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 mb-3">{item.desc}</p>
                                <code className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg block">{item.prompt}</code>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can ChatGPT read YouTube videos directly?',
                                a: 'No. ChatGPT cannot watch or listen to YouTube videos. You need to extract the transcript as text first, then paste it into the chat. YTVidHub does this in seconds.',
                            },
                            {
                                q: 'Does this work on videos without manual subtitles?',
                                a: 'Yes. YTVidHub extracts auto-generated captions from YouTube, which are available on most videos. If a video has no captions at all (rare), extraction will not be possible.',
                            },
                            {
                                q: 'What format should I use for ChatGPT?',
                                a: 'Use TXT format. It gives you clean plain text with no timestamps, which is easiest to paste into ChatGPT. SRT and VTT formats include timestamps which can confuse the AI.',
                            },
                            {
                                q: 'Is there a video length limit?',
                                a: 'YTVidHub has no length limit. However, very long videos (3+ hours) may produce transcripts that exceed ChatGPT\'s context window. In that case, split the transcript into sections.',
                            },
                            {
                                q: 'Does it work with Claude and Gemini too?',
                                a: 'Yes. The extracted transcript is plain text that works with any AI: ChatGPT, Claude, Gemini, Mistral, or any other LLM. Just copy and paste.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="border border-slate-100 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RELATED LINKS */}
            <section className="py-12 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Related Guides</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/guide/youtube-subtitles-for-llm-data" className="block p-4 bg-white rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
                            <p className="font-semibold text-slate-800 text-sm">YouTube Subtitles for LLM Training Data</p>
                            <p className="text-xs text-slate-400 mt-1">Fine-tune your own models →</p>
                        </Link>
                        <Link href="/bulk-youtube-subtitle-downloader" className="block p-4 bg-white rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
                            <p className="font-semibold text-slate-800 text-sm">Bulk YouTube Subtitle Downloader</p>
                            <p className="text-xs text-slate-400 mt-1">Download entire playlists →</p>
                        </Link>
                        <Link href="/what-is-an-srt-file" className="block p-4 bg-white rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
                            <p className="font-semibold text-slate-800 text-sm">What is an SRT File?</p>
                            <p className="text-xs text-slate-400 mt-1">Format guide & syntax →</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 bg-violet-600">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-3xl font-black text-white mb-4">Ready to Extract Your First Transcript?</h2>
                    <p className="text-violet-200 mb-8">Free, instant, no account required. Works on any YouTube video.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold py-4 px-8 rounded-2xl text-lg hover:bg-violet-50 transition-colors"
                    >
                        Extract Transcript Now <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

        </div>
    );
}
