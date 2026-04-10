"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Home, XCircle, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function StripeCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState<"verifying" | "success" | "error" | "timeout">("verifying");
    const [errorMsg, setErrorMsg] = useState("");
    const [checkCount, setCheckCount] = useState(0);

    const checkCountRef = useRef(0);
    const maxChecks = 15;

    useEffect(() => {
        if (!sessionId) {
            router.push("/");
            return;
        }

        const checkOrderStatus = async () => {
            try {
                const res = await fetch(`https://api.ytvidhub.com/prod-api/stripe/check-order-status?sessionId=${sessionId}`);
                const result = await res.json();

                if (result.data === 'paid') {
                    setStatus("success");
                    return true;
                } else {
                    return false;
                }
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
        }, 2000); // 每 2 秒查一次

        return () => clearInterval(timer);
    }, [sessionId, router]);

    useEffect(() => {
        if (status !== "success") return;
        const timer = setTimeout(() => {
            router.push("/workspace?resumeBulk=1&fromPayment=1");
        }, 1400);
        return () => clearTimeout(timer);
    }, [status, router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900 flex items-center justify-center font-sans p-4">
            <div className="max-w-md w-full p-10 rounded-[32px] bg-white border border-slate-200 text-center shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">

                {/* 校验中状态 */}
                {status === "verifying" && (
                    <>
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
                        <h1 className="text-3xl font-black tracking-tight mb-3">Verifying your payment</h1>
                        <p className="text-slate-600">Please keep this page open while we sync your credits.</p>
                        <p className="text-slate-400 text-xs mt-4">Attempt {checkCount} / {maxChecks}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
                            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight mb-3">Payment successful 🎉</h1>
                        <p className="text-slate-600 mb-8">Your credits are now available on this account.</p>
                        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            Verified and synced. Redirecting you back to workspace...
                        </div>
                        <Link href="/workspace?resumeBulk=1&fromPayment=1" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
                            <Home className="w-4 h-4" /> Continue in Workspace
                        </Link>
                    </>
                )}

                {status === "timeout" && (
                    <>
                        <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-black tracking-tight mb-3">Still processing</h1>
                        <p className="text-slate-600 mb-10">Payment is received and credits are being finalized. Please check again in about one minute.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
                            <Home className="w-4 h-4" /> Go to Dashboard
                        </Link>
                    </>
                )}

                {/* 错误状态 */}
                {status === "error" && (
                    <>
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-black tracking-tight mb-3">Verification failed</h1>
                        <p className="text-slate-600 mb-10">{errorMsg || "We couldn't verify your payment. If you were charged, please contact support."}</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
                            Return Home
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
