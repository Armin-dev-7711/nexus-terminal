// مسیر: src/features/landing/components/preview/LiveTopBar.tsx
"use client";

import * as React from "react";
import { Bell, Moon, Search } from "lucide-react";

export function LiveTopBar() {
  return (
    <div className='w-full h-16 shrink-0 flex items-center justify-between px-4 md:px-6 border-b border-border/40 bg-background/80 backdrop-blur-md relative z-50'>
      {/* macOS buttons (left) */}
      <div className='flex items-center gap-2 w-auto md:w-[150px]'>
        <div className='size-3 rounded-full bg-rose-500/80 border border-rose-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
        <div className='size-3 rounded-full bg-amber-500/80 border border-amber-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
        <div className='size-3 rounded-full bg-emerald-500/80 border border-emerald-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]' />
      </div>

      {/* 🚀 Search Bar in the middle (display for Preview) */}
      <div className='hidden md:flex flex-1 max-w-md mx-4 items-center justify-center'>
        <div className='h-9 w-2/3 flex items-center justify-between bg-muted/20 border border-border text-muted-foreground rounded-xl px-3 group transition-colors cursor-pointer hover:bg-muted/40'>
          <div className='flex items-center gap-2'>
            <Search className='size-3.5 text-muted-foreground/70 group-hover:text-muted-foreground transition-colors' />
            <span className='text-xs'>Search assets, transactions...</span>
          </div>
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium'>
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Header */}
      <div className='flex items-center justify-end gap-2 md:gap-3 w-auto md:w-[150px] xl:w-[200px] shrink-0'>
        {/* Live Connection Indicator */}
        <div className='hidden lg:flex items-center w-fit gap-2 rounded-full border border-border shrink-0 bg-muted/20 px-3 py-1'>
          <span className='relative flex h-1.5 w-1.5'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500'></span>
          </span>
          <span className='text-[9px] font-medium text-muted-foreground uppercase tracking-wider'>
            Live Connection
          </span>
        </div>

        {/* Theme button */}
        <div className='size-9 lg:hidden rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 cursor-pointer transition-colors'>
          <Search className='size-4' />
        </div>
        <div className='size-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 cursor-pointer transition-colors'>
          <Moon className='size-4' />
        </div>

        {/* Notification button with live pulse */}
        <div className='size-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground relative cursor-pointer hover:bg-muted/40 transition-colors'>
          <Bell className='size-4' />
          <span className='absolute top-2 right-2.5 size-2 rounded-full bg-primary ring-2 ring-background animate-pulse' />
        </div>
      </div>
    </div>
  );
}
