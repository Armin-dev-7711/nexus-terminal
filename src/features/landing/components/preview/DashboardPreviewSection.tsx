// src/features/landing/components/preview/DashboardPreviewSection.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import dynamic from "next/dynamic";
import { Dashboard3DShell } from "./Dashboard3DShell";
import { LiveTopBar } from "./LiveTopBar";
import { DashboardSummaryCards } from "./DashboardSummaryCards";

const DynamicPerformanceChart = dynamic(
  () =>
    import("@/features/dashboard/components/PerformanceChart").then(
      (mod) => mod.PerformanceChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full min-h-[300px] rounded-2xl bg-card/20 animate-pulse border border-white/5' />
    ),
  },
);

const DynamicLiveMarketPrices = dynamic(
  () => import("./LiveMarketPrices").then((mod) => mod.LiveMarketPrices),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full min-h-[300px] rounded-xl bg-[#121214] animate-pulse border border-white/5' />
    ),
  },
);

export function DashboardPreviewSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  // 🚀 فیکس شد: جلوگیری از محاسبات سنگین انیمیشن‌های مخفی در موبایل
  const [isMobile, setIsMobile] = React.useState(true);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className='w-full py-32 relative bg-[#050507] overflow-hidden flex flex-col items-center justify-center min-h-screen'
    >
      {/* 🚀 فیکس شد: رندر فقط در دسکتاپ تا CPU موبایل درگیر نشود */}
      {!isMobile && isInView && (
        <div className='absolute inset-0 z-0 pointer-events-none flex items-center justify-center'>
          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute w-[600px] h-[600px] bg-primary/40 rounded-full blur-[120px] translate-x-[-60%] translate-y-[-10%] transform-gpu'
          />
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className='absolute w-[500px] h-[500px] bg-blue-500/50 rounded-full blur-[120px] translate-x-[30%] translate-y-[70%] transform-gpu'
          />
          <motion.div
            animate={{ opacity: [0.2, 0.28, 0.21, 0.3, 0.2] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className='absolute w-[700px] h-[400px] bg-emerald-500/50 rounded-full blur-[150px] transform-gpu'
          />
        </div>
      )}

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className='text-center max-w-2xl mx-auto mb-20 md:mb-28 space-y-6'
        >
          <div className='inline-flex items-center gap-2 bg-muted/20 border border-border/40 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground shadow-inner backdrop-blur-md'>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className='size-1.5 rounded-full bg-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]'
            />
            Dashboard Preview
          </div>

          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight'>
            Experience the{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3,
              }}
              className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary drop-shadow-[0_0_20px_rgba(52,211,153,0.2)]'
            >
              Feature.
            </motion.span>
          </h2>
          <p className='text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-medium'>
            Not a mockup. A living, breathing preview of the Nexus Core engine
            rendering real-time cryptographic states.
          </p>
        </motion.div>
      </div>

      <Dashboard3DShell>
        <LiveTopBar />
        <div className='flex-1 p-4 sm:p-5 md:p-8 flex flex-col gap-6 w-full h-full relative z-10 overflow-y-auto md:overflow-hidden bg-[#0c0c0e] scrollbar-thin scrollbar-thumb-white/10'>
          <DashboardSummaryCards isActive={isInView} />
          <div className='flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0'>
            <div className='lg:col-span-2 h-full min-h-[300px]'>
              {isInView ? (
                <DynamicPerformanceChart />
              ) : (
                <div className='w-full h-full min-h-[300px] rounded-2xl bg-card/20 animate-pulse border border-white/5' />
              )}
            </div>
            <div className='lg:col-span-1 h-full min-h-[300px]'>
              {isInView ? (
                <DynamicLiveMarketPrices isActive={isInView} />
              ) : (
                <div className='w-full h-full min-h-[300px] rounded-xl bg-[#121214] animate-pulse border border-white/5' />
              )}
            </div>
          </div>
        </div>
      </Dashboard3DShell>
    </section>
  );
}
