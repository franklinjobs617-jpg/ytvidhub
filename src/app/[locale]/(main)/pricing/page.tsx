"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { trackEvent, trackConversion } from "@/lib/analytics";
import LoginModal from "@/components/LoginModel";
import PaymentChoiceModal from "@/components/pricing/PaymentChoiceModal";
import FAQ from "@/components/landing/FAQ";
import CustomCreditSlider from "@/components/pricing/CustomCreditSlider";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Free Forever",
    desc: "Experience our core AI extraction features.",
    features: [
      { text: "5 Daily Credits", highlight: true, disabled: false },
      { text: "5 Downloads OR 2 AI Summaries", disabled: false, sub: "Usage per day" },
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

    const plan = plans.find(p => p.id === planId);
    trackConversion('plan_click', {
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

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[35rem] h-[35rem] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[100px] animate-pulse"></div>

      <section className="relative pt-10 pb-6 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4 animate-fade-in">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
          </span>
          Trusted by 10,000+ Researchers
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tight text-slate-900 mb-6 drop-shadow-sm leading-[0.85]">
          The Perfect Plan <br /> For Your <span className="text-blue-600">Ambition</span>
        </h1>
        <p className="text-base text-slate-500 max-w-xl mx-auto font-medium leading-normal mb-8">
          Stop wasting hours on manual downloads. Choose a professional plan and <br />
          <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2 underline-offset-4">1 Download = 1 Credit | 1 AI Summary = 2 Credits</span>
        </p>

        {hasBulkShortfallContext && (
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-left">
            <p className="text-sm font-bold text-amber-900">Finish your batch with one top-up</p>
            <p className="mt-1 text-sm text-amber-800 leading-relaxed">
              You selected <span className="font-semibold">{selectedCount} videos</span>, currently have{" "}
              <span className="font-semibold">{currentCredits} credits</span>, and are only{" "}
              <span className="font-semibold">{missingCredits} credits away</span> from completing everything.
              After payment, we can take you back to resume the remaining downloads.
            </p>
          </div>
        )}

        {/* Trust Bar - More Compact */}
        <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.955 11.955 0 01-14.717 9.917m14.717-9.917a11.955 11.955 0 01-4.88 15.688M12 20.944a11.955 11.955 0 01-8.618-3.04m17.236 0a11.955 11.955 0 01-4.88-15.688" /></svg>
            Secure Payment
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Instant Delivery
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            Global VAT Invoice
          </div>
        </div>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        {/* === Custom Credit Slider (Ultra-Visible) === */}
        <div className="mb-12 max-w-6xl mx-auto -mt-4">
          <CustomCreditSlider onRequestLogin={() => setShowLoginModal(true)} />
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col p-8 rounded-3xl border transition-all duration-500 group
                ${hasBulkShortfallContext && plan.id === "a"
                  ? "bg-white border-amber-300 ring-[10px] ring-amber-500/10 shadow-[0_30px_60px_-20px_rgba(245,158,11,0.4)]"
                  : plan.highlight
                  ? "bg-white border-blue-200 ring-[12px] ring-blue-500/5 shadow-[0_40px_80px_-15px_rgba(59,130,246,0.15)] scale-105 z-10"
                  : "bg-white/70 backdrop-blur-md border-slate-200/60 hover:border-blue-300 hover:shadow-2xl hover:bg-white"
                }
              `}
            >
              {plan.highlight && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  Most Popular choice
                </span>
              )}
              {plan.tag && (
                <span className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter border border-emerald-100">
                  {plan.tag}
                </span>
              )}
              {hasBulkShortfallContext && plan.id === "a" && (
                <span className="absolute top-6 right-6 bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter border border-amber-200">
                  Recommended now
                </span>
              )}

              <div className="mb-8">
                <h3
                  className={`text-sm font-black uppercase tracking-[0.15em] mb-4 ${plan.name === "Researcher"
                    ? "text-purple-600"
                    : plan.highlight
                      ? "text-blue-600"
                      : "text-slate-400"
                    }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-display font-black italic text-slate-900 tracking-tighter">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg text-slate-300 line-through font-bold">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                  {plan.period}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed min-h-[48px] font-medium">
                  {plan.desc}
                </p>
              </div>

              <div className="h-px w-full bg-slate-100 mb-8" />

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start text-[13px] font-medium ${feature.disabled ? "text-slate-300 line-through opacity-50" : "text-slate-600"
                      }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${feature.disabled ? "text-slate-200" : "text-blue-500"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-snug">
                      {feature.highlight ? (
                        <strong className="text-slate-900 font-bold">{feature.text}</strong>
                      ) : (
                        feature.text
                      )}
                      {feature.sub && (
                        <span className="block text-[11px] text-slate-400 mt-1 font-normal italic">
                          {feature.sub}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={!plan.id}
                className={`
                  w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300
                  ${!plan.id
                    ? "bg-slate-50 text-slate-300 cursor-default border border-slate-100"
                    : plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-95"
                      : "bg-slate-900 text-white hover:bg-black shadow-xl hover:-translate-y-1 active:scale-95"
                  }
                `}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* === Credits Explanation === */}
        <div className="mt-20 max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display uppercase italic tracking-wide">
            How Credits Work
          </h2>
          <p className="text-slate-600 mb-6">
            We use a simple credit system so you only pay for what you use. It
            is transparent and fair.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-lg mb-1">1 Credit</p>
              <p className="text-slate-600 text-sm">
                Download subtitles for 1 YouTube URL.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-lg mb-1">2 Credits</p>
              <p className="text-slate-600 text-sm">
                AI Video Summary & Transcription for 1 URL.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-lg mb-1">1 Credit</p>
              <p className="text-slate-600 text-sm">
                Generate 1 full set of AI Study Cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <FAQ />

      {/* === Modals === */}
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
