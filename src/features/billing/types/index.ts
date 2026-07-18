export interface UsageStat {
  label: string;
  used: number;
  total: number;
  unit: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  cta: string;
  current: boolean;
  popular: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
  method: string;
}
