// src/features/analytics/hooks/useHeroChart.ts
"use client";

import { useMemo } from "react";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactions";
import { useAssetsData } from "@/features/assets/hooks/useAssets";
import { HeroChartData } from "../types";

export function useHeroChart() {
  const { data: transactions = [] } = useTransactionsData();
  const { data: assets = [] } = useAssetsData();

  const chartData = useMemo<HeroChartData[]>(() => {
    if (transactions.length === 0) return [];

    const sortedTx = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const groupedByDate: Record<string, { date: Date, txs: typeof transactions }> = {};
    
    sortedTx.forEach(tx => {
      const dateStr = new Date(tx.date).toISOString().split('T')[0];
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = { date: new Date(tx.date), txs: [] };
      }
      groupedByDate[dateStr].txs.push(tx);
    });

    const currentPrices: Record<string, number> = {};
    assets.forEach(asset => {
      currentPrices[asset.symbol] = asset.price || (asset.holdingsAmount > 0 ? asset.holdingsValue / asset.holdingsAmount : 0);
    });

    const historyPoints: { dateObj: Date, label: string, value: number }[] = [];
    const accumulatedAssets: Record<string, number> = {};

    Object.entries(groupedByDate).sort((a, b) => a[1].date.getTime() - b[1].date.getTime()).forEach(([, { date, txs }]) => {
      txs.forEach(tx => {
        if (!accumulatedAssets[tx.assetSymbol]) accumulatedAssets[tx.assetSymbol] = 0;
        
        if (tx.type === "Deposit" || tx.type === "Trade" || tx.type === "Transfer") {
          accumulatedAssets[tx.assetSymbol] += tx.amount;
        } else if (tx.type === "Withdrawal") {
          accumulatedAssets[tx.assetSymbol] -= tx.amount;
        }
      });

      let dailyValue = 0;
      Object.entries(accumulatedAssets).forEach(([symbol, amount]) => {
         let txPrice = currentPrices[symbol] || 0; 
         if (txPrice === 0) {
            const sampleTx = sortedTx.find(t => t.assetSymbol === symbol);
            if (sampleTx && sampleTx.amount > 0) txPrice = sampleTx.valueUsd / sampleTx.amount;
         }
         dailyValue += amount * txPrice;
      });
      
      const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" });
      historyPoints.push({
        dateObj: date,
        label: formatter.format(date),
        value: dailyValue
      });
    });

    if (historyPoints.length === 0) return [];

    const lastPoint = historyPoints[historyPoints.length - 1];
    if (new Date().toISOString().split('T')[0] !== lastPoint.dateObj.toISOString().split('T')[0]) {
      const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" });
      historyPoints.push({
        dateObj: new Date(),
        label: formatter.format(new Date()),
        value: lastPoint.value
      });
    }

    if (historyPoints.length === 1) {
      const sevenDaysAgo = new Date(historyPoints[0].dateObj.getTime() - 7 * 24 * 60 * 60 * 1000);
      const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" });
      historyPoints.unshift({
        dateObj: sevenDaysAgo,
        label: formatter.format(sevenDaysAgo),
        value: historyPoints[0].value
      });
    }

    const baseValue = historyPoints[0].value;
    const firstDateMs = historyPoints[0].dateObj.getTime();
    
    return historyPoints.map(point => {
      const daysDiff = (point.dateObj.getTime() - firstDateMs) / (1000 * 3600 * 24);
      const yearsDiff = daysDiff / 365.25;
      const benchmarkValue = baseValue * Math.pow(1.10, yearsDiff);
      
      return {
        date: point.label,
        portfolioValue: Math.max(0, point.value),
        benchmarkValue: benchmarkValue
      };
    });

  }, [transactions, assets]);

  return { data: chartData };
}
