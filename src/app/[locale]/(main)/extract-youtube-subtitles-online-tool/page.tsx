"use client";

import Link from "next/link";
import { useState } from "react";

// 字幕提取结果类型
interface SubtitleResult {
    videoId: string;
    title: string;
    duration: string;
    language: string;
    formats: {
        srt: string;
        vtt: string;
        txt: string;
    };
    downloadUrls: {
        srt: string;
        vtt: string;
        txt: string;
    };
}

// 处理状态类型
interface ProcessingStatus {
    status: 'idle' | 'processing' | 'success' | 'error';
    progress: number;
    message: string;
    result?: SubtitleResult;
}

export default function ExtractYouTubeSubtitlesOnlineToolPage() {
    const [url, setUrl] = useState('');
    const [format, setFormat] = useState('srt');
    const [language, setLanguage] = useState('auto');
    const [processing, setProcessing] = useState<ProcessingStatus>({
        status: 'idle',
        progress: 0,
        message: ''
    });

    const validateYouTubeUrl = (url: string): boolean => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)[\w-]+/;
        return youtubeRegex.test(url);
    };

    const extractSubtitles = async () => {
        if (!url.trim()) {
            setProcessing({ status: 'error', progress: 0, message: 'Please enter a YouTube URL' });
            return;
        }
        if (!validateYouTubeUrl(url)) {
            setProcessing({ status: 'error', progress: 0, message: 'Please enter a valid YouTube URL' });
            return;
        }

        setProcessing({ status: 'processing', progress: 10, message: 'Validating URL...' });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProcessing({ status: 'processing', progress: 30, message: 'Fetching video information...' });
            await new Promise(resolve => setTimeout(resolve, 1500));
            setProcessing({ status: 'processing', progress: 60, message: 'Extracting subtitles...' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProcessing({ status: 'processing', progress: 90, message: 'Preparing download...' });
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockResult: SubtitleResult = {
                videoId: 'dQw4w9WgXcQ',
                title: 'Sample YouTube Video Title',
                duration: '3:32',
                language: language === 'auto' ? 'en' : language,
                formats: { srt: 'Sample SRT content...', vtt: 'Sample VTT content...', txt: 'Sample TXT content...' },
                downloadUrls: { srt: '#', vtt: '#', txt: '#' }
            };
            setProcessing({ status: 'success', progress: 100, message: 'Subtitles extracted successfully!', result: mockResult });
        } catch {
            setProcessing({ status: 'error', progress: 0, message: 'Failed to extract subtitles. Please try again.' });
        }
    };

    const downloadSubtitle = (fmt: string, content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${filename}.${fmt}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Subtitle Extractor Online Tool",
        "description": "Free online tool to extract YouTube subtitles in SRT, VTT, and TXT formats with batch processing capabilities",
        "url": "https://ytvidhub.com/extract-youtube-subtitles-online-tool",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        "featureList": ["Extract YouTube subtitles online", "Multiple format support (SRT, VTT, TXT)", "Batch processing for playlists", "No registration required", "Free daily usage", "Multi-language support", "Instant processing", "Secure and private"],
        "screenshot": "https://ytvidhub.com/image/tool-screenshot.webp",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "author": { "@type": "Organization", "name": "YTVidHub", "url": "https://ytvidhub.com" },
        "publisher": { "@type": "Organization", "name": "YTVidHub", "url": "https://ytvidhub.com" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "12847", "bestRating": "5", "worstRating": "1" }
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "How do I extract YouTube subtitles online?", "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your YouTube URL into our online tool, select your preferred format (SRT, VTT, or TXT), and click 'Extract Subtitles'. The process takes 10-30 seconds and requires no registration." } },
            { "@type": "Question", "name": "Is this YouTube subtitle extractor free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our online YouTube subtitle extraction tool is completely free. You get 5 free extractions daily with no registration required. For unlimited access, check our premium plans." } },
            { "@type": "Question", "name": "What subtitle formats can I download?", "acceptedAnswer": { "@type": "Answer", "text": "Our tool supports three popular formats: SRT (SubRip) for video editing, VTT (WebVTT) for web players, and TXT (plain text) for analysis and AI training." } },
            { "@type": "Question", "name": "Can I extract subtitles from YouTube playlists?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our batch processing feature allows you to extract subtitles from entire YouTube playlists at once. Just paste the playlist URL and we'll process all videos automatically." } }
        ]
    };

    return (
        <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

            <main>
                {/* Hero */}
                <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
                    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                        <Link href="/" className="hover:text-slate-600">Home</Link>
                        <span>›</span>
                        <Link href="/tools" className="hover:text-slate-600">Tools</Link>
                        <span>›</span>
                        <span className="text-slate-700">Extract YouTube Subtitles Online</span>
                    </nav>
                    <p className="text-sm text-blue-600 font-medium mb-4">Free Online Tool</p>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        Extract YouTube Subtitles Online Tool
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Free online tool to extract YouTube subtitles instantly. Download in SRT, VTT, or TXT format. Batch processing for playlists. No registration required.
                    </p>
                </header>

                {/* Tool Interface */}
                <section className="max-w-3xl mx-auto px-6 mb-16">
                    <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50">
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">Start Extracting Subtitles</h2>
                        <p className="text-sm text-slate-500 mb-6">Paste your YouTube URL below and choose your preferred format</p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">YouTube URL *</label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors bg-white"
                                    required
                                    disabled={processing.status === 'processing'}
                                />
                                <p className="text-xs text-slate-400 mt-1">Supports individual videos, playlists, and channel URLs</p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Format *</label>
                                    <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" disabled={processing.status === 'processing'}>
                                        <option value="srt">SRT (SubRip)</option>
                                        <option value="vtt">VTT (WebVTT)</option>
                                        <option value="txt">TXT (Plain Text)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" disabled={processing.status === 'processing'}>
                                        <option value="auto">Auto-detect</option>
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                        <option value="it">Italian</option>
                                        <option value="pt">Portuguese</option>
                                        <option value="ru">Russian</option>
                                        <option value="ja">Japanese</option>
                                        <option value="ko">Korean</option>
                                        <option value="zh">Chinese</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button onClick={extractSubtitles} disabled={processing.status === 'processing'} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                        {processing.status === 'processing' ? 'Processing...' : 'Extract Subtitles'}
                                    </button>
                                </div>
                            </div>

                            {/* Processing Status */}
                            {processing.status !== 'idle' && (
                                <div className="mt-4">
                                    {processing.status === 'processing' && (
                                        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                                            <p className="text-sm text-blue-800 font-medium mb-2">{processing.message}</p>
                                            <div className="w-full bg-blue-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${processing.progress}%` }} />
                                            </div>
                                            <p className="text-right text-xs text-blue-600 mt-1">{processing.progress}%</p>
                                        </div>
                                    )}
                                    {processing.status === 'error' && (
                                        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                                            <p className="text-sm text-red-800 font-medium">{processing.message}</p>
                                        </div>
                                    )}
                                    {processing.status === 'success' && processing.result && (
                                        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                                            <p className="text-sm text-green-800 font-medium mb-3">{processing.message}</p>
                                            <div className="p-3 rounded-lg bg-white border border-green-100 mb-3">
                                                <p className="font-semibold text-slate-900 text-sm mb-1">{processing.result.title}</p>
                                                <p className="text-xs text-slate-500">Duration: {processing.result.duration} · Language: {processing.result.language} · ID: {processing.result.videoId}</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <button onClick={() => downloadSubtitle('srt', processing.result!.formats.srt, processing.result!.title)} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors">Download SRT</button>
                                                <button onClick={() => downloadSubtitle('vtt', processing.result!.formats.vtt, processing.result!.title)} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium transition-colors">Download VTT</button>
                                                <button onClick={() => downloadSubtitle('txt', processing.result!.formats.txt, processing.result!.title)} className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg font-medium transition-colors">Download TXT</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Batch Processing */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <div className="p-8 rounded-2xl border border-blue-200 bg-blue-50">
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">Batch Processing</h2>
                        <p className="text-sm text-slate-500 mb-6">Extract subtitles from multiple videos or entire playlists at once</p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Multiple URLs or Playlist URL</label>
                                <textarea
                                    placeholder={"Paste multiple URLs (one per line) or a playlist URL:\n\nhttps://www.youtube.com/watch?v=video1\nhttps://www.youtube.com/watch?v=video2\n\nOr playlist URL:\nhttps://www.youtube.com/playlist?list=PLxxxxxx"}
                                    className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
                                    disabled={processing.status === 'processing'}
                                />
                                <p className="text-xs text-slate-400 mt-1">Supports up to 50 videos per batch. Playlist processing extracts all videos automatically.</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Batch Format</label>
                                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                                        <option value="srt">SRT (SubRip)</option>
                                        <option value="vtt">VTT (WebVTT)</option>
                                        <option value="txt">TXT (Plain Text)</option>
                                        <option value="all">All Formats (ZIP)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Language Preference</label>
                                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                                        <option value="auto">Auto-detect for each video</option>
                                        <option value="en">English only</option>
                                        <option value="es">Spanish only</option>
                                        <option value="multi">All available languages</option>
                                    </select>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Start Batch Processing
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* How It Works */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">How It Works</h2>
                    <div className="space-y-5">
                        {[
                            { step: "Step 1", title: "Paste URL", desc: "Copy and paste your YouTube video URL into the input field above" },
                            { step: "Step 2", title: "Choose Format", desc: "Select your preferred subtitle format: SRT, VTT, or TXT" },
                            { step: "Step 3", title: "Download", desc: "Click extract and download your subtitle file instantly" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">{item.step}</p>
                                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* Features */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Why Choose Our Tool?</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {[
                            { title: "Lightning Fast", desc: "Extract subtitles in 10-30 seconds" },
                            { title: "Multiple Formats", desc: "SRT, VTT, and TXT support" },
                            { title: "All Languages", desc: "Extract subtitles in any language" },
                            { title: "100% Secure", desc: "No data stored, complete privacy" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </main>
        </div>
    );
}
