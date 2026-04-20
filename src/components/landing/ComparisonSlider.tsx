"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from 'next-intl';

export default function ComparisonSlider() {
  const t = useTranslations('comparisonSlider');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_70%)]" />
      <div className="container relative z-10 mx-auto my-6 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            {t('before')} / {t('after')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.rich('title', {
              br: () => <br className="hidden md:inline" />,
              highlight: (chunks) => <span className="text-[var(--brand-600)]">{chunks}</span>
            })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 md:px-0">
          <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_32px_70px_-48px_rgba(15,23,42,0.78)] md:aspect-[16/9] md:rounded-3xl">
            <div
              ref={containerRef}
              className="group relative h-full w-full cursor-ew-resize"
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <div className="absolute inset-0 w-full h-full bg-white">
                <img
                  src="/image/ytvidhub-manual-download-process-before.webp"
                  alt={t('before')}
                  className="w-full h-full object-cover object-center md:object-contain"
                  draggable={false}
                />

                <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-white/10 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm md:bottom-6 md:left-6 md:px-4 md:py-2 md:text-sm">
                  {t('before')}
                </div>
              </div>

              <div
                className="absolute inset-0 w-full h-full bg-white"
                style={{
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                }}
              >
                <img
                  src="/image/ytvidhub-one-click-bulk-subtitle-download-after.webp"
                  alt={t('after')}
                  className="w-full h-full object-cover object-center md:object-contain"
                  draggable={false}
                />

                <div className="absolute bottom-4 right-4 z-10 rounded-lg border border-white/20 bg-blue-600/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm md:bottom-6 md:right-6 md:px-4 md:py-2 md:text-sm">
                  {t('after')}
                </div>
              </div>

              <div
                className="absolute bottom-0 top-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg transition-transform group-hover:scale-110 md:h-12 md:w-12">
                  <svg
                    className="h-5 w-5 text-blue-600 md:h-6 md:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M8 7h8M8 12h8M8 17h8"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
