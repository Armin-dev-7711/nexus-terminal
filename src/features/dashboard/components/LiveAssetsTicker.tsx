"use client";

import { ArrowUpRight, ArrowDownRight, Loader2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssetsData } from "@/features/assets/hooks/useAssets";

export function LiveAssetsTicker() {
  const { data: assets = [], isLoading } = useAssetsData();

  return (
    <Card className="rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col h-full max-h-[450px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground">
          Live Market Prices
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time assets valuation updates.
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        {isLoading ? (
          <div className="flex h-full min-h-[200px] items-center justify-center">
            <Loader2 className="size-5 animate-spin text-muted-foreground/50" />
          </div>
        ) : assets.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <Info className="size-6 opacity-50" />
            <p className="text-sm">No assets in your portfolio</p>
            <p className="text-xs opacity-75">Add funds to see live prices.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assets.map((asset) => {
              const isPositive = asset.change24h >= 0;
              return (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-sidebar-accent border border-border flex items-center justify-center font-bold text-xs text-foreground">
                      {asset.symbol.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground truncate max-w-[100px]">
                        {asset.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {asset.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <span className="text-xs font-bold text-foreground">
                      $
                      {asset.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`text-[10px] font-medium flex items-center justify-end gap-0.5 mt-0.5 ${
                        isPositive ? "text-emerald-400" : "text-destructive"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="size-2.5" />
                      ) : (
                        <ArrowDownRight className="size-2.5" />
                      )}
                      {isPositive ? "+" : ""}
                      {asset.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
