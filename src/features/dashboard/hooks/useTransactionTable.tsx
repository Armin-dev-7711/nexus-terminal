// مسیر: src/features/dashboard/hooks/useTransactionTable.tsx
"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2 } from "lucide-react";

import { Transaction } from "@/features/dashboard/types";
import { mockRecentTransactions } from "@/features/dashboard/mocks/dashboard.mock";

const columnHelper = createColumnHelper<Transaction>();

export function useTransactionTable() {
  const columns = useMemo(
    () => [
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => {
          const type = info.getValue();
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold ${type === "Buy" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"}`}
            >
              {type}
            </span>
          );
        },
      }),
      columnHelper.accessor("asset", {
        header: "Asset",
        cell: (info) => (
          <span className='font-semibold text-foreground font-mono'>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className='text-muted-foreground font-mono'>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("value", {
        header: "Total Value",
        cell: (info) => (
          <span className='font-bold font-mono text-foreground'>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("date", {
        header: "Timestamp",
        cell: (info) => (
          <span className='text-muted-foreground font-mono'>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: () => <div className='text-right pr-2'>Status</div>,
        cell: (info) => (
          <div className='text-right pr-2'>
            <span className='inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400'>
              <CheckCircle2 className='size-3' />
              <span>{info.getValue()}</span>
            </span>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: mockRecentTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, data: mockRecentTransactions };
}
