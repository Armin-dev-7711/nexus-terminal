// src/features/analytics/hooks/useMarketHeatmap.ts
"use client";

import { useMemo } from "react";
import { useAssetsData } from "@/features/assets/hooks/useAssets";
import { HeatmapAsset } from "../types";

export function useMarketHeatmap() {
  const { data: assets = [] } = useAssetsData();

  const sortedAssets = useMemo<HeatmapAsset[]>(() => {
    const grouped: Record<string, { performanceSum: number, volume: number }> = {};
    
    assets.forEach(asset => {
      if (!grouped[asset.symbol]) {
        grouped[asset.symbol] = { performanceSum: 0, volume: 0 };
      }
      const weight = asset.holdingsValue > 0 ? asset.holdingsValue : 1; // avoid 0 weight if possible
      grouped[asset.symbol].volume += asset.holdingsValue;
      grouped[asset.symbol].performanceSum += (asset.change24h || 0) * weight;
    });

    return Object.entries(grouped).map(([symbol, data]) => {
      const avgPerformance = data.volume > 0 
        ? data.performanceSum / data.volume 
        : (data.performanceSum / (assets.filter(a => a.symbol === symbol).length || 1));
        
      return {
        symbol: symbol,
        performance24h: Number(avgPerformance.toFixed(2)),
        volume: data.volume
      };
    }).sort((a, b) => b.volume - a.volume);
  }, [assets]);

  return { sortedAssets };
}
