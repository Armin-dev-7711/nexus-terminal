// src/features/dashboard/types/index.ts

export type Transaction = {
  id: string;
  type: "Buy" | "Transfer";
  asset: string;
  amount: string;
  value: string;
  date: string;
  status: string;
};

export type LiveAsset = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
  isPositive: boolean;
};

export type ChartDataPoint = {
  name: string;
  value: number;
};
