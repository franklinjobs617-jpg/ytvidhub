"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(t.raw('reviews') as any[]).map((review, index) => {
            const image = index === 0 ? "https://i.pravatar.cc/150?u=a042581f4e29026704d" : index === 1 ? "https://i.pravatar.cc/150?u=a04258114e29026702d" : "https://i.pravatar.cc/150?u=a042581f4e29026707d";
            return (
              <div
                key={index}
                className="flex flex-col h-full bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg hover:bg-white hover:border-slate-200"
              >
                <div className="mb-4 text-blue-200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                  </svg>
                </div>

                <blockquote className="flex-grow text-slate-600 italic leading-relaxed text-base">
                  "{review.content}"
                </blockquote>

                <footer className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                    src={image}
                    alt={review.name}
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
