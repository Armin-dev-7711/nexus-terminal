// src/features/analytics/hooks/useAlphaMetrics.ts
"use client";

import { useMemo } from "react";
import { mockAlphaMetrics } from "../mocks/analytics.mock";

export function useAlphaMetrics() {
  const generateSparklineData = (trend: "up" | "down" | "neutral") => {
    if (trend === "up")
      return [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 25 }, { v: 30 }];
    if (trend === "down")
      return [{ v: 30 }, { v: 28 }, { v: 20 }, { v: 22 }, { v: 15 }, { v: 10 }];
    return [{ v: 20 }, { v: 21 }, { v: 19 }, { v: 20 }, { v: 21 }, { v: 20 }];
  };

  const metrics = useMemo(() => {
    return mockAlphaMetrics.map((metric) => ({
      ...metric,
      sparklineData: generateSparklineData(metric.trend),
    }));
  }, []);

  return { metrics };
}
