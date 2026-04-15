"use client";

import { useTranslations } from "next-intl";
import { Link, Play, FileText, Download, ArrowRight } from "lucide-react";

export default function TranscriptHowItWorks() {
  const t = useTranslations("transcriptPage");

  const steps = [
    {
      icon: Link,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      color: "blue",
    },
    {
      icon: Play,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      color: "green",
    },
    {
      icon: FileText,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      color: "purple",
    },
    {
      icon: Download,
      title: t("howItWorks.step4.title"),
      description: t("howItWorks.step4.description"),
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-blue-50 text-blue-500 border-blue-200",
      purple: "bg-blue-100 text-blue-600 border-blue-200",
      orange: "bg-blue-100 text-blue-700 border-blue-300",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStepColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      green: "text-blue-500 bg-blue-50 border-blue-200",
      purple: "text-blue-600 bg-blue-50 border-blue-200",
      orange: "text-blue-700 bg-blue-100 border-blue-300",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative z-10">
                    {/* Step Number */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold mb-4 ${getStepColor(step.color)}`}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${getColorClasses(step.color)}`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (Mobile) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight size={20} className="text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto text-center mt-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {t("howItWorks.cta.title")}
            </h3>
            <p className="text-slate-600 mb-6">
              {t("howItWorks.cta.description")}
            </p>
            <button
              onClick={() => {
                document.querySelector("textarea")?.focus();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
            >
              <Play size={18} />
              {t("howItWorks.cta.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
