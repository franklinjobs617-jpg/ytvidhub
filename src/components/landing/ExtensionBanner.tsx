"use client";

import { Chrome, Zap, Download, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function ExtensionBanner() {
  const t = useTranslations("extensionBanner");

  return (
    <section className="bg-[var(--surface-page)] py-20">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_30px_60px_-46px_rgba(15,23,42,0.58)]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),rgba(37,99,235,0)_65%)]" />
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.28fr_1fr] lg:p-10">
            <div>
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                {t("badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">{t("subtitle")}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <Zap size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.fast.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.fast.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <Download size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.oneClick.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.oneClick.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <ShieldCheck size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.free.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.free.description")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
                  <Chrome size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("cta.users")}</p>
                  <p className="text-sm text-slate-600">Chrome Web Store</p>
                </div>
              </div>

              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_30px_-20px_rgba(37,99,235,1)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
              >
                <Chrome size={18} />
                <span>{t("cta.button")}</span>
              </a>

              <p className="mt-3 text-xs text-slate-500">{t("cta.note")}</p>

              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">{t("tip.label")}</span> {t("tip.text")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
