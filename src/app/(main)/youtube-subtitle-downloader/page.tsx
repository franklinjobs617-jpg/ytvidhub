"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";

export default function YouTubeSubtitleDownloaderPage() {
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleAction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
            {/* Structured Data */}
            <SubtitleDownloaderSchema />

            <main>
                {/* === 1. HERO SECTION === */}
                <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[25rem] h-[25rem] bg-blue-400/10 rounded-full blur-[80px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[20rem] h-[20rem] bg-indigo-400/10 rounded-full blur-[80px] animate-pulse"></div>

                    <div className="relative pt-16 pb-20 text-center px-6 z-10">
                        {/* H1 - Primary Keyword Target */}
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-slate-900 mb-6 leading-tight">
                            Free <span className="text-blue-600">YouTube Subtitle</span> Downloader
                        </h1>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8 leading-relaxed">
                            Extract <strong>YouTube captions</strong> in SRT, VTT, and TXT formats instantly. Download subtitles with timestamps for video editing or clean text for AI training and accessibility.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link
                                href="/"
                                onClick={handleAction}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                Start Downloading Subtitles
                            </Link>
                            <Link
                                href="/bulk-youtube-subtitle-downloader"
                                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border-2 border-slate-200 shadow-sm transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                Bulk Download Tool
                            </Link>
                        </div>

                        {/* Visual Demo */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-6">
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">YouTube Video</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-8 h-8 mx-auto mb-4 text-blue-600">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Extract</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">SRT/VTT/TXT Files</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 2. WHAT IS YOUTUBE SUBTITLE DOWNLOADER === */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                            What is a YouTube Subtitle Downloader?
                        </h2>
                        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                            <p className="mb-6">
                                A <strong>YouTube subtitle downloader</strong> is a specialized tool that extracts closed captions and subtitles from YouTube videos. These captions can be either manually uploaded by content creators or automatically generated by YouTube's speech recognition technology.
                            </p>
                            <p className="mb-6">
                                Our <strong>YouTube caption downloader</strong> supports multiple formats including SRT (SubRip), VTT (WebVTT), and clean TXT files, making it perfect for video editing, accessibility compliance, language learning, and AI training datasets.
                            </p>
                        </div>
                    </div>
                </section>

                {/* === 3. SUPPORTED FORMATS === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            Download YouTube Subtitles in Multiple Formats
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            Choose the perfect format for your needs - from video editing to AI training
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* SRT Format */}
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-blue-600 font-bold text-lg">SRT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    SRT Subtitles
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Standard SubRip format with precise timestamps. Perfect for video players, editing software, and media production.
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    1<br />
                                    00:00:01,000 --&gt; 00:00:04,000<br />
                                    Welcome to our tutorial...
                                </div>
                            </div>

                            {/* VTT Format */}
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-purple-600 font-bold text-lg">VTT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    VTT Captions
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    WebVTT format for web players and HTML5 video. Includes styling options and web-optimized formatting.
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    WEBVTT<br /><br />
                                    00:01.000 --&gt; 00:04.000<br />
                                    Welcome to our tutorial...
                                </div>
                            </div>

                            {/* TXT Format */}
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-green-600 font-bold text-lg">TXT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    Clean Text
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Pure transcript without timestamps. Ideal for AI training, content analysis, and text processing applications.
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    Welcome to our tutorial on machine learning fundamentals. Today we'll explore...
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 4. HOW TO USE === */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            How to Download YouTube Subtitles
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-8">
                                    {[
                                        {
                                            step: "1",
                                            title: "Copy YouTube URL",
                                            desc: "Copy the URL of any YouTube video that has captions or subtitles available."
                                        },
                                        {
                                            step: "2",
                                            title: "Paste and Select Format",
                                            desc: "Paste the URL into our tool and choose your preferred format: SRT, VTT, or TXT."
                                        },
                                        {
                                            step: "3",
                                            title: "Download Instantly",
                                            desc: "Click download and get your subtitle file immediately. No registration required for basic use."
                                        }
                                    ].map((item) => (
                                        <div key={item.step} className="flex gap-4">
                                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-lg p-4">
                                            <p className="text-xs text-slate-500 mb-2">YouTube URL</p>
                                            <p className="font-mono text-sm text-slate-700">https://youtube.com/watch?v=example</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">SRT</button>
                                            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">VTT</button>
                                            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">TXT</button>
                                        </div>
                                        <button className="w-full py-3 bg-green-600 text-white rounded-lg font-bold">
                                            Download Subtitles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 5. USE CASES === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            Why Download YouTube Subtitles?
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            From accessibility to AI training, discover the many uses for YouTube captions
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: "🎬",
                                    title: "Video Editing",
                                    desc: "Import subtitles into editing software for professional video production and post-processing."
                                },
                                {
                                    icon: "♿",
                                    title: "Accessibility",
                                    desc: "Ensure content is accessible to deaf and hard-of-hearing audiences with proper captions."
                                },
                                {
                                    icon: "🤖",
                                    title: "AI Training",
                                    desc: "Create clean text datasets for machine learning models and natural language processing."
                                },
                                {
                                    icon: "🌍",
                                    title: "Translation",
                                    desc: "Use transcripts as source material for translating content into multiple languages."
                                },
                                {
                                    icon: "📚",
                                    title: "Research",
                                    desc: "Analyze video content for academic research, content analysis, and data mining."
                                },
                                {
                                    icon: "📝",
                                    title: "Content Creation",
                                    desc: "Repurpose video content into blog posts, articles, and social media content."
                                },
                                {
                                    icon: "🎓",
                                    title: "Education",
                                    desc: "Create study materials and course transcripts for educational purposes."
                                },
                                {
                                    icon: "🔍",
                                    title: "SEO Optimization",
                                    desc: "Extract text content to improve search engine optimization and content discoverability."
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* === 6. FEATURES COMPARISON === */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            Why Choose YTVidHub for YouTube Subtitle Downloads?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">✕</span>
                                    Other Tools
                                </h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        Limited to single video downloads
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        Poor format support and quality
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        Ads and registration required
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        Slow processing and unreliable
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        No bulk or playlist support
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">
                                <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    YTVidHub
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">✓</span>
                                    Our Solution
                                </h3>
                                <ul className="space-y-3 text-blue-900 font-medium">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-1">•</span>
                                        Single videos + bulk playlist downloads
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-1">•</span>
                                        High-quality SRT, VTT, and TXT formats
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-1">•</span>
                                        Free tier with no ads or registration
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-1">•</span>
                                        Lightning-fast cloud processing
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-1">•</span>
                                        Advanced bulk and AI-ready features
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 7. TECHNICAL SPECIFICATIONS === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            Technical Specifications
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Supported Video Types</h3>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Public YouTube videos
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Unlisted videos (with URL)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Auto-generated captions
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Manual uploaded subtitles
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Multiple language tracks
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Output Formats</h3>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        SRT (SubRip) with timestamps
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        VTT (WebVTT) for web players
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        TXT (Plain text) clean format
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        UTF-8 encoding support
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Customizable formatting options
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 8. FAQ SECTION === */}
                <section className="py-16 bg-white" id="faq">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "Is it legal to download YouTube subtitles?",
                                    a: "Yes, downloading subtitles for personal use, accessibility, research, and educational purposes is generally considered fair use. However, always respect copyright laws and YouTube's terms of service when using downloaded content."
                                },
                                {
                                    q: "Can I download subtitles from private YouTube videos?",
                                    a: "No, our tool can only access subtitles from public and unlisted YouTube videos. Private videos require special permissions that our service cannot access."
                                },
                                {
                                    q: "What's the difference between SRT and VTT formats?",
                                    a: "SRT (SubRip) is the most common subtitle format, widely supported by video players and editing software. VTT (WebVTT) is designed for web browsers and HTML5 video players, offering more styling options and web-specific features."
                                },
                                {
                                    q: "Do you support auto-generated YouTube captions?",
                                    a: "Yes, our YouTube subtitle downloader works with both manually uploaded subtitles and YouTube's automatically generated captions. Auto-generated captions may have lower accuracy but are still useful for many applications."
                                },
                                {
                                    q: "Can I download subtitles in different languages?",
                                    a: "Absolutely! If a YouTube video has subtitles available in multiple languages, you can select and download any available language track. This includes both original language subtitles and translated versions."
                                },
                                {
                                    q: "Is there a limit to how many subtitles I can download?",
                                    a: "Free users can download subtitles from individual videos without limits. For bulk downloads from playlists or channels, we offer premium plans with higher quotas and additional features."
                                },
                                {
                                    q: "What if a YouTube video doesn't have subtitles?",
                                    a: "If a video doesn't have any captions or subtitles available (neither manual nor auto-generated), our tool cannot extract subtitles from it. The video creator would need to enable captions or upload subtitle files first."
                                },
                                {
                                    q: "Can I use downloaded subtitles for commercial purposes?",
                                    a: "Commercial use depends on the original video's copyright and licensing. Always check the video's license and get permission from the content creator before using subtitles for commercial purposes."
                                }
                            ].map((faq, i) => (
                                <details
                                    key={i}
                                    className="group p-6 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer transition-all duration-200 hover:bg-white hover:border-blue-200"
                                >
                                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 focus:outline-none list-none select-none">
                                        <span>{faq.q}</span>
                                        <svg
                                            className="w-5 h-5 text-slate-400 transition-transform duration-300 transform group-open:rotate-180 group-open:text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>

                                    <div className="mt-4 pt-4 border-t border-slate-200 text-slate-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === 9. RELATED TOOLS === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            Explore More YouTube Tools
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            Discover our complete suite of YouTube content extraction and processing tools
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/bulk-youtube-subtitle-downloader" className="group">
                                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Bulk Subtitle Downloader</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">Download subtitles from entire playlists and channels in one batch operation.</p>
                                </div>
                            </Link>

                            <Link href="/tools" className="group">
                                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">All YouTube Tools</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">Explore our complete collection of YouTube content processing and analysis tools.</p>
                                </div>
                            </Link>

                            <Link href="/workspace" className="group">
                                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">AI Analysis Workspace</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">Generate AI-powered summaries and insights from YouTube video content.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* === 10. CTA SECTION === */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                    <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            Start Downloading YouTube Subtitles Today
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of creators, researchers, and developers who trust YTVidHub for their subtitle extraction needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/"
                                onClick={handleAction}
                                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                Try Free Now
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl border-2 border-blue-400 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                View Pro Features
                            </Link>
                        </div>
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