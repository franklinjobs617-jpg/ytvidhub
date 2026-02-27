"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { trackConversion } from "@/lib/analytics";

interface PaymentChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: string | null; // 例如 'a', 'b', 'c'
}

export default function PaymentChoiceModal({
  isOpen,
  onClose,
  selectedPlanId,
}: PaymentChoiceModalProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const BASE_URL = "https://api.ytvidhub.com";

  const handlePayment = async (provider: "stripe" | "paypal") => {
    if (!selectedPlanId || !user?.googleUserId) {
      alert("User session invalid or no plan selected.");
      return;
    }

    setLoading(true);
    trackConversion('payment_initiated', { provider, plan_id: selectedPlanId });
    const endpoint =
      provider === "stripe"
        ? "/prod-api/stripe/getPayUrl"
        : "/prod-api/paypal/createOrder";

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleUserId: user.googleUserId,
          type: selectedPlanId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.data) {
        window.location.href = data.data;
      } else {
        throw new Error("Checkout URL not found.");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      alert(`Payment failed: ${error.message}`);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm relative z-10 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Choose Payment Method
          </h2>
          {/* <p className="text-slate-500 text-sm">Secure payment for Plan ID: <span className="font-mono text-slate-700">{selectedPlanId}</span></p> */}
        </div>

        <div className="space-y-4">
          {/* Stripe Button */}
          <button
            onClick={() => handlePayment("stripe")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="text-sm font-semibold text-slate-500">
                Processing...
              </span>
            ) : (
              <>
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Pay with Credit Card
                </span>
              </>
            )}
          </button>

          {/* PayPal Button */}
          <button
            onClick={() => handlePayment("paypal")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="text-sm font-semibold text-slate-500">
                Processing...
              </span>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#253B80"
                >
                  <title>PayPal</title>
                  <path d="M7.076 21.337H2.478L.002 3.826h4.86c.094.629.544 2.155 1.25 3.393.712 1.24 1.768 1.83 3.12 1.83h2.32c2.39 0 4.134-1.347 4.496-3.825.14-.976.01-1.92-.39-2.733-.39-.82-.99-1.46-1.74-1.89C15.21 0 14.155 0 12.89 0H4.343L2.98 10.27h2.95c.78 0 1.43-.24 1.94-.72.51-.48.81-1.14.88-1.98v-.01H9.98c-2.227 0-3.952 1.48-4.258 3.65-.2 1.44.34 2.81 1.39 3.8.98.92 2.34 1.45 3.99 1.45h.69c.83 0 1.6-.2 2.28-.59.68-.39 1.2-.97 1.54-1.69.41-.83.56-1.82.43-2.89-.19-1.42-.87-2.6-1.94-3.3-.96-.63-2.22-.95-3.6-.95H6.26l.48-3.23h2.12c1.47 0 2.59.45 3.32 1.36.73.9.89 2.14.6 3.56-.23 1.12-.78 2.04-1.58 2.68-.8.64-1.85.97-3.08.97H7.076zm16.924-11.13c-.39-.81-.99-1.45-1.74-1.88-.75-.44-1.59-.66-2.52-.66H9.84l-.53 3.53h2.52c1.23 0 2.15.36 2.74 1.09.59.72.84 1.68.73 2.87-.16 1.76-1.09 2.99-2.78 3.68-.9.36-1.96.54-3.15.54H7.38l-.53 3.53h2.52c1.33 0 2.44-.31 3.32-.93.88-.61 1.53-1.47 1.92-2.52.4-1.05.52-2.2.39-3.44-.2-1.42-.87-2.6-1.94-3.3-.96-.63-2.22-.95-3.6-.95H6.26l.48-3.23h7.45c.83 0 1.55.17 2.15.51.6.34 1.05.86 1.33 1.55.28.68.39 1.46.32 2.33-.12 1.1-.53 2.05-1.2 2.81-.68.77-1.58 1.3-2.62 1.56-.25.06-.5.1-.74.12l.28-1.87c.25-.01.5-.03.74-.06.77-.18 1.44-.55 1.98-1.1.54-.55.9-1.28 1.05-2.18.15-.9.08-1.76-.21-2.52z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Pay with PayPal
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
