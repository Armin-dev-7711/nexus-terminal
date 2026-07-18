"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
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

import { Asset } from "../types";

export const columns: ColumnDef<Asset>[] = [
  // 1. Row Selection Column
  {
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
          className='border-border/60 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
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
  },

  // 2. Asset Name & Symbol
  {
    accessorKey: "name",
    header: "Asset",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const symbol = row.original.symbol;

      return (
        <div className='flex items-center gap-3'>
          <div className='size-8 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-center font-bold text-xs  text-foreground'>
            {symbol.slice(0, 2)}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-foreground'>
              {name}
            </span>
            <span className='text-[10px] text-muted-foreground'>{symbol}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "network",
    header: "Network",
    cell: ({ row }) => {
      const network = row.getValue("network") as string;
      return (
        <div className='flex items-center gap-2'>
          {/* یک استایل مینیمال برای تگ شبکه */}
          <span className='inline-flex items-center rounded-md bg-muted/40 px-2 py-1 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-border/40 '>
            {network}
          </span>
        </div>
      );
    },
    // Filter logic to check if the network of this row is in the selected filters array or not
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
  },

  // 3. Current Price
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='hover:bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider h-8'
        >
          Price
          <ArrowUpDown className='ml-2 size-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(amount);

      return <div className=' text-sm font-medium pl-4'>{formatted}</div>;
    },
  },

  // 4. 24h Change
  {
    accessorKey: "change24h",
    header: "24h Change",
    cell: ({ row }) => {
      const change = parseFloat(row.getValue("change24h"));
      const isPositive = change >= 0;

      return (
        <div
          className={`flex items-center gap-1  text-xs font-medium ${isPositive ? "text-emerald-400" : "text-destructive"}`}
        >
          {isPositive ? (
            <ArrowUpRight className='size-3' />
          ) : (
            <ArrowDownRight className='size-3' />
          )}
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      );
    },
  },

  // 5. Total Holdings (Amount + Value)
  {
    accessorKey: "holdingsValue",
    header: ({ column }) => {
      return (
        <div className='text-right'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='hover:bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider h-8'
          >
            Holdings
            <ArrowUpDown className='ml-2 size-3' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("holdingsValue"));
      const amount = row.original.holdingsAmount;
      const symbol = row.original.symbol;

      const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

      return (
        <div className='flex flex-col items-end pr-4'>
          <span className=' text-sm font-bold text-foreground'>
            {formattedValue}
          </span>
          <span className=' text-[10px] text-muted-foreground'>
            {amount.toLocaleString("en-US")} {symbol}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row, table }) => {
      const asset = row.original;

      interface CustomTableMeta {
        onAction?: (action: "edit" | "delete", id: string) => void;
      }
      // Extract function from table metadata
      const meta = table.options.meta as CustomTableMeta | undefined;
      const onAction = meta?.onAction;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label='Open actions menu'
              variant='ghost'
              className='h-8 w-8 p-0 hover:bg-muted/40 data-[state=open]:bg-muted/50 rounded-xl transition-colors'
            >
              <span className='sr-only'>Open menu</span>
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
                navigator.clipboard.writeText(asset.id);
              }}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg'
            >
              Copy Asset ID
            </DropdownMenuItem>

            <DropdownMenuSeparator className='bg-border/40' />

            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg flex items-center justify-between'
            >
              Analyze
              <Activity className='size-3 text-primary' />
            </DropdownMenuItem>

            {/* Bind to Edit event */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onAction?.("edit", asset.id);
              }}
              className='text-xs cursor-pointer focus:bg-muted/50 rounded-lg'
            >
              Edit Details
            </DropdownMenuItem>

            {/* Bind to the Delete event */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onAction?.("delete", asset.id);
              }}
              className='text-xs text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg'
            >
              Remove Asset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
