// src/features/billing/hooks/usePricingPlan.ts
"use client";

import { useState, useTransition, useCallback } from "react";
import { toast } from "sonner";

export function usePricingPlan() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = useCallback((planName: string) => {
    if (planName === "Starter") return;

    startTransition(async () => {
      // Simulate the 2026 banking/crypto gateway buffer
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Checkout Initiated", {
        description: `Redirecting to secure terminal for ${planName}...`,
      });
    });
  }, []);

  return {
    isAnnual,
    setIsAnnual,
    isPending,
    handleUpgrade,
  };
}
