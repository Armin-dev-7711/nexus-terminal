"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  TooltipContentProps,
} from "recharts";
import { Activity } from "lucide-react";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockCashFlowData } from "@/features/analytics/mocks/analytics.mock";

// Create a custom tooltip for precise coloring
const CustomCashFlowTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    if (!active || !payload?.length) return null;
    return (
      <div className='bg-[#18181b] border border-[#27272a] p-3 rounded-xl shadow-xl'>
        <p className='text-xs text-muted-foreground mb-2 font-medium'>
          {label} 2026
        </p>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-6 text-xs'>
            <span className='text-muted-foreground'>Inflow:</span>

            <span className='text-[#a3e635] font-bold'>
              +${payload[0]?.value?.toLocaleString()}
            </span>
          </div>
          <div className='flex items-center justify-between gap-6 text-xs'>
            <span className='text-muted-foreground'>Outflow:</span>

            <span className='text-[#ef4444] font-bold'>
              -${payload[1]?.value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function CashFlowChart() {
  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col h-[350px]'>
      <CardHeader className='pb-4'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-lg bg-blue-500/10 text-blue-400'>
            <Activity className='size-4' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-foreground'>
              Cash Flow (In vs Out)
            </CardTitle>
            <CardDescription className='text-[11px]'>
              Monthly deposits and withdrawals
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-1 pl-0 pr-4 pb-2'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={mockCashFlowData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#27272a'
              opacity={0.6}
            />
            <XAxis
              dataKey='month'
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            {/* Call custom tooltip */}
            <Tooltip
              content={CustomCashFlowTooltip}
              cursor={{ fill: "#27272a", opacity: 0.4 }}
            />

            <Bar
              dataKey='income'
              name='Inflow'
              fill='#a3e635'
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey='expense'
              name='Outflow'
              fill='#ef4444'
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
