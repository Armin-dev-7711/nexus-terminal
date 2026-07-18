// src/features/analytics/types/index.ts

export type AlphaMetric = {
  id: string;
  label: string;
  value: string;
  change: number; // درصد تغییر
  trend: "up" | "down" | "neutral";
  description: string;
};

export type HeroChartData = {
  date: string;
  portfolioValue: number;
  benchmarkValue: number; // برای مقایسه (Compare) مثلاً با بیت‌کوین یا S&P500
};

export type AllocationData = {
  name: string;
  value: number;
  color: string;
};

export type HeatmapAsset = {
  symbol: string;
  performance24h: number;
  volume: number; // برای تعیین سایز مربع در نقشه حرارتی
};

export type CashFlowData = {
  month: string;
  income: number;
  expense: number;
};
