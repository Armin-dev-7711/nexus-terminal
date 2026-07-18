// src/features/landing/components/testimonials/TestimonialsSection.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import {
  TESTIMONIALS_ROW_1,
  TESTIMONIALS_ROW_2,
} from "../../constants/testimonial.data";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, { margin: "300px" });

  const repeatedRow1 = [
    ...TESTIMONIALS_ROW_1,
    ...TESTIMONIALS_ROW_1,
    ...TESTIMONIALS_ROW_1,
  ];
  const repeatedRow2 = [
    ...TESTIMONIALS_ROW_2,
    ...TESTIMONIALS_ROW_2,
    ...TESTIMONIALS_ROW_2,
  ];

  return (
    <section
      ref={sectionRef}
      className='w-full py-24 md:py-32 relative bg-[#050507] overflow-hidden flex flex-col items-center justify-center'
    >
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px] transform-gpu' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center mb-20'>
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
            Verified Network Feedback
          </div>

          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight'>
            Trusted By{" "}
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
              Operators
            </motion.span>{" "}
            Worldwide
          </h2>
          <p className='text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-medium'>
            Real-time consensus telemetry stream. Pure immutable validation
            nodes broadcast direct states from the cryptographic terminal
            clusters.
          </p>
        </motion.div>
      </div>

      {isInView && (
        <div className='w-full relative z-10 flex flex-col gap-6 overflow-hidden'>
          <div className='absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-[#050507] to-transparent z-20 pointer-events-none' />
          <div className='absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-[#050507] to-transparent z-20 pointer-events-none' />

          <div className='w-full flex overflow-hidden'>
            <div className='flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused] py-4 will-change-transform'>
              {repeatedRow1.map((item, idx) => (
                <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>

          <div className='w-full flex overflow-hidden'>
            <div className='flex gap-6 w-max animate-marquee-right hover:[animation-play-state:paused] py-4 will-change-transform'>
              {repeatedRow2.map((item, idx) => (
                <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
