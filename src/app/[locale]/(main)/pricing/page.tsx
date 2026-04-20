"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { trackEvent, trackConversion } from "@/lib/analytics";
import LoginModal from "@/components/LoginModel";
import PaymentChoiceModal from "@/components/pricing/PaymentChoiceModal";
import FAQ from "@/components/landing/FAQ";
import CustomCreditSlider from "@/components/pricing/CustomCreditSlider";
import { CREDIT_COSTS } from "@/config/credits";
import {
  BadgeCheck,
  Check,
  Receipt,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Free Forever",
    desc: "Experience our core AI extraction features.",
    features: [
      { text: "5 Daily Credits", highlight: true, disabled: false },
      {
        text: "5 Downloads OR 2 AI Summaries",
        disabled: false,
        sub: "Usage per day",
      },
      { text: "Download up to 5 URLs", disabled: false },
      { text: "Standard SRT/VTT Output", disabled: false },
      { text: "API Access Not Included", disabled: true },
    ],
    buttonText: "Your Current Plan",
    buttonStyle: "disabled",
    id: null,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/ month",
    desc: "For researchers who need consistent insights.",
    features: [
      {
        text: "500 Monthly Credits",
        highlight: true,
        sub: "(500 Downloads OR 250 AI Summaries)",
        disabled: false,
      },
      { text: "AI Video Summaries & Transcription", disabled: false },
      { text: "AI Study Cards (1 credit / card)", disabled: false },
      { text: "Download 50 URLs at once", disabled: false },
      { text: "Priority AI Processing Queue", disabled: false },
    ],
    buttonText: "Upgrade to Pro",
    buttonStyle: "primary",
    highlight: true, // Most Popular
    id: "a", // 对应后端 productID
  },
  {
    name: "Premium",
    price: "$29.99",
    period: "/ month",
    desc: "For power users requiring high volume.",
    features: [
      {
        text: "1,000 Monthly Credits",
        highlight: true,
        sub: "(1,000 Downloads OR 500 AI Summaries)",
        disabled: false,
      },
      { text: "Advanced AI Multi-lingual Analysis", disabled: false },
      { text: "Full AI Transcription Exports", disabled: false },
      { text: "Download 100 URLs at once", disabled: false },
      { text: "Highest Priority AI Execution", disabled: false },
    ],
    buttonText: "Unleash Premium",
    buttonStyle: "secondary",
    id: "b",
  },
  {
    name: "Researcher",
    price: "$199",
    period: "/ year",
    originalPrice: "$239",
    tag: "SAVE 16%",
    desc: "The professional choice. Massive scale.",
    features: [
      {
        text: "3,000 Monthly Credits",
        highlight: true,
        sub: "(3,000 Downloads OR 1,500 AI Summaries)",
        disabled: false,
      },
      { text: "Full API Access (Summaries & Subs)", disabled: false },
      { text: "Bulk AI Processing for Playlists", disabled: false },
      { text: "All Premium AI Features Included", disabled: false },
      { text: "Deep Learning Insights & Cards", disabled: false },
    ],
    buttonText: "Commit & Save Annually",
    buttonStyle: "secondary",
    id: "c",
  },
];

