// src/features/billing/components/PricingSection.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { PricingCard } from "@/features/landing/components/pricing/PricingCard";
import { OPERATIONAL_PLANS } from "@/features/landing/constants/pricing.data";
import { usePricingState } from "@/features/landing/hooks/usePricingState";
import { useSubscriptionCheckout } from "../hooks/useSubscriptionCheckout";

export function PricingSection() {
  const searchParams = useSearchParams();
  const {
    userPlan,
    loadingPlanId,
    handleSubscribe,
    handleManageSubscription,
  } = useSubscriptionCheckout();

  // Use landing engine to control monthly/annual toggle
  const { billingPeriod, currency, toggleBilling, calculatePrice } =
    usePricingState();

  // 🚀 Display notification for Stripe purchase success or cancellation
  React.useEffect(() => {
    if (searchParams.get("success") === "true") {
      const planName = searchParams.get("plan") || "new subscription";
      toast.success("Payment completed successfully 🎉", {
        description: `The ${planName.toUpperCase()} plan has been successfully activated for your account.`,
        duration: 6000,
      });
    } else if (searchParams.get("canceled") === "true") {
      toast.info("Payment process canceled", {
        description: "No funds were deducted from your account. You can try again anytime.",
      });
    }
  }, [searchParams]);

  return (
    <div className='space-y-8 pt-6 relative'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-primary/5 rounded-full blur-[100px] pointer-events-none' />

      {/* Monthly/Yearly Switch Button */}
      <div className='flex justify-center relative z-10'>
        <div className='flex items-center bg-background/50 p-1.5 border border-border/60 rounded-2xl backdrop-blur-xl shadow-inner'>
          <button
            onClick={() => billingPeriod !== "monthly" && toggleBilling()}
            className={cn(
              "rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer",
              billingPeriod === "monthly"
                ? "bg-muted/80 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => billingPeriod !== "annual" && toggleBilling()}
            className={cn(
              "rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer",
              billingPeriod === "annual"
                ? "bg-muted/80 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Annually
            <Badge className='bg-primary/20 text-primary border-0  text-[9px] h-4 px-1 rounded-md'>
              Save 32%
            </Badge>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 w-full items-center relative z-10 mt-8'>
        {OPERATIONAL_PLANS.map((plan) => {
          const isActive = userPlan === plan.id;
          const isLoading = loadingPlanId === plan.id;

          return (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              currency={currency}
              calculatePrice={calculatePrice}
              isActive={isActive}
              isLoading={isLoading}
              onAction={() =>
                isActive
                  ? handleManageSubscription()
                  : handleSubscribe(plan.id, billingPeriod)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

