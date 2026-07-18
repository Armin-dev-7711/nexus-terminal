import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLiveAssets } from "@/features/dashboard/mocks/dashboard.mock";

export function LiveAssetsTicker() {
  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col h-full'>
      <CardHeader>
        <CardTitle className='text-sm font-semibold text-foreground'>
          Live Market Prices
        </CardTitle>
        <p className='text-xs text-muted-foreground mt-0.5'>
          Real-time assets valuation updates.
        </p>
      </CardHeader>

      <CardContent className='flex-1'>
        <div className='space-y-3'>
          {mockLiveAssets.map((asset) => (
            <div
              key={asset.id}
              className='flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/30 transition-all group'
            >
              <div className='flex items-center gap-3'>
                <div className='size-8 rounded-lg bg-sidebar-accent border border-border flex items-center justify-center font-bold text-xs text-foreground'>
                  {asset.symbol.slice(0, 2)}
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs font-semibold text-foreground'>
                    {asset.name}
                  </span>
                  <span className='text-[10px] text-muted-foreground'>
                    {asset.symbol}
                  </span>
                </div>
              </div>
              <div className='text-right flex flex-col justify-center'>
                <span className='text-xs font-bold text-foreground'>
                  $
                  {asset.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-[10px] font-medium flex items-center justify-end gap-0.5 mt-0.5 ${
                    asset.isPositive ? "text-emerald-400" : "text-destructive"
                  }`}
                >
                  {asset.isPositive ? (
                    <ArrowUpRight className='size-2.5' />
                  ) : (
                    <ArrowDownRight className='size-2.5' />
                  )}
                  {asset.isPositive ? "+" : ""}
                  {asset.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
