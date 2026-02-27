"use client";

import React from "react";
import Link from "next/link";
import { Download, Zap, Globe, FileText, Chrome, Shield, ArrowRight } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

const features = [
  { icon: Zap, title: "One-Click Download", desc: "A download button appears on every YouTube video. Click it, pick your format, done. No URL copying needed.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  { icon: FileText, title: "SRT / VTT / TXT", desc: "Export subtitles in any format. Clean TXT for research, SRT for video editing, VTT for web players.", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
  { icon: Globe, title: "All Languages", desc: "Access every subtitle track available — manual captions, auto-generated, and community contributions.", color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
  { icon: Download, title: "Batch from Playlists", desc: "Browse a playlist page and download all subtitles at once. Perfect for courses and lecture series.", color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100" },
  { icon: Shield, title: "Privacy First", desc: "No data collection, no tracking. The extension only activates on YouTube pages. Open source friendly.", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
  { icon: Chrome, title: "Chrome & Edge", desc: "Works on all Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, and Arc.", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
];

const steps = [
  { step: "01", title: "Install the Extension", desc: "Click \"Add to Chrome\" above. It takes 2 seconds — no account required, no configuration needed." },
  { step: "02", title: "Open Any YouTube Video", desc: "Navigate to any YouTube video. You'll see a new YTVidHub download button below the video player." },
  { step: "03", title: "Pick Format & Download", desc: "Choose SRT, VTT, or TXT. The subtitle file downloads instantly to your computer. That's it." },
];

const faqs = [
  { q: "Is the extension free?", a: "Yes, the YTVidHub browser extension is completely free to install and use. You get the same daily free credits as the web app." },
  { q: "Does it work on Microsoft Edge?", a: "Yes. Since Edge is Chromium-based, you can install Chrome extensions directly from the Chrome Web Store. It also works on Brave, Arc, and other Chromium browsers." },
  { q: "What subtitle formats are supported?", a: "The extension supports SRT (SubRip), VTT (WebVTT), and clean TXT (plain text with no timestamps). Choose the format that fits your workflow." },
  { q: "Can I download auto-generated subtitles?", a: "Yes. The extension can access both manually uploaded captions and YouTube's auto-generated subtitles in any available language." },
  { q: "Does it collect my browsing data?", a: "No. The extension only activates on YouTube pages and does not track, store, or transmit any of your browsing activity." },
];

export default function AddOnPage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-10 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Download Subtitles<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Right From YouTube
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              No more copy-pasting URLs. The YTVidHub Chrome extension adds a{" "}
              <strong>one-click subtitle download button</strong> directly on every YouTube video page. SRT, VTT, or clean TXT — instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-10 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                <Chrome size={20} />
                <span>Add to Chrome — Free</span>
              </a>
              <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
                Or use the web app <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-16 text-center leading-tight">
              How It Works
            </h2>
            <div className="space-y-12">
              {steps.map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-blue-600 transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center leading-tight">
              Why Use the Extension?
            </h2>
            <p className="text-slate-500 text-lg text-center mb-16 max-w-2xl mx-auto font-medium">
              Everything you love about YTVidHub, built into your browser.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className={`p-8 rounded-3xl ${f.bg} border ${f.border} hover:shadow-lg transition-all duration-300 group`}>
                  <f.icon size={28} className={`${f.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#3b82f6,_transparent)]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                  Ready to Save Time?
                </h2>
                <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                  Join thousands of researchers, creators, and students who download subtitles directly from YouTube.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                    <Chrome size={20} />
                    <span>Install Free Extension</span>
                  </a>
                  <Link href="/bulk-youtube-subtitle-downloader" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-colors">
                    Need bulk download? <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400">
                  <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none select-none">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}