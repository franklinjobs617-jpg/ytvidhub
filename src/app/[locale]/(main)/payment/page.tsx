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
  expectedCredits: number;
  createdAt: number;
}

interface GoogleUserPayload {
  credits?: string | number;
  googleUserId?: string;
}

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

const getStepState = (status: PageStatus, index: number): "done" | "active" | "todo" => {
  if (status === "success") return "done";
  if (status === "error") return index === 0 ? "active" : "todo";
  if (status === "processing") {
    if (index === 0) return "done";
    if (index === 1) return "active";
    return "todo";
  }
  if (status === "verifying") {
    if (index === 0) return "done";
    if (index === 1) return "active";
    return "todo";
  }
  return "todo";
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

      const targetCredits =
        pendingContext && pendingContext.expectedCredits > 0
          ? Number(pendingContext.beforeCredits || 0) + Number(pendingContext.expectedCredits || 0)
          : null;

      const query = searchParams.toString();
      if (query) {
        try {
          await fetch(`${BASE_URL}/prod-api/paypal/retUrl?${query}`, { method: "GET" });
        } catch {
          // ignore and rely on webhook
        }
      }

      const checkUser = async (): Promise<{ credited: boolean; credits: number | null }> => {
        const response = await fetch(`${BASE_URL}/prod-api/g/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          cache: "no-store",
        });

        if (!response.ok) return { credited: false, credits: null };
        const payload = await response.json();
        const user = payload?.data as GoogleUserPayload | undefined;
        const credits = Number(user?.credits || 0);
        setAfterCredits(credits);

        if (targetCredits === null) {
          return { credited: false, credits };
        }
        return { credited: credits >= targetCredits, credits };
      };

      timer = setInterval(async () => {
        if (cancelled || isPollingRef.current) return;
        isPollingRef.current = true;
        try {
          checkCountRef.current += 1;
          setCheckCount(checkCountRef.current);
          const { credited, credits } = await checkUser();
          if (credited && !cancelled) {
            if (timer) clearInterval(timer);
            const currentCredits = credits ?? targetCredits;
            if (typeof currentCredits === "number") {
              syncLocalUserCredits(currentCredits);
            }
            localStorage.removeItem(CONTEXT_KEY);
            setStatus("success");
            setTips("Payment confirmed. Credits have been added to your account.");
            return;
          }

          if (!cancelled && checkCountRef.current >= MAX_CHECKS) {
            if (timer) clearInterval(timer);
            setStatus("processing");
            setTips("Payment is successful, and credits are still being finalized. This usually completes within one minute.");
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

  const stepLabels = ["Payment approved", "Credit sync", "Ready to continue"];
  const deltaCredits =
    beforeCredits !== null && afterCredits !== null ? Math.max(afterCredits - beforeCredits, 0) : null;

  return (
    <div className="min-h-screen bg-[#020204] text-white flex items-center justify-center font-sans p-4 relative overflow-hidden">
      <div className="absolute top-[-22%] left-[-18%] w-[34rem] h-[34rem] bg-indigo-500/20 rounded-full blur-[110px] animate-pulse" />
      <div className="absolute bottom-[-28%] right-[-12%] w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-[110px] animate-pulse" />

      <div className="max-w-xl w-full rounded-[36px] border border-white/10 bg-zinc-900/65 backdrop-blur-2xl p-8 md:p-10 shadow-[0_45px_90px_-30px_rgba(37,99,235,0.35)] relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-400/20 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure PayPal Checkout
        </div>

        <div className="mb-7">
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase leading-[0.95]">
            {status === "success"
              ? "Credits Added Successfully"
              : status === "processing"
                ? "Payment Received"
                : status === "error"
                  ? "Login Required"
                  : "Finalizing Your Payment"}
          </h1>
          <p className="text-zinc-300 mt-3 leading-relaxed">{tips}</p>
        </div>

        <div className="mb-7 grid grid-cols-3 gap-2">
          {stepLabels.map((label, index) => {
            const stepState = getStepState(status, index);
            return (
              <div
                key={label}
                className={`rounded-xl border px-3 py-3 text-[11px] font-semibold tracking-wide ${stepState === "done"
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                  : stepState === "active"
                    ? "border-blue-400/40 bg-blue-400/10 text-blue-200"
                    : "border-white/10 bg-white/5 text-zinc-500"
                  }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        {status === "verifying" && (
          <div className="rounded-2xl border border-white/10 bg-zinc-950/45 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
              <span className="text-sm font-semibold text-zinc-200">Checking account balance updates...</span>
            </div>
            <p className="text-xs text-zinc-500">
              Attempt {checkCount}/{MAX_CHECKS} · We wait for webhook-confirmed credit delivery.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-100">Subscription payment is confirmed.</span>
            </div>
            {beforeCredits !== null && afterCredits !== null && (
              <div className="text-sm text-emerald-50">
                Credits: <span className="font-black">{beforeCredits}</span> →{" "}
                <span className="font-black">{afterCredits}</span>
                {deltaCredits !== null && (
                  <span className="ml-2 inline-flex items-center gap-1 text-emerald-200">
                    <Sparkles className="w-3.5 h-3.5" /> +{deltaCredits}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {status === "processing" && (
          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock3 className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-semibold text-yellow-100">Payment captured. Credit sync is still in progress.</span>
            </div>
            <p className="text-xs text-yellow-100/80">
              You can go back now. Credits usually appear shortly after webhook processing finishes.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-5 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-300" />
              <span className="text-sm font-semibold text-red-100">Please log in and check your workspace balance.</span>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/workspace?resumeBulk=1&fromPayment=1"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-[0.12em] hover:bg-zinc-200 transition-all"
          >
            <Home className="w-4 h-4" /> Continue to Workspace
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-800 text-white font-black text-[11px] uppercase tracking-[0.12em] hover:bg-zinc-700 transition-all border border-white/10"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
