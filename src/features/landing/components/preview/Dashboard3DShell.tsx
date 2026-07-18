// src/features/landing/components/preview/Dashboard3DShell.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

interface Dashboard3DShellProps {
  children: React.ReactNode;
}

export function Dashboard3DShell({ children }: Dashboard3DShellProps) {
  const boundingRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  const shadowX = useTransform(smoothX, [0, 1], [30, -30]);
  const shadowY = useTransform(smoothY, [0, 1], [30, -30]);
  const dynamicShadow = useMotionTemplate`${shadowX}px ${shadowY}px 60px -15px rgba(0,0,0,0.7)`;

  const reflectionX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const reflectionY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if (!boundingRef.current) return;

    const rect = boundingRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      style={{ perspective: "2500px" }}
      className='w-full max-w-[1100px] mx-auto z-10 px-4'
    >
      <motion.div
        ref={boundingRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow: dynamicShadow,
          transformStyle: "preserve-3d",
        }}
        className='relative w-full h-full min-h-[550px] lg:h-auto lg:aspect-[16/10] rounded-2xl md:rounded-[2rem] bg-[#0c0c0e] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col cursor-crosshair will-change-transform transform-gpu'
      >
        {/* 🚀 فیکس شد: غیرفعال کردن لایه رفلکشن نوری سنگین روی موبایل */}
        <motion.div
          className='hidden md:block absolute inset-0 z-50 pointer-events-none rounded-[2rem] mix-blend-overlay opacity-50'
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${reflectionX} ${reflectionY}, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div
          className='hidden md:block absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay transform-gpu'
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
            backgroundSize: "100px 100px",
          }}
        />

        <div className='relative z-10 w-full h-full flex flex-col pointer-events-auto'>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
