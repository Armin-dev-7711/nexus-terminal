// src/features/assets/components/AssetsToolbar.tsx
"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Search, SlidersHorizontal, Download, Sliders, X } from "lucide-react";

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

// Calling a dedicated toolbar hook
import { useAssetsToolbar } from "../hooks/useAssetsToolbar";

interface AssetsToolbarProps<TData> {
  table: Table<TData>;
}

export function AssetsToolbar<TData>({ table }: AssetsToolbarProps<TData>) {
  // Get actions from the hook
  const { handleExportCSV, isFiltered, handleReset } = useAssetsToolbar(table);

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-4'>
      {/* Left: Network search and filter */}
      <div className='flex flex-1 flex-col gap-3 sm:flex-row sm:items-center flex-wrap'>
        <div className='relative w-full sm:max-w-xs sm:min-w-[200px] group'>
          <Search className='absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary' />
          <Input
            placeholder='Search assets...'
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className='h-9 pl-9 pr-4 rounded-xl border-border/60 bg-muted/10 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all  text-xs placeholder:text-muted-foreground/70'
          />
        </div>

        <div className='flex items-center gap-2 self-end sm:self-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                aria-label='Toggle Columns View'
                className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
              >
                <SlidersHorizontal className='size-3.5 text-muted-foreground' />
                <span>Network</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              className='w-[160px] rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
            >
              <DropdownMenuLabel className='text-xs  text-muted-foreground uppercase tracking-wider'>
                Filter Network
              </DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-border/40' />
              {["Ethereum", "Solana", "Binance", "Bitcoin", "Polygon"].map(
                (network) => (
                  <DropdownMenuCheckboxItem
                    key={network}
                    className='text-xs cursor-pointer rounded-lg focus:bg-muted/50'
                    checked={
                      (
                        table.getColumn("network")?.getFilterValue() as string[]
                      )?.includes(network) ?? false
                    }
                    onCheckedChange={(checked) => {
                      const currentFilters =
                        (table
                          .getColumn("network")
                          ?.getFilterValue() as string[]) || [];
                      const nextFilters = checked
                        ? [...currentFilters, network]
                        : currentFilters.filter((item) => item !== network);
                      table
                        .getColumn("network")
                        ?.setFilterValue(
                          nextFilters.length ? nextFilters : undefined,
                        );
                    }}
                  >
                    {network}
                  </DropdownMenuCheckboxItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {isFiltered && (
            <Button
              variant='ghost'
              onClick={handleReset} //  Using encapsulated method
              className='h-9 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-xl gap-1.5 transition-all cursor-pointer'
            >
              <span>Reset</span>
              <X className='size-3.5' />
            </Button>
          )}
        </div>
      </div>

      {/* Right: Manage column visibility and CSV output */}
      <div className='flex items-center gap-2 self-end sm:self-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              aria-label='Reset filters'
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
                    {column.id === "change24h"
                      ? "24h Change"
                      : column.id === "holdingsValue"
                        ? "Holdings"
                        : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant='outline'
          size='sm'
          aria-label='Export to CSV'
          onClick={handleExportCSV} // Using encapsulated methods
          className='h-9 border-border/60 bg-muted/10 text-xs rounded-xl px-3 gap-2 hover:bg-muted/30 transition-all cursor-pointer'
        >
          <Download className='size-3.5 text-muted-foreground' />
          <span className='hidden md:inline'>Export CSV</span>
        </Button>
      </div>
    </div>
  );
}
