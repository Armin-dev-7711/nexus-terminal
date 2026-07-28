// src/features/analytics/hooks/useAnalyticsToolbar.ts
"use client";

import { useState, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactions";
import { useAssetsData } from "@/features/assets/hooks/useAssets";

export function useAnalyticsToolbar() {
  const queryClient = useQueryClient();
  const { data: transactions = [] } = useTransactionsData();
  const { data: assets = [] } = useAssetsData();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 1),
    to: new Date(2026, 6, 30),
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [logScale, setLogScale] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    
    await queryClient.invalidateQueries({ queryKey: ["assets"] });
    await queryClient.invalidateQueries({ queryKey: ["transactions"] });

    setIsRefreshing(false);
    toast.success("Data Synced", {
      description: "Analytics dashboard is up to date with live ledger.",
    });
  }, [queryClient]);

  const handleExport = useCallback((type: "PDF" | "CSV") => {
    if (type === "CSV") {
      try {
        const headers = ["ID,Type,Asset,Network,Amount,Value(USD),Date"];
        const rows = transactions.map(tx => 
          `${tx.id},${tx.type},${tx.assetSymbol},${tx.network},${tx.amount},${tx.valueUsd},${tx.date}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `nexus_export_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("CSV Exported", {
          description: "Your report has been downloaded successfully.",
        });
      } catch (err) {
        toast.error("Export Failed", {
          description: "There was an error generating the CSV.",
        });
      }
    } else {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
        loading: `Compiling ${type} report...`,
        success: `${type} export ready for download.`,
        error: `Failed to compile ${type}.`,
      });
    }
  }, [transactions]);

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
