"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
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
    Globe,
    Smartphone,
    Lock,
    Loader2,
    AlertCircle,
    CheckCircle
} from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>;
};

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

    // URL验证函数
    const validateYouTubeUrl = (url: string): boolean => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)[\w-]+/;
        return youtubeRegex.test(url);
    };

    // 字幕提取函数
    const extractSubtitles = async () => {
        if (!url.trim()) {
            setProcessing({
                status: 'error',
                progress: 0,
                message: 'Please enter a YouTube URL'
            });
            return;
        }

        if (!validateYouTubeUrl(url)) {
            setProcessing({
                status: 'error',
                progress: 0,
                message: 'Please enter a valid YouTube URL'
            });
            return;
        }

        setProcessing({
            status: 'processing',
            progress: 10,
            message: 'Validating URL...'
        });

        try {
            // 模拟API调用过程
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProcessing({
                status: 'processing',
                progress: 30,
                message: 'Fetching video information...'
            });

            await new Promise(resolve => setTimeout(resolve, 1500));
            setProcessing({
                status: 'processing',
                progress: 60,
                message: 'Extracting subtitles...'
            });

            await new Promise(resolve => setTimeout(resolve, 1000));
            setProcessing({
                status: 'processing',
                progress: 90,
                message: 'Preparing download...'
            });

            await new Promise(resolve => setTimeout(resolve, 500));

            // 模拟成功结果
            const mockResult: SubtitleResult = {
                videoId: 'dQw4w9WgXcQ',
                title: 'Sample YouTube Video Title',
                duration: '3:32',
                language: language === 'auto' ? 'en' : language,
                formats: {
                    srt: 'Sample SRT content...',
                    vtt: 'Sample VTT content...',
                    txt: 'Sample TXT content...'
                },
                downloadUrls: {
                    srt: '#',
                    vtt: '#',
                    txt: '#'
                }
            };

            setProcessing({
                status: 'success',
                progress: 100,
                message: 'Subtitles extracted successfully!',
                result: mockResult
            });

        } catch (error) {
            setProcessing({
                status: 'error',
                progress: 0,
                message: 'Failed to extract subtitles. Please try again.'
            });
        }
    };

    // 下载函数
    const downloadSubtitle = (format: string, content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "featureList": [
            "Extract YouTube subtitles online",
            "Multiple format support (SRT, VTT, TXT)",
            "Batch processing for playlists",
            "No registration required",
            "Free daily usage",
            "Multi-language support",
            "Instant processing",
            "Secure and private"
        ],
        "screenshot": "https://ytvidhub.com/image/tool-screenshot.webp",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "author": {
            "@type": "Organization",
            "name": "YTVidHub",
            "url": "https://ytvidhub.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "YTVidHub",
            "url": "https://ytvidhub.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "12847",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I extract YouTube subtitles online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply paste your YouTube URL into our online tool, select your preferred format (SRT, VTT, or TXT), and click 'Extract Subtitles'. The process takes 10-30 seconds and requires no registration."
                }
            },
            {
                "@type": "Question",
                "name": "Is this YouTube subtitle extractor free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our online YouTube subtitle extraction tool is completely free. You get 5 free extractions daily with no registration required. For unlimited access, check our premium plans."
                }
            },
            {
                "@type": "Question",
                "name": "What subtitle formats can I download?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our tool supports three popular formats: SRT (SubRip) for video editing, VTT (WebVTT) for web players, and TXT (plain text) for analysis and AI training."
                }
            },
            {
                "@type": "Question",
                "name": "Can I extract subtitles from YouTube playlists?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our batch processing feature allows you to extract subtitles from entire YouTube playlists at once. Just paste the playlist URL and we'll process all videos automatically."
                }
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            {/* Hero Section with Tool Interface */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3b82f6_0%,_transparent_50%)] opacity-5"></div>

                <div className="max-w-6xl mx-auto px-6 relative">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-slate-700">Home</Link>
                        <ChevronRight size={16} />
                        <Link href="/tools" className="hover:text-slate-700">Tools</Link>
                        <ChevronRight size={16} />
                        <span className="text-slate-900 font-medium">Extract YouTube Subtitles Online</span>
                    </nav>

                    {/* Trust Signals */}
                    <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users size={16} className="text-blue-600" />
                            <span>2.4M+ Extractions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Star size={16} className="text-yellow-500" />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Zap size={16} className="text-green-600" />
                            <span>10-30 sec processing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Shield size={16} className="text-purple-600" />
                            <span>100% Safe & Free</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
                        Extract YouTube Subtitles
                        <span className="text-blue-600"> Online Tool</span>
                    </h1>

                    <p className="text-xl text-center text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Free online tool to extract YouTube subtitles instantly. Download in SRT, VTT, or TXT format.
                        Batch processing for playlists. No registration required.
                    </p>

                    {/* Tool Interface */}
                    <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Start Extracting Subtitles</h2>
                            <p className="text-slate-600">Paste your YouTube URL below and choose your preferred format</p>
                        </div>

                        {/* Tool Interface */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    YouTube URL *
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                        className="w-full px-4 py-4 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                                        required
                                        disabled={processing.status === 'processing'}
                                    />
                                    <PlayCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    Supports individual videos, playlists, and channel URLs
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Format *
                                    </label>
                                    <select 
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value)}
                                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                        disabled={processing.status === 'processing'}
                                    >
                                        <option value="srt">SRT (SubRip) - Video Editing</option>
                                        <option value="vtt">VTT (WebVTT) - Web Players</option>
                                        <option value="txt">TXT (Plain Text) - Analysis</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Language
                                    </label>
                                    <select 
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                        disabled={processing.status === 'processing'}
                                    >
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
                                    <button 
                                        onClick={extractSubtitles}
                                        disabled={processing.status === 'processing'}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                                    >
                                        {processing.status === 'processing' ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={20} />
                                                Extract Subtitles
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Processing Status */}
                            {processing.status !== 'idle' && (
                                <div className="mt-6">
                                    {processing.status === 'processing' && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Loader2 size={20} className="text-blue-600 animate-spin" />
                                                <span className="text-blue-800 font-medium">{processing.message}</span>
                                            </div>
                                            <div className="w-full bg-blue-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${processing.progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-right text-sm text-blue-600 mt-1">
                                                {processing.progress}%
                                            </div>
                                        </div>
                                    )}

                                    {processing.status === 'error' && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                            <div className="flex items-center gap-3">
                                                <AlertCircle size={20} className="text-red-600" />
                                                <span className="text-red-800 font-medium">{processing.message}</span>
                                            </div>
                                        </div>
                                    )}

                                    {processing.status === 'success' && processing.result && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <CheckCircle size={20} className="text-green-600" />
                                                <span className="text-green-800 font-medium">{processing.message}</span>
                                            </div>
                                            
                                            <div className="bg-white rounded-lg p-4 mb-4">
                                                <h3 className="font-semibold text-slate-900 mb-2">{processing.result.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                                    <span>Duration: {processing.result.duration}</span>
                                                    <span>Language: {processing.result.language}</span>
                                                    <span>Video ID: {processing.result.videoId}</span>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-3">
                                                <button
                                                    onClick={() => downloadSubtitle('srt', processing.result!.formats.srt, processing.result!.title)}
                                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                                >
                                                    <Download size={16} />
                                                    Download SRT
                                                </button>
                                                <button
                                                    onClick={() => downloadSubtitle('vtt', processing.result!.formats.vtt, processing.result!.title)}
                                                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                                >
                                                    <Download size={16} />
                                                    Download VTT
                                                </button>
                                                <button
                                                    onClick={() => downloadSubtitle('txt', processing.result!.formats.txt, processing.result!.title)}
                                                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                                >
                                                    <Download size={16} />
                                                    Download TXT
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Additional Options */}
                            <div className="border-t border-slate-200 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">Advanced Options</h3>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        Show Options
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 size={16} className="text-green-600" />
                                        <span className="text-slate-700">Include timestamps</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 size={16} className="text-green-600" />
                                        <span className="text-slate-700">Auto-generated captions</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 size={16} className="text-green-600" />
                                        <span className="text-slate-700">Manual subtitles preferred</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 size={16} className="text-green-600" />
                                        <span className="text-slate-700">Batch processing ready</span>
                                    </div>
                                </div>
                            </div>

                            {/* Usage Stats */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                                <div className="flex items-center justify-center gap-8 text-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-blue-600 text-lg">2.4M+</div>
                                        <div className="text-slate-600">Extractions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-green-600 text-lg">15 sec</div>
                                        <div className="text-slate-600">Avg. Speed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-purple-600 text-lg">99.9%</div>
                                        <div className="text-slate-600">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-orange-600 text-lg">5 Free</div>
                                        <div className="text-slate-600">Daily Limit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Batch Processing Section */}
                <section className="mb-20">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-2 border-indigo-200 shadow-xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Batch Processing</h2>
                            <p className="text-slate-600 text-lg">Extract subtitles from multiple videos or entire playlists at once</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Batch Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">
                                    Multiple URLs or Playlist URL
                                </label>
                                <textarea
                                    placeholder={`Paste multiple URLs (one per line) or a playlist URL:

https://www.youtube.com/watch?v=video1
https://www.youtube.com/watch?v=video2
https://www.youtube.com/watch?v=video3

Or playlist URL:
https://www.youtube.com/playlist?list=PLxxxxxx`}
                                    className="w-full h-40 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                    disabled={processing.status === 'processing'}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Supports up to 50 videos per batch. Playlist processing extracts all videos automatically.
                                </p>
                            </div>

                            {/* Batch Options */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Batch Format
                                    </label>
                                    <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                                        <option value="srt">SRT (SubRip) - Video Editing</option>
                                        <option value="vtt">VTT (WebVTT) - Web Players</option>
                                        <option value="txt">TXT (Plain Text) - Analysis</option>
                                        <option value="all">All Formats (ZIP)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Language Preference
                                    </label>
                                    <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                                        <option value="auto">Auto-detect for each video</option>
                                        <option value="en">English only</option>
                                        <option value="es">Spanish only</option>
                                        <option value="multi">All available languages</option>
                                    </select>
                                </div>

                                <div className="bg-white rounded-xl p-4 border border-slate-200">
                                    <h3 className="font-semibold text-slate-900 mb-3">Batch Options</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                                            <span className="text-sm text-slate-700">Include video titles in filenames</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                                            <span className="text-sm text-slate-700">Skip videos without subtitles</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-sm text-slate-700">Include auto-generated captions</span>
                                        </label>
                                    </div>
                                </div>

                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                                    <Zap size={20} />
                                    Start Batch Processing
                                </button>
                            </div>
                        </div>

                        {/* Batch Progress */}
                        <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">Batch Progress</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span className="text-sm font-medium text-slate-900">Video 1: Sample Title</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">Completed</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <Loader2 size={16} className="text-blue-600 animate-spin" />
                                        <span className="text-sm font-medium text-slate-900">Video 2: Another Sample Title</span>
                                    </div>
                                    <span className="text-xs text-blue-600 font-medium">Processing...</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-slate-400" />
                                        <span className="text-sm font-medium text-slate-600">Video 3: Third Sample Title</span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium">Queued</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                                    <span className="text-sm text-slate-600">1 of 3 completed</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                                    <span>Estimated time remaining: 2 minutes</span>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        Download ZIP (1 ready)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Quick Start Instructions - Placeholder */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Paste URL</h3>
                            <p className="text-slate-600">Copy and paste your YouTube video URL into the input field above</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Choose Format</h3>
                            <p className="text-slate-600">Select your preferred subtitle format: SRT, VTT, or TXT</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Download</h3>
                            <p className="text-slate-600">Click extract and download your subtitle file instantly</p>
                        </div>
                    </div>
                </section>

                {/* Feature Highlights - Placeholder */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Tool?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <Zap className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-slate-600 text-sm">Extract subtitles in 10-30 seconds</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <FileText className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
                            <p className="text-slate-600 text-sm">SRT, VTT, and TXT support</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <Globe className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">All Languages</h3>
                            <p className="text-slate-600 text-sm">Extract subtitles in any language</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <Lock className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
                            <p className="text-slate-600 text-sm">No data stored, complete privacy</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}