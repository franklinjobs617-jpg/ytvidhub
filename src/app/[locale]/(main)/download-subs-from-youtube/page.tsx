"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import DownloadSubsSchema from "@/components/seo/DownloadSubsSchema";

export default function DownloadSubsFromYoutubePage() {
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleAction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
            <DownloadSubsSchema />

            <main>
                {/* Hero */}
                <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
                    <p className="text-sm text-blue-600 font-medium mb-4">Professional Subtitle Tools</p>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        The Ultimate YouTube Subtitle Downloader
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">
                        Whether you&apos;re learning a new language, repurposing content, or training AI models, YTVidHub extracts high-accuracy SRT, VTT, and Text subtitles in seconds.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/" onClick={handleAction} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            Start Downloading
                        </Link>
                        <Link href="/bulk-youtube-subtitle-downloader" className="inline-block px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-medium border border-slate-200 transition-colors">
                            Bulk Processing
                        </Link>
                    </div>
                </header>

                {/* Core Value */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <div className="grid sm:grid-cols-3 gap-5">
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-2">Ultra-Fast Extraction</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Our cloud-based architecture processes YouTube API data in real-time. No browser-side rendering delay—extract hour-long videos in seconds.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-2">100+ Languages Supported</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Fully compatible with YouTube&apos;s multi-language tracks. From manually uploaded files to AI auto-generated captions, we capture them all.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900 mb-2">Secure &amp; Ad-Free</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Unlike traditional downloader sites, YTVidHub is clean, secure, and entirely ad-free. We focus on high-performance tools and data privacy.</p>
                        </div>
                    </div>
                </article>

                {/* Format Comparison */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">Choose the Perfect Format</h2>
                    <p className="text-slate-500 mb-8">Select the optimal standard for your specific workflow.</p>
                    <div className="grid sm:grid-cols-2 gap-5 mb-8">
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">SRT — Standard Format</p>
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">The most universal format. Supported by VLC, Premiere Pro, Final Cut, and almost every video player and editor.</p>
                            <ul className="space-y-1 text-xs text-slate-500">
                                <li>✓ Precise millisecond timing</li>
                                <li>✓ Perfect for offline playback</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">VTT — Web-Optimized</p>
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">Defined by the WebVTT standard. Purpose-built for HTML5 players with support for styling and positioning tags.</p>
                            <ul className="space-y-1 text-xs text-slate-500">
                                <li>✓ First choice for web players</li>
                                <li>✓ Supports advanced CSS styling</li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
                        <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">AI Ready — Plain Text (TXT)</p>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">Automatically strips all timestamps and metadata. Export a clean text stream, perfect for ChatGPT summarization, RAG pipelines, or blog drafting.</p>
                        <Link href="/workspace" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Explore AI Workspace →
                        </Link>
                    </div>
                </article>

                {/* Steps */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Three Simple Steps</h2>
                    <div className="space-y-5">
                        {[
                            { step: "Step 1", title: "Paste Video Link", desc: "Copy the URL from YouTube's address bar and paste it into our search tool." },
                            { step: "Step 2", title: "Select Format", desc: "Choose your preferred language track and output format (SRT, VTT, or TXT)." },
                            { step: "Step 3", title: "Instant Download", desc: "Click high-speed download and your subtitle file is saved to your local drive instantly." },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">{item.step}</p>
                                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* FAQ */}
                <article className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-5">
                        {[
                            { q: "Is it legal to download YouTube subtitles?", a: "Downloading for personal study, research, or accessibility is generally considered fair use. Always check the original creator's copyright for commercial projects." },
                            { q: "What if a video has no subtitles?", a: "If the creator hasn't uploaded captions and YouTube hasn't auto-generated them, subtitles won't be available. Ensure 'CC' is visible on the YouTube player." },
                            { q: "Do you support auto-generated captions?", a: "Yes! Our tool retrieves all implicit tracks, including AI-generated captions provided by YouTube's system." },
                            { q: "Can I download an entire channel's subtitles?", a: "For large-scale needs, please use our Bulk Download tool which supports entire playlists or channel URLs for massive extraction." },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* CTA */}
                <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
                    <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your content workflow?</h2>
                        <p className="text-slate-400 mb-8">Join thousands of creators and researchers. No registration required, free limits available forever.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/" onClick={handleAction} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                Get Started Free
                            </Link>
                            <Link href="/pricing" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 transition-colors">
                                View Pro Plans
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </div>
    );
}
