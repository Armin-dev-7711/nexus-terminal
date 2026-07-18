import { UsageStat, PricingPlan, Invoice } from "../types";

export const USAGE_STATS: UsageStat[] = [
  { label: "AI WebSocket Insights", used: 840, total: 1000, unit: "credits" },
  { label: "Active Developer API Keys", used: 3, total: 5, unit: "keys" },
  {
    label: "Monthly API Call Volume",
    used: 42.5,
    total: 50,
    unit: "k requests",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    description: "Essential analytics nodes for retail testing.",
    priceMonthly: 0,
    priceAnnual: 0,
    features: [
      "Real-time data feeds",
      "Up to 3 API Keys",
      "1,000 WebSocket requests/mo",
      "Community access",
    ],
    cta: "Current Plan",
    current: true,
    popular: false,
  },
  {
    name: "Pro Terminal",
    description: "Advanced ledger infrastructure for power operators.",
    priceMonthly: 29,
    priceAnnual: 19,
    features: [
      "Advanced AI trade insights",
      "Unlimited API Keys",
      "50,000 WebSocket requests/mo",
      "Custom webhook triggers",
      "Priority node execution",
      "24/7 dedicated support",
    ],
    cta: "Upgrade to Pro",
    current: false,
    popular: true,
  },
];

export const INVOICE_HISTORY: Invoice[] = [
  {
    id: "INV-2026-003",
    date: "Jul 01, 2026",
    amount: "$0.00",
    status: "Succeeded",
    method: "Free Tier",
  },
  {
    id: "INV-2026-002",
    date: "Jun 01, 2026",
    amount: "$0.00",
    status: "Succeeded",
    method: "Free Tier",
  },
  {
    id: "INV-2026-001",
    date: "May 01, 2026",
    amount: "$0.00",
    status: "Succeeded",
    method: "Free Tier",
  },
];
