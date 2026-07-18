// مسیر: src/features/landing/components/cta/TerminalWindow.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";

const BOOT_SEQUENCE = [
  "> Initializing Nexus...",
  "> Loading Core Engine...",
  "> Connecting Secure Node...",
  "> Authenticating...",
  "> Portfolio Synced",
  "> Ready.",
];

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = React.useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!isInView) return;

    if (currentIndex < BOOT_SEQUENCE.length) {
      const timeout = setTimeout(
        () => {
          setVisibleLines((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
          setCurrentIndex((prev) => prev + 1);
        },
        Math.random() * 500 + 400,
      );
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isInView]);

  return (
    <motion.div
      ref={containerRef}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className='w-full max-w-md mx-auto mt-16 rounded-xl overflow-hidden bg-black/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-20'
    >
      <div className='h-10 bg-white/[0.02] border-b border-white/5 flex items-center px-4 gap-2'>
        <div className='size-3 rounded-full bg-rose-500/80 border border-rose-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
        <div className='size-3 rounded-full bg-amber-500/80 border border-amber-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
        <div className='size-3 rounded-full bg-emerald-500/80 border border-emerald-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
      </div>

      <div className='p-5 text-[11px] md:text-xs text-primary/80 leading-loose flex flex-col items-start min-h-[220px]'>
        {visibleLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex items-center'
          >
            <span className='text-muted-foreground mr-2'>
              {/* 🚀 فیکس شد: اضافه شدن گارد امنیتی خط (line) برای جلوگیری از ارور اسپلیت */}
              {line ? line.split(" ")[0] : ""}
            </span>
            <span>{line ? line.substring(2) : ""}</span>
          </motion.div>
        ))}
        {isInView && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className='w-2 h-4 bg-primary mt-1 inline-block'
          />
        )}
      </div>
    </motion.div>
  );
}
