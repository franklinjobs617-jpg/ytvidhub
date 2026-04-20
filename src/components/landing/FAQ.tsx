"use client";

import { useTranslations } from "next-intl";
import LandingSectionHeader from "@/components/landing/LandingSectionHeader";

export default function FAQ() {
  const t = useTranslations("faq");
  const keys = ["legal", "transcript", "formats", "bulk", "languages", "limits"] as const;

  return (
    <section className="bg-[var(--surface-page)] py-24" id="faq">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        <LandingSectionHeader className="mb-12" title={t("title")} />

        <div className="space-y-4">
          {keys.map((key) => (
            <details
              key={key}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 open:border-blue-200 open:shadow-[0_20px_34px_-28px_rgba(37,99,235,0.42)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-800 md:px-6 md:py-5 md:text-lg">
                <span>{t(`questions.${key}.question`)}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 md:px-6 md:py-5 md:text-base">
                {t.rich(`questions.${key}.answer`, {
                  code: (chunks) => (
                    <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-700">
                      {chunks}
                    </code>
                  ),
                  strong: (chunks) => <strong className="font-semibold text-slate-900">{chunks}</strong>,
                  ul: (chunks) => <ul className="mt-2 list-inside list-decimal space-y-2">{chunks}</ul>,
                  li: (chunks) => <li>{chunks}</li>,
                  br: () => <br />,
                })}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
