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
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Simple, Professional Hero */}
        <header className="border-b border-slate-100 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">
                Official Extension
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
                The fastest way to <br />
                <span className="text-blue-600">save YouTube subtitles.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl">
                No copy-pasting required. Our browser extension adds a simple download button directly to the YouTube interface.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-all shadow-md active:scale-95 text-center"
                >
                  Add to Chrome — Free
                </a>
                <Link href="/" className="text-sm text-slate-400 hover:text-slate-900 font-semibold transition-colors flex items-center gap-2">
                  Use web version <span>→</span>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/image/chorme/ytvidhub-chrome-store-listing.png"
                  alt="YTVidHub Chrome Web Store Listing"
                  width={800}
                  height={500}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Clean, Numbered Steps */}
        <section className="py-24 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-xl mb-20 md:mb-24">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 tracking-tight">How it works</h2>
              <p className="text-slate-500">A seamless integration that takes moments to set up. Once installed, it works on every video you watch.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  index: "01",
                  title: "Installation",
                  desc: "Add YTVidHub to your browser from the Chrome Web Store with one click.",
                  img: "/image/chorme/ytvidhub-extension-step-install.png",
                  alt: "Standard Chrome extension installation flow"
                },
                {
                  index: "02",
                  title: "Instant Detection",
                  desc: "When watching any video, the extension automatically detects available subtitle tracks.",
                  img: "/image/chorme/ytvidhub-extension-step-video.png",
                  alt: "YouTube player with YTVidHub download button"
                },
                {
                  index: "03",
                  title: "Click to Save",
                  desc: "Download directly in SRT, WebVTT, or clean text formats. No delay, no redirects.",
                  img: "/image/chorme/ytvidhub-extension-step-download.png",
                  alt: "Format selection and instant download"
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-8 border border-slate-100 bg-slate-50 ring-1 ring-slate-100">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-4">
                    <span className="text-xs font-mono font-bold text-blue-600 mt-1">{item.index}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimalist Feature List */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-y-16 gap-x-12">
              {[
                { title: "One-Click Interface", desc: "A clean button placed right below the video player. It stays out of the way until you need it." },
                { title: "Smart Export", desc: "Supports standard SRT and VTT formats, plus our custom 'Clean TXT' for reading and LLMs." },
                { title: "Language Support", desc: "Captures manual, auto-generated, and translated subtitles in every language YouTube offers." },
                { title: "Bulk Compatibility", desc: "Works on playlist pages too. Select multiple videos and download their tracks in a single batch." },
                { title: "Private by Design", desc: "The extension only runs on YouTube. We never collect your browsing history or personal data." },
                { title: "Universal", desc: "Built for Chrome, but fully compatible with Edge, Brave, Arc, and all Chromium browsers." }
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter-style CTA */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-900 rounded-2xl p-12 md:p-20 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to simplify your workflow?</h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">Join 10,000+ researchers and students using YTVidHub to save time on YouTube research.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-12 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-all active:scale-95"
                >
                  Install for Chrome
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Simple FAQ */}
        <section className="py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-12 text-center">Common Questions</h2>
            <div className="divide-y divide-slate-200">
              {[
                { q: "Is it really free?", a: "Yes. The extension is free to install. It uses the same daily credit balance as your YTVidHub account." },
                { q: "Is Edge supported?", a: "Yes. Since Edge is based on Chromium, it can run any extension from the Chrome Web Store." },
                { q: "Which formats can I use?", a: "You can download in SRT (subtitles), VTT (web), and Clean TXT (plain text for AI and reading)." },
                { q: "What about my privacy?", a: "We take privacy seriously. The extension only activates on YouTube and never tracks your browsing outside the platform." }
              ].map((item, i) => (
                <div key={i} className="py-6 first:pt-0">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