export default function PricingPage() {
  const searchParams = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { user } = useAuth();

  const from = searchParams.get("from");
  const selectedCount = Number(searchParams.get("selected") || "0");
  const currentCredits = Number(searchParams.get("current") || "0");
  const missingCredits = Number(searchParams.get("missing") || "0");
  const hasBulkShortfallContext =
    from === "bulk-shortfall" &&
    Number.isFinite(selectedCount) &&
    selectedCount > 0 &&
    Number.isFinite(missingCredits) &&
    missingCredits > 0;

  // 页面曝光埋点
  useEffect(() => {
    trackEvent("pricing_page_view", {
      logged_in: !!user,
      source: from || "direct",
      selected_count: selectedCount || 0,
      missing_credits: missingCredits || 0,
    });
  }, [user, from, selectedCount, missingCredits]);

  const handlePurchase = (planId: string | null) => {
    if (!planId) return;

    const plan = plans.find((p) => p.id === planId);
    trackConversion("plan_click", {
      plan_name: plan?.name,
      plan_price: plan?.price,
      plan_id: planId,
      logged_in: !!user,
      source: from || "direct",
      selected_count: selectedCount || 0,
      missing_credits: missingCredits || 0,
    });

    if (!user) {
      setShowLoginModal(true);
    } else {
      setSelectedPlanId(planId);
      setShowPaymentModal(true);
    }
  };

  const trustItems = [
    { label: "Secure Payment", icon: ShieldCheck },
    { label: "Instant Delivery", icon: Zap },
    { label: "Global VAT Invoice", icon: Receipt },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--surface-page)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_72%)]" />

      <section className="relative mx-auto max-w-5xl px-6 pb-8 pt-12 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
          <BadgeCheck className="h-3.5 w-3.5" />
          Trusted by 10,000+ Researchers
        </div>
        <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Choose a plan that fits
          <br />
          your subtitle workflow
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600">
          Keep pricing simple and predictable. Credits map directly to actions:
          <span className="mt-2 block font-semibold text-slate-900">
            {`1 Download = ${CREDIT_COSTS.download} Credit | 1 AI Summary = ${CREDIT_COSTS.summary} Credits`}
          </span>
        </p>

        {hasBulkShortfallContext && (
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-left shadow-[0_16px_30px_-30px_rgba(245,158,11,0.5)]">
            <p className="text-sm font-semibold text-amber-900">
              Finish your batch with one top-up
            </p>
            <p className="mt-1 text-sm text-amber-800 leading-relaxed">
              You selected
              <span className="font-semibold">{selectedCount} videos</span>,
              currently have
              <span className="font-semibold">{currentCredits} credits</span>,
              and are only
              <span className="font-semibold">
                {missingCredits} credits away
              </span>
              from completing everything. After payment, we can take you back to
              resume the remaining downloads.
            </p>
          </div>
        )}

        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_10px_22px_-22px_rgba(15,23,42,0.7)]"
            >
              <item.icon className="h-4 w-4 text-blue-600" />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        <div className="mb-12 mx-auto max-w-6xl">
          <CustomCreditSlider onRequestLogin={() => setShowLoginModal(true)} />
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                group relative flex flex-col rounded-3xl border p-8 transition-all duration-300
                ${
                  hasBulkShortfallContext && plan.id === "a"
                    ? "border-amber-300 bg-white ring-[8px] ring-amber-500/10 shadow-[0_26px_50px_-36px_rgba(245,158,11,0.65)]"
                    : plan.highlight
                      ? "z-10 scale-[1.02] border-blue-200 bg-white ring-[10px] ring-blue-500/5 shadow-[0_30px_60px_-36px_rgba(59,130,246,0.55)]"
                      : "border-slate-200 bg-white shadow-[0_20px_40px_-36px_rgba(15,23,42,0.7)] hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_50px_-36px_rgba(37,99,235,0.45)]"
                }
              `}
            >
              {plan.highlight && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg">
                  Most popular
                </span>
              )}
              {plan.tag && (
                <span className="absolute right-6 top-6 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                  {plan.tag}
                </span>
              )}
              {hasBulkShortfallContext && plan.id === "a" && (
                <span className="absolute right-6 top-6 rounded-md border border-amber-200 bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-800">
                  Recommended now
                </span>
              )}

              <div className="mb-8">
                <h3
                  className={`mb-4 text-sm font-semibold uppercase tracking-[0.12em] ${
                    plan.name === "Researcher"
                      ? "text-blue-600"
                      : plan.highlight
                        ? "text-blue-600"
                        : "text-slate-500"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg font-semibold text-slate-300 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {plan.period}
                </p>
                <p className="min-h-[48px] text-sm leading-relaxed text-slate-600">
                  {plan.desc}
                </p>
              </div>

              <div className="h-px w-full bg-slate-100 mb-8" />

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start text-[13px] ${
                      feature.disabled
                        ? "text-slate-300 line-through opacity-50"
                        : "text-slate-600"
                    }`}
                  >
                    <Check
                      className={`mr-3 h-5 w-5 shrink-0 ${
                        feature.disabled ? "text-slate-200" : "text-blue-500"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className="leading-snug">
                      {feature.highlight ? (
                        <strong className="font-semibold text-slate-900">
                          {feature.text}
                        </strong>
                      ) : (
                        feature.text
                      )}
                      {feature.sub && (
                        <span className="mt-1 block text-[11px] text-slate-400">
                          {feature.sub}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={!plan.id}
                className={`
                  w-full rounded-2xl py-4 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200
                  ${
                    !plan.id
                      ? "cursor-default border border-slate-100 bg-slate-50 text-slate-300"
                      : plan.highlight
                        ? "bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] text-white shadow-[0_20px_28px_-18px_rgba(37,99,235,1)] hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
                        : "border border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                  }
                `}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.6)]">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            How Credits Work
          </h2>
          <p className="mb-6 text-slate-600">
            We use a simple credit system so you only pay for what you use. It
            is transparent and fair.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <Sparkles className="mb-3 h-5 w-5 text-blue-600" />
              <p className="mb-1 text-lg font-semibold text-slate-900">1 Credit</p>
              <p className="text-sm text-slate-600">
                Download subtitles for 1 YouTube URL.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <Zap className="mb-3 h-5 w-5 text-blue-600" />
              <p className="mb-1 text-lg font-semibold text-slate-900">{`${CREDIT_COSTS.summary} Credits`}</p>
              <p className="text-sm text-slate-600">
                AI Video Summary & Transcription for 1 URL.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <BadgeCheck className="mb-3 h-5 w-5 text-blue-600" />
              <p className="mb-1 text-lg font-semibold text-slate-900">{`${CREDIT_COSTS.studyCards} Credit`}</p>
              <p className="text-sm text-slate-600">
                Generate 1 full set of AI Study Cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <PaymentChoiceModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPlanId={selectedPlanId}
      />
    </div>
  );
}
