import Link from 'next/link';

export default function YouTubeTranscriptForChatGPTPage() {
    return (
        <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
            <main>
                {/* Hero */}
                <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
                    <p className="text-sm text-blue-600 font-medium mb-4">Free Tool</p>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        YouTube Transcript for ChatGPT
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">
                        Extract the full transcript of any YouTube video and use it with ChatGPT, Claude, or Gemini. Summarize, translate, or analyze — in seconds, no login required.
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Extract Transcript Free
                    </Link>
                    <p className="text-sm text-slate-400 mt-4">No account needed · Works on any YouTube video</p>
                </header>

                {/* How It Works */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">3 Steps to Use YouTube Videos with ChatGPT</h2>
                    <p className="text-slate-500 mb-8">ChatGPT can&apos;t watch videos — but it can read transcripts. Here&apos;s how.</p>
                    <div className="space-y-5">
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-1">Step 1: Copy the YouTube URL</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Open any YouTube video and copy the URL from your browser.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-1">Step 2: Extract on YTVidHub</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Paste the URL here, select TXT format, and click Extract. Get a clean transcript with no timestamps.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-1">Step 3: Paste into ChatGPT</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Copy the transcript and paste it into ChatGPT with your prompt. Done.</p>
                        </div>
                    </div>
                </article>

                {/* Use Cases */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">What Can You Do With a YouTube Transcript in ChatGPT?</h2>
                    <p className="text-slate-500 mb-8">Once you have the transcript, the possibilities are wide open.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {[
                            { title: 'Summarize Long Videos', desc: 'Paste a 2-hour lecture or podcast transcript and ask ChatGPT for a concise summary with key takeaways.', prompt: '"Summarize this transcript in 5 bullet points:"' },
                            { title: 'Translate to Any Language', desc: 'Extract a transcript in English and ask ChatGPT to translate it to Spanish, Japanese, or any other language.', prompt: '"Translate this transcript to Spanish:"' },
                            { title: 'Generate Blog Posts', desc: 'Turn a YouTube video into a full blog article. Great for content creators who want to repurpose video content.', prompt: '"Write a blog post based on this transcript:"' },
                            { title: 'Create Study Notes', desc: 'Extract key concepts, definitions, and examples from educational videos for faster studying.', prompt: '"Extract all key concepts and definitions from this:"' },
                            { title: 'Fact-Check Claims', desc: 'Paste a transcript and ask ChatGPT to identify claims that need verification.', prompt: '"List all factual claims in this transcript:"' },
                            { title: 'Build Custom GPTs', desc: 'Use transcripts from multiple videos as knowledge base documents for a custom ChatGPT assistant.', prompt: 'Upload as knowledge files in GPT Builder' },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                                <code className="text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 block">{item.prompt}</code>
                            </div>
                        ))}
                    </div>
                </article>

                {/* FAQ */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-5">
                        {[
                            { q: 'Can ChatGPT read YouTube videos directly?', a: 'No. ChatGPT cannot watch or listen to YouTube videos. You need to extract the transcript as text first, then paste it into the chat. YTVidHub does this in seconds.' },
                            { q: 'Does this work on videos without manual subtitles?', a: 'Yes. YTVidHub extracts auto-generated captions from YouTube, which are available on most videos. If a video has no captions at all (rare), extraction will not be possible.' },
                            { q: 'What format should I use for ChatGPT?', a: 'Use TXT format. It gives you clean plain text with no timestamps, which is easiest to paste into ChatGPT. SRT and VTT formats include timestamps which can confuse the AI.' },
                            { q: 'Is there a video length limit?', a: "YTVidHub has no length limit. However, very long videos (3+ hours) may produce transcripts that exceed ChatGPT's context window. In that case, split the transcript into sections." },
                            { q: 'Does it work with Claude and Gemini too?', a: 'Yes. The extracted transcript is plain text that works with any AI: ChatGPT, Claude, Gemini, Mistral, or any other LLM. Just copy and paste.' },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* Related Guides */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Related Guides</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/guide/youtube-subtitles-for-llm-data" className="block p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                            <p className="font-semibold text-slate-900 text-sm">YouTube Subtitles for LLM Training Data</p>
                            <p className="text-xs text-slate-400 mt-1">Fine-tune your own models</p>
                        </Link>
                        <Link href="/bulk-youtube-subtitle-downloader" className="block p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                            <p className="font-semibold text-slate-900 text-sm">Bulk YouTube Subtitle Downloader</p>
                            <p className="text-xs text-slate-400 mt-1">Download entire playlists</p>
                        </Link>
                        <Link href="/what-is-an-srt-file" className="block p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                            <p className="font-semibold text-slate-900 text-sm">What is an SRT File?</p>
                            <p className="text-xs text-slate-400 mt-1">Format guide &amp; syntax</p>
                        </Link>
                    </div>
                </article>

                {/* CTA */}
                <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
                    <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ready to Extract Your First Transcript?</h2>
                        <p className="text-slate-400 mb-8">Free, instant, no account required. Works on any YouTube video.</p>
                        <Link href="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            Extract Transcript Now
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
