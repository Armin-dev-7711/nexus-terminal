// src/features/analytics/components/AlphaMetrics.tsx
"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// Import metrics calculation hook
import { useAlphaMetrics } from "../hooks/useAlphaMetrics";

export function AlphaMetrics() {
  // Get the optimized array with cached Sparkline data
  const { metrics } = useAlphaMetrics();

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {metrics.map((metric, index) => {
        const isUp = metric.trend === "up";
        const isDown = metric.trend === "down";
        const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

        const textColor = isUp
          ? "text-emerald-400"
          : isDown
            ? "text-destructive"
            : "text-muted-foreground";
        const strokeColor = isUp ? "#34d399" : isDown ? "#f87171" : "#a1a1aa";

        return (
          <Card
            key={metric.id}
            className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm relative overflow-hidden group'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-10'>
              <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                {metric.label}
              </CardTitle>
              <div className={`p-1.5 rounded-lg bg-muted/20 ${textColor}`}>
                <TrendIcon className='size-3.5' />
              </div>
            </CardHeader>

            <CardContent className='relative z-10'>
              <div className='text-2xl font-bold text-foreground'>
                {metric.value}
              </div>
              <div className='flex items-center gap-1.5 mt-1.5'>
                <span className={`text-[11px] font-bold ${textColor}`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                <span className='text-[10px] text-muted-foreground/80 truncate'>
                  {metric.description}
                </span>
              </div>
            </CardContent>

            {/* Sparkline Dynamic Data Consumer Hook Ready */}
            <div className='absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={metric.sparklineData}>
                  <defs>
                    <linearGradient
                      id={`grad-analytics-${index}`}
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='0%'
                        stopColor={strokeColor}
                        stopOpacity={0.5}
                      />
                      <stop
                        offset='100%'
                        stopColor={strokeColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type='monotone'
                    dataKey='v'
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={`url(#grad-analytics-${index})`}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
