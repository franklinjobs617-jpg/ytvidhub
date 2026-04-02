"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CreditCard, Download, Scissors, X } from "lucide-react";

interface BulkCreditActionModalProps {
  isOpen: boolean;
  currentCredits: number;
  requiredCredits: number;
  affordableCount: number;
  onClose: () => void;
  onDownloadAffordable: () => void;
  onUpgrade: () => void;
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
  if (!isOpen) return null;

  const missingCredits = Math.max(0, requiredCredits - currentCredits);
  const remainingCount = Math.max(0, requiredCredits - affordableCount);
  const planHints = [
    { name: "Pro", price: "$19.99/mo", credits: "500 credits" },
    { name: "Premium", price: "$29.99/mo", credits: "1,000 credits (best value)" },
    { name: "Researcher", price: "$199/year", credits: "3,000 credits / month" },
  ];

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
          className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <div>
              <p className="text-sm font-bold text-slate-900">Not enough credits for full batch</p>
              <p className="text-xs text-slate-500 mt-1">
                You can still complete part of this batch right now.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-md transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Balance</p>
                <p className="text-xl font-bold text-slate-900">{currentCredits}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Needed</p>
                <p className="text-xl font-bold text-slate-900">{requiredCredits}</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">Missing</p>
                <p className="text-xl font-bold text-amber-700">{missingCredits}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              You selected <span className="font-semibold text-slate-900">{requiredCredits} videos</span>. You can
              download <span className="font-semibold text-slate-900"> {affordableCount} now</span>, then
              continue the remaining <span className="font-semibold text-slate-900">{remainingCount}</span> after top-up.
            </p>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <p className="text-[11px] uppercase tracking-wider text-blue-700 font-bold mb-2">Popular plans</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {planHints.map((plan) => (
                  <div key={plan.name} className="rounded-lg bg-white border border-blue-100 px-2.5 py-2">
                    <p className="text-[11px] font-black text-slate-900">{plan.name}</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{plan.price}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{plan.credits}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onDownloadAffordable}
                disabled={affordableCount <= 0}
                className={`w-full h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  affordableCount > 0
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Scissors size={16} />
                Download {affordableCount} now
              </button>

              <button
                onClick={onUpgrade}
                className="w-full h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <CreditCard size={16} />
                Top up and continue all {requiredCredits}
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onClose}
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
