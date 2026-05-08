import { toast } from "sonner";
import { trackConversion } from "@/lib/analytics";
import { useAuth } from "@/context/AuthContext";
import { saveStripePurchaseContext } from "@/lib/stripePurchaseContext";
import {
  BulkPlanId,
  STRIPE_SUBSCRIPTION_TYPE_MAP,
  STRIPE_SUBSCRIPTION_PRICE_ID_MAP,
  STRIPE_PURCHASE_META_MAP,
} from "./useSubtitleDownloader.types";

export function useStripeCheckout() {
  const { user } = useAuth();

  const startStripeCheckout = async (planId: BulkPlanId) => {
    if (!user?.googleUserId) {
      toast.error("Please login to continue checkout.");
      return;
    }

    const subscriptionType = STRIPE_SUBSCRIPTION_TYPE_MAP[planId];
    const stripePriceId = STRIPE_SUBSCRIPTION_PRICE_ID_MAP[planId];

    try {
      trackConversion("payment_initiated", {
        provider: "stripe",
        plan_id: planId,
        source: "bulk_shortfall_modal",
      });

      const response = await fetch(
        "https://api.ytvidhub.com/prod-api/stripe/getPayUrl",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            googleUserId: user.googleUserId,
            type: subscriptionType,
            project: "ytvidhub",
            billingMode: "subscription",
            stripePriceId: stripePriceId || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Stripe API Error: ${response.status}`);
      }

      const data = await response.json();
      const checkoutUrl = data?.data;

      if (typeof checkoutUrl !== "string" || !checkoutUrl.startsWith("http")) {
        throw new Error("Stripe checkout URL not found.");
      }

      const purchaseMeta = STRIPE_PURCHASE_META_MAP[planId];
      if (purchaseMeta) {
        saveStripePurchaseContext({
          kind: "subscription",
          item_name: purchaseMeta.item_name,
          value: purchaseMeta.value,
          item_variant: purchaseMeta.item_variant,
          quantity: 1,
          currency: "USD",
        });
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to open Stripe checkout. Please try again.";
      toast.error(message);
    }
  };

  return { startStripeCheckout };
}
