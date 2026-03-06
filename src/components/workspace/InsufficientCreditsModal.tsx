"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CreditCard, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface InsufficientCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requiredAmount?: number;
    featureName?: string;
}

export function InsufficientCreditsModal({
    isOpen,
    onClose,
    requiredAmount = 1,
    featureName = "this feature"
}: InsufficientCreditsModalProps) {
    const router = useRouter();
    const { user } = useAuth();

    // 确保积分是实时准确的
    const currentCredits = typeof user?.credits === 'string' ? parseInt(user.credits) : (user?.credits ?? 0);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop - 更深邃的磨砂效果 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden"
                >
                    {/* Header - 简洁标题栏 */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
                                <AlertCircle size={18} className="text-amber-600" />
                            </div>
                            <span className="text-sm font-bold text-slate-900">Credit Required</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Content */}
                        <div className="mb-8">
                            <h2 className="text-xl font-extrabold text-slate-900 mb-2">Insufficient Balance</h2>
                            <p className="text-[13px] text-slate-500 leading-relaxed group">
                                Generating <span className="text-slate-900 font-semibold">{featureName}</span> requires <span className="text-slate-900 font-semibold">{requiredAmount} credits</span>. Please top up your account to continue.
                            </p>
                        </div>

                        {/* Credit Status Card - 工具级对比设计 */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Your Balance</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-mono font-bold ${currentCredits < requiredAmount ? 'text-red-500' : 'text-slate-900'}`}>
                                            {currentCredits}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">Credits</span>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-slate-200" />

                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Required</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-mono font-bold text-slate-900">{requiredAmount}</span>
                                        <span className="text-xs text-slate-400 font-medium font-mono">-{requiredAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions - 支付导向 */}
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/pricing')}
                                className="w-full h-12 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-slate-200"
                            >
                                <CreditCard size={18} />
                                Get Credits Now
                                <ArrowRight size={16} className="ml-1" />
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full h-11 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
