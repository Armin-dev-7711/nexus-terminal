// src/features/landing/components/preview/DashboardSummaryCards.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Wallet, TrendingUp, Link as LinkIcon, Layers } from "lucide-react";
import { useSimulatedMetrics } from "../../hooks/usePreviewSimulation";

export function DashboardSummaryCards({
  isActive = true,
}: {
  isActive?: boolean;
}) {
  const { roundedBalance, roundedProfit } = useSimulatedMetrics(isActive);

  // 🚀 فیکس شد: تشخیص سایز صفحه برای خاموش کردن انیمیشن‌های سنگین SVG در موبایل
  const [isMobile, setIsMobile] = React.useState(true); // پیش‌فرض موبایل برای جلوگیری از لگ اولیه

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // چک کردن در لحظه اول
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
        <svg
          className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'
          preserveAspectRatio='none'
          viewBox='0 0 100 40'
        >
          <motion.path
            d='M0 35 Q 25 15, 50 25 T 100 10'
            fill='none'
            stroke='#34d399'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            // 🚀 فیکس شد: توقف انیمیشن بی‌نهایت در موبایل
            transition={
              isActive && !isMobile
                ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                : { duration: 1, ease: "easeOut" } // در موبایل فقط یکبار لود می‌شود
            }
          />
          <path
            d='M0 35 Q 25 15, 50 25 T 100 10 L 100 40 L 0 40 Z'
            fill='url(#gradGreen)'
            opacity='0.2'
          />
          <defs>
            <linearGradient id='gradGreen' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#34d399' />
              <stop offset='100%' stopColor='transparent' />
            </linearGradient>
          </defs>
        </svg>
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
        <svg
          className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'
          preserveAspectRatio='none'
          viewBox='0 0 100 40'
        >
          <motion.path
            d='M0 30 Q 30 40, 60 15 T 100 5'
            fill='none'
            stroke='#34d399'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={
              isActive && !isMobile
                ? {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                : { duration: 1, ease: "easeOut" }
            }
          />
          <path
            d='M0 30 Q 30 40, 60 15 T 100 5 L 100 40 L 0 40 Z'
            fill='url(#gradGreen2)'
            opacity='0.2'
          />
          <defs>
            <linearGradient id='gradGreen2' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#34d399' />
              <stop offset='100%' stopColor='transparent' />
            </linearGradient>
          </defs>
        </svg>
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
        <svg
          className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'
          preserveAspectRatio='none'
          viewBox='0 0 100 40'
        >
          <motion.path
            d='M0 40 Q 40 20, 70 25 T 100 15'
            fill='none'
            stroke='#f59e0b'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={
              isActive && !isMobile
                ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                : { duration: 1, ease: "easeOut" }
            }
          />
        </svg>
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
        <svg
          className='absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none'
          preserveAspectRatio='none'
          viewBox='0 0 100 40'
        >
          <motion.path
            d='M0 35 L 25 35 L 25 20 L 50 20 L 50 25 L 75 25 L 75 10 L 100 10'
            fill='none'
            stroke='#a855f7'
            strokeWidth='1.5'
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={
              isActive && !isMobile
                ? {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }
                : { duration: 1, ease: "easeOut" }
            }
          />
          <path
            d='M0 35 L 25 35 L 25 20 L 50 20 L 50 25 L 75 25 L 75 10 L 100 10 L 100 40 L 0 40 Z'
            fill='url(#gradPurple)'
            opacity='0.2'
          />
          <defs>
            <linearGradient id='gradPurple' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#a855f7' />
              <stop offset='100%' stopColor='transparent' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
