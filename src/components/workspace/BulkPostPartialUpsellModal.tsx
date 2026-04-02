"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CreditCard, Sparkles, X } from "lucide-react";

interface BulkPostPartialUpsellModalProps {
  isOpen: boolean;
  completedCount: number;
  remainingCount: number;
  totalSelected: number;
  currentCredits: number;
  shortfall: number;
  onClose: () => void;
  onUpgrade: () => void;
  onResumeNow: () => void;
}

const planAnchors = [
  {
    name: "Pro",
    price: "$19.99/mo",
    credits: "500 credits",
    note: "Good for regular weekly batches",
  },
  {
    name: "Premium",
    price: "$29.99/mo",
    credits: "1,000 credits",
    note: "~25% lower cost per credit vs Pro",
    highlight: true,
  },
  {
    name: "Researcher",
    price: "$199/year",
    credits: "3,000 credits / month",
    note: "SAVE 16% on annual billing",
  },
];

export function BulkPostPartialUpsellModal({
  isOpen,
  completedCount,
  remainingCount,
  totalSelected,
  currentCredits,
  shortfall,
  onClose,
  onUpgrade,
  onResumeNow,
}: BulkPostPartialUpsellModalProps) {
  if (!isOpen) return null;

  const canResumeNow = remainingCount > 0 && currentCredits >= remainingCount;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          className="relative w-full max-w-[540px] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black text-slate-900">Part 1 complete - finish the rest now</p>
              <p className="mt-1 text-xs text-slate-500">
                {completedCount} downloaded, {remainingCount} still pending.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-sm text-blue-900 leading-relaxed">
                You selected <span className="font-bold">{totalSelected}</span> videos. We already delivered{" "}
                <span className="font-bold">{completedCount}</span>. Unlock the remaining{" "}
                <span className="font-bold">{remainingCount}</span> now to finish your full batch in one flow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {planAnchors.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border px-3 py-3 ${
                    plan.highlight
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-xs font-black text-slate-900">{plan.name}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{plan.price}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-600">{plan.credits}</p>
                  <p className="mt-1 text-[11px] text-slate-500 leading-snug">{plan.note}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                Needed to continue now
              </p>
              <p className="mt-1 text-sm text-amber-900">
                Remaining videos: <span className="font-bold">{remainingCount}</span> | Current balance:{" "}
                <span className="font-bold">{currentCredits}</span> | Missing:{" "}
                <span className="font-bold">{shortfall}</span> credits
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={canResumeNow ? onResumeNow : onUpgrade}
                className="w-full h-12 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {canResumeNow ? <Sparkles size={16} /> : <CreditCard size={16} />}
                {canResumeNow
                  ? `Resume ${remainingCount} remaining now`
                  : `Choose a plan and finish ${remainingCount} now`}
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onClose}
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
