// src/features/landing/components/feature/FeaturesSection.tsx
"use client";

import * as React from "react";
import { motion, Variants } from "motion/react";
import { Feature3DCard } from "./Feature3DCard";
import { platformFeatures } from "../../constants/features.data";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  return (
    <section className='w-full py-24 md:py-32 relative z-20 bg-[#050507] overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none z-0 overflow-hidden'>
        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay'
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Central Great Halo (Aurora) */}
        <div className='absolute top-[-5%] md:top-0 left-1/2 -translate-x-1/2 w-[150vw] md:w-[1200px] h-[350px] md:h-[700px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-primary/5 to-transparent blur-[80px] md:blur-[120px] transform-gpu' />

        {/* Desktop side halos */}
        <div className='hidden md:block absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] transform-gpu' />
        <div className='hidden md:block absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] transform-gpu' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
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
            System Capabilities
          </div>

          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight'>
            Engineered for{" "}
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
              Scale.
            </motion.span>
          </h2>
          <p className='text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-medium'>
            We stripped away the noise to build a highly robust, secure, and
            lightning-fast terminal designed for the future of decentralized
            finance.
          </p>
        </motion.div>

        <div className='relative'>
          {/* Desktop first communication lines */}
          <div className='absolute top-[20px] left-0 right-0 h-[80px] hidden lg:block z-0 pointer-events-none'>
            <svg
              className='w-full h-full'
              preserveAspectRatio='none'
              viewBox='0 0 1000 100'
            >
              <defs>
                <linearGradient id='streamGrad1' x1='0' y1='0' x2='1' y2='0'>
                  <stop offset='0%' stopColor='transparent' />
                  <stop offset='50%' stopColor='rgba(52, 211, 153, 0.4)' />
                  <stop offset='100%' stopColor='transparent' />
                </linearGradient>
              </defs>
              <path
                d='M 0 50 C 150 20, 350 80, 500 50 C 650 20, 850 80, 1000 50'
                fill='none'
                stroke='url(#streamGrad1)'
                strokeWidth='1'
              />
              <path
                d='M 0 50 C 200 80, 300 20, 500 50 C 700 80, 800 20, 1000 50'
                fill='none'
                stroke='url(#streamGrad1)'
                strokeWidth='0.5'
              />
              <motion.path
                d='M 0 50 C 150 20, 350 80, 500 50 C 650 20, 850 80, 1000 50'
                fill='none'
                stroke='rgba(52, 211, 153, 0.8)'
                strokeWidth='1.5'
                strokeDasharray='4 250'
                animate={{ strokeDashoffset: [254, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Desktop second communication lines */}
          <div className='absolute top-[40px] left-0 right-0 h-[80px] hidden lg:block z-0 pointer-events-none opacity-40'>
            <svg
              className='w-full h-full'
              preserveAspectRatio='none'
              viewBox='0 0 1000 100'
            >
              <path
                d='M 0 50 C 150 20, 350 80, 500 50 C 650 20, 850 80, 1000 50'
                fill='none'
                stroke='url(#streamGrad1)'
                strokeWidth='1'
              />
              <path
                d='M 0 50 C 200 80, 300 20, 500 50 C 700 80, 800 20, 1000 50'
                fill='none'
                stroke='url(#streamGrad1)'
                strokeWidth='0.5'
              />
              <motion.path
                d='M 0 50 C 150 20, 350 80, 500 50 C 650 20, 850 80, 1000 50'
                fill='none'
                stroke='rgba(52, 211, 153, 0.8)'
                strokeWidth='1.5'
                strokeDasharray='4 250'
                animate={{ strokeDashoffset: [254, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <motion.div
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: "-100px" }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pt-8'
          >
            {platformFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className='relative z-10 hover:z-20 transform-gpu'
              >
                <Feature3DCard
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                  visualType={feature.visualType}
                  actionText={feature.actionText}
                  onHoverStart={() => setHoveredCard(feature.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
