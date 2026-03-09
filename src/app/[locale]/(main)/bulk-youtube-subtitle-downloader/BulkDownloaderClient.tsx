"use client";

import React, { useState, useEffect } from "react";
import { Link } from '@/i18n/routing';
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import BulkDownloaderSchema from "@/components/seo/BulkDownloaderSchema";
import {
    Sparkles,
    ArrowRight,
    CheckCheck,
    Info,
    Youtube,
    FileText,
    History as HistoryIcon,
    AlertCircle,
    Layers,
    Github,
    ExternalLink,
    ChevronDown,
    Zap,
    LifeBuoy
} from "lucide-react";

export default function BulkDownloaderClient({ locale }: { locale: string }) {
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showScrollBtns, setShowScrollBtns] = useState(false);

    const handleAction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
            <BulkDownloaderSchema />

            <main className="relative">
                {/* 统一的背景网格纹理 */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* === 1. HERO SECTION === */}
                <section className="relative pt-16 pb-24 overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* 顶部小标 */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-[10px] font-bold uppercase tracking-wider mb-8">
                                <Sparkles size={12} /> Professional Batch Engine
                            </div>

                            {/* 高级感标题 */}
                            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Bulk YouTube</span> <br />
                                <span className="text-blue-600 italic">Subtitle Downloader</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
                                The most powerful <strong>bulk YouTube subtitle downloader</strong> for extracting SRT, VTT, and TXT captions from entire playlists, channels, and multiple videos.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                                <Link
                                    href="/"
                                    onClick={handleAction}
                                    className="px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 text-sm uppercase tracking-widest flex items-center gap-2"
                                >
                                    Get Started Free <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="px-10 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1 text-sm uppercase tracking-widest"
                                >
                                    Pricing Plans
                                </Link>
                            </div>

                            {/* 精制应用原型预览 */}
                            <div className="max-w-4xl mx-auto relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] border border-slate-200 shadow-2xl p-2 md:p-3 overflow-hidden">
                                    <div className="bg-slate-50 rounded-[1.6rem] border border-slate-100 overflow-hidden">
                                        {/* Mock Browser Header */}
                                        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                            </div>
                                            <div className="px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-mono text-slate-400 w-1/2 flex items-center gap-2">
                                                <Info size={10} /> ytvidhub.com/bulk-downloader
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                                        </div>

                                        <div className="p-8 md:p-12">
                                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                                <div className="space-y-4 text-left">
                                                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm font-mono text-xs leading-6 text-slate-400 relative overflow-hidden">
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-300">1</span>
                                                            <span className="text-blue-600/60 truncate">youtube.com/playlist?list=PLrAXtmR...</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-300">2</span>
                                                            <span className="text-blue-600/60 truncate">youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-300">3</span>
                                                            <span className="text-slate-200 italic">Batch process 1000+ videos...</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 px-2">
                                                        <CheckCheck size={12} className="text-green-500" /> RECURSIVE ENGINE ACTIVE
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm relative rotate-2">
                                                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-200">
                                                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                                                        Unified .ZIP
                                                    </h3>
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                                                        SRT • VTT • TXT
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === SEO CORE CONTENT === */}
                <section className="py-24 bg-white relative">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Professional Bulk YouTube Subtitle Extraction</h2>
                            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                                YTVidHub is the industry-leading <strong>bulk YouTube subtitle downloader</strong> trusted by AI researchers, content creators, and accessibility professionals worldwide.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 mb-24">
                            {[
                                {
                                    icon: <Youtube className="text-blue-600" size={24} />,
                                    title: "Playlist Subtitle Download",
                                    desc: "Extract subtitles from entire YouTube playlists with thousands of videos in one operation."
                                },
                                {
                                    icon: <Sparkles className="text-indigo-600" size={24} />,
                                    title: "Lightning Fast Processing",
                                    desc: "Our advanced <strong>batch YouTube subtitle extractor</strong> processes hundreds of videos simultaneously."
                                },
                                {
                                    icon: <FileText className="text-emerald-600" size={24} />,
                                    title: "Multiple Format Support",
                                    desc: "Download in SRT, VTT, or clean TXT format - perfect for any use case or platform."
                                }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors border border-slate-100 group-hover:border-blue-100">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <HistoryIcon size={120} />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 relative z-10">For AI & Machine Learning</h3>
                                <ul className="space-y-4 text-slate-400 relative z-10 text-sm">
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-400 shrink-0" />
                                        <span>Clean TXT format perfect for training datasets</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-400 shrink-0" />
                                        <span>Bulk extraction for large-scale AI projects</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-400 shrink-0" />
                                        <span>Automated processing saves weeks of manual work</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-400 shrink-0" />
                                        <span>Compatible with popular ML frameworks</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-10 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 transition-colors group">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">For Content Creators</h3>
                                <ul className="space-y-4 text-slate-500 text-sm">
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-500 shrink-0" />
                                        <span>Extract transcripts for blog content creation</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-500 shrink-0" />
                                        <span>Download channel archives for backup</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-500 shrink-0" />
                                        <span>Create accessible content with proper captions</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCheck size={18} className="text-blue-500 shrink-0" />
                                        <span>Repurpose video content across platforms</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === COMPARISON SECTION === */}
                <section className="py-24 bg-slate-50/50 border-y border-slate-100">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                                Advanced Extraction Technology
                            </h2>
                            <p className="text-slate-500 font-medium max-w-xl mx-auto">
                                See how our <strong>professional bulk YouTube subtitle downloader</strong> transforms your subtitle extraction workflow.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-0 rounded-[2.5rem] border border-slate-200 overflow-hidden bg-white shadow-sm">
                            <div className="p-12 border-b md:border-b-0 md:border-r border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <AlertCircle size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Manual Method</h3>
                                </div>
                                <ul className="space-y-5 text-slate-400 text-sm font-medium">
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-slate-300">•</span>
                                        <span>Open dozens of browser tabs and wait.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-slate-300">•</span>
                                        <span>Click "download srt" for every single video manually.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-slate-300">•</span>
                                        <span>Deal with cryptically named files like "captions.srt".</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-slate-300">•</span>
                                        <span>Waste hours renaming and organizing files.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-slate-300">•</span>
                                        <span>Limited - no bulk processing.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-12 bg-slate-50/30 relative">
                                <div className="absolute top-0 right-0 px-6 py-6 font-black text-blue-600/10 text-5xl uppercase italic tracking-tighter">
                                    YTVidHub
                                </div>
                                <div className="flex items-center gap-3 mb-8 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                        <CheckCheck size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Professional Bulk Pipeline</h3>
                                </div>
                                <ul className="space-y-5 text-slate-700 text-sm font-bold relative z-10">
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-blue-600">✓</span>
                                        <span>Paste entire playlist or channel URL for bulk processing.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-blue-600">✓</span>
                                        <span>Download <strong>YouTube playlist subtitles</strong> with one click.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-blue-600">✓</span>
                                        <span>Clean SRT/VTT/TXT files named by video title.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="shrink-0 text-blue-600">✓</span>
                                        <span>Process thousands of videos simultaneously.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Complete Enterprise Solution</h2>
                            <p className="text-slate-500 font-medium">
                                From single videos to massive playlists - our <strong>bulk YouTube subtitle downloader</strong> handles any scale.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Playlist Extraction", desc: "Extract subtitles from entire YouTube playlists with our <strong>playlist downloader</strong>." },
                                { title: "Channel Archives", desc: "Download all subtitles from YouTube channels using our <strong>bulk transcript extractor</strong>." },
                                { title: "Flexible Formats", desc: "Get subtitles in SRT, VTT, or TXT format with our versatile <strong>caption downloader</strong>." },
                                { title: "AI Research Ready", desc: "Clean text extraction perfect for machine learning and <strong>AI dataset creation</strong>." }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === USE CASES === */}
                <section className="py-24 bg-slate-900 rounded-[3rem] mx-4 md:mx-10 mb-24 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-20 opacity-5">
                        <Sparkles size={400} />
                    </div>
                    <div className="container mx-auto px-10 relative z-10">
                        <div className="max-w-3xl mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Professional <span className="text-blue-400">Use Cases</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium">
                                Discover why professionals choose our <strong>bulk YouTube subtitle downloader</strong> for AI training, research, and content creation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: "🤖",
                                    title: "AI & LLM Training",
                                    desc: "Extract massive subtitle datasets in Clean TXT format. Our <strong>bulk YouTube transcript downloader</strong> is the preferred choice for developers fine-tuning GPT models.",
                                },
                                {
                                    icon: "📝",
                                    title: "Content Repurposing",
                                    desc: "Turn entire video libraries into SEO-optimized blog posts. Quickly extract transcripts for show notes using our <strong>YouTube playlist subtitle extractor</strong>.",
                                },
                                {
                                    icon: "📚",
                                    title: "Digital Archiving",
                                    desc: "Backup your channel's metadata and captions. Download precise SRT/VTT files for translation audits with our <strong>bulk subtitle extraction tool</strong>.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all group"
                                >
                                    <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110 duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === 4. 3-STEP GUIDE === */}
                <section className="py-32 bg-white relative">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-24">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                Simple <span className="text-blue-600">Batch Process</span>
                            </h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                                How to <strong>download youtube playlist with subtitles</strong> in three easy stages.
                            </p>
                        </div>

                        <div className="space-y-40">
                            {[
                                {
                                    step: "01",
                                    title: "Ingestion: Entire Playlists",
                                    desc: "Paste your Playlist or Channel URL. Our recursive engine automatically harvests all individual video links for batch subtitle extraction.",
                                    img: "/image/Generated Image October 14, 2025 - 12_19PM.webp",
                                    icon: <Layers size={20} className="text-blue-600" />,
                                    accent: "bg-blue-600"
                                },
                                {
                                    step: "02",
                                    title: "Format Selection: SRT/VTT/TXT",
                                    desc: "Choose the standard that fits your needs. We offer SRT for players, VTT for web, and 'Clean TXT' for AI-ready text corpora.",
                                    img: "/image/bulk-guide-step2-paste-list.webp",
                                    icon: <FileText size={20} className="text-indigo-600" />,
                                    accent: "bg-indigo-600",
                                    reverse: true
                                },
                                {
                                    step: "03",
                                    title: "Final Delivery: Organized ZIP",
                                    desc: "Our cloud-based engine processes the batch. Download a single ZIP file where every transcript is perfectly named by the original video title.",
                                    img: "/image/Generated Image October 14, 2025 - 12_24PM.webp",
                                    icon: <Zap size={20} className="text-emerald-600" />,
                                    accent: "bg-emerald-600"
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16 lg:gap-32`}
                                >
                                    <div className="md:w-5/12 text-left">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 ${item.accent} rounded-2xl flex items-center justify-center text-white shadow-xl opacity-90`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-black text-slate-300 uppercase tracking-[0.3em]">Phase {item.step}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                                            {item.desc}
                                        </p>
                                        <div className="h-px w-20 bg-slate-200"></div>
                                    </div>

                                    <div className="md:w-7/12 w-full">
                                        <div className="relative group">
                                            <div className="absolute -inset-4 bg-slate-100 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative bg-white p-3 rounded-[2.2rem] border border-slate-200 shadow-2xl overflow-hidden">
                                                <div className="overflow-hidden rounded-[1.6rem] bg-slate-50 aspect-video">
                                                    <img
                                                        src={item.img}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === ANY LINK SECTION === */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    <div className="container mx-auto px-6 max-w-6xl relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-20">
                            <div className="md:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none italic uppercase">
                                    Any Link. <br />
                                    <span className="text-blue-500">Unlimited</span> Scale.
                                </h2>
                                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                                    The most flexible <strong>YouTube subtitle downloader</strong> that handles complex playlist structures and massive channel archives.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "📺 Single Videos",
                                        "📑 Full Playlists",
                                        "👤 Channel Archives",
                                    ].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-xs font-bold border border-white/10 uppercase tracking-widest"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="md:w-5/12 w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                                <h3 className="text-[10px] font-black mb-8 text-blue-500 uppercase tracking-[0.3em] text-center">
                                    Supported Formats
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "youtube.com/playlist?list=...",
                                        "youtube.com/@ChannelUsername",
                                        "youtube.com/watch?v=..."
                                    ].map((url, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-xs text-slate-400 group hover:border-blue-500/30 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                            <span className="truncate group-hover:text-slate-200 transition-colors">{url}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === FORMAT DETAILS === */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                SRT, VTT, or <span className="text-blue-600">Clean TXT</span>
                            </h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                                Precision or clean text? We support all major industry standards.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Clean TXT Transcript",
                                    badge: "For AI & Research",
                                    desc: "Automatically removes all timestamps and sequence numbers. Get a clean, readable transcript perfect for SEO blogs and LLM training.",
                                    preview: "Welcome to our deep dive into the future of media... (Pure Text)",
                                    accent: "blue"
                                },
                                {
                                    title: "Timed SRT / VTT",
                                    badge: "For Video Players",
                                    desc: "Standard timecoded files (Start --> End). Perfect for re-uploading, video editing, or offline viewing with VLC.",
                                    preview: "1\n00:00:01,000 --> 00:00:04,000\nWelcome to our deep dive...",
                                    accent: "indigo"
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                                    </div>
                                    <div className={`inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6`}>
                                        {item.badge}
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                                        {item.desc}
                                    </p>
                                    <div className="p-6 bg-white rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-300 shadow-inner overflow-hidden">
                                        <pre className="whitespace-pre-wrap">{item.preview}</pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === TECHNICAL FAQ === */}
                <section className="py-32 bg-slate-50/50" id="bulk-faq">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="mb-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                FAQ
                            </h2>
                            <p className="text-slate-500 font-medium">Everything you need to know about our batch engine.</p>
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    q: "How do I download an entire YouTube playlist with subtitles?",
                                    a: (
                                        <>
                                            To download a <strong>YouTube playlist with subtitles</strong> in bulk, simply copy the playlist URL from your browser and paste it into YTVidHub's <strong>bulk subtitle downloader</strong>. Our advanced engine will crawl the entire playlist, extract the captions for each video, and bundle them into an organized ZIP file for you.
                                        </>
                                    ),
                                },
                                {
                                    q: "Can I extract subtitles from multiple YouTube videos at once?",
                                    a: (
                                        <>
                                            Yes! You can paste a list of multiple individual video URLs or a channel link. YTVidHub is the leading <strong>bulk YouTube subtitle downloader</strong> and <strong>batch subtitle extractor</strong>, allowing for unlimited URLs for Pro members.
                                        </>
                                    ),
                                },
                                {
                                    q: "What file formats do you support for captions?",
                                    a: (
                                        <>
                                            We support the three most common formats: <strong>SRT (SubRip)</strong>, <strong>VTT (WebVTT)</strong>, and <strong>Clean TXT</strong>. You can toggle between these formats before starting your bulk download.
                                        </>
                                    ),
                                },
                                {
                                    q: "Does this tool support auto-generated YouTube subtitles?",
                                    a: (
                                        <>
                                            Absolutely. Our <strong>bulk YouTube transcript downloader</strong> can extract both manually uploaded subtitles and YouTube's auto-generated closed captions (CC) in any available language. The tool works with all types of YouTube captions.
                                        </>
                                    ),
                                },
                                {
                                    q: "Is there a limit to how many subtitles I can download?",
                                    a: (
                                        <>
                                            Free users have a daily quota for <strong>bulk subtitle downloads</strong>. <strong>Pro members</strong> enjoy unlimited bulk extraction, allowing them to download subtitles for thousands of videos in a single operation using our advanced <strong>YouTube playlist subtitle downloader</strong>.
                                        </>
                                    ),
                                },
                            ].map((faq, i) => (
                                <details
                                    key={i}
                                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 open:border-blue-200 open:shadow-xl open:shadow-blue-50"
                                >
                                    <summary className="flex justify-between items-center p-8 font-bold text-lg text-slate-900 cursor-pointer list-none select-none">
                                        <span>{faq.q}</span>
                                        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-blue-600" />
                                    </summary>
                                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                                        <div className="pt-2 border-t border-slate-50">
                                            {faq.a}
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === RELATED TOOLS === */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Ecosystem Tools</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                                Explore our complete suite of YouTube subtitle and transcript extraction tools.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <Zap size={24} className="text-blue-600" />,
                                    title: "Single Video Downloader",
                                    desc: "Need to download subtitles from just one video? Try our <Link href='/youtube-subtitle-downloader' className='text-blue-600 font-semibold hover:underline'>single YouTube subtitle downloader</Link> for quick extraction.",
                                    link: "/youtube-subtitle-downloader"
                                },
                                {
                                    icon: <LifeBuoy size={24} className="text-indigo-600" />,
                                    title: "Data Preparation Guide",
                                    desc: "Learn how to prepare YouTube transcripts for AI training. Our <Link href='/data-prep-guide' className='text-blue-600 font-semibold hover:underline'>comprehensive data prep guide</Link> covers best practices.",
                                    link: "/data-prep-guide"
                                },
                                {
                                    icon: <FileText size={24} className="text-emerald-600" />,
                                    title: "SRT vs VTT Guide",
                                    desc: "Understand the differences between subtitle formats. Our <Link href='/guide/srt-vs-vtt' className='text-blue-600 font-semibold hover:underline'>SRT vs VTT comparison guide</Link> helps you choose.",
                                    link: "/guide/srt-vs-vtt"
                                }
                            ].map((tool, i) => (
                                <div key={i} className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-slate-200 transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                                        {tool.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{tool.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: tool.desc }}></p>
                                    <Link href={tool.link} className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Explore Tool <ArrowRight size={14} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === CTA SECTION === */}
                <section className="py-32 px-4 md:px-10">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-white italic uppercase">
                                Scale Your <br />
                                Subtitle Extraction
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                Don't let manual extraction slow you down. YTVidHub is the professional's choice for <strong>bulk YouTube subtitle downloads</strong>.
                            </p>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-widest"
                            >
                                Get Started with Pro <ArrowRight size={18} />
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
