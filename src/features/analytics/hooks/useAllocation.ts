// src/features/analytics/hooks/useAllocation.ts
"use client";

import { useMemo } from "react";
import { useAssetsData } from "@/features/assets/hooks/useAssets";
import { AllocationData } from "../types";

const COLORS = ["#a3e635", "#3b82f6", "#8b5cf6", "#14b8a6", "#f59e0b", "#ec4899", "#ef4444", "#06b6d4"];

export function useAllocation() {
  const { data: assets = [] } = useAssetsData();

  const data = useMemo<AllocationData[]>(() => {
    if (assets.length === 0) return [];

    const grouped: Record<string, number> = {};
    let totalValue = 0;

    assets.forEach(asset => {
      grouped[asset.symbol] = (grouped[asset.symbol] || 0) + asset.holdingsValue;
      totalValue += asset.holdingsValue;
    });
    
    // Sort assets by value descending (filtering out zero value holdings)
    const sortedAssets = Object.entries(grouped)
      .filter(([, value]) => value > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([symbol, value]) => ({ symbol, value }));

    return sortedAssets.map((asset, index) => {
      const percentage = totalValue > 0 ? (asset.value / totalValue) * 100 : 0;
      return {
        name: asset.symbol, 
        value: Number(percentage.toFixed(2)),
        color: COLORS[index % COLORS.length],
      };
    });
  }, [assets]);

  return { data };
}
