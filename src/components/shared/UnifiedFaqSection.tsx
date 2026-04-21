"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type UnifiedFaqItem = {
  q: string;
  a: ReactNode;
};

type UnifiedFaqSectionProps = {
  items: UnifiedFaqItem[];
  id?: string;
  title?: string;
  subtitle?: string;
  sectionClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function UnifiedFaqSection({
  items,
  id = "faq",
  title = "Frequently Asked Questions",
  subtitle,
  sectionClassName,
  containerClassName,
  titleClassName,
  subtitleClassName,
}: UnifiedFaqSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section
      id={id}
      className={cn("bg-[var(--surface-page)] py-24", sectionClassName)}
    >
      <div
        className={cn(
          "container mx-auto max-w-4xl px-6 lg:px-8",
          containerClassName
        )}
      >
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight text-slate-900 md:text-5xl text-center mb-12",
            titleClassName
          )}
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={cn(
              "mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-slate-600",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        ) : null}

        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={`${item.q}-${index}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 open:border-blue-200 open:shadow-[0_20px_34px_-28px_rgba(37,99,235,0.42)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-800 md:px-6 md:py-5 md:text-lg">
                <span>{item.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 md:px-6 md:py-5 md:text-base">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
