"use client";

import { useTranslations } from "next-intl";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export default function FAQ() {
  const t = useTranslations("faq");
  const keys = ["legal", "transcript", "formats", "bulk", "languages", "limits"] as const;

  return (
    <UnifiedFaqSection
      id="faq"
      title={t("title")}
      items={keys.map((key) => ({
        q: t(`questions.${key}.question`),
        a: t.rich(`questions.${key}.answer`, {
          code: (chunks) => (
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-700">
              {chunks}
            </code>
          ),
          strong: (chunks) => <strong className="font-semibold text-slate-900">{chunks}</strong>,
          ul: (chunks) => <ul className="mt-2 list-inside list-decimal space-y-2">{chunks}</ul>,
          li: (chunks) => <li>{chunks}</li>,
          br: () => <br />,
        }),
      }))}
    />
  );
}
