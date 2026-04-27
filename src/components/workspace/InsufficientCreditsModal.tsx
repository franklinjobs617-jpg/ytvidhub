"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Flame,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { saveStripePurchaseContext } from "@/lib/stripePurchaseContext";
import { trackConversion } from "@/lib/analytics";

type PlanId = "a" | "b" | "c";

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredAmount?: number;
  featureName?: string;
  currentAmount?: number;
}

const STRIPE_SUBSCRIPTION_TYPE_MAP: Record<PlanId, string> = {
  a: "ytvid_a_monthly",
  b: "ytvid_b_monthly",
  c: "ytvid_c_yearly",
};

const STRIPE_SUBSCRIPTION_PRICE_ID_MAP: Record<PlanId, string | undefined> = {
  a: process.env.NEXT_PUBLIC_STRIPE_YTVID_A_MONTHLY_PRICE_ID,
  b: process.env.NEXT_PUBLIC_STRIPE_YTVID_B_MONTHLY_PRICE_ID,
  c: process.env.NEXT_PUBLIC_STRIPE_YTVID_C_YEARLY_PRICE_ID,
};

const STRIPE_PURCHASE_META_MAP: Record<
  PlanId,
  { item_name: string; value: number; item_variant: string }
> = {
  a: {
    item_name: "YTVidHub Pro Subscription",
    value: 19.99,
    item_variant: "monthly",
  },
  b: {
    item_name: "YTVidHub Premium Subscription",
    value: 29.99,
    item_variant: "monthly",
  },
  c: {
    item_name: "YTVidHub Researcher Subscription",
    value: 199,
    item_variant: "yearly",
  },
};

function getFeatureCopy(featureName: string) {
  const normalized = featureName.toLowerCase();

  if (normalized.includes("summary")) {
    return {
      title: "Unlock AI Summary!",
      verb: "generate this AI summary",
    };
  }

  if (normalized.includes("study") || normalized.includes("card")) {
    return {
      title: "Unlock Study Cards!",
      verb: "generate study cards",
    };
  }

  if (normalized.includes("download") || normalized.includes("subtitle")) {
    return {
      title: "Unlock Subtitle Download!",
      verb: "download this subtitle",
    };
  }

  return {
    title: `Unlock ${featureName}!`,
    verb: `use ${featureName}`,
  };
}

export function InsufficientCreditsModal({
  isOpen,
  onClose,
  requiredAmount = 1,
  featureName = "this feature",
  currentAmount,
}: InsufficientCreditsModalProps) {
  const { user, openLoginModal } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("b");
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedPlanId("b");
    setIsSubmittingUpgrade(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const parsedCredits =
    typeof user?.credits === "string"
      ? parseInt(user.credits, 10) || 0
      : user?.credits || 0;

  const currentCredits =
    typeof currentAmount === "number" ? currentAmount : parsedCredits;

  const copy = getFeatureCopy(featureName);

  const planHints = [
    {
      id: "a" as const,
      name: "Pro",
      price: "$19.99",
      detail: `500 Credits | Covers this action + ${Math.max(0, 500 - requiredAmount)} more!`,
    },
    {
      id: "b" as const,
      name: "Premium",
      price: "$29.99",
      detail: "1000 Credits | Only $0.02 per video!",
      badge: "Best Value",
    },
    {
      id: "c" as const,
      name: "Researcher",
      price: "$199",
      detail: "3000 Credits | For heavy users",
    },
  ];

  const selectedPlan =
    planHints.find((plan) => plan.id === selectedPlanId) || planHints[1];

  const handleUpgrade = async () => {
    if (isSubmittingUpgrade) return;

    if (!user?.googleUserId) {
      onClose();
      openLoginModal();
      return;
    }

    const subscriptionType = STRIPE_SUBSCRIPTION_TYPE_MAP[selectedPlanId];
    const stripePriceId = STRIPE_SUBSCRIPTION_PRICE_ID_MAP[selectedPlanId];

    try {
      setIsSubmittingUpgrade(true);
      trackConversion("payment_initiated", {
        provider: "stripe",
        plan_id: selectedPlanId,
        source: "insufficient_credits_modal",
        feature: featureName,
      });

      const response = await fetch("https://api.ytvidhub.com/prod-api/stripe/getPayUrl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleUserId: user.googleUserId,
          type: subscriptionType,
          project: "ytvidhub",
          billingMode: "subscription",
          stripePriceId: stripePriceId || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stripe API Error: ${response.status}`);
      }

      const data = await response.json();
      const checkoutUrl = data?.data;

      if (typeof checkoutUrl !== "string" || !checkoutUrl.startsWith("http")) {
        throw new Error("Stripe checkout URL not found.");
      }

      const purchaseMeta = STRIPE_PURCHASE_META_MAP[selectedPlanId];
      if (purchaseMeta) {
        saveStripePurchaseContext({
          kind: "subscription",
          item_name: purchaseMeta.item_name,
          value: purchaseMeta.value,
          item_variant: purchaseMeta.item_variant,
          quantity: 1,
          currency: "USD",
        });
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to open Stripe checkout. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-[560px] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="relative h-44">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/YouTube%20Subtitle%20Batch%20Download%20Illustration.webp')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/55 to-slate-900/70" />

            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-md bg-black/35 p-1.5 text-white/90 transition-all hover:bg-black/50 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
              <p className="text-2xl sm:text-[30px] leading-tight font-black tracking-tight text-white drop-shadow-lg">
                {copy.title}
              </p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="flex items-start gap-2 text-[15px] leading-relaxed text-slate-700 font-medium">
                <Wallet size={17} className="mt-[1px] text-slate-500" />
                <span>
                  You need <span className="font-extrabold text-slate-900">{requiredAmount} credits</span> to
                  {" "}
                  {copy.verb}. Your current balance is <span className="font-extrabold text-slate-900">{currentCredits}</span>.
                </span>
              </p>
              <p className="mt-2 flex items-start gap-2 text-[14px] leading-relaxed font-bold text-orange-600">
                <Flame size={16} className="mt-[1px]" />
                Limited Time: Top up now and get +10% extra credits!
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50 to-blue-50/30 p-3.5">
              <p className="text-[11px] uppercase tracking-wider text-blue-700 font-bold mb-2.5">Select a plan</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {planHints.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const isBestValue = plan.id === "b";
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`relative rounded-xl border bg-white px-3 py-3 text-left transition-all ${
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                          : "border-blue-100 hover:border-blue-300"
                      }`}
                    >
                      {isBestValue && (
                        <span className="absolute -top-2 right-2 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                          {plan.badge}
                        </span>
                      )}
                      <p className="text-[12px] font-black text-slate-900">{plan.name}</p>
                      <p className="mt-0.5 text-[24px] leading-none font-extrabold text-slate-900">{plan.price}</p>
                      <p className="mt-1.5 text-[11px] leading-snug text-slate-600 font-medium">{plan.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={handleUpgrade}
                disabled={isSubmittingUpgrade}
                className="w-full h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <CreditCard size={16} />
                {isSubmittingUpgrade
                  ? "Opening Stripe checkout..."
                  : `Continue with ${selectedPlan.name} on Stripe`}
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onClose}
                disabled={isSubmittingUpgrade}
                className="w-full h-11 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

