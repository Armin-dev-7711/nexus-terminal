// src/features/landing/components/testimonials/TestimonialCard.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { Star, ShieldCheck } from "lucide-react";
import { OperatorFeedback } from "../../types/testimonial.types";

interface TestimonialCardProps {
  item: OperatorFeedback;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // 🚀 فیکس شد: در موبایل بلر خاموش و پس‌زمینه سالید (Solid) است. در دسکتاپ بلر فعال می‌شود.
      className='w-[380px] shrink-0 rounded-2xl p-6 bg-zinc-950 md:bg-card/20 border border-white/10 backdrop-blur-none md:backdrop-blur-md relative group/card select-none flex flex-col justify-between shadow-xl transform-gpu'
    >
      <div
        // 🚀 فیکس شد: غیرفعال کردن پترن سنگین در موبایل
        className='hidden md:block absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay rounded-2xl transform-gpu'
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
          backgroundSize: "100px 100px",
        }}
      />

      <motion.div
        // 🚀 فیکس شد: غیرفعال کردن گرادیان ماوس در موبایل (چون ماوس وجود ندارد)
        className='hidden md:block absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl z-0 rounded-2xl transform-gpu'
        style={{
          background: useMotionTemplate`radial-gradient(150px circle at ${useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"])}, rgba(132,204,34,0.15), transparent)`,
        }}
      />

      {/* بقیه محتوای کارت بدون تغییر... */}
      <div className='relative z-10'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='size-9 rounded-full bg-gradient-to-br from-primary/30 to-emerald-500/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary tracking-tighter'>
              {item.initials}
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-black text-foreground'>
                {item.name}
              </span>
              <span className='text-[10px] text-muted-foreground flex items-center gap-1'>
                {item.flag} {item.country}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-end gap-1 text-[9px]'>
            <span className='bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(52,211,153,0.1)]'>
              {item.nodeStatus}
            </span>
            <span className='text-muted-foreground/40'>{item.latency}</span>
          </div>
        </div>
        <p className='text-[13px] text-muted-foreground/90 leading-relaxed font-medium mb-5 min-h-[64px]'>
          &quot;{item.feedback}&quot;
        </p>
      </div>

      <div className='relative z-10 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[9px]'>
        <div className='flex items-center gap-0.5'>
          {[...Array(item.rating)].map((_, i) => (
            <Star
              key={i}
              className='size-3.5 text-primary fill-primary drop-shadow-[0_0_4px_rgba(132,204,34,0.6)]'
            />
          ))}
        </div>
        <div className='flex items-center gap-3 text-muted-foreground/50'>
          <div className='flex items-center gap-1 text-primary/80'>
            <ShieldCheck className='size-3.5 text-primary' />
            <span className='font-bold uppercase tracking-wider text-[9px]'>
              Verified Operator
            </span>
          </div>
          <span className='text-muted-foreground/30'>{item.timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
}
