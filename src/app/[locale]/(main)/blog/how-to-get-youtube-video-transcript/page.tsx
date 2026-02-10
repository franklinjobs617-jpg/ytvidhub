"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Zap,
  ShieldCheck,
  ArrowRight,
  Terminal,
  Globe,
  Code,
} from "lucide-react";

export default function HowToGetYouTubeTranscriptPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans antialiased text-slate-800">

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-10">
        <header className="text-center mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Zap size={14} className="animate-pulse" /> SEO Guide 2025
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
            How to Get a Transcript of a YouTube Video:
            <br />
            <span className="text-violet-600">3 Easy Ways in 2026</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Want to know how to get transcript from YouTube video? Whether you need transcripts for AI training, content repurposing, or language learning, this comprehensive guide covers all methods—from YouTube's built-in tools to automated solutions.
          </p>
        </header>

        <section className="mb-40">
          <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm p-8 md:p-12 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
              Why You Need YouTube Transcripts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">AI Training Data</h3>
                <p className="text-slate-600 leading-relaxed">
                  Clean transcripts provide high-quality text data for training machine learning models, fine-tuning LLMs, and building text corpora.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Content Repurposing</h3>
                <p className="text-slate-600 leading-relaxed">
                  Turn video content into blog posts, social media updates, newsletters, and other written formats with minimal effort.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Language Learning</h3>
                <p className="text-slate-600 leading-relaxed">
                  Use transcripts to improve listening skills, vocabulary, and comprehension in foreign languages.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16">
              Method 1: Using YouTube's Built-in Feature
            </h2>
            <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm p-8 md:p-12">
              <ol className="space-y-8">
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Open the YouTube Video</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Go to YouTube.com and navigate to the video you want a transcript for. You can also use the YouTube mobile app for this method.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Click on the Three Dots Menu</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Below the video player, click on the three vertical dots (⋮) to open the menu options.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Select "Show Transcript"</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      From the menu, select "Show transcript" to open the transcript panel on the right side of the screen.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Copy the Transcript</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Use your mouse to select the entire transcript, then right-click and choose "Copy" to save it to your clipboard.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Paste and Format</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Paste the transcript into a text editor like Notepad or Google Docs and format it as needed.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-12 p-6 bg-yellow-50 rounded-3xl border border-yellow-100">
                <h4 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <Clock size={20} />
                  Time Estimate
                </h4>
                <p className="text-yellow-700">
                  This method takes approximately 3-5 minutes per video, depending on the length of the transcript.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16">
              Method 2: How Can I Get a Transcript of a YouTube Video Automatically? (The Fast Way)
            </h2>
            <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm p-8 md:p-12">
              <div className="mb-16">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  If you need transcripts quickly, especially for multiple videos, YTVidHub offers the fastest and most efficient solution. Our tool is designed to handle bulk transcript extraction with just a few clicks.
                </p>

                <div className="bg-violet-50 rounded-3xl border border-violet-100 p-8 mb-12">
                  <h3 className="text-2xl font-bold text-violet-800 mb-6">Why Choose YTVidHub for YouTube Transcripts</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-violet-600 flex-shrink-0 mt-1" />
                      <span className="text-violet-700">
                        <strong>Bulk Download Capabilities:</strong> Extract transcripts from entire playlists or multiple videos at once with our <Link href="/" className="text-violet-800 underline font-bold hover:text-violet-900">batch YouTube subtitle downloader</Link>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-violet-600 flex-shrink-0 mt-1" />
                      <span className="text-violet-700">
                        <strong>LLM-Ready Formats:</strong> Download transcripts in clean TXT and structured JSON formats using our <Link href="/" className="text-violet-800 underline font-bold hover:text-violet-900">playlist subtitle downloader</Link>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-violet-600 flex-shrink-0 mt-1" />
                      <span className="text-violet-700">
                        <strong>No Login Required:</strong> Get transcripts without needing to sign in to YouTube
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-violet-600 flex-shrink-0 mt-1" />
                      <span className="text-violet-700">
                        <strong>Fast Processing:</strong> Get transcripts in seconds, not minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-violet-600 flex-shrink-0 mt-1" />
                      <span className="text-violet-700">
                        <strong>Multiple Languages:</strong> Support for YouTube's automatic translations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <ol className="space-y-8 mb-16">
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Go to YTVidHub's Transcript Extractor</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Navigate to our <Link href="/" className="text-violet-600 underline font-bold hover:text-violet-700">batch download YouTube subtitles</Link> tool where you can extract transcripts from YouTube videos, playlists, and channels.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Paste the YouTube Video URL</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Copy the URL of the YouTube video you want a transcript for and paste it into the input field on YTVidHub.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Select Your Preferred Format</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Choose from multiple formats including TXT (clean transcript), JSON (structured data), SRT, and VTT.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Click "Download Transcript"</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Hit the download button and YTVidHub will automatically extract the transcript from the YouTube video.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Save and Use Your Transcript</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      The transcript will be downloaded to your device, ready for use in your projects.
                    </p>
                  </div>
                </li>
              </ol>

              {/* CTA Section */}
              <div className="text-center py-12 bg-slate-900 rounded-3xl mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Ready to Get YouTube Transcripts Automatically?
                </h3>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Try YTVidHub's automatic transcript extractor today and save hours of manual work.
                </p>
                <Link
                  href="/download-subs-from-youtube"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all group shadow-2xl shadow-violet-200 uppercase tracking-widest text-xs"
                >
                  Try YTVidHub Now {
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  }
                </Link>
              </div>

              <div className="mt-12 p-6 bg-green-50 rounded-3xl border border-green-100">
                <h4 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Clock size={20} />
                  Time Estimate
                </h4>
                <p className="text-green-700">
                  This method takes approximately 10-30 seconds per video, even for longer videos.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16">
              Comparison: Manual vs. Automatic Transcript Extraction
            </h2>
            <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm p-8 md:p-12 overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-6 px-8 text-left text-lg font-bold text-slate-900">Feature</th>
                    <th className="py-6 px-8 text-left text-lg font-bold text-slate-900">Manual Extraction (YouTube Built-in)</th>
                    <th className="py-6 px-8 text-left text-lg font-bold text-violet-600">YTvidHub Bulk Downloader</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-8 font-medium text-slate-900">Speed</td>
                    <td className="py-6 px-8 text-slate-600">3-5 minutes per video</td>
                    <td className="py-6 px-8 text-slate-600">10-30 seconds per video</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-8 font-medium text-slate-900">Batch Processing</td>
                    <td className="py-6 px-8 text-slate-600">Not supported</td>
                    <td className="py-6 px-8 text-slate-600">Yes, entire playlists</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-8 font-medium text-slate-900">Format Options</td>
                    <td className="py-6 px-8 text-slate-600">Plain text only</td>
                    <td className="py-6 px-8 text-slate-600">TXT, JSON, SRT, VTT</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-8 font-medium text-slate-900">Ease of Use</td>
                    <td className="py-6 px-8 text-slate-600">Moderate (manual steps)</td>
                    <td className="py-6 px-8 text-slate-600">Easy (1-click process)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-8 font-medium text-slate-900">Login Required</td>
                    <td className="py-6 px-8 text-slate-600">Yes</td>
                    <td className="py-6 px-8 text-slate-600">No</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-medium text-slate-900">Ideal For</td>
                    <td className="py-6 px-8 text-slate-600">Occasional use, single videos</td>
                    <td className="py-6 px-8 text-slate-600">Bulk processing, frequent use, AI projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16">
              FAQ: Getting YouTube Transcripts
            </h2>
            <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm p-8 md:p-12">
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Can I get transcripts for private YouTube videos?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    No, you can only get transcripts for public YouTube videos. For private videos, you would need to have access to the video and use YouTube's built-in transcript feature while logged in to your account.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    How accurate are YouTube transcripts?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    YouTube's automatic transcripts are generally 85-95% accurate for clear audio in English. Accuracy may vary for videos with background noise, multiple speakers, or non-English content. YTVidHub provides the same transcript data as YouTube but in cleaner formats.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Can I get transcripts in languages other than English?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, both YouTube's built-in feature and YTVidHub support transcripts in multiple languages. YouTube automatically generates transcripts for many languages, and you can also use YouTube's translation feature to translate transcripts to other languages.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Is there a limit to how many transcripts I can get?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    YouTube doesn't have a specific limit for manual transcript extraction, but YTVidHub may have usage limits based on your account type. The free version allows for a reasonable number of transcript extractions, while premium plans offer higher limits for bulk processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-40 bg-slate-900 rounded-[5rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-violet-600/20 blur-[150px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight">
              Get YouTube Transcripts <br />
              <span className="text-violet-400">The Smart Way</span>
            </h2>
            <p className="text-slate-300 mb-16 text-xl">
              Whether you need transcripts for AI training, content repurposing, or language learning, YTVidHub makes it fast and easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/download-subs-from-youtube"
                className="px-14 py-5 bg-violet-600 hover:bg-violet-700 rounded-3xl font-bold transition-all shadow-2xl shadow-violet-600/30 text-white"
              >
                Try YTVidHub Free
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader"
                className="px-14 py-5 bg-white hover:bg-slate-100 rounded-3xl font-bold transition-all shadow-2xl shadow-slate-200 text-slate-900"
              >
                Bulk Download Transcripts
              </Link>
            </div>
            <div className="mt-20 flex items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} />
                Privacy First
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