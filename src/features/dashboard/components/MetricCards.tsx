"use client";

import { useMemo } from "react";
import { Wallet, TrendingUp, Coins, Layers, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useAssetsData } from "@/features/assets/hooks/useAssets";

// Fake data for sparklines (keeping them for visual aesthetics as requested)
const dataBalance = [{ v: 40 }, { v: 42 }, { v: 38 }, { v: 45 }, { v: 48 }, { v: 50 }, { v: 52 }];
const dataProfit = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 25 }, { v: 28 }];
const dataSolana = [{ v: 100 }, { v: 110 }, { v: 105 }, { v: 125 }, { v: 135 }, { v: 140 }, { v: 145 }];
const dataDiversity = [{ v: 5 }, { v: 5 }, { v: 8 }, { v: 8 }, { v: 10 }, { v: 12 }, { v: 14 }];

export function MetricCards() {
  const { data: assets = [], isLoading } = useAssetsData();

  const {
    totalBalance,
    totalProfit,
    profitPercentage,
    topPerformer,
    uniqueNetworks,
    totalCryptos
  } = useMemo(() => {
    if (!assets.length) {
      return {
        totalBalance: 0,
        totalProfit: 0,
        profitPercentage: 0,
        topPerformer: null,
        uniqueNetworks: 0,
        totalCryptos: 0,
      };
    }

    const balance = assets.reduce((acc, asset) => acc + (asset.holdingsAmount * asset.price), 0);
    // Rough estimation of profit (total change in USD)
    const profit = assets.reduce((acc, asset) => {
      const value = asset.holdingsAmount * asset.price;
      const previousValue = value / (1 + (asset.change24h / 100));
      return acc + (value - previousValue);
    }, 0);
    
    const profitPercent = balance > 0 ? (profit / (balance - profit)) * 100 : 0;
    
    const top = assets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current, assets[0]);
    
    const networks = new Set(assets.map(a => a.network)).size;

    return {
      totalBalance: balance,
      totalProfit: profit,
      profitPercentage: profitPercent,
      topPerformer: top,
      uniqueNetworks: networks,
      totalCryptos: assets.length,
    };
  }, [assets]);

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-border/60 bg-card/50">
        <Loader2 className="size-6 animate-spin text-muted-foreground/50" />
      </div>
    );
  }

  const isProfitPositive = totalProfit >= 0;

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {/* Card 1: Total Balance */}
      <Card className='rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm relative overflow-hidden group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-10'>
          <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            Total Balance
          </CardTitle>
          <div className='rounded-lg bg-primary/10 p-2 text-primary'>
            <Wallet className='size-4' />
          </div>
        </CardHeader>
        <CardContent className='relative z-10'>
          <div className='text-2xl font-bold '>${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <p className='text-[10px] text-muted-foreground mt-1'>
            Base currency: USD
          </p>
        </CardContent>
        {/* Sparkline Background */}
        <div className='absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-50 transition-opacity'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={dataBalance}>
              <defs>
                <linearGradient id='gradBalance' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#a3e635' stopOpacity={0.5} />
                  <stop offset='100%' stopColor='#a3e635' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='v'
                stroke='#a3e635'
                strokeWidth={2}
                fill='url(#gradBalance)'
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Card 2: 24h Profit / Loss */}
      <Card className='rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm relative overflow-hidden group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-10'>
          <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            24h Profit / Loss
          </CardTitle>
          <div className={`rounded-lg p-2 ${isProfitPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive"}`}>
            <TrendingUp className='size-4' />
          </div>
        </CardHeader>
        <CardContent className='relative z-10'>
          <div className={`text-2xl font-bold ${isProfitPositive ? "text-emerald-400" : "text-destructive"}`}>
            {isProfitPositive ? "+" : ""}${totalProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center gap-1 text-[10px] mt-1 ${isProfitPositive ? "text-emerald-400" : "text-destructive"}`}>
            {isProfitPositive ? <ArrowUpRight className='size-3' /> : <ArrowDownRight className='size-3' />}
            <span>{isProfitPositive ? "+" : ""}{profitPercentage.toFixed(2)}% since yesterday</span>
          </div>
        </CardContent>
        <div className='absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={dataProfit}>
              <defs>
                <linearGradient id='gradProfit' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor={isProfitPositive ? '#10b981' : '#ef4444'} stopOpacity={0.5} />
                  <stop offset='100%' stopColor={isProfitPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='v'
                stroke={isProfitPositive ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                fill='url(#gradProfit)'
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Card 3: Top Performer */}
      <Card className='rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm relative overflow-hidden group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-10'>
          <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            Top Performer
          </CardTitle>
          <div className='rounded-lg bg-amber-500/10 p-2 text-amber-400'>
            <Coins className='size-4' />
          </div>
        </CardHeader>
        <CardContent className='relative z-10'>
          {topPerformer ? (
            <>
              <div className='text-2xl font-bold flex items-baseline gap-2'>
                <span className="truncate max-w-[120px]">{topPerformer.name}</span>
                <span className='text-xs font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-md'>
                  {topPerformer.symbol}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] mt-1 ${topPerformer.change24h >= 0 ? "text-emerald-400" : "text-destructive"}`}>
                {topPerformer.change24h >= 0 ? <ArrowUpRight className='size-3' /> : <ArrowDownRight className='size-3' />}
                <span>{topPerformer.change24h >= 0 ? "+" : ""}{topPerformer.change24h.toFixed(2)}% yield rate</span>
              </div>
            </>
          ) : (
            <div className='text-sm font-medium text-muted-foreground mt-2'>No assets yet</div>
          )}
        </CardContent>
        <div className='absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={dataSolana}>
              <defs>
                <linearGradient id='gradSolana' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#fbbf24' stopOpacity={0.5} />
                  <stop offset='100%' stopColor='#fbbf24' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='v'
                stroke='#fbbf24'
                strokeWidth={2}
                fill='url(#gradSolana)'
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Card 4: Asset Diversity */}
      <Card className='rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm relative overflow-hidden group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-10'>
          <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            Asset Diversity
          </CardTitle>
          <div className='rounded-lg bg-purple-500/10 p-2 text-purple-400'>
            <Layers className='size-4' />
          </div>
        </CardHeader>
        <CardContent className='relative z-10'>
          <div className='text-2xl font-bold '>{totalCryptos} Cryptos</div>
          <p className='text-[10px] text-muted-foreground mt-1'>
            Spread across {uniqueNetworks} main networks
          </p>
        </CardContent>
        <div className='absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={dataDiversity}>
              <defs>
                <linearGradient id='gradDiv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#a855f7' stopOpacity={0.5} />
                  <stop offset='100%' stopColor='#a855f7' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='step'
                dataKey='v'
                stroke='#a855f7'
                strokeWidth={2}
                fill='url(#gradDiv)'
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
