"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from 'next-intl';

export default function ComparisonSlider() {
  const t = useTranslations('comparisonSlider');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtns, setShowScrollBtns] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollBtns(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <section className="relative py-18 bg-white overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
            {t.rich('title', {
              br: () => <br className="hidden md:inline" />,
              highlight: (chunks) => <span className="text-blue-600">{chunks}</span>
            })}
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 md:px-0">
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 select-none aspect-[4/3] md:aspect-[16/9]">
            <div
              ref={containerRef}
              className="relative w-full h-full cursor-ew-resize group"
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

                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-slate-900/90 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm font-bold shadow-lg border border-white/10 z-10">
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

                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm font-bold shadow-lg border border-white/20 z-10">
                  {t('after')}
                </div>
              </div>

              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-500 transition-transform group-hover:scale-110">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
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
