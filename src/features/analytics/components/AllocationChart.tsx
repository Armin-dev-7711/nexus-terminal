"use client";

import * as React from "react";
// Import TooltipProps type from recharts
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
} from "recharts";
// Import more precise types for Value and Name
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { PieChart as PieChartIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockAllocationData } from "@/features/analytics/mocks/analytics.mock";

// Create a custom tooltip for the donut chart
const CustomAllocationTooltip = ({
  active,
  payload,
}: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    return (
      <div className='bg-[#18181b] border border-[#27272a] px-3 py-2 rounded-xl shadow-xl flex items-center gap-3'>
        <div
          className='size-3 rounded-full'
          style={{ backgroundColor: data.color }}
        />
        <div className='flex flex-col gap-0.5'>
          <span className='text-xs font-medium text-muted-foreground'>
            {data.name}
          </span>
          <span className='text-sm font-bold  text-foreground'>
            {data.value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function AllocationChart() {
  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col h-[350px]'>
      <CardHeader className='pb-0'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-lg bg-primary/10 text-primary'>
            <PieChartIcon className='size-4' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-foreground'>
              Asset Allocation
            </CardTitle>
            <CardDescription className='text-[11px]'>
              Distribution of portfolio value
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col items-center justify-between pt-4 pb-6'>
        <div className='h-40 w-full relative'>
          <ResponsiveContainer
            width='100%'
            height='100%'
            className='relative z-50'
          >
            <PieChart>
              {/* Tooltip re-added with custom appearance */}
              <Tooltip content={CustomAllocationTooltip} cursor={false} />

              <Pie
                data={mockAllocationData}
                cx='50%'
                cy='50%'
                innerRadius={55}
                outerRadius={75}
                paddingAngle={0}
                dataKey='value'
                stroke='#09090b'
                strokeWidth={4}
              >
                {mockAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className='absolute z-0 inset-0 flex flex-col items-center justify-center pointer-events-none text-center'>
            <span className='text-xl font-bold  text-foreground'>5</span>
            <span className='text-[9px] text-muted-foreground uppercase tracking-widest'>
              Assets
            </span>
          </div>
        </div>

        <div className='w-full mt-6 space-y-3 px-2'>
          {mockAllocationData.map((asset) => (
            <div key={asset.name} className='flex items-center justify-between'>
              <div className='flex items-center gap-2.5'>
                <div
                  className='size-2.5 rounded-full'
                  style={{ backgroundColor: asset.color }}
                />
                <span className='text-xs font-medium text-foreground'>
                  {asset.name}
                </span>
              </div>
              <span className='text-xs  text-muted-foreground'>
                {asset.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
