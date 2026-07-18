// src/features/analytics/hooks/useMarketHeatmap.ts
"use client";

import { useMemo } from "react";
import { mockHeatmapData } from "../mocks/analytics.mock";

export function useMarketHeatmap() {
  const sortedAssets = useMemo(() => {
    return [...mockHeatmapData].sort((a, b) => b.volume - a.volume);
  }, []);

  return { sortedAssets };
}
