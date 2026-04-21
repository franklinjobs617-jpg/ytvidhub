"use client";

import { useTranslations } from "next-intl";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export default function TranscriptFAQ() {
  const t = useTranslations("transcriptFaq");

  const faqKeys = [
    "what",
    "how",
    "formats",
    "free",
    "accuracy",
    "languages",
    "extract",
    "convert",
    "best",
    "automatic",
  ] as const;

  const faqs = faqKeys.map((key) => ({
    q: t(`questions.${key}.question`),
    a: t(`questions.${key}.answer`),
  }));

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <UnifiedFaqSection
        title={t("title")}
        subtitle={t("subtitle")}
        items={faqs}
        sectionClassName="py-0 bg-transparent"
        containerClassName="max-w-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              {t("contact.title")}
            </h3>
            <p className="mb-6 text-slate-600">{t("contact.description")}</p>
            <a
              href="mailto:support@ytvidhub.com"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-black"
            >
              {t("contact.button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
