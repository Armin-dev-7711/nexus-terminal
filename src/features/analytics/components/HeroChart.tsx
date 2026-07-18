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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockHeroChartData } from "@/features/analytics/mocks/analytics.mock";

import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Create a custom tooltip for the hero chart
const CustomHeroTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-[#18181b] border border-[#27272a] p-3 rounded-xl shadow-xl'>
        <p className='text-xs text-muted-foreground mb-2 font-medium'>
          {label}, 2026
        </p>
        <div className='flex flex-col gap-2'>
          {/* Benchmark line */}
          <div className='flex items-center justify-between gap-6 text-xs'>
            <span className='text-muted-foreground'>Benchmark:</span>
            <span className='font-bold text-muted-foreground'>
              ${payload[0]?.value?.toLocaleString()}
            </span>
          </div>
          {/* Portfolio line */}
          <div className='flex items-center justify-between gap-6 text-xs '>
            <span className='text-muted-foreground'>Your Portfolio:</span>
            <span className='font-bold text-[#a3e635]'>
              ${payload[1]?.value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function HeroChart() {
  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col h-[400px]'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-semibold text-foreground'>
          Portfolio Performance vs. Benchmark
        </CardTitle>
        <CardDescription className='text-xs'>
          Comparing net asset value (NAV) against market baseline over the
          selected period.
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 w-full pt-4 pr-4 pl-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={mockHeroChartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorPortfolio' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-primary)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-primary)'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='colorBenchmark' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#a1a1aa' stopOpacity={0.15} />
                <stop offset='95%' stopColor='#a1a1aa' stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Advanced Grid: Turn on vertical lines to fill empty space in the chart */}
            <CartesianGrid
              strokeDasharray='4 4'
              vertical={true}
              horizontal={true}
              stroke='#27272a'
              opacity={0.6}
            />

            <XAxis
              dataKey='date'
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
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />

            <Tooltip
              content={CustomHeroTooltip}
              cursor={{
                stroke: "#3f3f46",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type='monotone'
              dataKey='benchmarkValue'
              stroke='#a1a1aa'
              strokeWidth={2}
              strokeDasharray='4 4'
              fillOpacity={1}
              fill='url(#colorBenchmark)'
              activeDot={{ r: 4, fill: "#a1a1aa", strokeWidth: 0 }}
            />

            <Area
              type='monotone'
              dataKey='portfolioValue'
              stroke='#a3e635'
              strokeWidth={2.5}
              fillOpacity={1}
              fill='url(#colorPortfolio)'
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "#18181b",
                fill: "#a3e635",
              }} // Style a point of interest
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
