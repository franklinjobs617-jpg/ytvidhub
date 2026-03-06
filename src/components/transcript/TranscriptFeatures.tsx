"use client";

import { useTranslations } from 'next-intl';
import {
  FileText,
  Download,
  Globe,
  Zap,
  Shield,
  Sparkles,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

export default function TranscriptFeatures() {
  const t = useTranslations('transcriptPage');

  const features = [
    {
      icon: FileText,
      title: t('features.accurate.title'),
      description: t('features.accurate.description'),
      color: "blue",
    },
    {
      icon: Download,
      title: t('features.formats.title'),
      description: t('features.formats.description'),
      color: "green",
    },
    {
      icon: Globe,
      title: t('features.languages.title'),
      description: t('features.languages.description'),
      color: "purple",
    },
    {
      icon: Zap,
      title: t('features.fast.title'),
      description: t('features.fast.description'),
      color: "orange",
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
      color: "red",
    },
    {
      icon: Sparkles,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      color: "indigo",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
      green: "bg-green-100 text-green-600 group-hover:bg-green-200",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
      orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
      red: "bg-red-100 text-red-600 group-hover:bg-red-200",
      indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${getColorClasses(feature.color)}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              {t('benefits.title')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t('benefits.noRegistration.title')}</h4>
                  <p className="text-slate-600 text-sm">{t('benefits.noRegistration.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t('benefits.unlimited.title')}</h4>
                  <p className="text-slate-600 text-sm">{t('benefits.unlimited.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t('benefits.privacy.title')}</h4>
                  <p className="text-slate-600 text-sm">{t('benefits.privacy.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t('benefits.support.title')}</h4>
                  <p className="text-slate-600 text-sm">{t('benefits.support.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}