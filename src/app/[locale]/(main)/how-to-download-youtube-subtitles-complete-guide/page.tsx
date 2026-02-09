import { Metadata } from "next";
import Link from "next/link";
import {
    ChevronRight,
    Clock,
    Users,
    CheckCircle2,
    Download,
    PlayCircle,
    FileText,
    Zap,
    Shield,
    Star,
    AlertTriangle
} from "lucide-react";
import Image from "next/image";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const baseUrl = "https://ytvidhub.com";
    const localePath = locale === 'en' ? "" : `/${locale}`;
    const canonicalUrl = `${baseUrl}${localePath}/how-to-download-youtube-subtitles-complete-guide/`;

    return {
        title: "How to Download YouTube Subtitles: Complete Guide 2025 | Free Methods",
        description: "Learn how to download YouTube subtitles for free using 3 proven methods. Step-by-step guide for single videos, playlists, and bulk downloads. SRT, VTT, TXT formats supported.",
        keywords: "how to download youtube subtitles, download youtube captions, extract youtube subtitles, youtube subtitle downloader, batch download youtube subtitles",
        openGraph: {
            title: "How to Download YouTube Subtitles: Complete Guide 2025",
            description: "Learn how to download YouTube subtitles for free using 3 proven methods. Step-by-step guide for single videos, playlists, and bulk downloads.",
            url: canonicalUrl,
            images: [
                {
                    url: "/image/og-subtitle-guide.webp",
                    width: 1200,
                    height: 630,
                    alt: "Complete Guide to Download YouTube Subtitles",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "How to Download YouTube Subtitles: Complete Guide 2025",
            description: "Learn how to download YouTube subtitles for free using 3 proven methods. Step-by-step guide included.",
            images: ["/image/og-subtitle-guide.webp"],
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
            "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "0"
            },
            "supply": [
                { "@type": "HowToSupply", "name": "Computer or mobile device" },
                { "@type": "HowToSupply", "name": "Internet connection" },
                { "@type": "HowToSupply", "name": "YouTube video URL" }
            ],
            "tool": [
                { "@type": "HowToTool", "name": "YTVidHub Subtitle Downloader", "url": "https://ytvidhub.com" }
            ],
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Choose Your Method",
                    "position": 1,
                    "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#methods",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Select between manual YouTube extraction or automated bulk downloading"
                    }]
                },
                {
                    "@type": "HowToStep",
                    "name": "Extract Subtitles",
                    "position": 2,
                    "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#extraction",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Follow the step-by-step instructions for your chosen method"
                    }]
                },
                {
                    "@type": "HowToStep",
                    "name": "Download and Save",
                    "position": 3,
                    "url": "https://ytvidhub.com/how-to-download-youtube-subtitles-complete-guide#formats",
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": "Save your subtitles in SRT, VTT, or TXT format"
                    }]
                }
            ]
        },
    ];
    return (
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-slate-50 to-white py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3b82f6_0%,_transparent_50%)] opacity-5"></div>

                <div className="max-w-6xl mx-auto px-6 relative">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-slate-700">Home</Link>
                        <ChevronRight size={16} />
                        <span className="text-slate-900 font-medium">How to Download YouTube Subtitles</span>
                    </nav>

                    {/* Trust Signals */}
                    <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users size={16} className="text-blue-600" />
                            <span>2.4M+ Downloads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Star size={16} className="text-yellow-500" />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={16} className="text-green-600" />
                            <span>8 min read</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Shield size={16} className="text-purple-600" />
                            <span>100% Safe & Free</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 leading-tight">
                        How to Download YouTube Subtitles:
                        <span className="text-blue-600"> Complete Guide 2025</span>
                    </h1>

                    <p className="text-xl text-center text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Learn how to download YouTube subtitles for free using 3 proven methods.
                        This comprehensive guide covers everything from single videos to bulk playlist downloads with SRT, VTT, and TXT formats.
                    </p>

                    {/* Primary CTA */}
                    <div className="text-center mb-12">
                        <Link
                            href="/youtube-subtitle-downloader"
                            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                        >
                            <Zap size={20} />
                            Try Our Free Subtitle Downloader
                        </Link>
                        <p className="text-sm text-slate-500 mt-3">
                            Skip the manual work • 5 free downloads daily • No registration required
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-16">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Quick Navigation</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a href="#method-1" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                                <div>
                                    <div className="font-semibold text-slate-900">YouTube Built-in</div>
                                    <div className="text-sm text-slate-500">Manual method</div>
                                </div>
                            </a>
                            <a href="#method-2" className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border-2 border-blue-200">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                <div>
                                    <div className="font-semibold text-slate-900">YTVidHub Tool</div>
                                    <div className="text-sm text-blue-600 font-medium">Recommended ⭐</div>
                                </div>
                            </a>
                            <a href="#method-3" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                <div>
                                    <div className="font-semibold text-slate-900">Browser Extensions</div>
                                    <div className="text-sm text-slate-500">Alternative method</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Method Comparison Table */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Choose Your Method</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl border border-slate-200 shadow-lg">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left p-6 font-bold text-slate-900">Method</th>
                                    <th className="text-center p-6 font-bold text-slate-900">Difficulty</th>
                                    <th className="text-center p-6 font-bold text-slate-900">Time</th>
                                    <th className="text-center p-6 font-bold text-slate-900">Bulk Support</th>
                                    <th className="text-center p-6 font-bold text-slate-900">Formats</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-100">
                                    <td className="p-6">
                                        <div className="font-semibold text-slate-900">YouTube Built-in</div>
                                        <div className="text-sm text-slate-500">Manual extraction</div>
                                    </td>
                                    <td className="text-center p-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Easy</span>
                                    </td>
                                    <td className="text-center p-6 text-slate-600">3-5 min</td>
                                    <td className="text-center p-6 text-red-500">❌</td>
                                    <td className="text-center p-6 text-slate-600">Text only</td>
                                </tr>
                                <tr className="border-t border-slate-100 bg-blue-50">
                                    <td className="p-6">
                                        <div className="font-semibold text-blue-900 flex items-center gap-2">
                                            YTVidHub Tool
                                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">RECOMMENDED</span>
                                        </div>
                                        <div className="text-sm text-blue-600">Automated extraction</div>
                                    </td>
                                    <td className="text-center p-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Easy</span>
                                    </td>
                                    <td className="text-center p-6 text-slate-600">10-30 sec</td>
                                    <td className="text-center p-6 text-green-500">✅</td>
                                    <td className="text-center p-6 text-slate-600">SRT, VTT, TXT</td>
                                </tr>
                                <tr className="border-t border-slate-100">
                                    <td className="p-6">
                                        <div className="font-semibold text-slate-900">Browser Extensions</div>
                                        <div className="text-sm text-slate-500">Third-party tools</div>
                                    </td>
                                    <td className="text-center p-6">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Medium</span>
                                    </td>
                                    <td className="text-center p-6 text-slate-600">1-2 min</td>
                                    <td className="text-center p-6 text-yellow-500">⚠️</td>
                                    <td className="text-center p-6 text-slate-600">Varies</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Method 2: YTVidHub Tool (Primary CTA) */}
                <section id="method-2" className="mb-20">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

                        <div className="flex items-center gap-4 mb-8 relative">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">⭐</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                    YTVidHub Batch Subtitle Downloader
                                    <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">RECOMMENDED</span>
                                </h2>
                                <p className="text-slate-600">Automated bulk subtitle extraction with professional formats</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                <Zap size={20} className="text-blue-600" />
                                <span className="text-slate-800 font-medium">10-30 seconds</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                <Download size={20} className="text-green-600" />
                                <span className="text-slate-800 font-medium">Bulk downloads</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                <FileText size={20} className="text-purple-600" />
                                <span className="text-slate-800 font-medium">SRT, VTT, TXT</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                <Shield size={20} className="text-green-600" />
                                <span className="text-slate-800 font-medium">No registration</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Why Choose YTVidHub for Downloading YouTube Subtitles?</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">Batch Processing</div>
                                            <div className="text-slate-600 text-sm">Download subtitles from entire playlists and channels at once</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">Professional Formats</div>
                                            <div className="text-slate-600 text-sm">Export as SRT, VTT, or clean TXT files ready for any use case</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">Lightning Fast</div>
                                            <div className="text-slate-600 text-sm">Process videos in seconds, not minutes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">No Software Installation</div>
                                            <div className="text-slate-600 text-sm">Works directly in your browser on any device</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">Free Daily Credits</div>
                                            <div className="text-slate-600 text-sm">5 free downloads daily, no credit card required</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="font-semibold text-slate-900">All Languages Supported</div>
                                            <div className="text-slate-600 text-sm">Works with any language available on YouTube</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl group text-lg"
                            >
                                Try YTVidHub Free Now
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="text-slate-500 text-sm mt-3">5 free downloads daily • No registration required</p>
                        </div>
                    </div>
                </section>

                {/* Method 1: YouTube Built-in */}
                <section id="method-1" className="mb-20">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-lg">1</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Method 1: YouTube Built-in Feature</h2>
                                <p className="text-slate-600">Free manual method using YouTube's native transcript feature</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                                <CheckCircle2 size={20} className="text-green-600" />
                                <span className="text-green-800 font-medium">100% Free</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                <Clock size={20} className="text-blue-600" />
                                <span className="text-blue-800 font-medium">3-5 minutes</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                                <Shield size={20} className="text-purple-600" />
                                <span className="text-purple-800 font-medium">No tools needed</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Open the YouTube Video</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Navigate to the YouTube video you want to extract subtitles from. Make sure the video has captions available (you'll see a "CC" button in the video player).
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Click the Three Dots Menu</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Below the video player, click on the three vertical dots (⋮) to open the menu options. This menu contains various video-related actions.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Select "Show Transcript"</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        From the dropdown menu, click on "Show transcript". This will open a panel on the right side of the screen displaying the video's transcript with timestamps.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Copy the Transcript</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Select all the text in the transcript panel (Ctrl+A or Cmd+A), then copy it (Ctrl+C or Cmd+C). You can also manually select specific portions if needed.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Save and Format</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Paste the transcript into a text editor like Notepad, Google Docs, or any word processor. You may need to clean up the formatting and remove timestamps if desired.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                <Clock size={20} />
                                Limitations of This Method
                            </h4>
                            <ul className="text-yellow-700 space-y-1">
                                <li>• Only works for one video at a time</li>
                                <li>• Requires manual formatting and cleanup</li>
                                <li>• No structured file formats (SRT, VTT)</li>
                                <li>• Time-consuming for multiple videos</li>
                            </ul>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-slate-600 mb-4">Need to download subtitles from multiple videos?</p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                Try Our Batch Downloader
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Method 3: Browser Extensions */}
                <section id="method-3" className="mb-20">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">3</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Method 3: Browser Extensions</h2>
                                <p className="text-slate-600">Third-party browser extensions for subtitle extraction</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                                <Download size={20} className="text-orange-600" />
                                <span className="text-orange-800 font-medium">Extension required</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl">
                                <Clock size={20} className="text-yellow-600" />
                                <span className="text-yellow-800 font-medium">1-2 minutes</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                                <AlertTriangle size={20} className="text-red-600" />
                                <span className="text-red-800 font-medium">Security risks</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Install a Browser Extension</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Search for subtitle downloader extensions in your browser's extension store. Popular options include "YouTube Subtitle Downloader" or "Subtitle Downloader" extensions.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Navigate to YouTube Video</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Go to the YouTube video page where you want to download subtitles. The extension should add a download button or menu option to the page.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Click the Extension Button</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Look for the extension's download button (usually appears near the video player or in the browser toolbar). Click it to access subtitle download options.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Choose Format and Download</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Select your preferred subtitle format (if available) and click download. The extension will process and download the subtitle file to your computer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                            <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                <Shield size={20} />
                                Important Security Considerations
                            </h4>
                            <ul className="text-red-700 space-y-2">
                                <li>• Browser extensions can access your browsing data</li>
                                <li>• Some extensions may contain malware or tracking code</li>
                                <li>• Extensions can slow down your browser performance</li>
                                <li>• May stop working when YouTube updates its interface</li>
                                <li>• Limited support for bulk downloads or advanced features</li>
                            </ul>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-slate-600 mb-4">Want a safer, more reliable alternative?</p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                Use YTVidHub Instead
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Professional Use Cases & Industry Insights */}
                <section className="mb-20">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Professional Use Cases: Why Download YouTube Subtitles?
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                From our experience processing over 2.4 million subtitle downloads, here are the most common professional applications and what works best for each.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Left Column - Use Cases */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FileText size={24} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">AI & Machine Learning Training</h3>
                                            <p className="text-slate-600 text-sm mb-3">
                                                Research teams use our bulk downloader to create massive text datasets. The clean TXT format removes timestamps and formatting, making it perfect for LLM training.
                                            </p>
                                            <div className="text-xs text-blue-600 font-medium">
                                                💡 Best Format: TXT • Recommended: Bulk processing
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <PlayCircle size={24} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">Video Production & Editing</h3>
                                            <p className="text-slate-600 text-sm mb-3">
                                                Content creators and video editors use SRT files to add professional captions to their videos. The timestamp precision is crucial for sync accuracy.
                                            </p>
                                            <div className="text-xs text-green-600 font-medium">
                                                💡 Best Format: SRT • Recommended: Single video downloads
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users size={24} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">Accessibility & Compliance</h3>
                                            <p className="text-slate-600 text-sm mb-3">
                                                Organizations download subtitles to ensure their video content meets accessibility standards (WCAG 2.1). VTT format works best for web players.
                                            </p>
                                            <div className="text-xs text-purple-600 font-medium">
                                                💡 Best Format: VTT • Recommended: Quality over quantity
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image Placeholder */}
                            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                                <Image
                                    src="/youtube-subtitle-formats-comparison-srt-vtt-txt.webp"
                                    alt="Comparison chart of YouTube subtitle formats SRT, VTT, and TXT for AI training and video editing."
                                    width={400}
                                    height={300}
                                    className="max-w-full h-auto rounded-lg shadow-sm"
                                    priority
                                />
                                <p className="text-sm text-slate-500 mt-4">
                                    Visual guide for downloading YouTube subtitles
                                </p>
                            </div>
                        </div>

                        {/* Industry Statistics */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                                What Our Data Shows: Subtitle Download Trends
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-2">68%</div>
                                    <div className="text-sm text-slate-600">Use TXT format for AI training</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-2">24%</div>
                                    <div className="text-sm text-slate-600">Prefer SRT for video editing</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600 mb-2">8%</div>
                                    <div className="text-sm text-slate-600">Choose VTT for web players</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-2">89%</div>
                                    <div className="text-sm text-slate-600">Need bulk processing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subtitle Formats Deep Dive */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Understanding Subtitle Formats</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <FileText size={24} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">SRT Format</h3>
                            <p className="text-slate-600 mb-4">
                                The most popular subtitle format, supported by virtually all video players and editing software.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Universal compatibility</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Precise timestamps</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Easy to edit</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <PlayCircle size={24} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">VTT Format</h3>
                            <p className="text-slate-600 mb-4">
                                Modern web format with advanced styling capabilities, perfect for online video players.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Web-optimized</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Styling support</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">HTML5 compatible</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <FileText size={24} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">TXT Format</h3>
                            <p className="text-slate-600 mb-4">
                                Clean plain text without timestamps, ideal for AI training and text analysis.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Clean text only</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">AI training ready</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span className="text-slate-600">Easy to process</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* FAQ Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Can I download YouTube subtitles for free?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Yes! You can download YouTube subtitles for free using YouTube's built-in transcript feature or our YTVidHub tool.
                                We offer 5 free downloads daily with no registration required.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                What subtitle formats can I download?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our tool supports SRT (SubRip), VTT (WebVTT), and clean TXT formats. SRT is perfect for video editing,
                                VTT for web players, and TXT for AI training and text analysis.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Can I batch download subtitles from YouTube playlists?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Yes! Our <Link href="/" className="text-blue-600 underline font-semibold hover:text-blue-700">batch YouTube subtitle downloader</Link> can
                                extract subtitles from entire playlists and channels at once. This is perfect for creating large datasets for AI training or research projects.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Does this work with different languages?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Absolutely! Our tool can download subtitles in any language available on the YouTube video,
                                including auto-generated captions and manually uploaded subtitles.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Is it legal to download YouTube subtitles?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Yes, downloading subtitles for personal use, research, accessibility, or educational purposes is generally legal.
                                However, always respect copyright laws and YouTube's terms of service.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="mb-20 bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Download YouTube Subtitles?
                        </h2>
                        <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
                            Skip the manual work and use our automated tool to download subtitles from YouTube videos, playlists, and channels in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-lg text-lg"
                            >
                                Start Downloading Free
                            </Link>
                            <Link
                                href="/bulk-youtube-subtitle-downloader"
                                className="px-8 py-4 bg-white hover:bg-slate-100 rounded-2xl font-bold transition-all shadow-lg text-slate-900 text-lg"
                            >
                                Learn About Bulk Downloads
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-400">
                            <span className="flex items-center gap-2">
                                <Shield size={16} />
                                No Registration Required
                            </span>
                            <span className="flex items-center gap-2">
                                <Zap size={16} />
                                Instant Results
                            </span>
                            <span className="flex items-center gap-2">
                                <Download size={16} />
                                Multiple Formats
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}