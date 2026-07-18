//  src/features/landing/types/pricing.types.ts

export type BillingPeriod = "monthly" | "annual";

export type CurrencyType = "USD" | "EUR" | "GBP";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface OperationalPlan {
  id: string;
  name: string;
  description: string;
  basePriceMonthly: number;
  basePriceAnnual: number;
  features: PricingFeature[];
  badge?: string;
  actionText: string;
  isHero: boolean;
  metricLabel?: string;
  metricTarget?: number;
}
