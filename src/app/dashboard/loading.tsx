// مسیر: src/app/dashboard/loading.tsx
import { Hexagon } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className='flex-1 h-full min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 relative'>
      {/* Ultra-luxurious moving light bar across the entire screen*/}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse' />

      {/* Animated Pulse Logo */}
      <div className='relative flex items-center justify-center'>
        <div className='absolute inset-0 size-12 bg-primary/20 blur-xl rounded-full animate-ping duration-1000' />
        <div className='relative size-12 rounded-xl bg-card border border-border/60 flex items-center justify-center shadow-lg text-primary animate-pulse'>
          <Hexagon className='size-6' />
        </div>
      </div>

      {/* Fetch data status description text */}
      <div className='space-y-1.5 text-center'>
        <p className='text-xs font-medium text-foreground tracking-widest uppercase'>
          Syncing Ledger
        </p>
        <p className='text-[10px] text-muted-foreground'>
          Fetching decentralized platform records...
        </p>
      </div>
    </div>
  );
}
