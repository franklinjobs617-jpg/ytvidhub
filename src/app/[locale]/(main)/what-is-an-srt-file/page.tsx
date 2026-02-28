import Link from "next/link";
import SrtTocClient from "@/components/srt-page/SrtTocClient";
import { SrtCtaHero, SrtCtaFinal, SrtCtaBulk } from "@/components/srt-page/SrtCtaButtons";

export default function SrtFileGuidePage() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Technical Specification</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            SRT File Format: Timestamp Syntax &amp; Rules
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Need the exact <strong>syntax for SRT files</strong>? This reference guide covers correct timestamp formatting (<code>HH:MM:SS,ms</code>), sequence numbering, and required line breaks.
          </p>
          <SrtCtaHero />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { value: "99.9%", label: "Video Player Support", desc: "VLC, QuickTime, Windows Media" },
              { value: "UTF-8", label: "Encoding Standard", desc: "Universal character support" },
              { value: "Zero Cost", label: "Open Format", desc: "No licensing fees" },
              { value: "1ms", label: "Timestamp Precision", desc: "Frame-accurate synchronization" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="text-lg font-bold text-slate-900">{item.value}</div>
                <div className="text-xs font-medium text-slate-700 mt-1">{item.label}</div>
                <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Main Layout with Sidebar */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <aside className="hidden lg:block lg:col-span-3 sticky top-32">
                <SrtTocClient />
              </aside>

              <div className="lg:col-span-9">
                <article className="max-w-3xl">

                  {/* Image 1 */}
                  <div className="mb-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="/image/A graphic breakdown of the SRT file format.webp" alt="Comprehensive technical breakdown of SRT file format showing sequence numbering, timestamp syntax with comma milliseconds, and subtitle block structure for video captioning" className="w-full h-auto" />
                    <p className="p-4 text-center text-sm text-slate-500">Figure 1: Complete SRT file structure breakdown with timestamp formatting rules</p>
                  </div>

                  {/* What is SRT */}
                  <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 mb-16">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">What is an SRT File?</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-slate-700 leading-relaxed mb-4">
                          An <strong>SRT file (.srt extension)</strong> is a plain-text subtitle format that stores synchronized caption data with precise timing information. It&apos;s the universal standard for video subtitles, supported by every major video player from VLC to YouTube. You can <Link href="/" className="text-blue-600 hover:underline">download YouTube subtitles</Link> as SRT files instantly with no software required.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li><strong>Human-readable:</strong> Can be edited with any text editor</li>
                          <li><strong>Time-synchronized:</strong> Millisecond-accurate caption display</li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl bg-white border border-blue-100">
                        <h4 className="font-semibold text-slate-900 mb-3">Common Use Cases</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>· Video localization &amp; translation</li>
                          <li>· AI training data for speech recognition</li>
                          <li>· Accessibility compliance (ADA, WCAG)</li>
                          <li>· Content repurposing for social media</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 1. Anatomy */}
                  <section id="anatomy" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">1. Complete SRT File Anatomy</h2>
                    <p className="text-lg text-slate-600 mb-8">Understanding the <strong>four essential components</strong> of every SRT file is crucial for creating valid subtitle files that work across all video platforms and players.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { t: "Sequence Number", d: "A sequential numeric identifier starting at 1. Must increment by 1 for each subtitle block.", code: "1", tip: "Our bulk extractor auto-generates perfect sequence numbering" },
                        { t: "Timestamp Format", d: "Precise HH:MM:SS,ms format using comma as millisecond separator. The arrow (-->) separates start and end times.", code: "00:01:23,456 --> 00:01:25,789", tip: "SRT uses commas, VTT uses dots for milliseconds" },
                        { t: "Subtitle Text Content", d: "The actual caption text. Can span multiple lines (max 2 recommended). Supports basic HTML tags like <b>, <i>, <u>.", code: "This is the actual subtitle text\nthat appears on screen.", tip: "Keep lines under 42 characters for optimal readability" },
                        { t: "Blank Line Separator", d: "A mandatory empty line that signals the end of one subtitle block and the beginning of the next.", code: "(blank line)", tip: "Required after every subtitle entry" },
                      ].map((box, i) => (
                        <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                          <p className="text-xs text-blue-600 font-medium mb-2">Component 0{i + 1} · Required</p>
                          <h3 className="font-semibold text-slate-900 mb-2">{box.t}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-3">{box.d}</p>
                          <div className="p-3 bg-white rounded-lg font-mono text-sm text-slate-700 border border-slate-100 mb-3">{box.code}</div>
                          <p className="text-xs text-blue-600">{box.tip}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 2. Syntax Deep Dive */}
                  <section id="interactive" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">2. SRT Syntax Deep Dive</h2>
                    <p className="text-slate-500 mb-8">Interactive analysis of a complete <strong>SRT file structure</strong>. Each element follows strict formatting rules.</p>
                    <div className="bg-slate-900 rounded-2xl p-6 md:p-10 font-mono text-sm leading-loose">
                      <div className="text-xs text-slate-500 mb-6 text-right">example.srt</div>
                      <div className="space-y-6">
                        <div>
                          <span className="text-slate-500">1</span>
                          <br />
                          <span className="text-emerald-400">00:00:01,000 --&gt; 00:00:03,450</span>
                          <br />
                          <span className="text-slate-100">Welcome to our tutorial on SRT file formatting.</span>
                        </div>
                        <div>
                          <span className="text-slate-500">2</span>
                          <br />
                          <span className="text-emerald-400">00:00:03,500 --&gt; 00:00:06,800</span>
                          <br />
                          <span className="text-slate-100">Learn how to create perfect subtitle files</span>
                          <br />
                          <span className="text-slate-100">for video editing and AI training.</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 space-y-1">
                        <p><strong>Encoding:</strong> Always save as UTF-8 to support special characters</p>
                        <p><strong>Line Endings:</strong> Use CRLF (Windows) or LF (Unix) consistently</p>
                        <p><strong>Validation:</strong> Our bulk downloader checks all formatting rules</p>
                      </div>
                    </div>
                  </section>

                  {/* 3. Advanced Formatting */}
                  <section id="advanced-formatting" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">3. Advanced SRT Formatting Rules</h2>
                    <p className="text-slate-500 mb-8">Professional techniques for complex subtitle scenarios.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { title: "Styling with HTML Tags", desc: "SRT files support limited HTML for text formatting. Use <b>, <i>, <u> tags for emphasis, but avoid complex CSS.", example: "<b>Important</b>: This text is bold", note: "Not all players support HTML tags" },
                        { title: "Positioning & Alignment", desc: "While basic SRT doesn't support positioning, some players accept positional hints in the timestamp line.", example: "00:01:00,000 --> 00:01:05,000 X1:100 X2:400 Y1:50 Y2:100", note: "Non-standard extension" },
                        { title: "Multilingual Support", desc: "UTF-8 encoding supports all languages. Always include language metadata in filename or header comments.", example: "video_es.srt (Spanish)\nvideo_ja.srt (Japanese)", note: "Essential for localization" },
                        { title: "Line Breaking Strategy", desc: "Optimal readability: max 42 characters per line, 2 lines max. Break at natural phrase boundaries.", example: "This is the first line of dialogue\nand this is the second line.", note: "Improves viewer comprehension" },
                      ].map((item, i) => (
                        <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                          <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                          <div className="p-3 bg-white rounded-lg font-mono text-sm text-slate-700 border border-slate-100 mb-2">{item.example}</div>
                          <p className="text-xs text-slate-400">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 4. Format Comparison */}
                  <section id="comparison" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">4. Format Comparison: SRT vs. VTT vs. TXT</h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="p-4 font-semibold text-slate-900">Feature</th>
                            <th className="p-4 font-semibold text-blue-600">SRT (.srt)</th>
                            <th className="p-4 font-semibold text-slate-900">VTT (.vtt)</th>
                            <th className="p-4 font-semibold text-slate-900">Clean TXT</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600">
                          {[
                            { feature: "Primary Use Case", srt: "Universal video subtitles", vtt: "Web video (HTML5)", txt: "AI training data" },
                            { feature: "Timestamp Format", srt: "00:01:23,456 (comma)", vtt: "00:01:23.456 (dot)", txt: "No timestamps" },
                            { feature: "Styling Support", srt: "Basic HTML tags", vtt: "Full CSS classes", txt: "Plain text only" },
                            { feature: "AI Training Suitability", srt: "Excellent (clean structure)", vtt: "Good (requires cleaning)", txt: "Perfect (pure text)" },
                            { feature: "Browser Native Support", srt: "Requires conversion", vtt: "Direct support", txt: "Not applicable" },
                            { feature: "Metadata Support", srt: "Minimal", vtt: "Extensive headers", txt: "None" },
                            { feature: "Learning Curve", srt: "Very low", vtt: "Moderate", txt: "None" },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-slate-50">
                              <td className="p-4 font-medium text-slate-900">{row.feature}</td>
                              <td className="p-4">{row.srt}</td>
                              <td className="p-4">{row.vtt}</td>
                              <td className="p-4">{row.txt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div className="p-5 rounded-xl border border-blue-200 bg-blue-50">
                        <h4 className="font-semibold text-slate-900 mb-2">Choose SRT When...</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>· Working with traditional video editing software</li>
                          <li>· Need maximum compatibility across devices</li>
                          <li>· Preparing data for speech recognition AI</li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                        <h4 className="font-semibold text-slate-900 mb-2">Choose VTT When...</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>· Building modern web video experiences</li>
                          <li>· Need advanced styling and positioning</li>
                          <li>· Working with HTML5 video players</li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                        <h4 className="font-semibold text-slate-900 mb-2">Choose TXT When...</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>· Training language models (LLMs)</li>
                          <li>· Need pure text without timing data</li>
                          <li>· Creating searchable transcripts</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* 5. Conversion Guide */}
                  <section id="conversion" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">5. SRT Format Conversion Guide</h2>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Converting SRT to Other Formats</h3>
                        <div className="space-y-4">
                          {[
                            { from: "SRT → VTT", process: "Change commas to dots in timestamps, add WEBVTT header", tool: "Our bulk converter automates this" },
                            { from: "SRT → TXT", process: "Remove timestamps and sequence numbers, keep only text", tool: "Perfect for AI training datasets" },
                            { from: "SRT → ASS/SSA", process: "Convert to Advanced SubStation Alpha with styling", tool: "For advanced karaoke and animation" },
                          ].map((conv, i) => (
                            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                              <p className="font-semibold text-blue-600 text-sm mb-1">{conv.from}</p>
                              <p className="text-sm text-slate-600 mb-1">{conv.process}</p>
                              <p className="text-xs text-slate-400">{conv.tool}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Bulk Conversion Workflow</h3>
                        <div className="bg-slate-900 text-white rounded-xl p-6">
                          <ol className="space-y-4 text-sm">
                            <li className="flex items-center gap-3"><span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span>Upload multiple SRT files or paste YouTube URLs</li>
                            <li className="flex items-center gap-3"><span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span>Select target format (VTT, TXT, JSON, etc.)</li>
                            <li className="flex items-center gap-3"><span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">3</span>Apply formatting rules and validation</li>
                            <li className="flex items-center gap-3"><span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">4</span>Download converted files or integrate via API</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 6. Editing Tools */}
                  <section id="editing" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">6. Professional SRT Editing Tools</h2>
                    <div className="space-y-5 mb-8">
                      {[
                        { category: "Text Editors", tools: "Notepad++, Sublime Text, VS Code", useCase: "Manual correction of SRT files", tip: "Always save as UTF-8 encoding" },
                        { category: "Dedicated Software", tools: "Subtitle Edit, Aegisub, Jubler", useCase: "Advanced timing and synchronization", tip: "Visual timeline editing interface" },
                        { category: "Online Converters", tools: "Our bulk YouTube subtitle downloader", useCase: "Mass SRT extraction and conversion", tip: "Process 1000+ videos simultaneously" },
                      ].map((item, i) => (
                        <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                          <h3 className="font-semibold text-slate-900 mb-1">{item.category}</h3>
                          <p className="text-sm text-slate-600 mb-1">{item.tools}</p>
                          <p className="text-xs text-slate-500 mb-1">{item.useCase}</p>
                          <p className="text-xs text-blue-600">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-grow">
                        <h4 className="font-semibold text-slate-900 mb-1">Need Bulk SRT Files for AI Research?</h4>
                        <p className="text-sm text-slate-500">Our <Link href="/" className="text-blue-600 hover:underline">free YouTube subtitle downloader</Link> provides perfectly formatted <strong>SRT files</strong> from any YouTube playlist or channel.</p>
                      </div>
                      <SrtCtaBulk />
                    </div>
                  </section>

                  {/* 7. AI Use Cases */}
                  <section id="ai-use-cases" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">7. SRT Files for AI &amp; Machine Learning</h2>
                    <p className="text-slate-500 mb-8">Why SRT is the preferred format for AI training data.</p>
                    <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 mb-8">
                      <h3 className="font-semibold text-slate-900 mb-3">SRT File Format Benefits for AI Applications</h3>
                      <p className="text-sm text-slate-600 mb-4">The .srt subtitle format provides clean, structured text data that is ideal for machine learning models. Its simple structure makes it easy to parse and convert to training datasets for natural language processing and speech recognition systems.</p>
                      <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
                        <li>· Easy parsing for AI training</li>
                        <li>· Consistent timestamp format</li>
                        <li>· Universal compatibility</li>
                        <li>· Clean text extraction</li>
                      </ul>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                        <h4 className="font-semibold text-slate-900 mb-2">Clean Data for LLM Training</h4>
                        <p className="text-sm text-slate-500 leading-relaxed mb-3">SRT&apos;s simple structure makes it ideal for creating clean dialogue datasets. The timestamp-text pairing provides perfect alignment for speech recognition models.</p>
                        <ul className="text-xs text-slate-500 space-y-1">
                          <li>· Automatic noise filtering (timestamps removed)</li>
                          <li>· Perfect for fine-tuning GPT, Whisper, BERT</li>
                          <li>· Direct conversion to JSONL format</li>
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                        <h4 className="font-semibold text-slate-900 mb-2">Bulk Processing Pipelines</h4>
                        <p className="text-sm text-slate-500 leading-relaxed mb-3">Our infrastructure processes millions of SRT files monthly for AI research teams. Automated validation ensures data quality at scale.</p>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          {[
                            { value: "2.5M", label: "Monthly SRT Files" },
                            { value: "99.8%", label: "Parsing Success" },
                            { value: "45+", label: "Languages" },
                            { value: "10ms", label: "Processing Time" },
                          ].map((stat, i) => (
                            <div key={i}>
                              <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                              <div className="text-xs text-slate-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 8. FAQ */}
                  <section id="faq" className="scroll-mt-32 mb-16">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">8. SRT File Expert FAQ</h2>
                    <div className="space-y-5">
                      {[
                        { q: "What is the standard SRT file format structure?", a: "The standard SRT format consists of four elements per subtitle: 1) Sequence number, 2) Timestamp (HH:MM:SS,ms format), 3) Subtitle text, 4) Blank line separator. This structure must be repeated for each caption." },
                        { q: "How do I create an SRT file from scratch?", a: "You can create an SRT file using any text editor. Start with '1' as the sequence number, add your timestamps using comma for milliseconds, write your caption text, and add a blank line before the next sequence. Always save with UTF-8 encoding." },
                        { q: "What's the difference between SRT and VTT files?", a: "SRT uses commas for milliseconds (00:01:23,456) while VTT uses dots (00:01:23.456). VTT supports CSS styling and metadata headers, while SRT is simpler and more universally compatible." },
                        { q: "Can I download YouTube subtitles as SRT files in bulk?", a: "Yes, using our professional bulk YouTube subtitle downloader, you can extract SRT files from entire playlists or channels simultaneously. The tool automatically formats timestamps correctly and handles multiple languages." },
                        { q: "How do I convert SRT to TXT for AI training?", a: "Our bulk processor includes an SRT-to-TXT conversion feature that removes timestamps and sequence numbers, leaving only clean dialogue text perfect for training language models like GPT or Whisper." },
                        { q: "What encoding should I use for SRT files?", a: "Always use UTF-8 encoding for SRT files. This ensures proper display of special characters, accents, and multilingual text. Avoid ANSI or other encodings that can cause character corruption." },
                      ].map((faq, i) => (
                        <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                          <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Final CTA */}
                  <section className="text-center rounded-2xl bg-slate-900 p-12 md:p-16">
                    <h3 className="font-serif text-2xl font-bold text-white mb-4">Ready to Master SRT Files?</h3>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">Start extracting perfectly formatted SRT files today with our professional bulk downloader. Process unlimited videos, convert between formats, and prepare clean datasets for AI research.</p>
                    <SrtCtaFinal />
                    <p className="text-slate-500 text-xs mt-6">No credit card required · 5 free SRT extractions · Enterprise API available</p>
                  </section>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
