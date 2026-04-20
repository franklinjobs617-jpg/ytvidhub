"use client";

import { useTranslations } from "next-intl";
import LandingSectionHeader from "@/components/landing/LandingSectionHeader";

export default function CoreCapabilities() {
  const t = useTranslations("coreCapabilities");

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.12),rgba(37,99,235,0)_70%)]" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <LandingSectionHeader
          className="mb-16"
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />

        <div className="space-y-10">
          <article className="grid gap-10 rounded-3xl border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_28px_50px_-40px_rgba(15,23,42,0.52)] md:p-9 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <video autoPlay loop muted playsInline className="h-auto w-full">
                <source
                  src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57-ezgif.com-gif-to-webm-converter.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <div className="text-left">
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-blue-600">
                {t("action")}
              </span>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {t("actionTitle")}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {t("actionDescription")}
              </p>
            </div>
          </article>

          <article className="grid gap-10 rounded-3xl border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_28px_50px_-40px_rgba(15,23,42,0.52)] md:p-9 lg:grid-cols-2 lg:items-center">
            <div className="order-2 text-left lg:order-1">
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-blue-600">
                {t("adaptive")}
              </span>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {t("adaptiveTitle")}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {t("adaptiveDescription")}
              </p>
            </div>

            <div className="order-1 flex justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:order-2">
              <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
                <circle cx="60" cy="75" r="20" fill="none" stroke="#3B82F6" strokeWidth="3" />
                <path d="M 55 68 L 70 75 L 55 82 Z" fill="#3B82F6" />
                <path d="M 80 75 L 120 40" fill="none" stroke="#93C5FD" strokeWidth="2" strokeDasharray="5 3" />
                <path d="M 80 75 L 120 75" fill="none" stroke="#93C5FD" strokeWidth="2" strokeDasharray="5 3" />
                <path d="M 80 75 L 120 110" fill="none" stroke="#93C5FD" strokeWidth="2" strokeDasharray="5 3" />

                <rect x="130" y="25" width="50" height="30" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
                <text x="141" y="44" fontFamily="monospace" fontSize="10" fill="#3B82F6">
                  .SRT
                </text>

                <rect x="130" y="60" width="50" height="30" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
                <text x="141" y="79" fontFamily="monospace" fontSize="10" fill="#3B82F6">
                  .VTT
                </text>

                <rect x="130" y="95" width="50" height="30" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
                <text x="141" y="114" fontFamily="monospace" fontSize="10" fill="#3B82F6">
                  .TXT
                </text>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
