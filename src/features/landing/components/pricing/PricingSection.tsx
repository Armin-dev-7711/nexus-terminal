// src/features/landing/components/pricing/PricingSection.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
  useInView,
} from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import {
  OPERATIONAL_PLANS,
  PRICING_SOCIAL_PROOF,
} from "../../constants/pricing.data";
import dynamic from "next/dynamic";
import { CurrencyType } from "../../types/pricing.types";
import { usePricingState } from "../../hooks/usePricingState";
import { PricingCard } from "./PricingCard";

const DynamicPricingCard = dynamic(
  () => import("./PricingCard").then((mod) => mod.PricingCard),
  {
    ssr: false,
    loading: () => (
      <div className='min-h-[550px] w-full rounded-3xl bg-card/10 animate-pulse border border-white/[0.06]' />
    ),
  },
);

export function PricingSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  const {
    billingPeriod,
    currency,
    toggleBilling,
    changeCurrency,
    calculatePrice,
  } = usePricingState();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // 🚀 Spotlight Stage: Physically track mouse coordinates on the background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightBackground = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(132,204,34,0.06), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className='w-full py-24 md:py-32 relative bg-[#050507] overflow-hidden flex flex-col items-center'
    >
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div
          className='absolute inset-0 opacity-[0.05] mix-blend-screen'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='1'/%3E%3C/svg%3E")`,
          }}
        />

        {isInView && (
          <motion.div
            className='hidden md:block absolute inset-0 opacity-40 mix-blend-screen blur-[100px] transform-gpu'
            style={{ background: spotlightBackground }}
          />
        )}
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className='w-full flex flex-col items-center'
        >
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
              Operational Scale
            </div>

            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight'>
              Choose Your{" "}
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
                Operational Level.
              </motion.span>
            </h2>
            <p className='text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-medium'>
              Whether you&apos;re managing a personal portfolio or operating
              institutional capital, Nexus scales with you.
            </p>
          </motion.div>

          <div className='flex flex-col sm:flex-row items-center gap-4 mb-16 relative z-30'>
            <div className='flex items-center gap-1 bg-black/40 border border-white/5 p-1 rounded-xl backdrop-blur-md'>
              <button
                onClick={toggleBilling}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${billingPeriod === "monthly" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Monthly
              </button>
              <button
                onClick={toggleBilling}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${billingPeriod === "annual" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Annual
              </button>
            </div>

            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='h-10 px-4 rounded-xl flex items-center gap-2 bg-black/40 border border-white/5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all backdrop-blur-md'
              >
                <Globe className='size-3.5 text-primary' />
                <span>
                  Currency: <span className='text-foreground'>{currency}</span>
                </span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className='absolute top-12 left-0 right-0 rounded-xl border border-white/5 bg-black/80 backdrop-blur-xl p-1 z-50 flex flex-col overflow-hidden shadow-2xl'
                  >
                    {(["USD", "EUR", "GBP"] as CurrencyType[]).map((cur) => (
                      <button
                        key={cur}
                        onClick={() => {
                          changeCurrency(cur);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${currency === cur ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                      >
                        {cur}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className='grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-center mb-24'
          >
            {OPERATIONAL_PLANS.map((plan) => (
              <DynamicPricingCard
                key={plan.id}
                plan={plan}
                billingPeriod={billingPeriod}
                currency={currency}
                calculatePrice={calculatePrice}
                isSectionInView={isInView}
              />
            ))}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='w-full max-w-5xl border-t border-white/[0.04] pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
          >
            {PRICING_SOCIAL_PROOF.map((proof, index) => (
              <div key={index} className='flex flex-col gap-1'>
                <span className='text-xl md:text-3xl font-black text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60'>
                  {proof.value}
                </span>
                <span className='text-[10px] text-muted-foreground/60 uppercase font-bold tracking-widest'>
                  {proof.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
