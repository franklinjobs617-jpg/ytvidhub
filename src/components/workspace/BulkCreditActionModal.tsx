"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Download,
  Flame,
  Scissors,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type BulkPlanId = "a" | "b" | "c";

interface BulkCreditActionModalProps {
  isOpen: boolean;
  currentCredits: number;
  requiredCredits: number;
  affordableCount: number;
  onClose: () => void;
  onDownloadAffordable: () => void;
  onUpgrade: (planId: BulkPlanId) => void | Promise<void>;
}

export function BulkCreditActionModal({
  isOpen,
  currentCredits,
  requiredCredits,
  affordableCount,
  onClose,
  onDownloadAffordable,
  onUpgrade,
}: BulkCreditActionModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<BulkPlanId>("b");
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedPlanId("b");
    setIsSubmittingUpgrade(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const missingCredits = Math.max(0, requiredCredits - currentCredits);
  const remainingCount = Math.max(0, requiredCredits - affordableCount);

  const planHints = [
    {
      id: "a" as const,
      name: "Pro",
      price: "$19.99",
      detail: `500 Credits | Covers this batch + ${Math.max(0, 500 - requiredCredits)} more!`,
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

  const handleUpgradeClick = async () => {
    if (isSubmittingUpgrade) return;
    try {
      setIsSubmittingUpgrade(true);
      await onUpgrade(selectedPlanId);
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          className="relative w-full max-w-[560px] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="relative h-44 sm:h-52">
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
                Unlock Your {requiredCredits} Selected Videos!
              </p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="flex items-start gap-2 text-[15px] leading-relaxed text-slate-700 font-medium">
                <Wallet size={17} className="mt-[1px] text-slate-500" />
                <span>
                  You need <span className="font-extrabold text-slate-900">{requiredCredits} credits</span> to
                  download this batch. Your current balance is <span className="font-extrabold text-slate-900">{currentCredits}</span>.
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
      
            <p className="text-sm text-slate-600 leading-relaxed">
              You can download <span className="font-semibold text-slate-900">{affordableCount}</span> now, then
              continue the remaining <span className="font-semibold text-slate-900">{remainingCount}</span> after top-up.
            </p>

            <div className="space-y-3 pt-1">
              <button
                onClick={onDownloadAffordable}
                disabled={affordableCount <= 0 || isSubmittingUpgrade}
                className={`w-full h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  affordableCount > 0 && !isSubmittingUpgrade
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Scissors size={16} />
                Download {affordableCount} now
              </button>

              <button
                onClick={handleUpgradeClick}
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
                className="w-full h-11 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Adjust selection
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

