"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModel";

export default function SpanishYTChannelsBlogPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const channels = [
    { title: "Easy Spanish", desc: "Street interviews with clear, authentic pronunciation and high-quality subtitles.", icon: "🇪🇸" },
    { title: "SpanishPod101", desc: "Structured lessons for all levels, often featuring dual-language subtitles.", icon: "🎧" },
    { title: "Luisito Comunica", desc: "High-energy travel vlogs. Perfect for advanced learners practicing fast, natural speech.", icon: "✈️" },
    { title: "La Cocina de Elena", desc: "Learn everyday vocabulary and cooking terms with authentic Spanish recipes.", icon: "🍳" },
    { title: "Draw My Life en Español", desc: "Simple, engaging narratives with visuals that aid comprehension.", icon: "✏️" },
    { title: "Curiosamente", desc: "Animated educational videos, great for expanding specific vocabulary sets.", icon: "💡" },
    { title: "Noticias Telemundo", desc: "Formal, broadcast-quality Spanish news reports for advanced learners.", icon: "📰" },
    { title: "EnchufeTV", desc: "Comedy sketches for picking up modern slang and fast-paced dialogue.", icon: "🎭" },
    { title: "BookBox Spanish", desc: "Animated children's stories with perfectly synced subtitles, ideal for beginners.", icon: "📚" },
    { title: "TED en Español", desc: "Inspiring talks providing exposure to academic and professional language.", icon: "🎤" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Language Learning Guide</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Top Spanish Immersion Channels on YouTube
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We've curated the best YouTube channels with reliable subtitles, perfect for extracting text and supercharging your Spanish.
          </p>
        </header>

        {/* Channel List */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Our Curated Top 10 Channels
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Each channel consistently provides high-quality Spanish subtitles, making them ideal for vocabulary extraction.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {channels.map((channel, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{channel.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{channel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Workflow */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            The Subtitle-to-Anki Workflow
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Watching is passive. True learning happens when you actively engage. Here&apos;s how to turn any video into a powerful study tool.
          </p>
          <ol className="space-y-6 mb-8">
            {[
              { title: "Download Subtitles", desc: "Paste the URL into YTVidHub and select 'Clean TXT' format to get a pure text file without timestamps." },
              { title: "Identify Vocabulary", desc: "Read through the transcript and copy interesting sentences or idiomatic expressions you want to master." },
              { title: "Create Anki Cards", desc: "Paste the Spanish sentence on the front and its translation on the back. Review daily for rapid growth." },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/language-learning-anki-youtube-workflow.webp"
              alt="Language learning workflow using YouTube subtitles"
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Your Vocabulary Library?
            </h2>
            <p className="text-slate-400 mb-8">
              Extract subtitles from an entire channel&apos;s playlist for vocabulary mining with our bulk downloader.
            </p>
            <Link
              href="/tools/playlist-subtitles-bulk"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Read The Bulk Download Guide
            </Link>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
