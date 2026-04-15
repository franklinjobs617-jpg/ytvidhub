"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
export default function TermsOfServicePage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700 article-body">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 article-shell article-hero">
          <p className="text-sm text-blue-600 font-medium mb-4">
            Legal Documentation
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 article-h1">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-4">
            Please read these terms carefully before using our service.
          </p>
          <p className="text-sm text-slate-400">
            Last Updated: April 15, 2026
          </p>
        </header>
        {/* 1. Acceptance */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing and using YTVidHub (the &quot;Service&quot;), you
            accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to abide by these terms, please do
            not use this Service.
          </p>
        </article>
        {/* 2. Service Description */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            2. Description of Service
          </h2>
          <p className="text-slate-600 leading-relaxed">
            YTVidHub provides a tool that allows users to download publicly
            available subtitles from videos hosted on YouTube. The Service is
            provided for personal, non-commercial use. We are an independent
            service and are not affiliated with, sponsored, or endorsed by
            YouTube or Google LLC.
          </p>
        </article>
        {/* 3. User Responsibilities */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            3. User Responsibilities
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            You, the user, agree to the following:
          </p>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">
                Content Rights
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                You are solely responsible for ensuring you have the legal right
                to access the content. The subtitles are the intellectual
                property of the respective YouTube content creators.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">
                No Copyright License Granted
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                YTVidHub does not grant, transfer, or imply any copyright
                license in third-party video or subtitle content. Use of
                extracted material remains your legal responsibility.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">
                Permitted Use
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                The Service is intended for personal, educational, or research
                purposes under fair use. You agree not to use the downloaded
                subtitles for any commercial purposes without permission.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">
                Prohibited Actions
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                You agree not to misuse the Service. This includes attempting to
                disrupt our servers, excessive scraping, or using the Service
                for illegal activities.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">
                No Unauthorized Redistribution
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                You may not republish, resell, or mass-distribute extracted
                subtitle content without authorization from the rights holder or
                another valid legal basis.
              </p>
            </div>
          </div>
        </article>
        {/* 4. Disclaimer */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            4. Disclaimer of Warranties
          </h2>
          <p className="text-slate-600 leading-relaxed">
            The Service is provided on an &quot;as-is&quot; and
            &quot;as-available&quot; basis. YTVidHub makes no warranty that the
            Service will be uninterrupted, timely, secure, or error-free. We do
            not guarantee the accuracy, completeness, or availability of any
            subtitles.
          </p>
        </article>
        {/* 5. Liability */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            5. Limitation of Liability
          </h2>
          <p className="text-slate-600 leading-relaxed">
            In no event shall YTVidHub or its owners be liable for any direct,
            indirect, incidental, special, or consequential damages resulting
            from the use or the inability to use the Service. This includes
            liability for any copyright infringement claims that may arise from
            your use of the downloaded content.
          </p>
        </article>
        {/* 6. Intellectual Property */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            6. Intellectual Property
          </h2>
          <p className="text-slate-600 leading-relaxed">
            All content on this website, including the YTVidHub name, logo,
            design, and underlying code, is the property of YTVidHub. The
            YouTube name and logo are trademarks of Google LLC.
          </p>
        </article>
        {/* 7. Termination */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            7. Termination of Service
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We reserve the right to modify, suspend, or terminate the Service at
            any time, for any reason, without notice. We will not be liable to
            you or any third party for any modification.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            We may also suspend, restrict, or permanently terminate access for
            accounts involved in repeated or serious copyright violations,
            unauthorized redistribution, or misuse of the Service.
          </p>
        </article>
        {/* 8. Changes */}
        <article className="max-w-3xl mx-auto px-6 mb-12 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            8. Changes to Terms
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We may revise these Terms of Service from time to time. The most
            current version will always be posted on this page. By continuing to
            use the Service, you agree to be bound by the revised terms.
          </p>
        </article>
        {/* 9. Governing Law */}
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            9. Governing Law
          </h2>
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
            <p className="text-slate-900 font-medium leading-relaxed">
              This agreement shall be governed by and construed in accordance
              with the laws of the State of Delaware, United States, without
              regard to its conflict of law provisions.
            </p>
          </div>
        </article>
        <article className="max-w-3xl mx-auto px-6 mb-16 article-shell article-section">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 article-h2">
            10. Platform Relationship and Compliance
          </h2>
          <p className="text-slate-600 leading-relaxed">
            YTVidHub is an independent service and is not affiliated with,
            endorsed by, or sponsored by YouTube or Google LLC. Users must
            comply with applicable laws, rights-holder permissions, and relevant
            platform terms when using extracted subtitle content.
          </p>
        </article>
      </main>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
