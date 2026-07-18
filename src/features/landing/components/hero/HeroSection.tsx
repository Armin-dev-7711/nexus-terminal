// src/features/landing/components/hero/HeroSection.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic"; // 🚀 اضافه شد برای بارگذاری تنبل
import { ArrowRight, Terminal, MouseIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "./BackgroundEffects";
import { MagneticWrapper } from "./MagneticWrapper";
import { useMouseParallax } from "../../hooks/useMouseParallax";

import {
  containerVariants,
  fullTitleVariants,
  fadeUpVariants,
  dashboardFloatVariants,
} from "../../constants/animations";

const MiniDashboardPreview = dynamic(
  () =>
    import("./MiniDashboardPreview").then((mod) => mod.MiniDashboardPreview),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-[400px] animate-pulse bg-white/5 rounded-3xl' />
    ),
  },
);

export function HeroSection() {
  const { x, y } = useMouseParallax();

  const titleWordsLine1 = "Manage Your Digital Assets";
  const titleWordsLine2 = "Like Never Before.";

  return (
    <div className='min-h-[100svh] w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#050507] px-4 pt-28 pb-10'>
      <BackgroundEffects />

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='w-full max-w-5xl text-center space-y-6 relative z-10 mb-10 flex flex-col items-center'
      >
        <motion.div
          variants={fadeUpVariants}
          className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(132,204,34,0.1)]'
        >
          <Terminal className='size-3.5 animate-pulse' />
          Nexus Operational Cluster Active
        </motion.div>

        <motion.h1
          variants={fullTitleVariants}
          className='text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] max-w-4xl flex flex-col items-center gap-1.5'
        >
          <span className='inline-block'>{titleWordsLine1}</span>
          <span className='w-full flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1'>
            <span className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary/80 drop-shadow-[0_0_20px_rgba(132,204,34,0.3)]'>
              {titleWordsLine2}
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          className='text-xs sm:text-sm text-muted-foreground/80 leading-relaxed max-w-lg mx-auto font-medium'
        >
          Powered by intelligent AI analytics. Track your decentralized
          portfolio and manage node arrays in one beautifully engineered
          terminal.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className='flex flex-wrap items-center justify-center gap-4 pt-4'
        >
          <MagneticWrapper>
            <Button
              asChild
              className='h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 text-xs shadow-[0_0_30px_rgba(132,204,34,0.25)] transition-colors cursor-pointer group'
            >
              <Link href='/auth/login'>
                Enter Nexus{" "}
                <ArrowRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </MagneticWrapper>

          <MagneticWrapper>
            <Button
              asChild
              variant='outline'
              className='h-12 rounded-xl border-border/40 bg-card/10 backdrop-blur-md text-foreground hover:bg-muted/30 font-bold px-6 text-xs cursor-pointer transition-colors'
            >
              <a href='#features'>Explore Core Features</a>
            </Button>
          </MagneticWrapper>
        </motion.div>
      </motion.div>

      {/* 2. Floating Dashboard Connected to Parallax */}
      <motion.div
        variants={dashboardFloatVariants}
        initial='hidden'
        animate='visible'
        style={{ x, y }}
        className='w-full max-w-[65%] min-w-[320px] relative z-10 px-2 will-change-transform transform-gpu'
      >
        <div className='absolute -inset-1 bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-3xl blur-xl md:blur-2xl opacity-50 pointer-events-none transform-gpu' />
        <MiniDashboardPreview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className='absolute bottom-0 max-[400px]:hidden z-50 flex flex-col items-center gap-2 text-muted-foreground/50 z-20'
      >
        <MouseIcon className='size-4 animate-bounce' />
        <span className='text-[9px] uppercase tracking-widest'>
          Scroll Protocol
        </span>
      </motion.div>
    </div>
  );
}
