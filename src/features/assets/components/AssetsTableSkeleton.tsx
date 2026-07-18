import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function AssetsTableSkeleton() {
  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden'>
      <CardContent className='p-4 sm:p-6 flex flex-col gap-4'>
        {/* Toolbar simulation (search and buttons) */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-4'>
          <div className='flex gap-2'>
            <Skeleton className='h-9 w-full sm:w-[200px] rounded-xl bg-muted/20' />
            <Skeleton className='h-9 w-[90px] rounded-xl bg-muted/20 hidden sm:block' />
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-9 w-[80px] rounded-xl bg-muted/20' />
            <Skeleton className='h-9 w-[100px] rounded-xl bg-muted/20' />
          </div>
        </div>

        {/* Table body simulation */}
        <div className='rounded-xl border border-border/40 overflow-hidden bg-muted/5'>
          {/* Table header */}
          <div className='flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/10'>
            <Skeleton className='h-4 w-4 rounded bg-muted/20' />
            <Skeleton className='h-3 w-16 rounded bg-muted/20' />
            <Skeleton className='h-3 w-16 rounded bg-muted/20' />
            <Skeleton className='h-3 w-20 rounded bg-muted/20' />
            <Skeleton className='h-3 w-20 rounded bg-muted/20' />
            <Skeleton className='h-4 w-4 rounded bg-muted/20' />
          </div>

          {/* Table rows (5 simulated rows) */}
          <div className='flex flex-col divide-y divide-border/20'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='flex items-center justify-between px-4 py-4'
              >
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-4 w-4 rounded bg-muted/20' />
                  <div className='flex items-center gap-3'>
                    <Skeleton className='size-8 rounded-lg bg-muted/20' />
                    <div className='space-y-1.5'>
                      <Skeleton className='h-3 w-20 rounded bg-muted/20' />
                      <Skeleton className='h-2 w-12 rounded bg-muted/20' />
                    </div>
                  </div>
                </div>
                <Skeleton className='h-4 w-16 rounded bg-muted/20 hidden sm:block' />
                <Skeleton className='h-4 w-16 rounded bg-muted/20 hidden sm:block' />
                <div className='space-y-1.5 flex flex-col items-end'>
                  <Skeleton className='h-3 w-24 rounded bg-muted/20' />
                  <Skeleton className='h-2 w-16 rounded bg-muted/20' />
                </div>
                <Skeleton className='size-8 rounded-lg bg-muted/20' />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Simulation */}
        <div className='flex items-center justify-between pt-2 px-2'>
          <Skeleton className='h-3 w-32 rounded bg-muted/20' />
          <div className='flex gap-2'>
            <Skeleton className='size-8 rounded-lg bg-muted/20' />
            <Skeleton className='size-8 rounded-lg bg-muted/20' />
            <Skeleton className='size-8 rounded-lg bg-muted/20' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
