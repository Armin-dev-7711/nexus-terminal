// src/app/dashboard/billing/page.tsx
import { BillingDashboard } from "@/features/billing/components/BillingDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & Subscription | NEXUS Terminal",
  description:
    "Configure your enterprise node subscriptions, track allocation quotas, and view ledgers.",
};

export default function BillingPageRoot() {
  return <BillingDashboard />;
}
