"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Asset } from "../types";
import {
  TrendingUp,
  TrendingDown,
  Coins,
  DollarSign,
  Wallet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  TooltipProps,
} from "recharts";

interface AssetDetailSheetProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

type TimeFrame = "24H" | "7D" | "1M" | "1Y";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Price:</span>
          <span className="font-semibold text-foreground">
            $
            {data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Holdings Value:</span>
          <span className="font-bold text-primary">
            $
            {data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function AssetDetailSheet({
  asset,
  isOpen,
  onClose,
}: AssetDetailSheetProps) {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>("24H");

  const isPositive = asset ? asset.change24h >= 0 : true;
  const strokeColor = isPositive ? "#10b981" : "#ef4444";
  const gradientId = `asset-chart-gradient-${asset?.id || "default"}`;

  const chartData = React.useMemo(() => {
    if (!asset) return [];

    const rawPoints =
      asset.sparklineData && asset.sparklineData.length > 0
        ? asset.sparklineData
        : [asset.price * (1 - asset.change24h / 100), asset.price];

    // Scale data factor based on timeframe for realistic UI representation
    let points = rawPoints;
    if (timeFrame === "7D") {
      points = rawPoints.map((p, i) => p * (1 + Math.sin(i * 0.5) * 0.03));
    } else if (timeFrame === "1M") {
      points = rawPoints.map((p, i) => p * (1 + Math.cos(i * 0.4) * 0.06));
    } else if (timeFrame === "1Y") {
      points = rawPoints.map((p, i) => p * (1 + Math.sin(i * 0.8) * 0.12));
    }

    const count = points.length;
    return points.map((val, idx) => {
      let timeLabel = "";
      if (timeFrame === "24H") {
        const hour = Math.floor((idx * 24) / count);
        timeLabel = `${hour.toString().padStart(2, "0")}:00`;
      } else if (timeFrame === "7D") {
        timeLabel = `Day ${Math.floor((idx * 7) / count) + 1}`;
      } else if (timeFrame === "1M") {
        timeLabel = `Day ${Math.floor((idx * 30) / count) + 1}`;
      } else {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        timeLabel = monthNames[idx % 12];
      }

      return {
        time: timeLabel,
        price: Number(val.toFixed(2)),
        value: Number((val * asset.holdingsAmount).toFixed(2)),
      };
    });
  }, [asset, timeFrame]);

  if (!asset) return null;

  const minPrice = Math.min(...chartData.map((d) => d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.price));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-l border-border/60 bg-background/95 backdrop-blur-xl overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          <SheetHeader className="text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-base text-primary shadow-sm">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold tracking-tight">
                    {asset.name}
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <span>{asset.symbol}</span>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 rounded-md bg-muted/30"
                    >
                      {asset.network}
                    </Badge>
                  </SheetDescription>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold font-mono">
                  $
                  {asset.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div
                  className={`inline-flex items-center gap-1 text-xs font-semibold mt-0.5 ${
                    isPositive ? "text-emerald-400" : "text-destructive"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="size-3.5" />
                  ) : (
                    <TrendingDown className="size-3.5" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Interactive Recharts Area Chart */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-4 space-y-4 shadow-sm backdrop-blur-sm mx-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Price Performance
              </p>
              <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-lg border border-border/40">
                {(["24H", "7D", "1M", "1Y"] as TimeFrame[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition-all ${
                      timeFrame === tf
                        ? "bg-background text-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-44 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={strokeColor}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={strokeColor}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="text-border/30"
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 10 }}
                    className="text-muted-foreground/60"
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 10 }}
                    className="text-muted-foreground/60"
                    tickFormatter={(val) =>
                      `$${val > 1000 ? (val / 1000).toFixed(1) + "k" : val}`
                    }
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={strokeColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#${gradientId})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
              <div>
                Period Low:{" "}
                <span className="font-semibold text-foreground font-mono">
                  ${minPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                Period High:{" "}
                <span className="font-semibold text-foreground font-mono">
                  ${maxPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Holdings Overview */}
          <div className="space-y-3 mx-4">
            <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase px-1">
              Your Position Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/50 bg-muted/10 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Coins className="size-3.5 text-primary" />
                  <span>Holdings Volume</span>
                </div>
                <p className="text-base font-bold font-mono text-foreground">
                  {asset.holdingsAmount.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {asset.symbol}
                  </span>
                </p>
              </div>

              <div className="rounded-xl border border-border/50 bg-muted/10 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wallet className="size-3.5 text-primary" />
                  <span>Total Value</span>
                </div>
                <p className="text-base font-bold font-mono text-foreground">
                  $
                  {asset.holdingsValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
