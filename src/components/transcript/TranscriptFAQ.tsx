"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";

export default function TranscriptFAQ() {
  const t = useTranslations('transcriptFaq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqKeys = ['what', 'how', 'formats', 'free', 'accuracy', 'languages', 'extract', 'convert', 'best', 'automatic'] as const;
  
  const faqs = faqKeys.map(key => ({
    question: t(`questions.${key}.question`),
    answer: t(`questions.${key}.answer`),
  }));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            <HelpCircle size={14} />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp size={20} className="text-slate-500" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-500" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="pt-4 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-2xl mx-auto text-center mt-16">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {t('contact.title')}
            </h3>
            <p className="text-slate-600 mb-6">
              {t('contact.description')}
            </p>
            <a
              href="mailto:support@ytvidhub.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
            >
              {t('contact.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}