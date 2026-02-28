import Link from "next/link";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function AddOnPage() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Browser Extension</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Download Subtitles Right From YouTube
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            No more copy-pasting URLs. The YTVidHub Chrome extension adds a{" "}
            <strong>one-click subtitle download button</strong> directly on every YouTube video page. SRT, VTT, or clean TXT — instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Add to Chrome — Free
            </a>
            <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors">
              Or use the web app →
            </Link>
          </div>
        </header>

        {/* How It Works */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">How It Works</h2>
          <div className="space-y-5">
            {[
              { step: "Step 1", title: "Install the Extension", desc: "Click \"Add to Chrome\" above. It takes 2 seconds — no account required, no configuration needed." },
              { step: "Step 2", title: "Open Any YouTube Video", desc: "Navigate to any YouTube video. You'll see a new YTVidHub download button below the video player." },
              { step: "Step 3", title: "Pick Format & Download", desc: "Choose SRT, VTT, or TXT. The subtitle file downloads instantly to your computer. That's it." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">{item.step}</p>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Features */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">Why Use the Extension?</h2>
          <p className="text-slate-500 mb-8">Everything you love about YTVidHub, built into your browser.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "One-Click Download", desc: "A download button appears on every YouTube video. Click it, pick your format, done. No URL copying needed." },
              { title: "SRT / VTT / TXT", desc: "Export subtitles in any format. Clean TXT for research, SRT for video editing, VTT for web players." },
              { title: "All Languages", desc: "Access every subtitle track available — manual captions, auto-generated, and community contributions." },
              { title: "Batch from Playlists", desc: "Browse a playlist page and download all subtitles at once. Perfect for courses and lecture series." },
              { title: "Privacy First", desc: "No data collection, no tracking. The extension only activates on YouTube pages. Open source friendly." },
              { title: "Chrome & Edge", desc: "Works on all Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, and Arc." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ready to Save Time?</h2>
            <p className="text-slate-400 mb-8">Join thousands of researchers, creators, and students who download subtitles directly from YouTube.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Install Free Extension
              </a>
              <Link href="/bulk-youtube-subtitle-downloader" className="text-sm text-slate-400 hover:text-white font-medium transition-colors">
                Need bulk download? →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "Is the extension free?", a: "Yes, the YTVidHub browser extension is completely free to install and use. You get the same daily free credits as the web app." },
              { q: "Does it work on Microsoft Edge?", a: "Yes. Since Edge is Chromium-based, you can install Chrome extensions directly from the Chrome Web Store. It also works on Brave, Arc, and other Chromium browsers." },
              { q: "What subtitle formats are supported?", a: "The extension supports SRT (SubRip), VTT (WebVTT), and clean TXT (plain text with no timestamps). Choose the format that fits your workflow." },
              { q: "Can I download auto-generated subtitles?", a: "Yes. The extension can access both manually uploaded captions and YouTube's auto-generated subtitles in any available language." },
              { q: "Does it collect my browsing data?", a: "No. The extension only activates on YouTube pages and does not track, store, or transmit any of your browsing activity." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
