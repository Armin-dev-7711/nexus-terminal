// src/features/dashboard/components/DashboardClientRoot.tsx
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { DashboardHeader } from "./DashboardHeader";
import { MetricCards } from "./MetricCards";
import { Loader2 } from "lucide-react";

const PerformanceChart = dynamic(
  () => import("./PerformanceChart").then((mod) => mod.PerformanceChart),
  {
    ssr: false,
    loading: () => (
      <div className='h-[350px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const LiveAssetsTicker = dynamic(
  () => import("./LiveAssetsTicker").then((mod) => mod.LiveAssetsTicker),
  {
    ssr: false,
    loading: () => (
      <div className='h-[350px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const RecentTransactionsTable = dynamic(
  () =>
    import("./RecentTransactionsTable").then(
      (mod) => mod.RecentTransactionsTable,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='h-[400px] w-full rounded-2xl bg-card/30 animate-pulse border border-border/40 flex items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-muted-foreground/50' />
      </div>
    ),
  },
);

const DashboardModals = dynamic(
  () => import("./DashboardModals").then((mod) => mod.DashboardModals),
  { ssr: false },
);

export function DashboardClientRoot() {
  const [activeModal, setActiveModal] = React.useState<
    "add" | "transfer" | null
  >(null);

  return (
    <div className='flex-1 space-y-6 p-4 md:p-6 bg-background'>
      <DashboardHeader onOpenModal={setActiveModal} />

      {/* 🚀 This component will now load at the first moment and prevent other elements from crashing */}
      <MetricCards />

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <PerformanceChart />
        </div>
        <LiveAssetsTicker />
      </div>

      <RecentTransactionsTable />

      {activeModal !== null && (
        <DashboardModals
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
