"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Clock3, Home, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";

type PageStatus = "verifying" | "success" | "processing" | "error";

interface PendingPaypalPayment {
  provider: "paypal";
  googleUserId: string;
  planType: string;
  beforeCredits: number;
  createdAt: number;
}

interface GoogleUserPayload {
  credits?: string | number;
  googleUserId?: string;
}

type PaymentOrderStatus = "paid" | "pending" | "failed" | "not_found" | "unknown";

const BASE_URL = "https://api.ytvidhub.com";
const CONTEXT_KEY = "pending_paypal_payment";
const CONTEXT_EXPIRE_MS = 2 * 60 * 60 * 1000;
const POLL_INTERVAL_MS = 3000;
const MAX_CHECKS = 20;

const readPendingPaypalContext = (): PendingPaypalPayment | null => {
  try {
    const raw = localStorage.getItem(CONTEXT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPaypalPayment;
    if (!parsed || parsed.provider !== "paypal") return null;
    if (Date.now() - Number(parsed.createdAt || 0) > CONTEXT_EXPIRE_MS) {
      localStorage.removeItem(CONTEXT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const syncLocalUserCredits = (nextCredits: number) => {
  try {
    const cached = localStorage.getItem("loggedInUser");
    if (!cached) return;
    const user = JSON.parse(cached) as Record<string, unknown>;
    localStorage.setItem("loggedInUser", JSON.stringify({ ...user, credits: nextCredits }));
  } catch {
    // ignore
  }
};

export default function PayPalPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PageStatus>("verifying");
  const [tips, setTips] = useState("Verifying your PayPal payment and syncing credits...");
  const [beforeCredits, setBeforeCredits] = useState<number | null>(null);
  const [afterCredits, setAfterCredits] = useState<number | null>(null);
  const [checkCount, setCheckCount] = useState(0);
  const checkCountRef = useRef(0);
  const isPollingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const run = async () => {
      checkCountRef.current = 0;
      setCheckCount(0);

      const authToken = localStorage.getItem("auth_token");
      if (!authToken) {
        setStatus("error");
        setTips("Payment callback reached this page, but no active login was found in this browser.");
        return;
      }

      const pendingContext = readPendingPaypalContext();
      if (pendingContext) {
        setBeforeCredits(Number(pendingContext.beforeCredits || 0));
      }
      const orderIdFromQuery =
        searchParams.get("token") ||
        searchParams.get("orderId") ||
        searchParams.get("subscription_id") ||
        searchParams.get("ba_token") ||
        null;

      const query = searchParams.toString();
      if (query) {
        try {
          await fetch(`${BASE_URL}/prod-api/paypal/retUrl?${query}`, { method: "GET" });
        } catch {
          // ignore and rely on webhook
        }
      }

      const checkUserCredits = async (): Promise<number | null> => {
        const response = await fetch(`${BASE_URL}/prod-api/g/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          cache: "no-store",
        });

        if (!response.ok) return null;
        const payload = await response.json();
        const user = payload?.data as GoogleUserPayload | undefined;
        const credits = Number(user?.credits || 0);
        setAfterCredits(credits);
        return credits;
      };

      const checkOrderStatus = async (): Promise<PaymentOrderStatus> => {
        if (!orderIdFromQuery) return "unknown";
        try {
          const response = await fetch(
            `${BASE_URL}/prod-api/paypal/check-order-status?orderId=${encodeURIComponent(orderIdFromQuery)}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );
          if (!response.ok) return "unknown";
          const payload = await response.json();
          const normalized = String(payload?.data || "").toLowerCase().trim();
          if (normalized === "paid") return "paid";
          if (normalized === "pending") return "pending";
          if (normalized === "failed") return "failed";
          if (normalized === "order not found") return "not_found";
          return "unknown";
        } catch {
          return "unknown";
        }
      };

      timer = setInterval(async () => {
        if (cancelled || isPollingRef.current) return;
        isPollingRef.current = true;
        try {
          checkCountRef.current += 1;
          setCheckCount(checkCountRef.current);
          const orderStatus = await checkOrderStatus();
          if (orderStatus === "paid") {
            const credits = await checkUserCredits();
            if (!cancelled) {
              if (timer) clearInterval(timer);
              if (typeof credits === "number") {
                syncLocalUserCredits(credits);
              }
              localStorage.removeItem(CONTEXT_KEY);
              setStatus("success");
              setTips("Payment confirmed. Credits have been added to your account.");
              return;
            }
          }

          if (orderStatus === "failed" && !cancelled) {
            if (timer) clearInterval(timer);
            setStatus("error");
            setTips("Payment verification failed. If you were charged, please contact support.");
            return;
          }

          if ((orderStatus === "not_found" || orderStatus === "unknown") && checkCountRef.current >= 6) {
            setTips("Payment callback was received. Waiting for final confirmation from PayPal...");
          }

          if (!cancelled && checkCountRef.current >= MAX_CHECKS) {
            if (timer) clearInterval(timer);
            setStatus("processing");
            setTips("Payment is still processing. If you were charged, your credits will appear automatically shortly.");
          }
        } catch {
          // ignore and continue polling
        } finally {
          isPollingRef.current = false;
        }
      }, POLL_INTERVAL_MS);
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [searchParams]);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => {
      router.push("/workspace?resumeBulk=1&fromPayment=1");
    }, 1800);
    return () => clearTimeout(timer);
  }, [status, router]);

  const deltaCredits =
    beforeCredits !== null && afterCredits !== null ? Math.max(afterCredits - beforeCredits, 0) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900 flex items-center justify-center font-sans p-4">
      <div className="max-w-md w-full p-10 rounded-[32px] bg-white border border-slate-200 text-center shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-200 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure PayPal Checkout
        </div>

        {status === "verifying" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h1 className="text-3xl font-black tracking-tight mb-3">Verifying your payment</h1>
            <p className="text-slate-600 mb-2">{tips}</p>
            <p className="text-slate-400 text-xs">Attempt {checkCount} / {MAX_CHECKS}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-3">Payment successful 🎉</h1>
            <p className="text-slate-600 mb-6">{tips}</p>
            {beforeCredits !== null && afterCredits !== null && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Credits: <span className="font-black">{beforeCredits}</span> {"->"} <span className="font-black">{afterCredits}</span>
                {deltaCredits !== null && (
                  <span className="ml-2 inline-flex items-center gap-1 text-emerald-700">
                    <Sparkles className="w-3.5 h-3.5" /> +{deltaCredits}
                  </span>
                )}
              </div>
            )}
            <Link href="/workspace?resumeBulk=1&fromPayment=1" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
              <Home className="w-4 h-4" /> Continue in Workspace
            </Link>
          </>
        )}

        {status === "processing" && (
          <>
            <Clock3 className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black tracking-tight mb-3">Still processing</h1>
            <p className="text-slate-600 mb-8">{tips}</p>
            <Link href="/workspace?resumeBulk=1&fromPayment=1" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
              <Home className="w-4 h-4" /> Go to Workspace
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black tracking-tight mb-3">Verification failed</h1>
            <p className="text-slate-600 mb-8">{tips}</p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all w-full justify-center">
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
