import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: 'YouTube Subtitle Downloader Chrome Extension - YTVidHub',
  description: 'Download YouTube subtitles directly from the video page with the YTVidHub Chrome Extension. Supports SRT, VTT, and clean TXT formats with one click.',
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function AddOnPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-top" style={{ backgroundSize: '20px 20px' }} />
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 relative flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Browser Extension
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-8">
                Download Subtitles <span className="text-blue-600 font-serif italic font-normal">Directly</span> From YouTube
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0">
                Skip the URL copying. The YTVidHub extension adds a seamless download button to every YouTube video player.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
                <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                  <Image src="/image/icon.webp" alt="YTVidHub Icon" width={20} height={20} className="rounded-sm" />
                  Add to Chrome — Free
                </a>
                <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 font-bold transition-colors flex items-center gap-1 group">
                  Web app version <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform hover:scale-[1.02] duration-500">
                <Image
                  src="/image/chorme/ytvidhub-chrome-store-listing.png"
                  alt="YTVidHub Chrome Web Store - Best YouTube Subtitle Downloader Extension"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </header>

        {/* How It Works with Steps & Images */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">How It Works</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Get up and running in less than 30 seconds. No registration required.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "01",
                  title: "Install Extension",
                  desc: "Add YTVidHub to Chrome from the Web Store.",
                  img: "/image/chorme/ytvidhub-extension-step-install.png",
                  alt: "Installing YTVidHub Chrome Extension from the Web Store"
                },
                {
                  step: "02",
                  title: "Open YouTube",
                  desc: "Navigate to any video or playlist page.",
                  img: "/image/chorme/ytvidhub-extension-step-video.png",
                  alt: "YTVidHub integrated download button on a YouTube video page"
                },
                {
                  step: "03",
                  title: "Instant Download",
                  desc: "Click the new button to save subtitles.",
                  img: "/image/chorme/ytvidhub-extension-step-download.png",
                  alt: "Downloading SRT/VTT/TXT subtitles with one click using YTVidHub"
                }
              ].map((item, i) => (
                <div key={i} className="group h-full flex flex-col items-center">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white shadow-xl transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{item.title}</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Powerful Features Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Built for Efficiency</h2>
                <p className="text-slate-500 text-lg">Every feature is designed to save you time. No hurdles, just subtitles.</p>
              </div>
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                See all features on Web Store →
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "One-Click Interface", desc: "A native-looking download button blends perfectly into YouTube's player UI." },
                { title: "Multiple Formats", desc: "Choose SRT for players, VTT for web, or Clean TXT for reading and AI processing." },
                { title: "All Languages", desc: "Download any track: manual captions, auto-generated, or translated versions." },
                { title: "Playlist Support", desc: "Browse a playlist and export every subtitle track in the list at once." },
                { title: "Privacy First", desc: "Lightweight and secure. Zero data tracking or unauthorized access to your account." },
                { title: "Chromium Ready", desc: "Works perfectly on Chrome, Edge, Brave, and other Chromium browsers." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Sparkles className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-[2.5rem] bg-slate-900 p-10 md:p-20 relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Start Downloading Better Subtitles Today</h2>
                  <p className="text-slate-400 text-lg mb-10 max-w-xl">Join thousands of users who have streamlined their research and video content workflow.</p>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl transition-all hover:scale-105">
                      Install for Free
                    </a>
                  </div>
                </div>
                <div className="flex-1 hidden md:block group">
                  <Image
                    src="/image/chorme/ytvidhub-chrome-store-listing.png"
                    alt="Success - YouTube Subtitles downloaded using YTVidHub Extension"
                    width={500}
                    height={300}
                    className="rounded-xl shadow-2xl transition-transform group-hover:rotate-2 duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              {[
                { q: "Is the extension truly free?", a: "Yes, installation and basic usage are completely free. It uses the same daily credit system as your YTVidHub account." },
                { q: "Does it work on Microsoft Edge?", a: "Absolutely. Since Edge is built on Chromium, you can install any extension from the Chrome Web Store seamlessly." },
                { q: "Which subtitle formats are supported?", a: "We support SRT (standard subtitles), VTT (web-ready), and our signature Clean TXT (no timestamps, perfect for AI parsing)." },
                { q: "Can I download translated subtitles?", a: "Yes. Any language track available on the YouTube video — including auto-generated and auto-translated tracks — is accessible via the extension." }
              ].map((item, i) => (
                <details key={i} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer transition-all hover:bg-white hover:border-blue-200">
                  <summary className="flex items-center justify-between text-lg font-bold text-slate-900 list-none">
                    {item.q}
                    <span className="text-blue-600 transition-transform group-open:rotate-180">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-500 leading-relaxed text-sm">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
