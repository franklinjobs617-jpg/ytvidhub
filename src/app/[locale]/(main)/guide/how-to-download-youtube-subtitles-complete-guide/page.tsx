import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildCanonicalUrl } from "@/lib/url";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const pathname = "/guide/how-to-download-youtube-subtitles-complete-guide";
    const canonicalUrl = buildCanonicalUrl({ locale, pathname });

    return {
        title: "How to Download YouTube Subtitles Free in Seconds (2026) — SRT, VTT, TXT",
        description: "Download YouTube subtitles instantly — no software, no login. Paste any YouTube URL and get SRT/VTT/TXT files in seconds. Works for single videos, playlists & bulk. 100% free.",
        keywords: "how to download youtube subtitles, download youtube captions, extract youtube subtitles, youtube subtitle downloader, batch download youtube subtitles",
        openGraph: {
            title: "How to Download YouTube Subtitles Free in Seconds (2026) — SRT, VTT, TXT",
            description: "Download YouTube subtitles instantly — no software, no login. Paste any YouTube URL and get SRT/VTT/TXT files in seconds. Works for single videos, playlists & bulk.",
            url: canonicalUrl,
        },
        twitter: {
            card: "summary_large_image",
            title: "How to Download YouTube Subtitles Free in Seconds (2026) — SRT, VTT, TXT",
            description: "Download YouTube subtitles instantly — no software, no login. Paste any YouTube URL and get SRT/VTT/TXT files in seconds.",
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default function HowToDownloadYouTubeSubtitlesPage() {
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Download YouTube Subtitles",
            "description": "Complete guide on downloading YouTube subtitles using multiple methods including manual extraction and automated tools",
            "image": "https://ytvidhub.com/image/og-subtitle-guide.webp",
            "totalTime": "PT5M",
            "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
            "supply": [
                { "@type": "HowToSupply", "name": "Computer or mobile device" },
                { "@type": "HowToSupply", "name": "Internet connection" },
                { "@type": "HowToSupply", "name": "YouTube video URL" }
            ],
            "tool": [
                { "@type": "HowToTool", "name": "YTVidHub Subtitle Downloader", "url": "https://ytvidhub.com" }
            ],
            "step": [
                { "@type": "HowToStep", "name": "Choose Your Method", "position": 1, "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#methods", "itemListElement": [{ "@type": "HowToDirection", "text": "Select between manual YouTube extraction or automated bulk downloading" }] },
                { "@type": "HowToStep", "name": "Extract Subtitles", "position": 2, "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#extraction", "itemListElement": [{ "@type": "HowToDirection", "text": "Follow the step-by-step instructions for your chosen method" }] },
                { "@type": "HowToStep", "name": "Download and Save", "position": 3, "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#formats", "itemListElement": [{ "@type": "HowToDirection", "text": "Save your subtitles in SRT, VTT, or TXT format" }] }
            ]
        },
    ];

    return (
        <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main>
                {/* Hero */}
                <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 flex-wrap">
                        <span>2.4M+ Downloads</span>
                        <span>4.9/5 Rating</span>
                        <span>8 min read</span>
                        <span>100% Safe &amp; Free</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        How to Download YouTube Subtitles: Complete Guide 2026
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">
                        Learn how to download YouTube subtitles for free using 3 proven methods. This comprehensive guide covers everything from single videos to bulk playlist downloads with SRT, VTT, and TXT formats.
                    </p>
                    <Link
                        href="/youtube-subtitle-downloader"
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Try Our Free Subtitle Downloader
                    </Link>
                    <p className="text-sm text-slate-400 mt-3">
                        Skip the manual work · 5 free downloads daily · No registration required
                    </p>
                </header>

                {/* Quick Navigation */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6">Quick Navigation</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <a href="#method-1" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="font-semibold text-slate-900">1. YouTube Built-in</div>
                            <div className="text-sm text-slate-500">Manual method</div>
                        </a>
                        <a href="#method-2" className="p-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors">
                            <div className="font-semibold text-slate-900">2. YTVidHub Tool</div>
                            <div className="text-sm text-blue-600 font-medium">Recommended</div>
                        </a>
                        <a href="#method-3" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="font-semibold text-slate-900">3. Browser Extensions</div>
                            <div className="text-sm text-slate-500">Alternative method</div>
                        </a>
                    </div>
                </article>

                {/* Method Comparison */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Choose Your Method</h2>
                    <div className="rounded-xl border border-slate-200 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="py-3 px-4 text-left font-semibold text-slate-900">Method</th>
                                    <th className="py-3 px-4 text-center font-semibold text-slate-900">Difficulty</th>
                                    <th className="py-3 px-4 text-center font-semibold text-slate-900">Time</th>
                                    <th className="py-3 px-4 text-center font-semibold text-slate-900">Bulk</th>
                                    <th className="py-3 px-4 text-center font-semibold text-slate-900">Formats</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {[
                                    ["YouTube Built-in", "Easy", "3-5 min", "×", "Text only"],
                                    ["YTVidHub Tool", "Easy", "10-30 sec", "✓", "SRT, VTT, TXT"],
                                    ["Browser Extensions", "Medium", "1-2 min", "Limited", "Varies"],
                                ].map(([method, diff, time, bulk, formats], i) => (
                                    <tr key={i} className={`border-b border-slate-100 last:border-0 ${i === 1 ? "bg-blue-50" : ""}`}>
                                        <td className="py-3 px-4 font-medium text-slate-900">{method}</td>
                                        <td className="py-3 px-4 text-center">{diff}</td>
                                        <td className="py-3 px-4 text-center">{time}</td>
                                        <td className="py-3 px-4 text-center">{bulk}</td>
                                        <td className="py-3 px-4 text-center">{formats}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>

                {/* Method 2: YTVidHub */}
                <article id="method-2" className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Method 2: YTVidHub Batch Subtitle Downloader
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Automated bulk subtitle extraction with professional formats. The fastest way to download subtitles from any YouTube video.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { value: "10-30s", label: "Per Video" },
                            { value: "Bulk", label: "Downloads" },
                            { value: "SRT/VTT", label: "TXT Formats" },
                            { value: "Free", label: "No Registration" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                                <div className="text-xl font-bold text-slate-900">{item.value}</div>
                                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5 mb-8">
                        {[
                            { title: "Batch Processing", desc: "Download subtitles from entire playlists and channels at once" },
                            { title: "Professional Formats", desc: "Export as SRT, VTT, or clean TXT files ready for any use case" },
                            { title: "Lightning Fast", desc: "Process videos in seconds, not minutes" },
                            { title: "No Software Installation", desc: "Works directly in your browser on any device" },
                            { title: "Free Daily Credits", desc: "5 free downloads daily, no credit card required" },
                            { title: "All Languages Supported", desc: "Works with any language available on YouTube" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            Try YTVidHub Free Now
                        </Link>
                        <p className="text-sm text-slate-400 mt-3">5 free downloads daily · No registration required</p>
                    </div>
                </article>

                {/* Method 1: YouTube Built-in */}
                <article id="method-1" className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Method 1: YouTube Built-in Feature
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Free manual method using YouTube&apos;s native transcript feature. No tools needed.
                    </p>
                    <ol className="space-y-6 mb-8">
                        {[
                            { title: "Open the YouTube Video", desc: "Navigate to the YouTube video you want to extract subtitles from. Make sure the video has captions available (you'll see a \"CC\" button in the video player)." },
                            { title: "Click the Three Dots Menu", desc: "Below the video player, click on the three vertical dots (⋮) to open the menu options." },
                            { title: "Select \"Show Transcript\"", desc: "From the dropdown menu, click on \"Show transcript\". This will open a panel on the right side displaying the video's transcript with timestamps." },
                            { title: "Copy the Transcript", desc: "Select all the text in the transcript panel (Ctrl+A or Cmd+A), then copy it (Ctrl+C or Cmd+C)." },
                            { title: "Save and Format", desc: "Paste the transcript into a text editor. You may need to clean up the formatting and remove timestamps if desired." },
                        ].map((step, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="p-5 rounded-xl border border-amber-200 bg-amber-50">
                        <h4 className="font-semibold text-amber-900 mb-2">Limitations of This Method</h4>
                        <div className="text-sm text-amber-700 space-y-1">
                            <p>· Only works for one video at a time</p>
                            <p>· Requires manual formatting and cleanup</p>
                            <p>· No structured file formats (SRT, VTT)</p>
                            <p>· Time-consuming for multiple videos</p>
                        </div>
                    </div>
                </article>

                {/* Method 3: Browser Extensions */}
                <article id="method-3" className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Method 3: Browser Extensions
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Third-party browser extensions for subtitle extraction. Convenient but comes with trade-offs.
                    </p>
                    <ol className="space-y-6 mb-8">
                        {[
                            { title: "Install a Browser Extension", desc: "Search for subtitle downloader extensions in your browser's extension store. Popular options include \"YouTube Subtitle Downloader\" extensions." },
                            { title: "Navigate to YouTube Video", desc: "Go to the YouTube video page. The extension should add a download button or menu option to the page." },
                            { title: "Click the Extension Button", desc: "Look for the extension's download button near the video player or in the browser toolbar." },
                            { title: "Choose Format and Download", desc: "Select your preferred subtitle format (if available) and click download." },
                        ].map((step, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="p-5 rounded-xl border border-rose-200 bg-rose-50">
                        <h4 className="font-semibold text-rose-900 mb-2">Important Security Considerations</h4>
                        <div className="text-sm text-rose-700 space-y-1">
                            <p>· Browser extensions can access your browsing data</p>
                            <p>· Some extensions may contain malware or tracking code</p>
                            <p>· Extensions can slow down your browser performance</p>
                            <p>· May stop working when YouTube updates its interface</p>
                            <p>· Limited support for bulk downloads or advanced features</p>
                        </div>
                    </div>
                </article>

                {/* Professional Use Cases */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Professional Use Cases: Why Download YouTube Subtitles?
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        From our experience processing over 2.4 million subtitle downloads, here are the most common professional applications.
                    </p>
                    <div className="space-y-5 mb-8">
                        {[
                            { title: "AI & Machine Learning Training", desc: "Research teams use our bulk downloader to create massive text datasets. The clean TXT format removes timestamps and formatting, making it perfect for LLM training.", tip: "Best Format: TXT · Recommended: Bulk processing" },
                            { title: "Video Production & Editing", desc: "Content creators and video editors use SRT files to add professional captions to their videos. The timestamp precision is crucial for sync accuracy.", tip: "Best Format: SRT · Recommended: Single video downloads" },
                            { title: "Accessibility & Compliance", desc: "Organizations download subtitles to ensure their video content meets accessibility standards (WCAG 2.1). VTT format works best for web players.", tip: "Best Format: VTT · Recommended: Quality over quantity" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-2">{item.desc}</p>
                                <p className="text-xs text-blue-600 font-medium">{item.tip}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                        <Image
                            src="/youtube-subtitle-formats-comparison-srt-vtt-txt.webp"
                            alt="Comparison chart of YouTube subtitle formats SRT, VTT, and TXT for AI training and video editing."
                            width={400}
                            height={300}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </article>

                {/* Download Trends */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                        Subtitle Download Trends
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { value: "68%", label: "Use TXT for AI training" },
                            { value: "24%", label: "Prefer SRT for editing" },
                            { value: "8%", label: "Choose VTT for web" },
                            { value: "89%", label: "Need bulk processing" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                                <div className="text-xl font-bold text-slate-900">{item.value}</div>
                                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </article>

                {/* Understanding Subtitle Formats */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                        Understanding Subtitle Formats
                    </h2>
                    <div className="space-y-5">
                        {[
                            { title: "SRT Format", desc: "The most popular subtitle format, supported by virtually all video players and editing software.", points: ["Universal compatibility", "Precise timestamps", "Easy to edit"] },
                            { title: "VTT Format", desc: "Modern web format with advanced styling capabilities, perfect for online video players.", points: ["Web-optimized", "Styling support", "HTML5 compatible"] },
                            { title: "TXT Format", desc: "Clean plain text without timestamps, ideal for AI training and text analysis.", points: ["Clean text only", "AI training ready", "Easy to process"] },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                                <div className="space-y-1">
                                    {item.points.map((p, j) => (
                                        <p key={j} className="text-sm text-slate-600">· {p}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

                {/* FAQ */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                        {[
                            { q: "Can I download YouTube subtitles for free?", a: "Yes! You can download YouTube subtitles for free using YouTube's built-in transcript feature or our YTVidHub tool. We offer 5 free downloads daily with no registration required." },
                            { q: "What subtitle formats can I download?", a: "Our tool supports SRT (SubRip), VTT (WebVTT), and clean TXT formats. SRT is perfect for video editing, VTT for web players, and TXT for AI training and text analysis." },
                            { q: "Can I batch download subtitles from YouTube playlists?", a: "Yes! Our batch YouTube subtitle downloader can extract subtitles from entire playlists and channels at once. This is perfect for creating large datasets for AI training or research projects." },
                            { q: "Does this work with different languages?", a: "Absolutely! Our tool can download subtitles in any language available on the YouTube video, including auto-generated captions and manually uploaded subtitles." },
                            { q: "Is it legal to download YouTube subtitles?", a: "Yes, downloading subtitles for personal use, research, accessibility, or educational purposes is generally legal. However, always respect copyright laws and YouTube's terms of service." },
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
                            Ready to Download YouTube Subtitles?
                        </h2>
                        <p className="text-slate-400 mb-8">
                            Skip the manual work and use our automated tool to download subtitles from YouTube videos, playlists, and channels in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Start Downloading Free
                            </Link>
                            <Link
                                href="/bulk-youtube-subtitle-downloader"
                                className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
                            >
                                Learn About Bulk Downloads
                            </Link>
                        </div>
                        <p className="mt-6 text-sm text-slate-500">
                            No registration required · Instant results · Multiple formats
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
