// src/features/landing/hooks/usePreviewSimulation.ts
"use client";

import * as React from "react";
import { animate, useMotionValue, useTransform } from "motion/react";

export function useSimulatedMetrics(isActive: boolean) {
  const balanceVal = useMotionValue(52890.0);
  const roundedBalance = useTransform(
    balanceVal,
    (v) =>
      `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  );

  const profitVal = useMotionValue(1240.15);
  const roundedProfit = useTransform(
    profitVal,
    (v) =>
      `+$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  );

  React.useEffect(() => {
    if (!isActive) return; // Stop processing completely if the component is not seen

    const bInterval = setInterval(() => {
      animate(balanceVal, balanceVal.get() + (Math.random() * 50 - 10), {
        duration: 1.5,
      });
    }, 4000);

    const pInterval = setInterval(() => {
      animate(profitVal, profitVal.get() + (Math.random() * 10 - 2), {
        duration: 1.5,
      });
    }, 4500);

    return () => {
      clearInterval(bInterval);
      clearInterval(pInterval);
    };
  }, [balanceVal, profitVal, isActive]);

  return { roundedBalance, roundedProfit };
}

export function useSimulatedChart(
  initialData: { time: string; value: number }[],
  isActive: boolean,
) {
  const [data, setData] = React.useState(initialData);
  const [activeFilter, setActiveFilter] = React.useState("1M");

  React.useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastVal = newData[newData.length - 1].value;
        newData.push({
          time: "Now",
          value: lastVal + (Math.random() * 4000 - 1500),
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  return { data, activeFilter, setActiveFilter };
}

export interface SimulatedCoin {
  id: string;
  name: string;
  symbol: string;
  initialPrice: number;
  change: number;
  isUp: boolean;
}

export function useSimulatedMarket(
  initialPrices: SimulatedCoin[],
  isActive: boolean,
) {
  const [prices, setPrices] = React.useState<SimulatedCoin[]>(initialPrices);

  React.useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((coin) => ({
          ...coin,
          initialPrice: coin.initialPrice + (Math.random() * 10 - 5),
        })),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  return { prices };
}
