"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import DownloadSubsSchema from "@/components/seo/DownloadSubsSchema";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    Download,
    FileText,
    Zap,
    ShieldCheck,
    Layers,
    Globe,
    CheckCircle2,
    ArrowRight,
    ChevronRight,
    Sparkles,
    Search,
    History,
    Languages
} from "lucide-react";

export default function DownloadSubsFromYoutubePage() {
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.01
    });

    const handleAction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-[#FCFCFD] min-h-screen font-sans selection:bg-blue-100 text-slate-900 antialiased overflow-x-hidden">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-violet-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Structured Data */}
            <DownloadSubsSchema />

            <main className="relative">
                {/* --- Background Decorations --- */}
                <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-[-5%] w-[30rem] h-[30rem] bg-violet-100/40 rounded-full blur-[100px]" />
                </div>

                {/* --- HERO SECTION --- */}
                <section className="pt-24 pb-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                                <Sparkles className="w-3 h-3" /> Professional Subtitle Tools 2025
                            </span>
                            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-900 mb-8 leading-[1.1] text-balance">
                                The Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">YouTube Subtitle</span> Downloader
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed text-pretty max-w-2xl mx-auto font-medium">
                                Whether you're learning a new language, repurposing content, or training AI models, YTVidHub extracts high-accuracy SRT, VTT, and Text subtitles in seconds.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <Link
                                    href="/"
                                    onClick={handleAction}
                                    className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95 flex items-center gap-3 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                    Start Downloading <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/bulk-youtube-subtitle-downloader"
                                    className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-200 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                                >
                                    Bulk Processing <Layers className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Workbench Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative max-w-5xl mx-auto"
                        >
                            <div className="relative bg-white rounded-3xl p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200">
                                <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />
                                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full" />

                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="text-xs font-mono text-slate-400">youtube_subtitle_extractor_v2.0</div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4 text-left">
                                            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                                            <div className="h-12 w-full bg-white border border-slate-200 rounded-xl flex items-center px-4 gap-3 text-left">
                                                <Search className="w-4 h-4 text-slate-400" />
                                                <div className="h-2 w-48 bg-slate-100 rounded" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 pt-4">
                                                <div className="h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">SRT</div>
                                                <div className="h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-[10px] font-bold">VTT</div>
                                                <div className="h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-[10px] font-bold">TXT</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-900 rounded-xl p-6 font-mono text-[10px] text-blue-300 leading-relaxed text-left">
                                            <div className="mb-2 opacity-50"># Capturing Subtitles...</div>
                                            <div className="text-white">1</div>
                                            <div>00:00:01,450 --&gt; 00:00:03,890</div>
                                            <div className="text-emerald-400">Welcome to this deep dive into AI and Subtitles.</div>
                                            <div className="mt-4 text-white">2</div>
                                            <div>00:00:03,890 --&gt; 00:00:07,120</div>
                                            <div className="text-emerald-400">Today we'll show you how to extract data instantly.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- Core Value Proposition --- */}
                <section className="py-24 px-6 border-y border-slate-100 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-12 text-left">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                    <Zap className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Ultra-Fast Extraction</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Our cloud-based architecture processes YouTube API data in real-time. No browser-side rendering delay—extract hour-long videos in seconds.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                                    <Globe className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">100+ Languages Supported</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Fully compatible with YouTube's multi-language tracks. From manually uploaded files to AI auto-generated captions, we capture them all.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Secure & Ad-Free</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Unlike traditional downloader sites, YTVidHub is clean, secure, and entirely ad-free. We focus on high-performance tools and data privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Technical Comparison: Why Format Matters --- */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-4xl mx-auto text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Choose the Perfect Format</h2>
                        <p className="text-slate-600 mb-12 text-center max-w-xl mx-auto">Select the optimal standard for your specific workflow.</p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">SRT</div>
                                    <h4 className="font-bold">Standard Format</h4>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    The most universal format. Supported by VLC, Premiere Pro, Final Cut, and almost every video player and editor.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-xs text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Precise millisecond timing
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Perfect for offline playback
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-lg font-bold text-sm">VTT</div>
                                    <h4 className="font-bold">Web-Optimized</h4>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    Defined by the WebVTT standard. Purpose-built for HTML5 players with support for styling and positioning tags.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-xs text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> First choice for web players
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Supports advanced CSS styling
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Special TXT Section for AI */}
                        <div className="p-8 bg-slate-950 text-white rounded-[2rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Sparkles className="w-24 h-24" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-left">
                                <div className="flex-1">
                                    <div className="inline-block px-3 py-1 bg-blue-500 text-[10px] font-bold uppercase rounded-md mb-4">AI Ready</div>
                                    <h3 className="text-2xl font-bold mb-4">Plain Text (TXT) - Built for LLMs</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        Automatically strips all timestamps and metadata. Export a clean text stream, perfect for ChatGPT summarization, RAG pipelines, or blog drafting.
                                    </p>
                                    <Link href="/workspace" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                                        Explore AI Workspace <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="w-full md:w-64 aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                    <FileText className="w-12 h-12 text-blue-500 opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Step-by-Step Guide --- */}
                <section className="py-24 px-6 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Three Simple Steps</h2>
                        <div className="grid md:grid-cols-3 gap-12 text-center text-left">
                            <div className="relative">
                                <div className="text-6xl font-black text-blue-600/10 absolute -top-10 left-1/2 -translate-x-1/2">01</div>
                                <div className="relative z-10">
                                    <h4 className="font-bold text-xl mb-4 text-slate-900">Paste Video Link</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed text-pretty">Copy the URL from YouTube's address bar and paste it into our search tool.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="text-6xl font-black text-blue-600/10 absolute -top-10 left-1/2 -translate-x-1/2">02</div>
                                <div className="relative z-10">
                                    <h4 className="font-bold text-xl mb-4 text-slate-900">Select Format</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed text-pretty">Choose your preferred language track and output format (SRT, VTT, or TXT).</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="text-6xl font-black text-blue-600/10 absolute -top-10 left-1/2 -translate-x-1/2">03</div>
                                <div className="relative z-10">
                                    <h4 className="font-bold text-xl mb-4 text-slate-900">Instant Download</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed text-pretty">Click high-speed download and your subtitle file is saved to your local drive instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FAQ SECTION --- */}
                <section className="py-24 px-6 bg-white" id="faq">
                    <div className="max-w-3xl mx-auto text-left">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-500">Everything you need to know about our subtitle extraction tool.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "Is it legal to download YouTube subtitles?",
                                    a: "Downloading for personal study, research, or accessibility is generally considered fair use. Always check the original creator's copyright for commercial projects."
                                },
                                {
                                    q: "What if a video has no subtitles?",
                                    a: "If the creator hasn't uploaded captions and YouTube hasn't auto-generated them, subtitles won't be available. Ensure 'CC' is visible on the YouTube player."
                                },
                                {
                                    q: "Do you support auto-generated captions?",
                                    a: "Yes! Our tool retrieves all implicit tracks, including AI-generated captions provided by YouTube's system."
                                },
                                {
                                    q: "Can I download an entire channel's subtitles?",
                                    a: "For large-scale needs, please use our Bulk Download tool which supports entire playlists or channel URLs for massive extraction."
                                }
                            ].map((faq, i) => (
                                <motion.details
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="group p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200 cursor-pointer transition-all duration-300 hover:bg-white hover:border-blue-300"
                                >
                                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 focus:outline-none list-none select-none">
                                        <span>{faq.q}</span>
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-transform group-open:rotate-180">
                                            <ChevronRight className="w-4 h-4 text-slate-400 group-open:text-blue-500" />
                                        </div>
                                    </summary>

                                    <div className="mt-4 pt-4 border-t border-slate-200 text-slate-600 leading-relaxed text-pretty">
                                        {faq.a}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FINAL CTA --- */}
                <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30">
                        <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-blue-500/20 blur-[150px] rounded-full" />
                        <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-violet-500/20 blur-[150px] rounded-full" />
                    </div>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Ready to transform your<br />content workflow?
                        </h2>
                        <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto">
                            Join thousands of creators and researchers. No registration required, free limits available forever.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                onClick={handleAction}
                                className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-500 transition-all hover:-translate-y-1 active:scale-95 text-lg"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-10 py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 text-lg backdrop-blur-xl"
                            >
                                View Pro Plans
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
