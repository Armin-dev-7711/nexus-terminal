// src/features/analytics/components/MarketHeatmap.tsx
"use client";

import * as React from "react";
import { Flame, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Importing the Heatmap Optimizer Hook
import { useMarketHeatmap } from "../hooks/useMarketHeatmap";

export function MarketHeatmap() {
  // Get pre-sorted array with great performance
  const { sortedAssets } = useMarketHeatmap();

  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm h-full flex flex-col'>
      <CardHeader className='pb-4 shrink-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 rounded-lg bg-orange-500/10 text-orange-400'>
              <Flame className='size-4' />
            </div>
            <div>
              <CardTitle className='text-sm font-semibold text-foreground'>
                Market Treemap
              </CardTitle>
              <CardDescription className='text-[11px]'>
                Volume-weighted 24h performance
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 p-4 pt-0'>
        <div className='grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 h-full min-h-[250px] md:min-h-[200px]'>
          {sortedAssets.map((asset, index) => {
            const isPositive = asset.performance24h >= 0;
            const isSuperPositive = asset.performance24h > 5;
            const isSuperNegative = asset.performance24h < -5;

            const gradientClass = isPositive
              ? isSuperPositive
                ? "bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 border-emerald-500/40 text-emerald-100"
                : "bg-gradient-to-br from-emerald-500/20 to-transparent border-emerald-500/20 text-emerald-200/80"
              : isSuperNegative
                ? "bg-gradient-to-br from-destructive/30 to-destructive/10 border-destructive/40 text-red-100"
                : "bg-gradient-to-br from-destructive/20 to-transparent border-destructive/20 text-red-200/80";

            let spanClass = "col-span-1 row-span-1 min-h-[80px] md:min-h-0";

            if (index === 0) {
              spanClass =
                "col-span-2 md:col-span-2 md:row-span-2 min-h-[100px] md:min-h-0";
            } else if (index === 1 || index === 2) {
              spanClass =
                "col-span-1 md:col-span-1 md:row-span-2 min-h-[80px] md:min-h-0";
            } else if (
              index === sortedAssets.length - 1 &&
              sortedAssets.length % 2 === 0
            ) {
              spanClass =
                "col-span-2 md:col-span-1 row-span-1 min-h-[80px] md:min-h-0";
            }

            const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={asset.symbol}
                className={`relative flex flex-col items-start justify-between p-3 rounded-xl border ${gradientClass} ${spanClass} overflow-hidden group hover:scale-[1.02] hover:shadow-lg hover:z-10 transition-all cursor-pointer`}
              >
                <div className='absolute -top-10 -right-10 size-24 bg-white opacity-5 blur-2xl rounded-full group-hover:opacity-10 transition-opacity' />
                <div className='flex items-center justify-between w-full relative z-10'>
                  <span className='text-sm font-bold tracking-tight'>
                    {asset.symbol}
                  </span>
                  <TrendIcon className='size-3.5 opacity-60 block md:hidden lg:block' />
                </div>
                <div className='relative z-10 mt-2'>
                  <span className='text-xs  font-bold tracking-wide'>
                    {isPositive ? "+" : ""}
                    {asset.performance24h}%
                  </span>
                  {index === 0 && (
                    <p className='text-[9px] uppercase tracking-wider opacity-60 mt-1 '>
                      Top Volume
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
