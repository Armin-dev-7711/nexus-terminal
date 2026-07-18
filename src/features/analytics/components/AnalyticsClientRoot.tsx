// src/features/analytics/components/AnalyticsClientRoot.tsx
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { AnalyticsToolbar } from "./AnalyticsToolbar";

const AlphaMetrics = dynamic(
  () => import("./AlphaMetrics").then((mod) => mod.AlphaMetrics),
  {
    ssr: false,
    loading: () => (
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='h-[120px] rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'
          >
            <Loader2 className='size-4 animate-spin text-muted-foreground/50' />
          </div>
        ))}
      </div>
    ),
  },
);

const HeroChart = dynamic(
  () => import("./HeroChart").then((mod) => mod.HeroChart),
  {
    ssr: false,
    loading: () => (
      <div className='h-[400px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const AllocationChart = dynamic(
  () => import("./AllocationChart").then((mod) => mod.AllocationChart),
  {
    ssr: false,
    loading: () => (
      <div className='h-[350px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const CashFlowChart = dynamic(
  () => import("./CashFlowChart").then((mod) => mod.CashFlowChart),
  {
    ssr: false,
    loading: () => (
      <div className='h-[350px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const MarketHeatmap = dynamic(
  () => import("./MarketHeatmap").then((mod) => mod.MarketHeatmap),
  {
    ssr: false,
    loading: () => (
      <div className='h-[320px] md:h-[270px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

export function AnalyticsClientRoot() {
  return (
    <>
      <AnalyticsToolbar />
      <AlphaMetrics />
      <HeroChart />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-1'>
          <AllocationChart />
        </div>
        <div className='lg:col-span-2'>
          <CashFlowChart />
        </div>
        <div className='lg:col-span-3'>
          <MarketHeatmap />
        </div>
      </div>
    </>
  );
}
