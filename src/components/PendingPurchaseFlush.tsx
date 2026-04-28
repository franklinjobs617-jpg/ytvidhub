"use client";

import { useEffect, useRef } from "react";
import {
  clearPendingPurchase,
  readPendingPurchase,
  trackPurchaseWithRetry,
} from "@/lib/analytics";

export function PendingPurchaseFlush() {
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedRef.current) return;
    hasAttemptedRef.current = true;

    const pendingPurchase = readPendingPurchase();
    if (!pendingPurchase) return;

    let cancelled = false;

    (async () => {
      const tracked = await trackPurchaseWithRetry(pendingPurchase, {
        attempts: 20,
        delayMs: 1000,
      });

      if (!cancelled && tracked) {
        clearPendingPurchase();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
