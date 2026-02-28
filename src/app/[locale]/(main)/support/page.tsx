"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function SupportPage() {
  useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const t = useTranslations('support');

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-700">
      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm text-blue-600 font-medium mb-4">Help Center</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            {t('subtitle')}
          </p>
        </header>

        {/* Contact */}
        <article className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {t('contactTitle')}
          </h2>
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 mb-4">
            <p className="text-lg text-slate-500 mb-6">{t('contactDescription')}</p>
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">{t('emailLabel')}</p>
            <a href="mailto:admin@ytvidhub.com" className="text-2xl md:text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
              admin@ytvidhub.com
            </a>
            <p className="mt-4 text-sm text-slate-400">{t('responseTime')}</p>
            <p className="mt-2 text-xs text-slate-400 italic">{t('emailNote')}</p>
          </div>
        </article>

        {/* Support Categories */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {t('howWeCanHelp')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { key: 'technical', icon: '🔧' },
              { key: 'account', icon: '💳' },
              { key: 'features', icon: '💡' },
              { key: 'guides', icon: '📚' },
              { key: 'api', icon: '⚡' },
              { key: 'general', icon: '💬' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-1">{t(`categories.${item.key}.title`)}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{t(`categories.${item.key}.description`)}</p>
                <div className="space-y-1">
                  {[1, 2, 3, 4].map((j) => (
                    <p key={j} className="text-xs text-slate-400">· {t(`categories.${item.key}.topic${j}`)}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Quick Tips */}
        <article className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {t('beforeContact')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-3">{t('quickFixes')}</h4>
              <div className="space-y-2 text-sm text-slate-500">
                {[t('quickFix1'), t('quickFix2'), t('quickFix3'), t('quickFix4')].map((fix: string, i: number) => (
                  <p key={i}>· {fix}</p>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-3">{t('includeInfo')}</h4>
              <div className="space-y-2 text-sm text-slate-500">
                {[t('includeInfo1'), t('includeInfo2'), t('includeInfo3'), t('includeInfo4')].map((info: string, i: number) => (
                  <p key={i}>· {info}</p>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* FAQ Link */}
        <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">{t('stillQuestions')}</h2>
          <p className="text-slate-500 mb-6">{t('faqDescription')}</p>
          <Link href="/faq" className="inline-block px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors">
            {t('visitFaq')}
          </Link>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
