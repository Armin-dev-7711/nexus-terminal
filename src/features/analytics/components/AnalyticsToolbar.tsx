// src/features/analytics/components/AnalyticsToolbar.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  RefreshCcw,
  Settings2,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { useAnalyticsToolbar } from "../hooks/useAnalyticsToolbar";

export function AnalyticsToolbar() {
  const {
    date,
    setDate,
    isRefreshing,
    handleRefresh,
    showBenchmark,
    setShowBenchmark,
    logScale,
    setLogScale,
    handleExport,
  } = useAnalyticsToolbar();

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6'>
      <div className='space-y-1'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground flex items-center gap-2'>
          Advanced Analytics
        </h2>
        <p className='text-sm text-muted-foreground'>
          Deep dive into your portfolio&apos;s performance, risk metrics, and
          cash flow.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-2.5'>
        {/* Date Picker */}
        <div className='grid gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id='date'
                variant={"outline"}
                size='sm'
                aria-label='Select Date Range'
                className={cn(
                  "w-full sm:w-65 justify-start text-left  font-medium text-xs h-9 rounded-xl border-border/60 bg-muted/10 hover:bg-muted/30 transition-all",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className='mr-2 size-3.5' />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0 rounded-2xl border-border/80 bg-popover/95 backdrop-blur-md shadow-xl'
              align='end'
            >
              <Calendar
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              aria-label='Chart Configuration Controls'
              className='h-9 px-3 rounded-xl border-border/60 bg-muted/10 hover:bg-muted/30 hidden md:flex cursor-pointer'
            >
              <Settings2 className='size-3.5 text-muted-foreground mr-2' />
              <span className='text-xs font-medium'>Controls</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-50 rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
          >
            <DropdownMenuLabel className='text-[10px]  text-muted-foreground uppercase tracking-wider'>
              Chart Configuration
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-border/40' />
            <DropdownMenuCheckboxItem
              checked={showBenchmark}
              onCheckedChange={setShowBenchmark}
              className='text-xs cursor-pointer rounded-lg focus:bg-muted/50'
            >
              Show Benchmark Line
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={logScale}
              onCheckedChange={setLogScale}
              className='text-xs cursor-pointer rounded-lg focus:bg-muted/50'
            >
              Logarithmic Scale
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              aria-label='Export Data Report'
              className='h-9 px-3 rounded-xl border-border/60 bg-muted/10 hover:bg-muted/30 transition-all cursor-pointer'
            >
              <Download className='size-3.5 text-muted-foreground md:mr-2' />
              <span className='text-xs font-medium hidden md:inline'>
                Export
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-45 rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'
          >
            <DropdownMenuLabel className='text-[10px]  text-muted-foreground uppercase tracking-wider'>
              Download Report
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-border/40' />
            <DropdownMenuItem
              onClick={() => handleExport("PDF")}
              className='text-xs cursor-pointer rounded-lg focus:bg-primary/10 focus:text-primary'
            >
              <FileText className='size-3.5 mr-2' /> Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("CSV")}
              className='text-xs cursor-pointer rounded-lg focus:bg-primary/10 focus:text-primary'
            >
              <FileSpreadsheet className='size-3.5 mr-2' /> Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size='icon'
          variant='outline'
          aria-label='Refresh Dashboard Data'
          onClick={handleRefresh}
          disabled={isRefreshing}
          className='h-9 w-9 rounded-xl border-border/60 bg-muted/10 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-pointer'
        >
          <RefreshCcw
            className={cn(
              "size-3.5 text-muted-foreground",
              isRefreshing && "animate-spin text-primary",
            )}
          />
        </Button>
      </div>
    </div>
  );
}
