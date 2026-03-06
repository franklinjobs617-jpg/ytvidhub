"use client";

import { useTranslations } from 'next-intl';
import {
  Star,
  Quote,
} from "lucide-react";

export default function TranscriptTestimonials() {
  const t = useTranslations('transcriptPage');

  const testimonials = [
    {
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      content: t('testimonials.testimonial1.content'),
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      content: t('testimonials.testimonial2.content'),
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
      content: t('testimonials.testimonial3.content'),
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: t('testimonials.testimonial4.name'),
      role: t('testimonials.testimonial4.role'),
      content: t('testimonials.testimonial4.content'),
      rating: 5,
      avatar: "👩‍🏫",
    },
    {
      name: t('testimonials.testimonial5.name'),
      role: t('testimonials.testimonial5.role'),
      content: t('testimonials.testimonial5.content'),
      rating: 5,
      avatar: "👨‍🎬",
    },
    {
      name: t('testimonials.testimonial6.name'),
      role: t('testimonials.testimonial6.role'),
      content: t('testimonials.testimonial6.content'),
      rating: 5,
      avatar: "👩‍💼",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Quote size={16} className="text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {t('trustIndicators.title')}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">2.4M+</div>
                <div className="text-sm text-slate-600">{t('trustIndicators.transcripts')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">150K+</div>
                <div className="text-sm text-slate-600">{t('trustIndicators.users')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">4.9/5</div>
                <div className="text-sm text-slate-600">{t('trustIndicators.rating')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600">{t('trustIndicators.support')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}