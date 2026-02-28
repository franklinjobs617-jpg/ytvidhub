"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function SubtitleSettingsGuidePage() {
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
      <title>The Ultimate YouTube Subtitle Settings Guide: Fix Any CC Problem Fast</title>
      <meta name="description" content="The definitive guide to the Ultimate YouTube Subtitle Settings and quick fixes for common CC problems. Learn how to change language, size, color, and troubleshoot display issues." />
      <link rel="canonical" href="https://ytvidhub.com/faq/subtitle-settings-guide/" />

      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Viewer Assistance Guide</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            The Ultimate Subtitle Settings Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Fix any CC problem fast. This definitive guide shows you exactly how to adjust, fix, and optimize your closed captions on any device.
          </p>
        </header>

        {/* 1. Basic Control */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            1. Mastering Basic Subtitle Control
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Before we fix broken captions, let&apos;s cover the essentials. These are the controls 90% of users miss.
          </p>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Quick Fixes</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Always check the CC icon first. If missing, the uploader hasn&apos;t provided captions. This is the #1 reason <strong>why youtube subtitles are not working</strong>.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">TV &amp; Mobile</h3>
              <p className="text-sm text-slate-500 leading-relaxed">On TV, look for the CC button in playback settings. On mobile, tap the screen to reveal the &quot;CC&quot; toggle in the top-right corner.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Icon Greyed Out?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Ensure &quot;Always show captions&quot; is active in <strong>YouTube Settings &gt; Playback and performance</strong> to re-enable the icon globally.</p>
            </div>
          </div>
        </article>

        {/* 2. Customization */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            2. Advanced Customization
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Standard white text on a black background is often hard to read. You can optimize the size, color, and font of your subtitles for a better personal experience.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-4">
            <img
              src="/image/youtube-player-subtitle-options-custom-style.webp"
              alt="Screenshot of the YouTube accessibility menu showing controls for changing subtitle size and background color."
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-xs text-slate-400 font-medium">
            Pro Tip: Click Gear Icon &gt; Subtitles/CC &gt; Options
          </p>
        </article>

        {/* 3. Changing Languages */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            3. Changing Languages
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The most common question is <strong>&quot;how to change language of subtitles on youtube.&quot;</strong> While simple for official tracks, auto-translated tracks often fail with technical jargon or slang.
          </p>
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 mb-8">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-4">Common Auto-Translation Errors</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Idiomatic Failures</h4>
                <p className="text-sm text-slate-500 italic">Direct translations lose the true cultural meaning.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Technical Inaccuracy</h4>
                <p className="text-sm text-slate-500 italic">&quot;Strings&quot; in code become &quot;ropes&quot; in translation.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Lack of Context</h4>
                <p className="text-sm text-slate-500 italic">Sarcasm or positive slang reversed to negative.</p>
              </div>
            </div>
          </div>
        </article>

        {/* 4. Expert Insight */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            4. Expert Insight
          </h2>
          <div className="p-6 rounded-xl border border-amber-200 bg-amber-50">
            <p className="text-xs text-amber-700 font-medium uppercase tracking-wider mb-3">Critical View: Settings Fix the Display, Not the Data</p>
            <p className="text-slate-900 font-medium leading-relaxed">
              &quot;Changing font size won&apos;t correct a misspelled word. Making the background opaque won&apos;t fix awkward line breaks. Settings are a visual overlay. For accurate research, you must start with a clean source transcript.&quot;
            </p>
          </div>
        </article>

        {/* 5. Conclusion & CTA */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            5. Conclusion
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            You now have the power to fix any subtitle viewing issue. But if your goal is to <em>use</em> the text for study or data, your journey has just begun.
          </p>
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16 text-center">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Need High-Quality Text?</h3>
            <p className="text-slate-400 mb-8">Watching is good, analyzing is better. Extract clean, timestamp-free text for your next project.</p>
            <Link href="/" onClick={handleAction} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Get Clean Text Now
            </Link>
          </div>
        </article>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">Quick FAQ</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">How do I sync subtitles if they are lagging?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">On standard YouTube settings, you can&apos;t manually shift timing. This requires downloading the SRT file and using a subtitle editor for precise time-code realignment.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">Can I use these settings on the YouTube TV app?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Yes, though the menu is simplified. While playing a video, press Up on your remote to find the CC and Gear icons.</p>
            </div>
          </div>
        </article>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
