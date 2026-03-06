"use client";

import { useTranslations } from 'next-intl';
import {
  CheckCircle,
  XCircle,
  Crown,
  Zap,
} from "lucide-react";

export default function TranscriptComparison() {
  const t = useTranslations('transcriptPage');

  const features = [
    {
      feature: t('comparison.features.speed'),
      ytvidhub: t('comparison.ytvidhub.speed'),
      others: t('comparison.others.speed'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.accuracy'),
      ytvidhub: t('comparison.ytvidhub.accuracy'),
      others: t('comparison.others.accuracy'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.formats'),
      ytvidhub: t('comparison.ytvidhub.formats'),
      others: t('comparison.others.formats'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.languages'),
      ytvidhub: t('comparison.ytvidhub.languages'),
      others: t('comparison.others.languages'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.registration'),
      ytvidhub: t('comparison.ytvidhub.registration'),
      others: t('comparison.others.registration'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.ads'),
      ytvidhub: t('comparison.ytvidhub.ads'),
      others: t('comparison.others.ads'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.privacy'),
      ytvidhub: t('comparison.ytvidhub.privacy'),
      others: t('comparison.others.privacy'),
      ytvidhubGood: true,
    },
    {
      feature: t('comparison.features.ai'),
      ytvidhub: t('comparison.ytvidhub.ai'),
      others: t('comparison.others.ai'),
      ytvidhubGood: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            {t('comparison.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('comparison.subtitle')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900">{t('comparison.headers.feature')}</h3>
              </div>
              <div className="p-6 border-l border-slate-200 bg-blue-50">
                <div className="flex items-center gap-2">
                  <Crown size={20} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-900">YTVidHub</h3>
                </div>
              </div>
              <div className="p-6 border-l border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">{t('comparison.headers.others')}</h3>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-200">
              {features.map((item, index) => (
                <div key={index} className="grid grid-cols-3 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Feature */}
                  <div className="p-6">
                    <div className="font-semibold text-slate-900">{item.feature}</div>
                  </div>
                  
                  {/* YTVidHub */}
                  <div className="p-6 border-l border-slate-200 bg-blue-50/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                      <span className="text-slate-800 font-medium">{item.ytvidhub}</span>
                    </div>
                  </div>
                  
                  {/* Others */}
                  <div className="p-6 border-l border-slate-200">
                    <div className="flex items-center gap-3">
                      <XCircle size={18} className="text-red-400 flex-shrink-0" />
                      <span className="text-slate-600">{item.others}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                 onClick={() => {
                   document.querySelector('textarea')?.focus();
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}>
              <Zap size={18} />
              {t('comparison.cta')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}