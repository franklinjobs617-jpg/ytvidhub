"use client";

import { Link2, Sparkles, Download } from "lucide-react";
import { useTranslations } from "next-intl";

const STEP_ICONS = [Link2, Sparkles, Download];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.13),rgba(37,99,235,0)_72%)]" />
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {t("description")}
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent md:block" />
          {[1, 2, 3].map((step, index) => {
            const Icon = STEP_ICONS[index];

            return (
              <div
                key={step}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_16px_30px_-28px_rgba(15,23,42,0.52)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_40px_-30px_rgba(37,99,235,0.5)]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                  {t(`steps.${step}.badge`)}
                </div>
                <div className="mx-auto mb-6 mt-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-8 w-8" strokeWidth={1.9} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t(`steps.${step}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t(`steps.${step}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
