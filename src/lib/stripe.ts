// src/lib/stripe.ts
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn(
    "⚠️ STRIPE_SECRET_KEY is missing from environment variables. Stripe checkout will operate in demo mode.",
  );
}

export const stripe = new Stripe(stripeSecretKey || "sk_test_mock_key_for_development", {
  apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});
