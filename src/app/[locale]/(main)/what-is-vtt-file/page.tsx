import Link from "next/link";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";

// FAQ 数据 — 与 layout.tsx 的 FAQPage Schema 保持一致
const FAQ_ITEMS = [
  {
    q: "What is a VTT file?",
    a: "A VTT file (WebVTT — Web Video Text Tracks) is a subtitle and caption format designed for HTML5 video. It stores timed text cues with timestamps in the format HH:MM:SS.mmm --> HH:MM:SS.mmm. Unlike SRT, VTT uses a dot as the millisecond separator and supports additional styling features like text positioning and color.",
  },
  {
    q: "What is the difference between VTT and SRT?",
    a: (
      <span>
        VTT and SRT differ in three key ways: <strong>timestamp separator</strong> (VTT uses a dot: <code>00:00:01.000</code>, SRT uses a comma: <code>00:00:01,000</code>), <strong>use case</strong> (VTT is for web browsers and HTML5 video, SRT has broader desktop player support), and <strong>features</strong> (VTT supports cue positioning and styling, SRT is plain text only).
      </span>
    ),
  },
  {
    q: "How do I open a VTT file?",
    a: "Open a VTT file in any text editor — Notepad, TextEdit, or VS Code — to view or edit the content. For playback, modern web browsers natively support VTT via the HTML5 track element. VLC media player also supports VTT subtitle loading.",
  },
  {
    q: "What is the correct VTT timestamp format?",
    a: (
      <span>
        The correct VTT timestamp format is <code>HH:MM:SS.mmm --&gt; HH:MM:SS.mmm</code>. Hours are optional for timestamps under one hour. The arrow separator must have a space on each side. Milliseconds use a dot, not a comma — this is the key difference from SRT format.
      </span>
    ),
  },
  {
    q: "How do I download YouTube subtitles as a VTT file?",
    a: "Paste any YouTube video URL into YTVidHub, select VTT as the output format, and click Extract. Your VTT subtitle file will be ready in under 10 seconds. You can also download entire playlists as VTT files in bulk — no software installation required.",
  },
  {
    q: "What is a VTT file used for?",
    a: "VTT files are used for web video players (the native subtitle format for HTML5 video), online course platforms like Coursera and Udemy, accessibility and closed captions, and video editing software including Adobe Premiere and DaVinci Resolve.",
  },
  {
    q: "Can I convert VTT to SRT?",
    a: "Yes. To convert VTT to SRT: remove the WEBVTT header line, replace dot millisecond separators with commas, and add sequence numbers to each cue block. Alternatively, you can download subtitles directly in SRT format from YTVidHub to skip the conversion step entirely.",
  },
  {
    q: "Can I download YouTube subtitles as VTT for entire playlists?",
    a: "Yes. YTVidHub supports bulk VTT downloads from entire YouTube playlists and channels. Paste a playlist URL, select VTT format, and download all subtitle files as a single ZIP archive. This is the fastest way to get VTT files for multiple videos at once.",
  },
];

