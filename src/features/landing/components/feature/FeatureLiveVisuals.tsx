// src/features/landing/components/feature/FeatureLiveVisuals.tsx
"use client";

import * as React from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
} from "motion/react";
import { Shield } from "lucide-react";

interface FeatureLiveVisualsProps {
  type: string;
}

export function FeatureLiveVisuals({ type }: FeatureLiveVisualsProps) {
  const visualRef = React.useRef<HTMLDivElement>(null);

  const isInView = useInView(visualRef, { once: false });

  const count = useMotionValue(142340);
  const rounded = useTransform(
    count,
    (latest) => `$${Math.round(latest).toLocaleString()}`,
  );

  React.useEffect(() => {
    if (type === "counter" && isInView) {
      const updateCounter = () => {
        const current = count.get();
        const target = current + Math.floor(Math.random() * 50) + 10;
        animate(count, target, { duration: 1.5, ease: "easeOut" });
      };

      const interval = setInterval(updateCounter, 3000);
      return () => clearInterval(interval);
    }
  }, [type, count, isInView]);

  return (
    <div ref={visualRef} className='w-full transform-gpu'>
      {isInView &&
        (() => {
          switch (type) {
            case "graph":
              return (
                <div className='w-full h-12 flex items-end relative overflow-hidden rounded-lg bg-background/20 border border-border/20 p-2 opacity-80 group-hover:opacity-100 transition-opacity'>
                  <svg
                    className='w-full h-full overflow-visible'
                    viewBox='0 0 100 40'
                    preserveAspectRatio='none'
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      d='M0 35 Q15 15, 30 25 T60 5 T90 20 L100 10'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-primary drop-shadow-[0_0_5px_rgba(132,204,34,0.8)]'
                    />
                  </svg>
                </div>
              );

            case "counter":
              return (
                <div className='w-full h-12 flex items-center justify-between rounded-lg bg-background/20 border border-border/20 px-3 opacity-80 group-hover:opacity-100 transition-opacity'>
                  <span className='text-[10px] text-muted-foreground uppercase tracking-widest'>
                    Net Value
                  </span>
                  <motion.span className='text-sm font-black text-primary drop-shadow-[0_0_8px_rgba(132,204,34,0.4)]'>
                    {rounded}
                  </motion.span>
                </div>
              );

            case "live-dot":
              return (
                <div className='w-full h-12 flex items-center justify-end rounded-lg bg-background/20 border border-border/20 px-3 opacity-80 group-hover:opacity-100 transition-opacity'>
                  <div className='flex items-center gap-2 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20'>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className='size-1.5 rounded-full bg-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]'
                    />
                    <span className='text-[9px] font-black text-amber-400 tracking-widest uppercase'>
                      Live Sync
                    </span>
                  </div>
                </div>
              );

            case "pulse-shield":
              return (
                <div className='w-full h-12 flex items-center justify-center rounded-lg bg-background/20 border border-border/20 relative opacity-80 group-hover:opacity-100 transition-opacity overflow-hidden'>
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className='absolute size-6 rounded-full border border-rose-500/50'
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1,
                    }}
                    className='absolute size-6 rounded-full border border-rose-500/50'
                  />
                  <Shield className='size-4 text-rose-400 relative z-10 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]' />
                </div>
              );

            default:
              return null;
          }
        })()}
    </div>
  );
}
