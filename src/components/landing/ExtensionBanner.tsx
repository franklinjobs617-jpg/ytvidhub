"use client";

import { Chrome, Zap, Download, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function ExtensionBanner() {
  const t = useTranslations("extensionBanner");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t("badge")}
              </span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-3 text-slate-600 text-base md:text-lg">{t("subtitle")}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <Zap size={16} className="text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.fast.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.fast.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <Download size={16} className="text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.oneClick.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.oneClick.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t("features.free.title")}</p>
                    <p className="mt-1 text-sm text-slate-600">{t("features.free.description")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center">
                  <Chrome size={20} className="text-slate-700" />
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
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <Chrome size={18} />
                <span>{t("cta.button")}</span>
              </a>

              <p className="mt-3 text-xs text-slate-500">{t("cta.note")}</p>

              <div className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">{t("tip.label")}</span> {t("tip.text")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
