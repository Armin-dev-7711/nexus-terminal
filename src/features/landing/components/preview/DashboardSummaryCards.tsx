// src/features/landing/components/preview/DashboardSummaryCards.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Wallet, TrendingUp, Link as LinkIcon, Layers } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useSimulatedMetrics } from "../../hooks/usePreviewSimulation";

// دیتای شبیه‌سازی شده برای چارت‌های پس‌زمینه کارت‌ها
const dataBalance = [{ val: 15 }, { val: 45 }, { val: 25 }, { val: 60 }];
const dataProfit = [{ val: 10 }, { val: 20 }, { val: 50 }, { val: 80 }];
const dataPerformer = [{ val: 20 }, { val: 70 }, { val: 40 }, { val: 85 }];
const dataDiversity = [
  { val: 20 },
  { val: 20 },
  { val: 45 },
  { val: 45 },
  { val: 70 },
  { val: 70 },
  { val: 95 },
];

export function DashboardSummaryCards({
  isActive = true,
}: {
  isActive?: boolean;
}) {
  const { roundedBalance, roundedProfit } = useSimulatedMetrics(isActive);

  // 🚀 فیکس شد: تشخیص سایز صفحه برای خاموش کردن انیمیشن در موبایل
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full'>
      {/* 1. TOTAL BALANCE */}
      <div className='flex flex-col justify-between p-4 rounded-xl bg-[#121214] border border-white/5 relative overflow-hidden group'>
        <div className='flex items-start justify-between mb-2 relative z-10'>
          <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Total Balance
          </span>
          <div className='p-1.5 rounded-md bg-emerald-500/10 text-emerald-500'>
            <Wallet className='size-3.5' />
          </div>
        </div>
        <div className='relative z-10 mt-2'>
          <motion.h4 className='text-2xl font-black text-foreground tracking-tight'>
            {roundedBalance}
          </motion.h4>
          <span className='text-[10px] text-muted-foreground'>
            Base currency: USD
          </span>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'>
          <ResponsiveContainer width='100%' height='100%' minWidth={10}>
            <AreaChart
              data={dataBalance}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='cardGradGreen1' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#34d399' stopOpacity={0.4} />
                  <stop offset='100%' stopColor='#34d399' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='val'
                stroke='#34d399'
                strokeWidth={1.5}
                fill='url(#cardGradGreen1)'
                isAnimationActive={!isMobile && isActive}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. 24H PROFIT / LOSS */}
      <div className='flex flex-col justify-between p-4 rounded-xl bg-[#121214] border border-white/5 relative overflow-hidden group'>
        <div className='flex items-start justify-between mb-2 relative z-10'>
          <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            24H Profit / Loss
          </span>
          <div className='p-1.5 rounded-md bg-emerald-500/10 text-emerald-500'>
            <TrendingUp className='size-3.5' />
          </div>
        </div>
        <div className='relative z-10 mt-2'>
          <motion.h4 className='text-2xl font-black text-emerald-400 tracking-tight'>
            {roundedProfit}
          </motion.h4>
          <span className='text-[10px] text-emerald-500/80 flex items-center gap-1'>
            <TrendingUp className='size-3' /> +2.35% since yesterday
          </span>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'>
          <ResponsiveContainer width='100%' height='100%' minWidth={10}>
            <AreaChart
              data={dataProfit}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='cardGradGreen2' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#34d399' stopOpacity={0.4} />
                  <stop offset='100%' stopColor='#34d399' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='val'
                stroke='#34d399'
                strokeWidth={1.5}
                fill='url(#cardGradGreen2)'
                isAnimationActive={!isMobile && isActive}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. TOP PERFORMER */}
      <div className='flex flex-col justify-between p-4 rounded-xl bg-[#121214] border border-white/5 relative overflow-hidden group'>
        <div className='flex items-start justify-between mb-2 relative z-10'>
          <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Top Performer
          </span>
          <div className='p-1.5 rounded-md bg-amber-500/10 text-amber-500'>
            <LinkIcon className='size-3.5' />
          </div>
        </div>
        <div className='relative z-10 mt-2'>
          <h4 className='text-2xl font-black text-foreground tracking-tight flex items-baseline gap-2'>
            Solana{" "}
            <span className='text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded uppercase tracking-wider'>
              SOL
            </span>
          </h4>
          <span className='text-[10px] text-emerald-500/80 flex items-center gap-1'>
            <TrendingUp className='size-3' /> +5.82% yield rate
          </span>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'>
          <ResponsiveContainer width='100%' height='100%' minWidth={10}>
            <AreaChart
              data={dataPerformer}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='cardGradAmber' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#f59e0b' stopOpacity={0.4} />
                  <stop offset='100%' stopColor='#f59e0b' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='val'
                stroke='#f59e0b'
                strokeWidth={1.5}
                fill='url(#cardGradAmber)'
                isAnimationActive={!isMobile && isActive}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. ASSET DIVERSITY */}
      <div className='flex flex-col justify-between p-4 rounded-xl bg-[#121214] border border-white/5 relative overflow-hidden group'>
        <div className='flex items-start justify-between mb-2 relative z-10'>
          <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Asset Diversity
          </span>
          <div className='p-1.5 rounded-md bg-purple-500/10 text-purple-400'>
            <Layers className='size-3.5' />
          </div>
        </div>
        <div className='relative z-10 mt-2'>
          <h4 className='text-2xl font-black text-foreground tracking-tight'>
            14 Cryptos
          </h4>
          <span className='text-[10px] text-muted-foreground'>
            Spread across 4 main networks
          </span>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'>
          <ResponsiveContainer width='100%' height='100%' minWidth={10}>
            <AreaChart
              data={dataDiversity}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='cardGradPurple' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#a855f7' stopOpacity={0.4} />
                  <stop offset='100%' stopColor='#a855f7' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='step'
                dataKey='val'
                stroke='#a855f7'
                strokeWidth={1.5}
                fill='url(#cardGradPurple)'
                isAnimationActive={!isMobile && isActive}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
