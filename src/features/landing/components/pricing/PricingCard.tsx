// src/features/landing/components/pricing/PricingCard.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ArrowRight } from "lucide-react";
import {
  OperationalPlan,
  BillingPeriod,
  CurrencyType,
} from "../../types/pricing.types";

interface PricingCardProps {
  plan: OperationalPlan;
  billingPeriod: BillingPeriod;
  currency: CurrencyType;
  calculatePrice: (
    baseMonthly: number,
    baseAnnual: number,
  ) => { symbol: string; convertedPrice: number };
  isActive?: boolean;
  isLoading?: boolean;
  onAction?: () => void;
  isSectionInView?: boolean;
}

export function PricingCard({
  plan,
  billingPeriod,
  currency,
  calculatePrice,
  isActive = false,
  isLoading = false,
  onAction,
  isSectionInView = true,
}: PricingCardProps) {
  const { symbol, convertedPrice } = calculatePrice(
    plan.basePriceMonthly,
    plan.basePriceAnnual,
  );
  const [liveCounter, setLiveCounter] = React.useState<number>(
    plan.metricTarget ?? 0,
  );

  React.useEffect(() => {
    if (!plan.metricTarget || !isSectionInView) return;

    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [plan.metricTarget, isSectionInView]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 70 },
        },
      }}
      whileHover={plan.isHero ? { rotate: 2, scale: 1.03, y: -5 } : { y: -5 }}
      // 🚀 Fixed: Reduce backdrop-blur intensity on mobile to make the initial render lighter
      className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-card/20 backdrop-blur-md md:backdrop-blur-xl border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group transition-all duration-500 min-h-[550px] ${
        plan.isHero
          ? "lg:scale-105 z-10 border-primary/30 will-change-transform"
          : "z-0"
      }`}
    >
      {plan.isHero && isSectionInView && (
        <>
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className='absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none blur-xl md:blur-2xl transform-gpu'
          />
          <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className='absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,_transparent_60%,_#84cc22_100%)] opacity-40 mix-blend-screen transform-gpu will-change-transform'
            />
          </div>
          <div className='absolute inset-[1px] bg-[#09090b]/95 rounded-[22px] z-0 pointer-events-none' />
        </>
      )}

      {/* Card header section */}
      <div className='relative z-10'>
        <div className='flex items-start justify-between mb-4'>
          <h3 className='text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 flex flex-col sm:flex-row sm:items-center gap-2'>
            {plan.name}
            {isActive && (
              <span className='text-[10px]  font-normal border border-border/80 text-muted-foreground bg-background/50 px-2 py-0.5 rounded'>
                Active Context
              </span>
            )}
          </h3>

          <div className='flex flex-col items-end gap-1.5 mt-0.5'>
            {billingPeriod === "annual" && plan.isHero && (
              <span className='text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded border bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(132,204,34,0.1)]'>
                Save 32%
              </span>
            )}
            {plan.badge && (
              <span className='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-black'>
                {plan.badge}
              </span>
            )}
          </div>
        </div>

        <p className='text-xs text-muted-foreground/80 leading-relaxed min-h-[32px]'>
          {plan.description}
        </p>

        {/* Price */}
        <div className='my-6 pt-4 border-t border-white/[0.04] flex items-baseline justify-between'>
          <div>
            {plan.basePriceMonthly === 0 ? (
              <h4 className='text-3xl font-black tracking-tight text-foreground'>
                Custom
              </h4>
            ) : (
              <div className='flex items-baseline gap-1'>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={`${currency}-${billingPeriod}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className='text-4xl font-black  text-foreground'
                  >
                    {symbol}
                    {convertedPrice}
                  </motion.span>
                </AnimatePresence>
                <span className='text-xs text-muted-foreground '>
                  /{billingPeriod === "monthly" ? "mo" : "yr"}
                </span>
              </div>
            )}
          </div>

          {plan.metricLabel && (
            <div className='text-right flex flex-col'>
              <span className='text-[13px] font-black text-primary'>
                {liveCounter?.toLocaleString()}+
              </span>
              <span className='text-[8px] text-muted-foreground/60 uppercase tracking-widest font-bold'>
                {plan.metricLabel}
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className='space-y-3 my-6'>
          {plan.features.map((feat, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -5 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`flex items-center gap-3 text-xs transition-all duration-500 ${
                feat.included
                  ? "text-foreground/90"
                  : "text-muted-foreground/30 line-through"
              }`}
            >
              <div
                className={`p-0.5 rounded transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(132,204,34,0.4)]`}
              >
                {feat.included ? (
                  <Check className='size-3.5 text-primary' />
                ) : (
                  <X className='size-3.5 text-muted-foreground/40' />
                )}
              </div>
              <span className='group-hover:translate-x-0.5 transition-transform duration-500'>
                {feat.text}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className='relative z-10 mt-auto pt-4'>
        <button
          onClick={onAction}
          disabled={isActive || isLoading}
          className={`w-full h-11 rounded-xl flex items-center justify-center gap-2 text-xs font-medium transition-all duration-300 border shadow-md transform ${
            isActive
              ? "bg-muted/30 text-muted-foreground border-border/40 cursor-not-allowed"
              : isLoading
                ? "bg-primary/20 text-primary border-primary/50 cursor-wait"
                : plan.isHero
                  ? "bg-primary text-black border-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(132,204,34,0.3)]"
                  : "bg-white/5 text-foreground border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
          }`}
        >
          {isLoading
            ? "Redirecting..."
            : isActive
              ? "Active Plan"
              : plan.actionText}
          {!isActive && !isLoading && (
            <ArrowRight className='size-3.5 transition-transform duration-300 group-hover:translate-x-1.5' />
          )}
        </button>
      </div>
    </motion.div>
  );
}
