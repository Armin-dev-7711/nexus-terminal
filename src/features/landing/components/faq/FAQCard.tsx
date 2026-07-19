// src/features/landing/components/faq/FAQCard.tsx
"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { ChevronDown, Clock, ArrowRight } from "lucide-react";
import { FAQItem } from "../../types/faq.types";
import { CATEGORY_COLORS } from "../../constants/faq.data";

interface FAQCardProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQCard({ item, isOpen, onToggle }: FAQCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // 🚀 فیکس شد: اضافه کردن هوک موبایل برای خاموش کردن پردازش‌های سنگین
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Spotlight Effect Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={false}
      animate={{
        backgroundColor: isOpen
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.01)",
      }}
      className='w-full relative group overflow-hidden rounded-2xl border border-white/5 transition-colors duration-500 transform-gpu'
    >
      {/* 🚀 فیکس شد: جلوگیری از رندر شدن اسپات‌لایت هنگام لمس (Touch) در موبایل */}
      <motion.div
        className='hidden md:block absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0'
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(132,204,34,0.08), transparent 80%)`,
        }}
      />

      <button
        onClick={onToggle}
        className='relative z-10 w-full flex items-start justify-between p-6 md:p-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset rounded-2xl cursor-pointer'
      >
        <div className='flex flex-col gap-3 pr-6 sm:pr-8 w-full'>
          <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
            <span
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${CATEGORY_COLORS[item.category] || "text-gray-400 bg-gray-500/10 border-gray-500/20"}`}
            >
              {item.category}
            </span>

            <span className='text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap'>
              <Clock className='size-3' /> {item.readTime}
            </span>
          </div>
          <h3
            className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground group-hover:text-foreground/80"}`}
          >
            {item.question}
          </h3>
        </div>

        <div className='shrink-0 mt-2'>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <ChevronDown
              className={`size-5 transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            // 🚀 فیکس شد: فیلتر بلر (blur) که قاتل GPU است، از نسخه موبایل حذف شد
            initial={{
              height: 0,
              opacity: 0,
              filter: isMobile ? "none" : "blur(4px)",
            }}
            animate={{
              height: "auto",
              opacity: 1,
              filter: isMobile ? "none" : "blur(0px)",
            }}
            exit={{
              height: 0,
              opacity: 0,
              filter: isMobile ? "none" : "blur(4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
            // 🚀 فیکس شد: استفاده از will-change برای خبر دادن به مرورگر قبل از انیمیشن
            className='relative z-10 overflow-hidden will-change-[height,opacity]'
          >
            <div className='px-6 pb-6 md:px-8 md:pb-8 pt-0 flex flex-col gap-6'>
              <p className='text-sm text-muted-foreground leading-relaxed md:leading-loose'>
                {item.answer}
              </p>

              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.04]'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest'>
                    Related Topics
                  </span>
                  <div className='flex flex-wrap items-center gap-2'>
                    {item.relatedTopics.map((topic, i) => (
                      <motion.span
                        key={topic}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className='text-[10px] text-muted-foreground bg-black/40 border border-white/5 px-2 py-1 rounded-md hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer'
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <button className='flex items-center gap-1.5 text-[11px] font-bold text-primary hover:text-emerald-400 transition-colors group/link mt-2 sm:mt-0'>
                  Read Documentation{" "}
                  <ArrowRight className='size-3 group-hover/link:translate-x-1 transition-transform' />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
