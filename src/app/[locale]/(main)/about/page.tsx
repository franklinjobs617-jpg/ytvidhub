"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function AboutPage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Our Story</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Built for the Creative Community
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We build tools that respect your time, simplify your data workflow, and empower your research.
          </p>
        </header>

        {/* Mission */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Our Mission
          </h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8">
            <p>
              YTVidHub was born from a simple frustration: downloading subtitles from multiple YouTube videos was a slow, repetitive, and inefficient process.
            </p>
            <p className="italic font-medium text-slate-900">
              &quot;As researchers and creators, we spent countless hours copying files one by one. We knew there had to be a better way.&quot;
            </p>
            <p>
              Our goal is to provide the most efficient and user-friendly YouTube subtitle downloader on the web.
            </p>
          </div>
        </article>

        {/* Principles */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <div className="space-y-5 mb-8">
            {[
              { title: "Efficiency First", desc: "Our bulk download feature is the heart of YTVidHub. We respect your time by accelerating your data gathering." },
              { title: "Free & Global", desc: "A generous free tier for everyone, supported by premium options that ensure our long-term server growth." },
              { title: "Privacy Secure", desc: "We believe in your right to privacy. Our service is anonymous; we never track your URLs or store your data." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src="/image/Illustration of multiple YouTube video thumbnails flowing into a download folder, representing fast bulk subtitle downloading.webp"
              alt="Fast bulk subtitle downloading visualization"
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Contact */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <div className="rounded-2xl bg-slate-900 p-12 md:p-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-slate-400 mb-8">
              Have a question, feedback, or a feature request? Our team is ready to listen.
            </p>
            <a
              href="mailto:admin@ytvidhub.com"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              admin@ytvidhub.com
            </a>
            <p className="mt-6 text-sm text-slate-500">
              Average response time: 48 hours
            </p>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
