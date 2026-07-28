// src/features/billing/hooks/useSubscriptionCheckout.ts
"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export function useSubscriptionCheckout() {
  const { data: session, isPending: isAuthPending } = useSession();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // 🚀 1. Handle subscription flow or login check
  const handleSubscribe = useCallback(
    async (planId: string, billingPeriod: "monthly" | "annual" = "monthly") => {
      // 🛡️ Main check: verify user authentication
      if (!session?.user) {
        toast.error("Authentication required 🔒", {
          description:
            "Please log in to your account to purchase a subscription.",
          action: {
            label: "Login / Register",
            onClick: () => {
              const callback = encodeURIComponent(pathname || "/dashboard/billing");
              router.push(`/auth/login?callbackUrl=${callback}`);
            },
          },
          duration: 5000,
        });

        // Smart redirect after short delay for better UX
        setTimeout(() => {
          const callback = encodeURIComponent(pathname || "/dashboard/billing");
          router.push(`/auth/login?callbackUrl=${callback}`);
        }, 1200);

        return;
      }

      // User logged in -> proceed with Stripe checkout session
      setLoadingPlanId(planId);
      const toastId = toast.loading("Connecting to secure Stripe gateway...");

      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planId, billingPeriod }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to communicate with Stripe.");
        }

        if (data.url) {
          if (data.url.startsWith("mailto:")) {
            toast.success("Opening inquiry email client...", { id: toastId });
            window.location.href = data.url;
            setLoadingPlanId(null);
          } else {
            toast.success("Redirecting to checkout...", { id: toastId });
            window.location.href = data.url;
          }
        } else {
          throw new Error("Payment gateway URL was not received.");
        }
      } catch (err) {
        console.error("Subscription Checkout error:", err);
        const description = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        toast.error("Checkout process failed", {
          id: toastId,
          description,
        });
        setLoadingPlanId(null);
      }
    },
    [session, pathname, router],
  );

  // 🚀 2. Access Stripe customer billing portal
  const handleManageSubscription = useCallback(async () => {
    if (!session?.user) return;

    const toastId = toast.loading("Opening subscription management portal...");
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok && data.url) {
        toast.dismiss(toastId);
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Portal not found.");
      }
    } catch (err) {
      const description = err instanceof Error ? err.message : undefined;
      toast.error("Unable to open billing portal", {
        id: toastId,
        description,
      });
    }
  }, [session]);

  const userPlan = (session?.user as { subscriptionPlan?: string })?.subscriptionPlan || "explorer";

  return {
    isAuthenticated: !!session?.user,
    isAuthPending,
    userPlan,
    loadingPlanId,
    handleSubscribe,
    handleManageSubscription,
  };
}
