// src/features/landing/components/cta/FinalCTASection.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";
import { FloatingMetrics } from "./FloatingMetrics";

export function FinalCTASection() {
  const containerRef = React.useRef<HTMLElement>(null);

  const isInView = useInView(containerRef, { margin: "100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const terminalX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const terminalY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className='w-full min-h-[120vh] relative bg-[#050507] overflow-hidden flex flex-col items-center justify-center'
    >
      <div className='absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]'>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 60 0 L 0 0 0 60\' fill=\'none\' stroke=\'white\' strokeWidth=\'1\'/%3E%3C/svg%3E')]" />

        {isInView && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-full blur-[180px] transform-gpu'
          />
        )}

        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay transform-gpu'
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <FloatingMetrics
        smoothX={smoothX}
        smoothY={smoothY}
        isSectionInView={isInView}
      />

      <div className='max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center text-center'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className='flex flex-col items-center'
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='mb-8'
          >
            <div className='inline-flex items-center gap-2 bg-muted/20 border border-border/40 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest text-muted-foreground shadow-inner backdrop-blur-md'>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className='size-1.5 rounded-full bg-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]'
              />
              System Ready
            </div>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter text-foreground leading-[1.1] mb-6'
          >
            The Future Starts <br />{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-emerald-200'>
              Now.
            </span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='text-sm md:text-base text-muted-foreground/80 leading-relaxed font-medium max-w-lg mb-10'
          >
            Nexus is not just another dashboard. It is a comprehensive operating
            system built to orchestrate and scale modern digital assets
            seamlessly.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'
          >
            <button className='w-full sm:w-auto h-12 px-7 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all duration-500 bg-primary text-black border border-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(132,204,34,0.3)] group overflow-hidden relative'>
              <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out' />
              <span className='relative z-10 flex items-center gap-2'>
                Launch Dashboard{" "}
                <ArrowRight className='size-4 group-hover:translate-x-1.5 transition-transform duration-300' />
              </span>
            </button>
            <button className='w-full sm:w-auto h-12 px-7 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all duration-300 bg-black/40 text-foreground border border-white/10 hover:bg-white/5 hover:border-white/20 backdrop-blur-xl group'>
              <Play className='size-4 text-muted-foreground group-hover:text-primary transition-colors' />{" "}
              View Live Demo
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.6,
            duration: 1,
            type: "spring",
            stiffness: 50,
          }}
          style={{ x: terminalX, y: terminalY }}
          className='w-full'
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  );
}
