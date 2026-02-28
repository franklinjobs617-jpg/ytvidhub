"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function PrivacyPolicyPage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Data Protection</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-4">
            Your privacy is not just a policy, it&apos;s our core design philosophy.
          </p>
          <p className="text-sm text-slate-400">Last Updated: October 11, 2025</p>
        </header>

        {/* 1. Introduction */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-600 leading-relaxed">
            Welcome to YTVidHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are deeply committed to protecting the privacy of our users. This Privacy Policy explains our principles regarding your information. Our guiding rule is simple: we collect the absolute minimum amount of information required, and we have architected our system to be <strong>anonymous by design.</strong>
          </p>
        </article>

        {/* 2. Zero Collection */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">2. The Data We Do Not Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Our service is built to be stateless. We explicitly DO NOT collect or store:</p>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Your IP Address</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Your IP address is not logged or stored on our servers in connection with your activity.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Submitted URLs</h3>
              <p className="text-sm text-slate-500 leading-relaxed">The YouTube video URLs you paste are used in real-time and are immediately discarded. They are never written to any database.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Downloaded Files</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Subtitle files are generated on-the-fly and streamed directly to you. They never touch our physical hard drives.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">Personal Info</h3>
              <p className="text-sm text-slate-500 leading-relaxed">We do not have an account system for free users. We do not ask for or store your name or email address.</p>
            </div>
          </div>
        </article>

        {/* 3. Anonymous Analytics */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">3. Anonymous Analytics</h2>
          <p className="text-slate-600 leading-relaxed">
            We use a privacy-centric web analytics service that does not track individual users. The data we collect is anonymous, aggregated, and includes: Total Page Views, General Geographic Data (Country Level), Referrer Information, and Browser Type.
          </p>
        </article>

        {/* 4. Cookies */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">4. Our Stance on Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            YTVidHub does not use cookies for tracking, advertising, or profiling. Any essential cookies used would be strictly for basic site functionality and would not contain personal information.
          </p>
        </article>

        {/* 5. Third Parties */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">5. Third-Party Interactions</h2>
          <p className="text-slate-600 leading-relaxed">
            Our tool interacts with YouTube&apos;s public infrastructure server-side to protect your privacy. Your browser only communicates with our servers, not directly with YouTube&apos;s servers through our tool.
          </p>
        </article>

        {/* 6. Data Security */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">6. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            We employ standard security practices, including HTTPS for all communications, to ensure that your interaction with our site is secure and encrypted, protecting it from eavesdropping.
          </p>
        </article>

        {/* 7. Changes */}
        <article className="max-w-3xl mx-auto px-6 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">7. Changes to Policy</h2>
          <p className="text-slate-600 leading-relaxed">
            We may update this policy to reflect changes in our practices. The &quot;Last Updated&quot; date at the top will always indicate when the last changes were made.
          </p>
        </article>

        {/* 8. Contact */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">8. How to Contact Us</h2>
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">Official Contact</p>
            <a href="mailto:admin@ytvidhub.com" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
              admin@ytvidhub.com
            </a>
          </div>
        </article>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
