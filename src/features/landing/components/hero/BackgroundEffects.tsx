// src/features/landing/components/hero/BackgroundEffects.tsx
"use client";

import * as React from "react";
import { motion, useMotionTemplate, useTransform } from "motion/react";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function BackgroundEffects() {
  const { normX, normY } = useMouseParallax();

  const bgX = useTransform(normX, (v) => `${v * 100}%`);
  const bgY = useTransform(normY, (v) => `${v * 100}%`);

  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${bgX} ${bgY}, rgba(132, 204, 34, 0.08), transparent 50%)`;

  return (
    <div className='absolute inset-0 z-0 overflow-hidden bg-[#050507] pointer-events-none'>
      <motion.div
        className='absolute inset-0 z-10 opacity-70 will-change-[background]'
        style={{ background: spotlightBackground }}
      />

      <div className='absolute inset-0 opacity-[0.03] transform-gpu will-change-transform'>
        <div
          className='size-full animate-scrolling-pattern'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M44 0 L0 0 L0 44'/%3E%3Ccircle cx='0' cy='0' r='1' fill='%236fd135'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, #000 60%, transparent 100%)",
          }}
        />
      </div>

      <div className='absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/10 via-emerald-500/5 to-transparent rounded-full blur-[80px] md:blur-[140px] transform-gpu' />

      <div
        className='absolute inset-0 opacity-[0.03] mix-blend-overlay'
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}
