// src/features/landing/components/hero/MiniDashboardPreview.tsx
"use client";

import * as React from "react";
import { ArrowUpRight, Cpu, Activity, Wallet } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";

export function MiniDashboardPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: "100px" });

  const count = useMotionValue(135000);
  const rounded = useTransform(
    count,
    (latest) => `$${Math.round(latest).toLocaleString()}`,
  );

  const [logs, setLogs] = React.useState([
    { id: 1, text: "✓ BTC Node Sync", time: "Just now", color: "text-primary" },
    {
      id: 2,
      text: "• System Initialized",
      time: "2m ago",
      color: "text-muted-foreground",
    },
  ]);

  React.useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, 142384, {
      duration: 2.5,
      ease: "easeOut",
      delay: 0.5,
    });

    const logInterval = setInterval(() => {
      const newLogs = [
        "ETH Contract Call",
        "Vault Encrypted",
        "API Request OK",
        "Token Swap Executed",
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setLogs((prev) => [
        {
          id: Date.now(),
          text: `+ ${randomLog}`,
          time: "Just now",
          color: "text-emerald-400",
        },
        prev[0],
      ]);
    }, 4000);

    return () => {
      controls.stop();
      clearInterval(logInterval);
    };
  }, [count, isInView]);

  return (
    <div
      ref={containerRef}
      className='w-full max-w-5xl mx-auto rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md md:backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden text-[11px] select-none transform-gpu'
    >
      <div className='flex items-center justify-between border-b border-border/30 pb-4 mb-5'>
        <div className='flex items-center gap-1.5'>
          <div className='size-3 rounded-full bg-rose-500/40 border border-rose-500/60' />
          <div className='size-3 rounded-full bg-amber-500/40 border border-amber-500/60' />
          <div className='size-3 rounded-full bg-primary/40 border border-primary/60' />
        </div>
        <div className='text-[10px] text-muted-foreground/60 tracking-wider uppercase bg-background/50 px-4 py-1 rounded-md border border-border/20 shadow-inner'>
          nexus-workspace.exe
        </div>
        <div className='size-4' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {/* Wallet Block */}
        <div className='md:col-span-1 border border-border/30 bg-background/40 rounded-2xl p-5 flex flex-col justify-between h-36 relative overflow-hidden transform-gpu'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-xs'>
              Net Asset Allocation
            </span>
            <Wallet className='size-4 text-primary' />
          </div>
          <div>
            <motion.h4 className='text-2xl font-black tracking-tight text-foreground sm:text-3xl'>
              {rounded}
            </motion.h4>
            <div className='flex items-center gap-1 text-primary text-[10px] mt-1 font-bold'>
              <ArrowUpRight className='size-3' /> +12.4%{" "}
              <span className='text-muted-foreground/40 font-normal'>
                (24h)
              </span>
            </div>
          </div>
        </div>

        {/* Chart Block */}
        <div className='md:col-span-1 border border-border/30 bg-background/40 rounded-2xl p-5 flex flex-col justify-between h-36 transform-gpu'>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-muted-foreground text-xs'>
              Compute Cycles
            </span>
            <Cpu className='size-4 text-primary animate-pulse' />
          </div>
          <div className='flex-1 w-full flex items-end pt-2 relative h-12'>
            <svg
              className='w-full h-full text-primary/20 overflow-visible'
              viewBox='0 0 100 40'
              preserveAspectRatio='none'
            >
              {isInView && (
                <>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                    d='M0 35 Q15 15, 30 25 T60 5 T90 20 L100 10'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-primary drop-shadow-md'
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    d='M0 35 Q15 15, 30 25 T60 5 T90 20 L100 10 L100 40 L0 40 Z'
                    fill='currentColor'
                    className='text-primary/[0.05]'
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Logs Block */}
        <div className='md:col-span-1 border border-border/30 bg-background/40 rounded-2xl p-5 flex flex-col justify-between h-36 transform-gpu'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-muted-foreground text-xs'>
              Operational Logs
            </span>
            <Activity className='size-4 text-muted-foreground/60' />
          </div>
          <div className='flex-1 space-y-2 overflow-hidden text-[10px]'>
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-1.5 rounded border border-transparent ${i === 0 ? "bg-primary/5 border-primary/10 " + log.color : log.color}`}
              >
                <span className='truncate max-w-[120px]'>{log.text}</span>
                <span className='text-[8px] opacity-60 shrink-0'>
                  {log.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
