"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "../types";
import { Activity } from "lucide-react";

interface AssetDetailSheetProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AssetDetailSheet({
  asset,
  isOpen,
  onClose,
}: AssetDetailSheetProps) {
  if (!asset) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full sm:max-w-md border-l border-border/60 bg-background/95 backdrop-blur-xl'>
        <SheetHeader className='text-left space-y-4'>
          <div className='flex items-center gap-4'>
            <div className='size-12 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-center font-bold text-lg text-foreground'>
              {asset.symbol.slice(0, 2)}
            </div>
            <div>
              <SheetTitle className='text-2xl font-bold'>
                {asset.name}
              </SheetTitle>
              <SheetDescription className=' text-xs text-primary mt-1'>
                {asset.network} Network
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className='mt-8 space-y-6 px-4'>
          {/* Financial Information Section */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='rounded-xl border border-border/40 bg-muted/10 p-4 space-y-1'>
              <p className='text-xs text-muted-foreground '>Current Price</p>
              <p className='text-lg font-semibold '>
                ${asset.price.toLocaleString()}
              </p>
            </div>
            <div className='rounded-xl border border-border/40 bg-muted/10 p-4 space-y-1'>
              <p className='text-xs text-muted-foreground '>24h Change</p>
              <p
                className={`text-lg font-semibold  ${asset.change24h >= 0 ? "text-emerald-400" : "text-destructive"}`}
              >
                {asset.change24h >= 0 ? "+" : ""}
                {asset.change24h.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Place for additional charts or data in the future */}
          <div className='h-40 rounded-xl border border-border/40 bg-muted/5 flex flex-col items-center justify-center gap-2 text-muted-foreground'>
            <Activity className='size-6 text-muted-foreground/50' />
            <p className='text-xs'>Advanced Chart Generation Pending...</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
