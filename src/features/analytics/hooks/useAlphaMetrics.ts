// src/features/analytics/hooks/useAlphaMetrics.ts
"use client";

import { useMemo } from "react";
import { useAssetsData } from "@/features/assets/hooks/useAssets";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactions";
import { AlphaMetric } from "../types";

export function useAlphaMetrics() {
  const { data: assets = [] } = useAssetsData();
  const { data: transactions = [] } = useTransactionsData();

  const generateSparklineData = (trend: "up" | "down" | "neutral") => {
    if (trend === "up")
      return [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 25 }, { v: 30 }];
    if (trend === "down")
      return [{ v: 30 }, { v: 28 }, { v: 20 }, { v: 22 }, { v: 15 }, { v: 10 }];
    return [{ v: 20 }, { v: 21 }, { v: 19 }, { v: 20 }, { v: 21 }, { v: 20 }];
  };

  const metrics: (AlphaMetric & { sparklineData: { v: number }[] })[] = useMemo(() => {
    // 1. ROI Calculation
    const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.holdingsValue, 0);
    
    // We estimate total invested by summing up valueUsd of all deposits/trades.
    const totalInvested = transactions
      .filter(tx => tx.type === "Deposit" || tx.type === "Trade" || tx.type === "Transfer")
      .reduce((sum, tx) => sum + (tx.valueUsd || 0), 0);

    let roi = 0;
    if (totalInvested > 0) {
      roi = ((totalCurrentValue - totalInvested) / totalInvested) * 100;
    }

    // 2. Trade Win Rate
    const profitableAssets = assets.filter(asset => asset.change24h > 0).length;
    const winRate = assets.length > 0 ? (profitableAssets / assets.length) * 100 : 0;

    // 3. CAGR & Avg Holding Time
    let oldestDate = new Date();
    if (transactions.length > 0) {
      const dates = transactions.map(tx => new Date(tx.date).getTime());
      oldestDate = new Date(Math.min(...dates));
    }
    const daysHeld = Math.max(1, Math.floor((new Date().getTime() - oldestDate.getTime()) / (1000 * 3600 * 24)));
    const yearsHeld = Math.max(daysHeld / 365.25, 1/365.25); // avoid division by zero
    
    let cagr = 0;
    if (totalInvested > 0) {
      if (yearsHeld >= 1) {
        cagr = (Math.pow(Math.max(totalCurrentValue, 0) / totalInvested, 1 / yearsHeld) - 1) * 100;
      } else {
        cagr = roi; // Don't annualize if less than a year to prevent absurd numbers
      }
      if (isNaN(cagr) || !isFinite(cagr)) cagr = 0;
    }

    const calculatedMetrics: AlphaMetric[] = [
      {
        id: "roi",
        label: "Return on Investment (ROI)",
        value: `${roi > 0 ? "+" : ""}${roi.toFixed(1)}%`,
        change: Number(roi.toFixed(2)),
        trend: roi > 0 ? "up" : roi < -0.1 ? "down" : "neutral",
        description: "Net profit relative to initial capital",
      },
      {
        id: "cagr",
        label: "CAGR",
        value: `${cagr > 0 ? "+" : ""}${cagr.toFixed(1)}%`,
        change: Number(cagr.toFixed(2)),
        trend: cagr > 0 ? "up" : cagr < -0.1 ? "down" : "neutral",
        description: "Compound Annual Growth Rate",
      },
      {
        id: "win-rate",
        label: "Trade Win Rate",
        value: `${winRate.toFixed(1)}%`,
        change: Number((winRate - 50).toFixed(2)),
        trend: winRate > 50 ? "up" : winRate < 50 ? "down" : "neutral",
        description: "Percentage of profitable assets",
      },
      {
        id: "avg-holding",
        label: "Avg. Holding Time",
        value: `${daysHeld} Days`,
        change: 0,
        trend: "neutral",
        description: "Average duration since first transaction",
      },
    ];

    return calculatedMetrics.map(metric => ({
      ...metric,
      sparklineData: generateSparklineData(metric.trend),
    }));
  }, [assets, transactions]);

  return { metrics };
}
