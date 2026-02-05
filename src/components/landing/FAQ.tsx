"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');

  const keys = ['legal', 'formats', 'bulk', 'languages', 'limits'] as const;

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
          {t('title')}
        </h2>

        <div className="space-y-4">
          {keys.map((key) => (
            <details
              key={key}
              className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md open:bg-slate-50/50"
            >
              <summary className="flex justify-between items-center font-semibold text-lg text-slate-800 focus:outline-none list-none select-none">
                <span>{t(`questions.${key}.question`)}</span>
                {/* 箭头图标：利用 group-open 实现旋转 */}
                <svg
                  className="w-5 h-5 text-slate-400 transition-transform duration-300 transform group-open:rotate-180 group-open:text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base">
                {t.rich(`questions.${key}.answer`, {
                  code: (chunks) => <code>{chunks}</code>,
                  strong: (chunks) => <strong>{chunks}</strong>,
                  ul: (chunks) => <ul className="list-decimal list-inside space-y-2 mt-2">{chunks}</ul>,
                  li: (chunks) => <li>{chunks}</li>,
                  br: () => <br />
                })}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
