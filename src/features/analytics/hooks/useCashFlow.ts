// src/features/analytics/hooks/useCashFlow.ts
"use client";

import { useMemo } from "react";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactions";
import { CashFlowData } from "../types";

export function useCashFlow() {
  const { data: transactions = [] } = useTransactionsData();

  const data = useMemo<CashFlowData[]>(() => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};

    // Generate last 7 months window (e.g. Jan, Feb, Mar, Apr, May, Jun, Jul)
    const now = new Date();
    const monthsWindow: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mStr = d.toLocaleString("default", { month: "short" });
      monthsWindow.push(mStr);
      monthlyData[mStr] = { income: 0, expense: 0 };
    }

    // Aggregate transactions into the corresponding months
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const month = date.toLocaleString("default", { month: "short" });
      
      if (monthlyData[month]) {
        if (tx.type === "Deposit" || tx.type === "Trade") {
          monthlyData[month].income += tx.valueUsd || 0;
        } else if (tx.type === "Withdrawal" || tx.type === "Transfer") {
          monthlyData[month].expense += tx.valueUsd || 0;
        }
      }
    });

    return monthsWindow.map(month => ({
      month,
      income: Number(monthlyData[month].income.toFixed(2)),
      expense: Number(monthlyData[month].expense.toFixed(2)),
    }));
  }, [transactions]);

  return { data };
}
