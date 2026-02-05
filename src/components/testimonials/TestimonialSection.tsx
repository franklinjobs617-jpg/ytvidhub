"use client";

import { Star, Quote } from "lucide-react";
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "AI Researcher",
    company: "Stanford University",
    content: "Perfect for creating training datasets. Downloaded 10,000+ YouTube subtitles for our language model research. The bulk processing saved us weeks of work.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Video Editor",
    company: "Creative Studios",
    content: "Game changer for video production. The SRT files work perfectly with Premiere Pro. Clean formatting and accurate timestamps every time.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Dr. Emily Watson",
    role: "Accessibility Consultant",
    company: "AccessTech Solutions",
    content: "Essential tool for making content accessible. The VTT format works seamlessly with our web players. Reliable and fast processing.",
    rating: 5,
    avatar: "EW"
  },
  {
    name: "Alex Kim",
    role: "Content Creator",
    company: "TechTalks YouTube",
    content: "Saves hours of manual transcription work. The AI summary feature is incredibly useful for creating video descriptions and blog posts.",
    rating: 5,
    avatar: "AK"
  }
];

export function TestimonialSection() {
  const t = useTranslations('testimonials');
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => {
            const review = t.raw(`reviews.${index}`);
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote size={20} className="text-slate-300 absolute -top-2 -left-1" />
                  <p className="text-slate-600 text-sm leading-relaxed pl-6">
                    {review?.content || testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{review?.name || testimonial.name}</p>
                    <p className="text-xs text-slate-500">{review?.role || testimonial.role}</p>
                    <p className="text-xs text-slate-400">{review?.company || testimonial.company}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-sm border border-slate-200">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-slate-600 font-medium">{t('rating')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}