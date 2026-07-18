// src/features/analytics/mocks/analytics.mock.ts

import {
  AlphaMetric,
  HeroChartData,
  AllocationData,
  HeatmapAsset,
  CashFlowData,
} from "../types";

export const mockAlphaMetrics: AlphaMetric[] = [
  {
    id: "roi",
    label: "Return on Investment (ROI)",
    value: "+24.5%",
    change: 2.1,
    trend: "up",
    description: "Net profit relative to initial capital",
  },
  {
    id: "cagr",
    label: "CAGR",
    value: "18.2%",
    change: -0.4,
    trend: "down",
    description: "Compound Annual Growth Rate",
  },
  {
    id: "win-rate",
    label: "Trade Win Rate",
    value: "68.4%",
    change: 5.2,
    trend: "up",
    description: "Percentage of profitable trades",
  },
  {
    id: "avg-holding",
    label: "Avg. Holding Time",
    value: "42 Days",
    change: 0,
    trend: "neutral",
    description: "Average duration an asset is held",
  },
];

export const mockHeroChartData: HeroChartData[] = [
  { date: "Jul 01", portfolioValue: 45000, benchmarkValue: 43000 },
  { date: "Jul 05", portfolioValue: 46200, benchmarkValue: 44500 },
  { date: "Jul 10", portfolioValue: 48500, benchmarkValue: 45000 },
  { date: "Jul 15", portfolioValue: 47000, benchmarkValue: 46100 },
  { date: "Jul 20", portfolioValue: 51000, benchmarkValue: 48000 },
  { date: "Jul 25", portfolioValue: 50500, benchmarkValue: 49500 },
  { date: "Jul 30", portfolioValue: 52890, benchmarkValue: 48800 },
];

export const mockAllocationData: AllocationData[] = [
  { name: "Bitcoin (BTC)", value: 45, color: "#a3e635" },
  { name: "Ethereum (ETH)", value: 25, color: "#3b82f6" },
  { name: "Solana (SOL)", value: 15, color: "#8b5cf6" },
  { name: "Stablecoins", value: 10, color: "#14b8a6" },
  { name: "Others", value: 5, color: "#52525b" },
];

export const mockHeatmapData: HeatmapAsset[] = [
  { symbol: "SOL", performance24h: 8.5, volume: 1200 },
  { symbol: "INJ", performance24h: 5.2, volume: 800 },
  { symbol: "BTC", performance24h: 1.2, volume: 5000 },
  { symbol: "ETH", performance24h: -0.5, volume: 3000 },
  { symbol: "ADA", performance24h: -3.4, volume: 600 },
  { symbol: "DOT", performance24h: -5.8, volume: 450 },
];

export const mockCashFlowData: CashFlowData[] = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 1890, expense: 4800 },
  { month: "Jun", income: 2390, expense: 3800 },
  { month: "Jul", income: 3490, expense: 4300 },
];
