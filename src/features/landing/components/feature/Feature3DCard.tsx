// src/features/landing/components/feature/Feature3DCard.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { LucideIcon } from "lucide-react";
import { FeatureLiveVisuals } from "./FeatureLiveVisuals";

interface Feature3DCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  visualType: string;
  actionText: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function Feature3DCard({
  title,
  description,
  icon: Icon,
  color,
  visualType,
  actionText,
  onHoverStart,
  onHoverEnd,
}: Feature3DCardProps) {
  const boundingRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
  });
  const rotateY = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if (!boundingRef.current) return;

    const rect = boundingRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const rX = (y / rect.height - 0.5) * -10;
    const rY = (x / rect.width - 0.5) * 10;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverEnd();
  };

  return (
    <div style={{ perspective: "1200px" }} className='w-full h-full relative'>
      <motion.div
        ref={boundingRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={onHoverStart}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className='relative group w-full h-[320px] rounded-3xl transition-transform duration-500 hover:scale-[1.02] cursor-pointer'
      >
        <div className='absolute inset-0 rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl overflow-hidden group-hover:border-border/60 transition-colors duration-500 group-hover:bg-card/30 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'>
          <motion.div
            className='absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen'
            style={{
              background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(132, 204, 34, 0.12), transparent 80%)`,
            }}
          />

          <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] via-[#050507]/90 to-transparent translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-start px-8 pb-6 z-20 pointer-events-none'>
            <span className='text-xs font-bold text-primary translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100'>
              {actionText}
            </span>
          </div>
        </div>

        <div
          style={{
            transform: "translateZ(60px)",
            backfaceVisibility: "hidden",
          }}
          className='absolute -top-6 left-8 size-14 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex items-center justify-center group-hover:-translate-y-3 group-hover:rotate-6 transition-all duration-500 ease-out z-30'
        >
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-20 mix-blend-overlay`}
          />
          <Icon className='size-6 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' />
        </div>

        <div
          style={{
            transform: "translateZ(40px)",
            backfaceVisibility: "hidden",
          }}
          className='relative z-10 flex flex-col h-full p-8 pt-12 pointer-events-none antialiased'
        >
          <h3 className='text-lg font-black text-foreground mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-500'>
            {title}
          </h3>

          <p className='text-xs text-muted-foreground/80 leading-relaxed group-hover:opacity-60 transition-opacity duration-500'>
            {description}
          </p>

          <div className='mt-auto transition-transform duration-500 group-hover:-translate-y-7 relative z-10'>
            <FeatureLiveVisuals type={visualType} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
