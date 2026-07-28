// مسیر: src/features/dashboard/hooks/useTransactionTable.tsx
"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { TransactionDetail } from "@/features/transactions/types";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactions";
import { formatDistanceToNow } from "date-fns";

const columnHelper = createColumnHelper<TransactionDetail>();

export function useTransactionTable() {
  const { data: transactions = [], isLoading } = useTransactionsData();
  
  // Take only the 5 most recent transactions for the dashboard
  const data = useMemo(() => transactions.slice(0, 5), [transactions]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => {
          const type = info.getValue();
          const isPositive = type === "Deposit" || type === "Trade";
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold ${
                isPositive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {type}
            </span>
          );
        },
      }),
      columnHelper.accessor("assetSymbol", {
        header: "Asset",
        cell: (info) => (
          <span className='font-semibold text-foreground font-mono uppercase'>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
          const type = info.row.original.type;
          const isPositive = type === "Deposit" || type === "Trade";
          return (
            <span className={`font-mono ${isPositive ? "text-emerald-400" : "text-muted-foreground"}`}>
              {isPositive ? "+" : ""}{info.getValue()} {info.row.original.assetSymbol.toUpperCase()}
            </span>
          )
        },
      }),
      columnHelper.accessor("valueUsd", {
        header: "Total Value",
        cell: (info) => {
          const type = info.row.original.type;
          const isPositive = type === "Deposit" || type === "Trade";
          return (
            <span className={`font-bold font-mono ${isPositive ? "text-emerald-400" : "text-foreground"}`}>
              {isPositive ? "+" : "-"}${info.getValue().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )
        },
      }),
      columnHelper.accessor("date", {
        header: "Timestamp",
        cell: (info) => (
          <span className='text-muted-foreground font-mono whitespace-nowrap text-[10px]'>
            {formatDistanceToNow(new Date(info.getValue()), { addSuffix: true })}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: () => <div className='text-right pr-2'>Status</div>,
        cell: (info) => {
          const status = info.getValue();
          return (
            <div className='text-right pr-2'>
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                status === "Completed" ? "text-emerald-400" : 
                status === "Pending" ? "text-amber-400" : "text-destructive"
              }`}>
                {status === "Completed" && <CheckCircle2 className='size-3' />}
                {status === "Pending" && <Clock className='size-3' />}
                {status === "Failed" && <XCircle className='size-3' />}
                <span>{status}</span>
              </span>
            </div>
          );
        }
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, data, isLoading };
}
