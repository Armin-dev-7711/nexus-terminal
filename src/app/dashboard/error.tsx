// src/app/dashboard/error.tsx
"use client"; // Error boundaries must be Client Components

import * as React from "react";
import { AlertTriangle, RefreshCcw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // In a real project, here we would send the error to services like Sentry or LogRocket.
    console.error("Dashboard Error Caught:", error);
  }, [error]);

  return (
    <div className='flex-1 h-full min-h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center'>
      <div className='relative mb-8'>
        {/* Warning light effects */}
        <div className='absolute inset-0 bg-destructive/20 blur-3xl rounded-full size-32' />
        <div className='relative size-20 rounded-3xl bg-card border border-destructive/30 flex items-center justify-center text-destructive shadow-2xl shadow-destructive/10'>
          <WifiOff className='size-10' />
        </div>
        <div className='absolute -top-2 -right-2 bg-background rounded-full p-1.5 border border-border'>
          <AlertTriangle className='size-5 text-amber-500' />
        </div>
      </div>

      <h2 className='text-2xl font-bold tracking-tight text-foreground mb-2'>
        Connection Lost
      </h2>
      <p className='text-sm text-muted-foreground max-w-md leading-relaxed mb-8'>
        We encountered an issue while syncing your ledger data. This might be
        due to a network interruption or server maintenance.
      </p>

      <div className='flex flex-col sm:flex-row gap-4 w-full max-w-xs'>
        <Button
          onClick={() => reset()}
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11 font-medium shadow-lg shadow-primary/10 group'
        >
          <RefreshCcw className='size-4 mr-2 group-hover:rotate-180 transition-transform duration-500' />
          Try Again
        </Button>
      </div>

      {/* Show technical error to programmer (hidden in production)*/}
      {process.env.NODE_ENV === "development" && (
        <div className='mt-12 p-4 bg-muted/10 border border-border/40 rounded-xl max-w-2xl w-full text-left overflow-auto'>
          <p className='text-[10px] font-bold text-destructive uppercase mb-2'>
            Developer Error Log:
          </p>
          <pre className='text-xs text-muted-foreground whitespace-pre-wrap'>
            {error.message}
          </pre>
        </div>
      )}
    </div>
  );
}
