// src/features/billing/components/BillingDashboard.tsx
"use client";

import * as React from "react";
import { CreditCard, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { USAGE_STATS, INVOICE_HISTORY } from "../mocks/billing.mock";
import { PricingSection } from "./PricingSection";

const InvoiceTable = dynamic(
  () => import("./InvoiceTable").then((mod) => mod.InvoiceTable),
  {
    ssr: false,
    loading: () => (
      <div className='h-[250px] w-full flex items-center justify-center bg-card/5'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

export function BillingDashboard() {
  return (
    <div className='flex-1 space-y-10 p-6 pt-8 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-700 transform-gpu'>
      {/* 1. HEADER */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground flex items-center gap-2'>
            <CreditCard className='size-7 text-primary' /> Billing & Plans
          </h2>
          <p className='text-sm text-zinc-400'>
            Configure your enterprise node subscriptions, track allocation
            quotas, and view ledgers.
          </p>
        </div>
      </div>

      {/* 2. OVERVIEW & USAGE METRICS */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-1 border-border/40 bg-gradient-to-br from-card/40 to-card/10 backdrop-blur-xl rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl'>
          <div className='absolute -right-10 -top-10 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='p-2 rounded-xl bg-primary/10 border border-primary/20'>
                <CreditCard className='size-4 text-primary' />
              </div>
              <CardDescription className='text-[10px] uppercase font-bold tracking-widest text-primary/80'>
                Active Node
              </CardDescription>
            </div>
            <CardTitle className='text-3xl font-black text-foreground tracking-tight'>
              Starter Tier
            </CardTitle>
          </CardHeader>
          <CardContent className='pb-6 relative z-10'>
            <p className='text-sm text-zinc-400 leading-relaxed'>
              Running on free sandbox infrastructure. Upgrade to unlock full
              websocket potential.
            </p>
          </CardContent>
          <CardFooter className='bg-background/40 border-t border-border/30 px-6 py-4 flex items-center justify-between text-xs text-zinc-400  backdrop-blur-md'>
            <span>Cycle: Aug 01, 2026</span>
            <Badge
              variant='outline'
              className='text-primary border-primary/30 bg-primary/5 text-[10px]'
            >
              Auto-Renew
            </Badge>
          </CardFooter>
        </Card>

        <Card className='lg:col-span-2 border-border/40 bg-card/20 backdrop-blur-xl rounded-3xl shadow-xl'>
          <CardHeader className='pb-6'>
            <CardTitle className='text-lg font-bold text-foreground'>
              Resource Quotas
            </CardTitle>
            <CardDescription className='text-xs text-zinc-400'>
              Live tracking of your monthly compute cycles.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {USAGE_STATS.map((stat) => {
              const percentage = (stat.used / stat.total) * 100;
              const isWarning = percentage > 80;
              return (
                <div key={stat.label} className='space-y-2'>
                  <div className='flex justify-between text-xs '>
                    <span className='text-zinc-400 font-medium'>
                      {stat.label}
                    </span>
                    <span className='text-foreground font-bold'>
                      {stat.used.toLocaleString()}{" "}
                      <span className='text-zinc-500'>
                        / {stat.total.toLocaleString()} {stat.unit}
                      </span>
                    </span>
                  </div>
                  <div className='h-2.5 w-full bg-background border border-border/40 rounded-full overflow-hidden p-[1.5px]'>
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 relative overflow-hidden",
                        isWarning
                          ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                          : "bg-primary shadow-[0_0_10px_rgba(132,204,34,0.4)]",
                      )}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]' />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* 3. PRICING SECTION */}
      <PricingSection />

      {/* 4. INVOICE HISTORY */}
      <Card className='rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl overflow-hidden shadow-lg'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg font-bold text-foreground'>
            Billing Ledgers
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Cryptographic records of your previous payments.
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 border-t border-border/30'>
          <InvoiceTable data={INVOICE_HISTORY} />
        </CardContent>
      </Card>
    </div>
  );
}