export default function WhatIsVttFilePage() {
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700">
      <main>

        {/* ── Hero ── */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">
            Technical Guide
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            What Is a VTT File? Complete WebVTT Format Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            A <strong>VTT file (WebVTT)</strong> is the standard subtitle format
            for HTML5 web video. Learn the exact{" "}
            <strong>timestamp syntax</strong>, how VTT compares to SRT, and how
            to download YouTube subtitles as VTT in seconds — free.
          </p>

          {/* Quick answer box — AI GEO: 首段直接回答，Perplexity 优先引用 */}
          <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 md:p-5">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Quick answer:</strong> A VTT (Web Video Text Tracks) file
              stores subtitle cues with timestamps in the format{" "}
              <code className="bg-white px-1 rounded text-blue-700">
                HH:MM:SS.mmm --&gt; HH:MM:SS.mmm
              </code>
              . It starts with a required <code className="bg-white px-1 rounded text-blue-700">WEBVTT</code> header
              and is natively supported by all modern web browsers via the HTML5{" "}
              <code className="bg-white px-1 rounded text-blue-700">&lt;track&gt;</code> element.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Published June 26, 2026 · YTVidHub Editorial Team
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { value: "HTML5", label: "Native Support", desc: "All modern browsers" },
              { value: ".mmm", label: "Milliseconds", desc: "Dot separator (not comma)" },
              { value: "UTF-8", label: "Encoding", desc: "Universal character support" },
              { value: "Free", label: "Open Standard", desc: "W3C WebVTT specification" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="text-lg font-bold text-slate-900">{item.value}</div>
                <div className="text-xs font-medium text-slate-700 mt-1">{item.label}</div>
                <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ── Main content ── */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-16">

              {/* Section 1: What is a VTT file */}
              <section id="what-is-vtt" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  What Is a VTT File?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A <strong>VTT file</strong> (extension <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">.vtt</code>)
                  is a plain-text subtitle file following the{" "}
                  <strong>WebVTT (Web Video Text Tracks)</strong> specification
                  developed by the W3C. It is the native subtitle format for
                  HTML5 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">&lt;video&gt;</code> elements
                  and is natively supported by Chrome, Firefox, Safari, and Edge
                  without any plugins.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  VTT files store <strong>timed cue blocks</strong> — each cue
                  defines when subtitle text should appear and disappear on
                  screen. Unlike{" "}
                  <Link href="/what-is-an-srt-file/" className="text-blue-600 hover:underline">
                    SRT files
                  </Link>
                  , VTT supports additional features like cue positioning,
                  vertical text, and CSS-style text formatting.
                </p>

                {/* VTT file example */}
                <div className="rounded-xl border border-slate-200 overflow-hidden mt-6">
                  <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">example.vtt</span>
                    <span className="ml-auto text-xs text-emerald-400">WebVTT format</span>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 text-sm px-4 py-4 overflow-x-auto leading-relaxed font-mono">
{`WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to this tutorial.

00:00:04.500 --> 00:00:08.000
Today we'll cover three key topics.

00:00:08.200 --> 00:00:12.500
Let's start with the basics.`}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">
                  A minimal VTT file. The WEBVTT header is required. Timestamps use dots, not commas.
                </p>
              </section>

              {/* Section 2: VTT vs SRT */}
              <section id="vtt-vs-srt" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  VTT vs SRT: Key Differences
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  VTT and SRT are both plain-text subtitle formats, but they
                  serve different use cases. Here is a direct comparison:
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-700">Feature</th>
                        <th className="px-4 py-3 font-semibold text-blue-700">VTT (WebVTT)</th>
                        <th className="px-4 py-3 font-semibold text-slate-700">SRT (SubRip)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Header", "Required WEBVTT line", "None"],
                        ["Timestamp separator", "Dot: 00:00:01.000", "Comma: 00:00:01,000"],
                        ["Cue IDs", "Optional (text or number)", "Required (sequential number)"],
                        ["Browser support", "Native HTML5 ✅", "Requires JS library"],
                        ["Desktop players", "VLC, most players", "Universal support"],
                        ["Styling support", "Yes (CSS, positioning)", "No"],
                        ["Course platforms", "Coursera, Udemy ✅", "Less common"],
                        ["AI / plain text use", "Strip header + timestamps", "Strip timestamps"],
                      ].map(([feature, vtt, srt], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-4 py-3 font-medium text-slate-700">{feature}</td>
                          <td className="px-4 py-3 text-slate-600">{vtt}</td>
                          <td className="px-4 py-3 text-slate-600">{srt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-600 leading-relaxed mt-4">
                  <strong>When to use VTT:</strong> Building a web video player,
                  uploading captions to an online course platform, or working
                  with HTML5 video.{" "}
                  <strong>When to use SRT:</strong> Using desktop video players
                  (VLC, Windows Media Player), video editing software, or
                  distributing subtitle files broadly.
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  See the complete format comparison:{" "}
                  <Link href="/guide/srt-vs-vtt/" className="text-blue-600 hover:underline">
                    SRT vs VTT — Which format should you use?
                  </Link>
                </p>
              </section>

              {/* Section 3: VTT syntax */}
              <section id="vtt-syntax" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  VTT File Syntax and Structure
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Every valid VTT file follows this structure:
                </p>

                <ol className="space-y-4 mb-6">
                  {[
                    {
                      step: "1",
                      title: "WEBVTT header (required)",
                      desc: "The file must start with WEBVTT on the first line. This is mandatory — files without it will not parse correctly.",
                      code: "WEBVTT",
                    },
                    {
                      step: "2",
                      title: "Optional metadata block",
                      desc: "After the WEBVTT header, you can add optional key-value metadata before the first cue.",
                      code: "Kind: subtitles\nLanguage: en",
                    },
                    {
                      step: "3",
                      title: "Cue blocks",
                      desc: "Each cue has an optional ID, a timestamp line, and the subtitle text. Cues are separated by blank lines.",
                      code: `00:00:01.000 --> 00:00:04.000\nHello and welcome.`,
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {item.step}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 mb-1">{item.title}</p>
                        <p className="text-sm text-slate-600 mb-2">{item.desc}</p>
                        <pre className="bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-lg font-mono">
                          {item.code}
                        </pre>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Common mistake:</strong> Using a comma instead of a
                    dot in VTT timestamps (e.g.,{" "}
                    <code>00:00:01,000</code> instead of{" "}
                    <code>00:00:01.000</code>). Commas are the SRT format —
                    VTT always uses dots.
                  </p>
                </div>
              </section>

              {/* Section 4: How to open VTT files */}
              <section id="how-to-open-vtt" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  How to Open a VTT File
                </h2>

                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  {[
                    {
                      icon: "📝",
                      title: "Text editors",
                      items: ["Notepad (Windows)", "TextEdit (macOS)", "VS Code", "Sublime Text"],
                      note: "Best for editing cue content and timestamps",
                    },
                    {
                      icon: "🎬",
                      title: "Video players",
                      items: ["VLC Media Player", "Chrome / Firefox", "Safari", "Edge"],
                      note: "Load via subtitle menu or HTML5 track element",
                    },
                    {
                      icon: "🎞️",
                      title: "Editing software",
                      items: ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "Camtasia"],
                      note: "Import VTT for subtitle track editing",
                    },
                  ].map((col, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <div className="text-2xl mb-3">{col.icon}</div>
                      <h3 className="font-bold text-slate-800 mb-2">{col.title}</h3>
                      <ul className="space-y-1 mb-3">
                        {col.items.map((item) => (
                          <li key={item} className="text-sm text-slate-600 flex items-center gap-1.5">
                            <span className="text-emerald-500 text-xs">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-400">{col.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Tool CTA — 差异化关键 */}
              <section id="download-vtt" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Download YouTube Subtitles as VTT — Free
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Need a VTT file from a YouTube video? YTVidHub extracts
                  subtitles in VTT format in under 10 seconds — single videos,
                  playlists, or entire channels.
                </p>

                {/* Step-by-step — HowTo Schema 的可视化版本 */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                    How to download in 4 steps
                  </p>
                  <ol className="space-y-3">
                    {[
                      "Copy the YouTube video or playlist URL",
                      "Paste it into the input field below",
                      "Select VTT as the output format",
                      "Click Extract — your .vtt file is ready in seconds",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/youtube-vtt-downloader/?ref=vtt-guide"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Download VTT Free →
                    </Link>
                    <Link
                      href="/bulk-youtube-subtitle-downloader/?ref=vtt-guide"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                    >
                      Bulk playlist VTT download
                    </Link>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Free · No installation · SRT, VTT, TXT formats · 100+ languages
                  </p>
                </div>
              </section>

              {/* Section 6: Convert VTT to SRT */}
              <section id="convert-vtt" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  How to Convert VTT to SRT (and Back)
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-3">VTT → SRT</h3>
                    <ol className="space-y-2">
                      {[
                        "Remove the WEBVTT header line",
                        "Remove any metadata blocks",
                        "Add sequential numbers (1, 2, 3...) to each cue",
                        "Replace dots with commas in timestamps: 00:00:01.000 → 00:00:01,000",
                        "Save as .srt",
                      ].map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-blue-600 font-semibold">{i + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-3">SRT → VTT</h3>
                    <ol className="space-y-2">
                      {[
                        "Add WEBVTT as the first line",
                        "Remove sequence numbers (optional, VTT IDs are optional)",
                        "Replace commas with dots in timestamps: 00:00:01,000 → 00:00:01.000",
                        "Save as .vtt",
                      ].map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-blue-600 font-semibold">{i + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">
                    <strong>Tip:</strong> The fastest way to get subtitles in
                    the format you need is to download directly in that format
                    from YTVidHub — no conversion step required. Choose SRT, VTT,
                    or TXT at download time.
                  </p>
                </div>
              </section>

              {/* Section 7: Related formats long-tail 覆盖 */}
              <section id="vtt-use-cases" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  VTT File Use Cases
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Web video players",
                      desc: "VTT is the only subtitle format natively supported by the HTML5 <track> element. Any web-based video player that doesn't use a JS subtitle library will require VTT.",
                    },
                    {
                      title: "Online course platforms",
                      desc: "Coursera, Udemy, Teachable, and most LMS platforms use VTT for closed captions. Upload VTT to add accessibility to your course videos.",
                    },
                    {
                      title: "Accessibility compliance",
                      desc: "VTT is required for WCAG-compliant web video. If your website serves video content, VTT captions are needed for legal accessibility compliance in many jurisdictions.",
                    },
                    {
                      title: "Video editing software",
                      desc: "Adobe Premiere Pro, DaVinci Resolve, and Final Cut Pro all support VTT subtitle track import for burn-in or overlay workflows.",
                    },
                    {
                      title: "YouTube subtitle download",
                      desc: "YouTube generates auto-captions for all videos. Download them as VTT for any of the above use cases using YTVidHub — single videos or entire playlists.",
                    },
                    {
                      title: "AI and NLP research",
                      desc: "VTT files (with timestamps stripped) provide clean, time-aligned text for speech recognition training, LLM fine-tuning, and NLP dataset preparation.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                      <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <UnifiedFaqSection
                id="faq"
                title="Frequently Asked Questions About VTT Files"
                subtitle="Everything you need to know about the WebVTT subtitle format."
                items={FAQ_ITEMS}
                sectionClassName="py-0 bg-transparent"
                containerClassName="max-w-3xl px-0"
              />

              {/* Internal links section */}
              <section className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Related guides and tools
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      href: "/what-is-an-srt-file/",
                      title: "What Is an SRT File?",
                      desc: "The complete guide to the SRT subtitle format.",
                    },
                    {
                      href: "/guide/srt-vs-vtt/",
                      title: "SRT vs VTT — Format Comparison",
                      desc: "Side-by-side comparison of both subtitle formats.",
                    },
                    {
                      href: "/youtube-vtt-downloader/",
                      title: "YouTube VTT Downloader",
                      desc: "Download subtitles from any YouTube video as VTT.",
                    },
                    {
                      href: "/bulk-youtube-subtitle-downloader/",
                      title: "Bulk Subtitle Downloader",
                      desc: "Download VTT files from entire YouTube playlists.",
                    },
                    {
                      href: "/youtube-transcript-generator/",
                      title: "YouTube Transcript Generator",
                      desc: "Convert YouTube video to clean text without timestamps.",
                    },
                    {
                      href: "/guide/playlist-subtitles-bulk/",
                      title: "Playlist Subtitle Download Guide",
                      desc: "Step-by-step guide to batch downloading subtitles.",
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                    >
                      <span className="text-sm font-semibold text-blue-700">
                        {link.title}
                      </span>
                      <span className="text-xs text-slate-500">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools currentPath="/what-is-vtt-file" count={3} />

      </main>
    </div>
  );
}
