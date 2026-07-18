// src/features/transactions/components/columns.tsx
"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  TransactionDetail,
  TransactionType,
  TransactionStatus,
} from "../types";

const columnHelper = createColumnHelper<TransactionDetail>();

const getTypeConfig = (type: TransactionType) => {
  switch (type) {
    case "Deposit":
      return {
        icon: ArrowDownToLine,
        color: "text-emerald-400 bg-emerald-500/10",
      };
    case "Withdrawal":
      return { icon: ArrowUpFromLine, color: "text-rose-400 bg-rose-500/10" };
    case "Trade":
      return { icon: RefreshCcw, color: "text-blue-400 bg-blue-500/10" };
    case "Transfer":
      return { icon: Repeat, color: "text-purple-400 bg-purple-500/10" };
  }
};

const getStatusConfig = (status: TransactionStatus) => {
  switch (status) {
    case "Completed":
      return { icon: CheckCircle2, color: "text-emerald-400" };
    case "Pending":
      return { icon: Clock, color: "text-amber-400" };
    case "Failed":
      return { icon: XCircle, color: "text-destructive" };
  }
};

interface TableMeta {
  onAction?: (actionType: "edit" | "delete" | "view", id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<TransactionDetail, any>[] = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className='pl-2'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='border-border/60 data-[state=checked]:bg-primary'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='pl-2'>
        <Checkbox
          checked={row.getIsSelected()}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='border-border/60 data-[state=checked]:bg-primary'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("txHash", {
    header: "Transaction",
    cell: ({ row }) => {
      const type = row.original.type;
      const hash = row.getValue("txHash") as string;
      const config = getTypeConfig(type);
      const Icon = config.icon;

      return (
        <div className='flex items-center gap-3'>
          <div
            className={`size-8 rounded-lg border border-border/40 flex items-center justify-center ${config.color}`}
          >
            <Icon className='size-4' />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-foreground'>
              {type}
            </span>
            <span className='text-[10px] text-muted-foreground truncate w-24 sm:w-32'>
              {hash}
            </span>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("assetSymbol", {
    header: "Asset",
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='text-sm font-bold  text-foreground'>
          {row.getValue("assetSymbol")}
        </span>
        <span className='text-[10px] text-muted-foreground '>
          {row.original.network}
        </span>
      </div>
    ),
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
  }),

  columnHelper.accessor("amount", {
    header: ({ column }) => (
      <Button
        variant='ghost'
        size='sm'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='hover:bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider h-8 -ml-3'
      >
        Amount
        <ArrowUpDown className='ml-2 size-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const type = row.original.type;
      const amount = row.getValue("amount") as number;
      const symbol = row.original.assetSymbol;

      const prefix =
        type === "Deposit" ? "+" : type === "Withdrawal" ? "-" : "";
      const color =
        type === "Deposit"
          ? "text-emerald-400"
          : type === "Withdrawal"
            ? "text-rose-400"
            : "text-foreground";

      return (
        <div className={` text-sm font-medium ${color}`}>
          {prefix}
          {amount.toLocaleString()} {symbol}
        </div>
      );
    },
  }),

  columnHelper.accessor("valueUsd", {
    header: ({ column }) => (
      <Button
        variant='ghost'
        size='sm'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='hover:bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider h-8 -ml-3'
      >
        Value (USD)
        <ArrowUpDown className='ml-2 size-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("valueUsd") as number;
      return (
        <div className=' text-sm font-medium'>
          $
          {val.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  }),

  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ row }) => {
      const dateStr = row.getValue("date") as string;
      const d = new Date(dateStr);
      return (
        <div className='flex flex-col'>
          <span className='text-xs font-medium text-foreground'>
            {format(d, "MMM dd, yyyy")}
          </span>
          <span className='text-[10px] text-muted-foreground '>
            {format(d, "HH:mm:ss a")}
          </span>
        </div>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: () => <div className='text-center'>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as TransactionStatus;
      const config = getStatusConfig(status);
      const Icon = config.icon;

      return (
        <div className='flex justify-center'>
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/20 px-2.5 py-1 text-[10px] font-medium ${config.color}`}
          >
            <Icon className='size-3' />
            {status}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row, table }) => {
      const tx = row.original;
      const meta = table.options.meta as TableMeta | undefined;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* 🚀 فیکس شد: اضافه شدن aria-label به دکمه منو */}
            <Button
              variant='ghost'
              aria-label='Open transaction actions'
              className='h-8 w-8 p-0 hover:bg-muted/40 data-[state=open]:bg-muted/50 rounded-xl'
            >
              <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-[160px] rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
          >
            <DropdownMenuLabel className='text-xs  text-muted-foreground uppercase tracking-wider'>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(tx.txHash);
              }}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg'
            >
              Copy TxHash
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-border/40' />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                meta?.onAction?.("view", tx.id);
              }}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg text-primary focus:text-primary'
            >
              View Receipt
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                meta?.onAction?.("edit", tx.id);
              }}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg'
            >
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                meta?.onAction?.("delete", tx.id);
              }}
              className='text-xs text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg'
            >
              Delete Record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
