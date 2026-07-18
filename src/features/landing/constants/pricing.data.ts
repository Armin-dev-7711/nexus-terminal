//  src/features/landing/constants/pricing.data.ts
import { OperationalPlan } from "../types/pricing.types";

export const CURRENCY_CONVERSION: Record<
  string,
  { symbol: string; rate: number }
> = {
  USD: { symbol: "$", rate: 1.0 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.78 },
};

export const OPERATIONAL_PLANS: OperationalPlan[] = [
  {
    id: "explorer",
    name: "Explorer",
    description:
      "Ideal for individual designers and researchers analyzing core market states.",
    basePriceMonthly: 12,
    basePriceAnnual: 9,
    actionText: "Initialize Terminal",
    isHero: false,
    features: [
      { text: "AI Analytics Basics", included: true },
      { text: "Standard Dashboard", included: true },
      { text: "Realtime Market Feeds", included: true },
      { text: "Up to 5 Active Assets", included: true },
      { text: "30-Day Ledger History", included: true },
      { text: "Priority API Access", included: false },
      { text: "Dedicated Infrastructure", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "Advanced operational level for high-frequency multimedia or quantitative operations.",
    basePriceMonthly: 29,
    basePriceAnnual: 24,
    badge: "Best Choice",
    actionText: "Start Building",
    isHero: true,
    metricLabel: "Investors Trusted",
    metricTarget: 1800,
    features: [
      { text: "AI Analytics", included: true },
      { text: "Unlimited Assets", included: true },
      { text: "Priority API", included: true },
      { text: "Realtime Market", included: true },
      { text: "Advanced Dashboard", included: true },
      { text: "Unlimited History", included: true },
      { text: "Email Support", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Custom military-grade infrastructure built for massive corporate capital.",
    basePriceMonthly: 0,
    basePriceAnnual: 0,
    actionText: "Contact Sales",
    isHero: false,
    metricLabel: "Active Developers",
    metricTarget: 2500,
    features: [
      { text: "Dedicated Infrastructure", included: true },
      { text: "Private Nodes Deployment", included: true },
      { text: "24/7 On-Call Engineer", included: true },
      { text: "Priority Architectural Support", included: true },
      { text: "Custom Ledger Integrations", included: true },
    ],
  },
];

export const PRICING_SOCIAL_PROOF = [
  { value: "8,500+", label: "Investors Globally" },
  { value: "140+", label: "Countries Deployed" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "$1.2B", label: "Assets Tracked" },
];
