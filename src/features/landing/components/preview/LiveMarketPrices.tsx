// src/features/landing/components/preview/LiveMarketPrices.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  SimulatedCoin,
  useSimulatedMarket,
} from "../../hooks/usePreviewSimulation";

const initialPrices: SimulatedCoin[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    initialPrice: 64250.8,
    change: 2.45,
    isUp: true,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    initialPrice: 3450.25,
    change: -1.12,
    isUp: false,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    initialPrice: 145.1,
    change: 5.82,
    isUp: true,
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    initialPrice: 580.4,
    change: 0.15,
    isUp: true,
  },
];

export function LiveMarketPrices({ isActive = true }: { isActive?: boolean }) {
  const { prices } = useSimulatedMarket(initialPrices, isActive);

  return (
    <div className='flex flex-col h-full bg-[#121214] border border-white/5 rounded-xl p-5'>
      <div className='mb-4'>
        <h3 className='text-[14px] font-bold text-foreground'>
          Live Market Prices
        </h3>
        <p className='text-[10px] text-muted-foreground mt-1'>
          Real-time assets valuation updates.
        </p>
      </div>

      <div className='flex flex-col gap-2 flex-1 justify-between'>
        {prices.map((coin) => (
          <div
            key={coin.id}
            className='flex items-center justify-between p-3 rounded-xl bg-card/20 hover:bg-card/40 transition-colors border border-white/5'
          >
            <div className='flex items-center gap-3'>
              <div className='size-8 rounded-md bg-muted/20 flex items-center justify-center font-bold text-[10px] text-muted-foreground border border-white/5'>
                {coin.symbol.substring(0, 2)}
              </div>
              <div className='flex flex-col'>
                <span className='text-xs font-bold text-foreground'>
                  {coin.name}
                </span>
                <span className='text-[10px] text-muted-foreground'>
                  {coin.symbol}
                </span>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <motion.span
                key={coin.initialPrice} // Causes a soft flash effect when updating
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className='text-xs font-bold text-foreground'
              >
                $
                {coin.initialPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </motion.span>
              <span
                className={`text-[10px] flex items-center gap-0.5 mt-0.5 ${coin.isUp ? "text-emerald-400" : "text-rose-400"}`}
              >
                {coin.isUp ? (
                  <ArrowUpRight className='size-3' />
                ) : (
                  <ArrowDownRight className='size-3' />
                )}
                {coin.isUp ? "+" : ""}
                {coin.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
