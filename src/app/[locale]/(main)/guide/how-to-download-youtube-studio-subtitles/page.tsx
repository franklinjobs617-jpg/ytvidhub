"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    Youtube,
    AlertTriangle,
    CheckCircle,
    Download,
    Settings,
    ChevronRight,
    Zap,
    Clock,
    Unlock,
    Layers,
    HelpCircle,
} from "lucide-react";

export default function GuideYoutubeStudio() {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
            {/* 🚀 SEO METADATA START */}
            <title>How to Download Subtitles from YouTube Studio (2026 Guide) & The Better Way</title>
            <meta
                name="description"
                content="Learn the official method to download subtitles from YouTube Studio (SRT/SBV) and discover a faster way to batch download captions from ANY video or playlist."
            />
            <meta
                name="keywords"
                content="download subtitles youtube studio, export captions youtube, youtube studio srt download, download closed captions youtube, youtube subtitle downloader"
            />
            <link rel="canonical" href="https://ytvidhub.com/guide/how-to-download-youtube-studio-subtitles/" />

            {/* RICH SNIPPET: HowTo & FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "HowTo",
                            "name": "How to Download Subtitles from YouTube Studio",
                            "description": "Step-by-step guide to exporting your own video captions from YouTube Studio.",
                            "step": [
                                {
                                    "@type": "HowToStep",
                                    "name": "Log in to YouTube Studio",
                                    "text": "Go to studio.youtube.com and sign in with your channel account."
                                },
                                {
                                    "@type": "HowToStep",
                                    "name": "Navigate to Subtitles",
                                    "text": "Click on 'Subtitles' in the left-hand menu."
                                },
                                {
                                    "@type": "HowToStep",
                                    "name": "Select Video & Language",
                                    "text": "Find the video you want, click the video title details, then hover over the language row."
                                },
                                {
                                    "@type": "HowToStep",
                                    "name": "Download Format",
                                    "text": "Click the three dots (Options) and select 'Download', then choose .srt, .sbv, or .vtt."
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Can I download subtitles from YouTube Studio in bulk?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "No, YouTube Studio currently only allows downloading subtitles one video at a time. To download multiple subtitles or entire playlists at once, use a dedicated tool like YTvidHub Batch Downloader."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What format does YouTube Studio export?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "YouTube Studio typically exports captions in .sbv (proprietary), .srt (standard), or .vtt (web) formats. .SBV is rarely supported by video editors, so always choose .SRT if available."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How do I download auto-generated captions?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "In YouTube Studio, go to the Subtitles tab, find the 'Automatic' language track (often labeled 'English (Automatic)'), hover over the row, click the three dots, and select Download."
                                    }
                                }
                            ]
                        }
                    ])
                }}
            />
            {/* 🚀 SEO METADATA END */}

            <main>
                {/* === HEADER SECTION === */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-white">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
                        <div className="absolute top-0 right-0 left-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
                    </div>

                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        {/* Breadcrumb */}
                        <nav className="flex justify-center items-center text-sm text-slate-500 mb-8 font-medium bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full inline-flex border border-slate-100 shadow-sm mx-auto">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <ChevronRight size={14} className="mx-2 text-slate-300" />
                            <span className="text-slate-400">Guide</span>
                            <ChevronRight size={14} className="mx-2 text-slate-300" />
                            <span className="text-blue-600 font-semibold">YouTube Studio Export</span>
                        </nav>

                        <div className="mb-6 flex justify-center">
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                                <Youtube size={14} className="text-red-500" /> Creator's Guide
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                            How to Download Subtitles from <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">YouTube Studio</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
                            The definitive guide to exporting captions from your own channel, plus a secret trick to download from <span className="text-slate-900 border-b-2 border-blue-200 hover:border-blue-500 transition-colors cursor-help">any video you don't own</span>.
                        </p>
                    </div>
                </section>

                {/* === CONTENT BODY === */}
                <section className="pb-20">
                    <div className="container mx-auto px-6 max-w-3xl">

                        {/* INTRO */}
                        <div className="prose prose-lg prose-slate max-w-none mb-12">
                            <p>
                                Downloading subtitles from your own YouTube videos is a common task for creators who want to repurpose content or back up their work.
                                However, YouTube hides this feature deep within the Studio interface.
                            </p>
                            <p>
                                In this guide, we'll show you the <strong>official manual method</strong> first. Then, we'll show you a <strong>much faster tool</strong> that works for bulk downloads and other people's videos.
                            </p>

                            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-8 my-10 shadow-[0_2px_10px_-4px_rgba(59,130,246,0.1)]">
                                <h4 className="flex items-center gap-2 text-blue-900 font-bold text-lg m-0 mb-4">
                                    <Clock size={20} className="text-blue-600" /> Quick Summary
                                </h4>
                                <ul className="m-0 pl-0 grid gap-3">
                                    <li className="flex gap-3 text-slate-700">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                                        <span><strong>Method 1 (Official):</strong> Free, but manual. Only works for YOUR videos one by one.</span>
                                    </li>
                                    <li className="flex gap-3 text-slate-700">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">2</span>
                                        <span><strong>Method 2 (YTvidHub):</strong> Free, instant, supports <strong>Batch/Playlist</strong> download for ANY video.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* METHOD 1: THE MANUAL WAY (Trust Building) */}
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black text-xl border border-slate-200 shadow-sm">1</div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 m-0">
                                    The Official Way (YouTube Studio)
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        step: "Step 1",
                                        title: "Access Subtitles Menu",
                                        desc: "Log in to YouTube Studio. In the left sidebar, click on 'Content' or 'Subtitles'.",
                                        image: "/image/guide/youtube-studio/step-1-list.png",
                                        alt: "YouTube Studio Channel Subtitles List showing videos"
                                    },
                                    {
                                        step: "Step 2",
                                        title: "Click Your Video",
                                        desc: "Don't just stare at the list! Click on the specific video title or thumbnail to open its language settings.",
                                        image: "/image/guide/youtube-studio/step-2-details.png",
                                        alt: "YouTube Studio Video Subtitle Details Page"
                                    },
                                    {
                                        step: "Step 3",
                                        title: "Hover to Reveal Secrets",
                                        desc: "Hover your mouse over the language row (far right side). The 'three vertical dots' (Options) are HIDDEN until you hover!",
                                        image: "/image/guide/youtube-studio/step-3-dropdown.png",
                                        alt: "YouTube Studio Language Options Menu"
                                    },
                                    {
                                        step: "Step 4",
                                        title: "Download File",
                                        desc: "Click the newly revealed three dots, select 'Download', and pick .srt. (See? It's a hunt just to get a file).",
                                        note: "Pro Tip: If you don't see dots, try zooming out or verify the subtitle is 'Published'."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold text-sm transition-colors ring-1 ring-slate-100 group-hover:ring-blue-500 shadow-sm">
                                                {i + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                                            <p className="text-slate-600 leading-7 mb-6 text-[15px]">{item.desc}</p>

                                            {item.image && (
                                                <div className="my-4 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.alt || item.title}
                                                        width={1200}
                                                        height={800}
                                                        unoptimized={true}
                                                        className="w-full h-auto bg-slate-50"
                                                    />
                                                </div>
                                            )}

                                            {item.note && (
                                                <p className="text-sm text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full mt-2 font-medium">
                                                    <AlertTriangle size={12} className="inline mr-1" /> {item.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* THE PIVOT: EXPOSING THE PAIN */}
                        <div className="bg-red-50 rounded-2xl p-8 mb-16 border border-red-100">
                            <h3 className="text-xl font-black text-red-700 mb-6 flex items-center gap-2">
                                <AlertTriangle /> The Problem with YouTube Studio
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "You can ONLY download captions for videos you own.",
                                    "You must download one video at a time (No Batch mode).",
                                    "Navigating through menus takes 5-10 clicks per video.",
                                    "You cannot download from entire playlists or channels."
                                ].map((point, i) => (
                                    <div key={i} className="flex items-start gap-3 text-red-800 text-sm font-medium">
                                        <span className="text-red-400 text-lg leading-none">×</span>
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* METHOD 2: THE SOLUTION (Conversion) */}
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-blue-100">2</div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 m-0">
                                    The Fast Way (Batch & Any Video)
                                </h2>
                            </div>

                            <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Meet YTvidHub Downloader</h3>
                                    <p className="text-slate-300 mb-8 text-lg">
                                        Forget clicking through studio menus. Simply paste a link to
                                        <strong> any video, playlist, or channel</strong> and get all subtitles instantly.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-10">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                                                <CheckCircle size={16} /> Batch / Playlist Support
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                                                <CheckCircle size={16} /> Works on ANY Video
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                                                <CheckCircle size={16} /> Clean SRT / TXT
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                                                <CheckCircle size={16} /> No Login Required
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/"
                                        className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-white text-blue-600 font-black uppercase text-sm tracking-widest py-4 px-8 rounded-xl hover:bg-blue-50 transition-transform active:scale-95 shadow-lg"
                                    >
                                        <Download size={18} /> Try Bulk Downloader Free
                                    </Link>
                                    <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
                                        <Zap size={10} className="inline mr-1" /> No credit card needed. Instant access.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* COMPARISON TABLE */}
                        <div className="mb-20">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Feature Comparison</h3>
                            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-900/5">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50/80 backdrop-blur border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                        <tr>
                                            <th className="p-5 w-1/3">Feature</th>
                                            <th className="p-5 w-1/3 text-center">YouTube Studio</th>
                                            <th className="p-5 w-1/3 text-center text-blue-600 bg-blue-50/50">YTvidHub</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {[
                                            { f: "Download Own Videos", studio: true, tool: true },
                                            { f: "Download Others' Videos", studio: false, tool: true },
                                            { f: "Batch / Playlist Download", studio: false, tool: true },
                                            { f: "Clean TXT Format", studio: false, tool: true },
                                            { f: "Download Speed (100+ items)", studio: "2+ Hours", tool: "2 Minutes" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                                <td className="p-5 font-bold text-slate-700 group-hover:text-slate-900">{row.f}</td>
                                                <td className="p-5 text-center">
                                                    {row.studio === true ? <CheckCircle size={18} className="text-slate-400 mx-auto" /> :
                                                        row.studio === false ? <span className="text-slate-300 text-lg">×</span> :
                                                            <span className="text-slate-500 font-medium">{row.studio}</span>}
                                                </td>
                                                <td className="p-5 text-center bg-blue-50/20 group-hover:bg-blue-50/40 transition-colors">
                                                    {row.tool === true ? <div className="inline-flex p-1 rounded-full bg-blue-100 text-blue-600"><CheckCircle size={16} fill="currentColor" className="text-white" /></div> :
                                                        <span className="text-blue-600 font-black">{row.tool}</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* FAQ SCHEMA TARGETING */}
                        <div className="border-t border-slate-200 pt-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <HelpCircle className="text-slate-400" /> Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 transition hover:bg-slate-50">
                                        <h3 className="font-bold">Can I download subtitles from YouTube Studio in bulk?</h3>
                                        <ChevronRight size={18} className="text-slate-500 transition group-open:rotate-90" />
                                    </summary>
                                    <div className="px-6 pb-6 leading-relaxed text-slate-600">
                                        <p>No, YouTube Studio currently only allows downloading subtitles one video at a time. To download multiple subtitles or entire playlists at once, use a dedicated tool like <Link href="/" className="text-blue-600 font-bold underline">YTvidHub Batch Downloader</Link>.</p>
                                    </div>
                                </details>

                                <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 transition hover:bg-slate-50">
                                        <h3 className="font-bold">What format does YouTube Studio export?</h3>
                                        <ChevronRight size={18} className="text-slate-500 transition group-open:rotate-90" />
                                    </summary>
                                    <div className="px-6 pb-6 leading-relaxed text-slate-600">
                                        <p>YouTube Studio typically exports captions in .sbv (proprietary), .srt (standard), or .vtt (web) formats. .SBV is rarely supported by video editors, so always choose .SRT if available.</p>
                                    </div>
                                </details>

                                <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 transition hover:bg-slate-50">
                                        <h3 className="font-bold">How do I download auto-generated captions?</h3>
                                        <ChevronRight size={18} className="text-slate-500 transition group-open:rotate-90" />
                                    </summary>
                                    <div className="px-6 pb-6 leading-relaxed text-slate-600">
                                        <p>In YouTube Studio, go to the Subtitles tab, find the 'Automatic' language track (often labeled "English (Automatic)"), hover over the row, click the three dots, and select Download. Note that these often contain errors and lack punctuation.</p>
                                    </div>
                                </details>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}
