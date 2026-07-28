// مسیر: src/features/dashboard/components/PerformanceChart.tsx
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  TooltipContentProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssetsData } from "@/features/assets/hooks/useAssets";
import { Loader2 } from "lucide-react";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const DashboardCustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-[#18181b] border border-[#27272a] p-3 rounded-xl shadow-xl'>
        <p className='text-xs text-muted-foreground mb-2 font-medium'>
          {label}
        </p>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-6 text-xs'>
            <span className='text-muted-foreground'>Portfolio Value:</span>
            <span className='font-bold text-[#a3e635]'>
              ${(payload[0]?.value as number)?.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// A simple predictable pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export function PerformanceChart() {
  const [timeframe, setTimeframe] = React.useState("1m");
  const [isMobile, setIsMobile] = React.useState(true);
  const { data: assets = [], isLoading } = useAssetsData();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData = React.useMemo(() => {
    const currentBalance = assets.reduce(
      (acc, asset) => acc + asset.holdingsAmount * asset.price,
      0
    );

    if (currentBalance === 0) {
      return [];
    }

    const generateSimulatedData = (
      points: number,
      variance: number,
      labels: string[]
    ) => {
      const data = [];
      let currentValue = currentBalance / (1 + variance / 2); // Start lower
      for (let i = 0; i < points - 1; i++) {
        data.push({ name: labels[i], value: currentValue });
        // Calculate next value with a pseudo-random step
        const randomStep = pseudoRandom(currentBalance + i) * variance - variance / 2;
        currentValue = currentValue * (1 + randomStep);
      }
      // Guarantee the last point is exactly the current balance
      data.push({ name: labels[points - 1], value: currentBalance });
      return data;
    };

    switch (timeframe) {
      case "1d":
        return generateSimulatedData(6, 0.05, ["00:00", "04:00", "08:00", "12:00", "16:00", "Now"]);
      case "1w":
        return generateSimulatedData(7, 0.1, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
      case "1m":
        return generateSimulatedData(6, 0.15, ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Now"]);
      case "1y":
      default:
        return generateSimulatedData(5, 0.4, ["Q1", "Q2", "Q3", "Q4", "Now"]);
    }
  }, [assets, timeframe]);

  return (
    <Card className='rounded-2xl border border-border/60 bg-zinc-950 md:bg-card/30 backdrop-blur-none md:backdrop-blur-sm flex flex-col justify-between overflow-hidden h-full'>
      <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4'>
        <div>
          <CardTitle className='text-sm font-semibold text-foreground'>
            Performance Analytics
          </CardTitle>
          <p className='text-xs text-muted-foreground mt-0.5'>
            Net capital valuation over selected timeframe.
          </p>
        </div>

        <div className='flex items-center gap-1 rounded-xl bg-muted/40 p-1 border border-border/40 shrink-0'>
          {["1d", "1w", "1m", "1y"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium uppercase transition-all cursor-pointer ${
                timeframe === t
                  ? "bg-background text-foreground shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className='h-72 w-full pt-2 pr-4 pl-0'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Loader2 className='size-6 animate-spin text-muted-foreground/50' />
          </div>
        ) : chartData.length === 0 ? (
          <div className='flex h-full w-full items-center justify-center text-sm text-muted-foreground'>
            Add assets to see performance data
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%' minWidth={10}>
            <AreaChart
              key={isMobile ? "chart-mobile" : "chart-desktop"}
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorValueDash' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#a3e635' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#a3e635' stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray='4 4'
                vertical={true}
                horizontal={true}
                stroke='#27272a'
                opacity={0.6}
              />

              <XAxis
                dataKey='name'
                stroke='#a1a1aa'
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke='#a1a1aa'
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />

              <Tooltip
                content={DashboardCustomTooltip}
                cursor={{
                  stroke: "#3f3f46",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type='monotone'
                dataKey='value'
                stroke='#a3e635'
                strokeWidth={2.5}
                fillOpacity={1}
                fill='url(#colorValueDash)'
                isAnimationActive={!isMobile}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#18181b",
                  fill: "#a3e635",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
