// مسیر: src/features/landing/components/footer/FooterTerminal.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";

const SYSTEM_LOGS = [
  "> Initializing secure tunnel...",
  "> Resolving DNS nodes...",
  "> Portfolio synchronized",
  "> AI Engine online",
  "> Encryption active",
  "> Node connected [EU-Central]",
  "> Nexus Ready. Awaiting commands.",
];

export function FooterTerminal() {
  const [logs, setLogs] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView) return;
    let currentIndex = 0;

    const interval = setInterval(
      () => {
        if (currentIndex < SYSTEM_LOGS.length) {
          setLogs((prev) => [...prev, SYSTEM_LOGS[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      },
      Math.random() * 800 + 600,
    );

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className='w-full h-[220px] rounded-xl overflow-hidden bg-[#0c0c0e]/80 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col'
    >
      {/* Mac-style Header */}
      <div className='h-8 bg-white/[0.03] border-b border-white/5 flex items-center px-3 gap-2 shrink-0'>
        <div className='size-2.5 rounded-full bg-rose-500/50 border border-rose-500/50' />
        <div className='size-2.5 rounded-full bg-amber-500/50 border border-amber-500/50' />
        <div className='size-2.5 rounded-full bg-emerald-500/50 border border-emerald-500/50' />
        <span className='ml-auto text-[9px] text-muted-foreground/40 uppercase tracking-widest'>
          Sys_Log
        </span>
      </div>

      {/* Terminal Body */}
      <div className='p-4 text-[10px] text-primary/70 leading-loose flex flex-col items-start overflow-hidden relative flex-1'>
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-start'
          >
            <span className='text-muted-foreground/50 mr-2'>
              {log.split(" ")[0]}
            </span>
            <span>{log.substring(2)}</span>
          </motion.div>
        ))}
        {/* Blinking Cursor */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className='w-1.5 h-3 bg-primary mt-1 inline-block'
        />

        {/* Gradient fade at bottom to hide overflow elegantly */}
        <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0c0c0e]/80 to-transparent pointer-events-none' />
      </div>
    </motion.div>
  );
}
