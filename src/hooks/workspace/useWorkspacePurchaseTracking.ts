import { useEffect, useRef } from "react";
import {
  clearPendingPurchase,
  savePendingPurchase,
  trackPurchaseWithRetry,
} from "@/lib/analytics";
import {
  clearStripePurchaseContext,
  readStripePurchaseContext,
} from "@/lib/stripePurchaseContext";

export function useWorkspacePurchaseTracking() {
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedRef.current) return;
    hasAttemptedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const fromPayment = params.get("fromPayment");
    const stripeSessionId = params.get("stripeSessionId");

    if (fromPayment !== "1" || !stripeSessionId) return;

    const purchaseContext = readStripePurchaseContext();
    if (!purchaseContext) return;

    const purchasePayload = {
      transaction_id: stripeSessionId,
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
      const tracked = await trackPurchaseWithRetry(purchasePayload, {
        attempts: 10,
        delayMs: 1000,
      });

      if (!cancelled && tracked) {
        clearPendingPurchase();
        clearStripePurchaseContext();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}
