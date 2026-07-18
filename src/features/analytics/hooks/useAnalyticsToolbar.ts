// src/features/analytics/hooks/useAnalyticsToolbar.ts
"use client";

import { useState, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export function useAnalyticsToolbar() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 1),
    to: new Date(2026, 6, 30),
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [logScale, setLogScale] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Data Synced", {
        description: "Analytics dashboard is up to date with live ledger.",
      });
    }, 1500);
  }, []);

  const handleExport = useCallback((type: "PDF" | "CSV") => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: `Compiling ${type} report...`,
      success: `${type} export ready for download.`,
      error: `Failed to compile ${type}.`,
    });
  }, []);

  return {
    date,
    setDate,
    isRefreshing,
    handleRefresh,
    showBenchmark,
    setShowBenchmark,
    logScale,
    setLogScale,
    handleExport,
  };
}
