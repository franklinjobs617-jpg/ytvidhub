"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Headset,
    Home,
    Loader2,
    RotateCcw,
    ShieldCheck,
    Sparkles,
    XCircle,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
    clearPendingPurchase,
    savePendingPurchase,
    trackPurchaseWithRetry,
} from "@/lib/analytics";
import {
    clearStripePurchaseContext,
    readStripePurchaseContext,
} from "@/lib/stripePurchaseContext";

export default function StripeCallback() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const workspaceHref = sessionId
        ? `/workspace?resumeBulk=1&fromPayment=1&stripeSessionId=${encodeURIComponent(sessionId)}`
        : "/workspace?resumeBulk=1&fromPayment=1";

    const [status, setStatus] = useState<"verifying" | "success" | "error" | "timeout">("verifying");
    const [errorMsg, setErrorMsg] = useState("");
    const [checkCount, setCheckCount] = useState(0);

    const checkCountRef = useRef(0);
    const maxChecks = 15;

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            setErrorMsg("Missing Stripe session. Please return home and try again.");
            return;
        }

        const checkOrderStatus = async () => {
            try {
                const res = await fetch(`https://api.ytvidhub.com/prod-api/stripe/check-order-status?sessionId=${sessionId}`);
                const result = await res.json();

                if (result.data === "paid") {
                    setStatus("success");
                    return true;
                }

                return false;
            } catch (err) {
                console.error("Verification error:", err);
                setErrorMsg("Network error while verifying payment status.");
                return false;
            }
        };

        const timer = setInterval(async () => {
            checkCountRef.current += 1;
            setCheckCount(checkCountRef.current);
            const isDone = await checkOrderStatus();

            if (isDone) {
                clearInterval(timer);
            } else if (checkCountRef.current >= maxChecks) {
                clearInterval(timer);
                setStatus("timeout");
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [sessionId]);

    useEffect(() => {
        if (status !== "success") return;

        const purchaseContext = readStripePurchaseContext();
        if (!sessionId || !purchaseContext) return;

        const purchasePayload = {
            transaction_id: sessionId,
            value: purchaseContext.value,
            currency: purchaseContext.currency || "USD",
            items: [
                {
                    item_name: purchaseContext.item_name,
                    quantity: purchaseContext.quantity || 1,
                    item_variant: purchaseContext.item_variant,
                },
            ],
        };

        savePendingPurchase(purchasePayload);

        let cancelled = false;

        (async () => {
            const tracked = await trackPurchaseWithRetry(
                purchasePayload,
                {
                    attempts: 15,
                    delayMs: 1000,
                },
            );

            if (!cancelled && tracked) {
                clearPendingPurchase();
                clearStripePurchaseContext();
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [status, sessionId]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900 flex items-center justify-center font-sans p-4">
            <div className="max-w-3xl w-full rounded-[32px] bg-white border border-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)] overflow-hidden">
                {status === "verifying" && (
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_62%)]" />
                        <span className="absolute left-[14%] top-16 h-3 w-3 rotate-12 rounded-sm bg-sky-400/80" />
                        <span className="absolute left-[24%] top-24 h-2.5 w-2.5 rounded-sm bg-emerald-400/80" />
                        <span className="absolute right-[18%] top-16 h-3 w-3 -rotate-12 rounded-sm bg-violet-400/80" />
                        <span className="absolute right-[28%] top-24 h-2.5 w-2.5 rounded-sm bg-blue-500/80" />

                        <div className="relative mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_20px_50px_-24px_rgba(59,130,246,0.5)]">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50/80">
                                    <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                Payment <span className="text-blue-600">Processing</span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                We are verifying your payment and syncing credits to your account. Please keep this page open.
                            </p>

                            <div className="mt-8 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50/70 p-5 text-left shadow-[0_24px_50px_-36px_rgba(59,130,246,0.45)]">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-600">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">Syncing your credits</h2>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                This usually finishes in a few seconds. We will keep checking automatically.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-blue-700 sm:self-center">
                                        Attempt {checkCount} / {maxChecks}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 text-left text-sm text-slate-500 sm:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <ShieldCheck className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Secure checkout</p>
                                        <p>Your payment is being verified safely.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <RotateCcw className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Auto sync</p>
                                        <p>Credits unlock as soon as verification completes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <Headset className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Need help?</p>
                                        <p>Support is available if this takes too long.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {status === "success" && (
                    <div className="relative px-6 py-8 sm:px-10 sm:py-10">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_62%)]" />
                        <span className="absolute left-[14%] top-16 h-3 w-3 rotate-12 rounded-sm bg-emerald-400/80" />
                        <span className="absolute left-[22%] top-24 h-2.5 w-2.5 rounded-sm bg-blue-500/80" />
                        <span className="absolute right-[19%] top-16 h-3 w-3 -rotate-12 rounded-sm bg-violet-400/80" />
                        <span className="absolute right-[27%] top-24 h-2.5 w-2.5 rounded-sm bg-emerald-300/90" />

                        <div className="relative mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-[0_20px_50px_-24px_rgba(34,197,94,0.7)]">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/80">
                                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                Payment <span className="text-emerald-600">Successful!</span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                Thank you for your purchase. Your credits have been added and your workspace is ready.
                            </p>

                            <div className="mt-8 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/70 p-5 text-left shadow-[0_24px_50px_-36px_rgba(34,197,94,0.6)]">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">Your credits are ready to use</h2>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                You can continue in workspace now and use your unlocked download and AI actions.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700 sm:self-center">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                        Active
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={workspaceHref}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_18px_40px_-24px_rgba(16,185,129,0.9)] transition-all hover:bg-emerald-600"
                                >
                                    Continue in Workspace
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                                >
                                    <Home className="h-4 w-4" />
                                    Return Home
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 text-left text-sm text-slate-500 sm:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <ShieldCheck className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Secure checkout</p>
                                        <p>Bank-level payment protection.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <RotateCcw className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Instant sync</p>
                                        <p>Your credits are available right away.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                        <Headset className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">Support ready</p>
                                        <p>Contact us if anything looks off.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {status === "timeout" && (
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_62%)]" />
                        <span className="absolute left-[14%] top-16 h-3 w-3 rotate-12 rounded-sm bg-amber-400/80" />
                        <span className="absolute left-[24%] top-24 h-2.5 w-2.5 rounded-sm bg-orange-400/80" />
                        <span className="absolute right-[18%] top-16 h-3 w-3 -rotate-12 rounded-sm bg-yellow-400/80" />
                        <span className="absolute right-[28%] top-24 h-2.5 w-2.5 rounded-sm bg-amber-300/90" />

                        <div className="relative mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-amber-200 bg-white shadow-[0_20px_50px_-24px_rgba(245,158,11,0.45)]">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/80">
                                    <Clock3 className="h-9 w-9 text-amber-600" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                Payment <span className="text-amber-600">Still Processing</span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                We received the payment callback, but final credit sync is taking a little longer than usual.
                            </p>

                            <div className="mt-8 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50/70 p-5 text-left shadow-[0_24px_50px_-36px_rgba(245,158,11,0.45)]">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-600">
                                            <Clock3 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">Final confirmation pending</h2>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                Please check again in about one minute. Your credits should appear automatically once syncing finishes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-bold text-amber-700 sm:self-center">
                                        Delayed sync
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/workspace?resumeBulk=1&fromPayment=1"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_18px_40px_-24px_rgba(245,158,11,0.8)] transition-all hover:bg-amber-600"
                                >
                                    Go to Workspace
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                                >
                                    <Home className="h-4 w-4" />
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_62%)]" />
                        <span className="absolute left-[14%] top-16 h-3 w-3 rotate-12 rounded-sm bg-rose-400/80" />
                        <span className="absolute left-[24%] top-24 h-2.5 w-2.5 rounded-sm bg-red-400/80" />
                        <span className="absolute right-[18%] top-16 h-3 w-3 -rotate-12 rounded-sm bg-orange-400/80" />
                        <span className="absolute right-[28%] top-24 h-2.5 w-2.5 rounded-sm bg-rose-300/90" />

                        <div className="relative mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-red-200 bg-white shadow-[0_20px_50px_-24px_rgba(239,68,68,0.45)]">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/80">
                                    <XCircle className="h-9 w-9 text-red-600" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                Payment <span className="text-red-600">Verification Failed</span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                We could not complete payment verification for this session. No action was unlocked yet.
                            </p>

                            <div className="mt-8 rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 via-white to-red-50/70 p-5 text-left shadow-[0_24px_50px_-36px_rgba(239,68,68,0.45)]">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-white text-red-600">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">Verification did not complete</h2>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {errorMsg || "We couldn't verify your payment. If you were charged, please contact support."}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-bold text-red-700 sm:self-center">
                                        Action needed
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-extrabold text-white transition-all hover:bg-slate-800"
                                >
                                    <Home className="h-4 w-4" />
                                    Return Home
                                </Link>
                                <Link
                                    href="/workspace?resumeBulk=1&fromPayment=1"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                                >
                                    Open Workspace
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
