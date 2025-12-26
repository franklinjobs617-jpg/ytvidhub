"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import PaymentChoiceModal from "@/components/pricing/PaymentChoiceModal";
import FAQ from "@/components/landing/FAQ";
import { features } from "process";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Free Forever",
    desc: "For casual users to experience our core bulk download feature.",
    features: [
      { text: "5 Credits per day", highlight: true, disabled: false },
      { text: "Bulk Download up to 5 URLs", disabled: false, sub: undefined },
      { text: "Basic SRT/TXT Output", disabled: false, sub: undefined },
      { text: "API Access Not Included", disabled: true, sub: undefined },
    ],
    buttonText: "Your Current Plan",
    buttonStyle: "disabled",
    id: null,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/ month",
    desc: "For the dedicated content creator & researcher who needs reliable, daily access.",
    features: [
      {
        text: "500 Credits/month",
        highlight: true,
        sub: "(Process 500 URLs)",
        disabled: false,
      },
      { text: "Download up to 50 URLs at once", disabled: false },
      { text: "Priority Queue - your jobs run first", disabled: false },
      { text: "Access to all output formats (JSON)", disabled: false },
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
    desc: "For power users, agencies, and data teams who require speed and volume.",
    features: [
      {
        text: "1,000 Credits/month",
        highlight: true,
        sub: "(Process 1,000 URLs)",
        disabled: false,
      },
      { text: "Download up to 100 URLs at once", disabled: false },
      { text: "Highest Priority & Email Support", disabled: false },
      { text: "Early access to new features", disabled: false },
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
    desc: "The ultimate toolkit. Unlock massive scale, automation, and get 2 months free.",
    features: [
      {
        text: "3,000 Credits/month",
        highlight: true,
        sub: "(36,000/year)",
        disabled: false,
      },
      { text: "Full API Access to automate everything", disabled: false },
      { text: "All Premium Features Included", disabled: false },
      { text: "Discounted top-up credits", disabled: false },
      { text: "Discounted top-up credits", sub: undefined },
    ],
    buttonText: "Commit & Save Annually",
    buttonStyle: "secondary",
    id: "c",
  },
];

export default function PricingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePurchase = (planId: string | null) => {
    if (!planId) return; // Free plan

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

      <section className="relative pt-12 pb-16 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase tracking-wide text-slate-900 mb-6 drop-shadow-sm">
          The Perfect Plan For Your Ambition
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Stop wasting time on manual downloads. Choose a plan and supercharge
          your data-gathering workflow today.
        </p>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col p-6 rounded-2xl border transition-all duration-300
                ${
                  plan.highlight
                    ? "bg-white border-blue-200 ring-4 ring-blue-500/10 shadow-2xl scale-105 z-10"
                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-200 hover:shadow-xl"
                }
              `}
            >
              {plan.highlight && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Most Popular
                </span>
              )}
              {plan.tag && (
                <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {plan.tag}
                </span>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold uppercase tracking-wide mb-2 ${
                    plan.name === "Researcher"
                      ? "text-purple-600"
                      : plan.highlight
                      ? "text-blue-600"
                      : "text-slate-700"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black italic text-slate-900">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium mb-4">
                  {plan.period}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed min-h-[40px]">
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start text-sm ${
                      feature.disabled ? "text-slate-400" : "text-slate-700"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        feature.disabled ? "text-slate-300" : "text-green-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      {feature.highlight ? (
                        <strong>{feature.text}</strong>
                      ) : (
                        feature.text
                      )}
                      {feature.sub && (
                        <span className="block text-xs text-slate-500 mt-0.5">
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
                  w-full py-3.5 rounded-xl font-bold uppercase tracking-wide text-xs transition-all duration-200
                  ${
                    !plan.id
                      ? "bg-slate-100 text-slate-400 cursor-default"
                      : plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-lg mb-1">1 Credit</p>
              <p className="text-slate-600 text-sm">
                Download subtitles for 1 YouTube URL.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-lg mb-1">
                5-10 Credits{" "}
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full ml-2">
                  Coming Soon
                </span>
              </p>
              <p className="text-slate-600 text-sm">
                AI-powered transcription & summary for 1 YouTube URL.
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
