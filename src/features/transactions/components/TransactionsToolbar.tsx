// src/features/transactions/components/TransactionsToolbar.tsx
"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import {
  Search,
  SlidersHorizontal,
  Download,
  Sliders,
  X,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactionsToolbar } from "../hooks/useTransactionsToolbar";

interface TransactionsToolbarProps<TData> {
  table: Table<TData>;
  onImport: () => void;
}

export function TransactionsToolbar<TData>({
  table,
  onImport,
}: TransactionsToolbarProps<TData>) {
  const { handleExportCSV, isFiltered, handleReset } =
    useTransactionsToolbar(table);

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-4'>
      <div className='flex flex-1 flex-col gap-3 sm:flex-row sm:items-center flex-wrap'>
        <div className='relative w-full sm:max-w-xs sm:min-w-[200px] group'>
          <Search className='absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary' />
          <Input
            placeholder='Search hash, asset, or network...'
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className='h-9 pl-9 pr-4 rounded-xl border-border/60 bg-muted/10 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-xs placeholder:text-muted-foreground/70'
          />
        </div>

        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
              >
                <SlidersHorizontal className='size-3.5 text-muted-foreground' />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              className='w-[160px] rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
            >
              <DropdownMenuLabel className='text-xs  text-muted-foreground uppercase tracking-wider'>
                Filter Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-border/40' />
              {["Completed", "Pending", "Failed"].map((status) => {
                const column = table.getColumn("status");
                const currentFilters =
                  (column?.getFilterValue() as string[]) || [];
                return (
                  <DropdownMenuCheckboxItem
                    key={status}
                    className='text-xs cursor-pointer rounded-lg focus:bg-muted/50'
                    checked={currentFilters.includes(status)}
                    onCheckedChange={(checked) => {
                      const nextFilters = checked
                        ? [...currentFilters, status]
                        : currentFilters.filter((item) => item !== status);
                      column?.setFilterValue(
                        nextFilters.length ? nextFilters : undefined,
                      );
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {isFiltered && (
            <Button
              variant='ghost'
              aria-label='Reset filters'
              onClick={handleReset}
              className='h-9 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-xl gap-1.5 transition-all cursor-pointer'
            >
              <span>Reset</span>
              <X className='size-3.5' />
            </Button>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2 self-end sm:self-auto flex-wrap justify-end'>
        {/* 🚀 فیکس شد: اضافه شدن aria-label */}
        <Button
          variant='outline'
          size='sm'
          aria-label='Import transactions'
          onClick={onImport}
          className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
        >
          <Upload className='size-3.5 text-muted-foreground' />
          <span className='hidden lg:inline'>Import</span>
        </Button>

        {/* 🚀 فیکس شد: اضافه شدن aria-label */}
        <Button
          variant='outline'
          size='sm'
          aria-label='Export to CSV'
          onClick={handleExportCSV}
          className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
        >
          <Download className='size-3.5 text-muted-foreground' />
          <span className='hidden lg:inline'>Export</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* 🚀 فیکس شد: اضافه شدن aria-label */}
            <Button
              variant='outline'
              size='sm'
              aria-label='Toggle columns view'
              className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
            >
              <Sliders className='size-3.5 text-muted-foreground' />
              <span className='hidden md:inline'>View</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-[160px] rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
          >
            <DropdownMenuLabel className='text-xs  text-muted-foreground uppercase tracking-wider'>
              Toggle Columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-border/40' />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='text-xs capitalize cursor-pointer rounded-lg focus:bg-muted/50'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "valueUsd"
                      ? "Value (USD)"
                      : column.id === "txHash"
                        ? "Transaction"
                        : column.id === "assetSymbol"
                          ? "Asset"
                          : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
