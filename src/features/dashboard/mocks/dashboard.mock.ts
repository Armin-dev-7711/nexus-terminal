// src/features/dashboard/mocks/dashboard.mock.ts
import { Transaction, LiveAsset, ChartDataPoint } from "../types";

export const mockMultiChartData: Record<string, ChartDataPoint[]> = {
  "1d": [
    { name: "00:00", value: 51200 },
    { name: "04:00", value: 51800 },
    { name: "08:00", value: 51400 },
    { name: "12:00", value: 52600 },
    { name: "16:00", value: 52100 },
    { name: "20:00", value: 52890 },
  ],
  "1w": [
    { name: "Mon", value: 48000 },
    { name: "Tue", value: 49500 },
    { name: "Wed", value: 51000 },
    { name: "Thu", value: 50200 },
    { name: "Fri", value: 53400 },
    { name: "Sat", value: 52100 },
    { name: "Sun", value: 52890 },
  ],
  "1m": [
    { name: "Jan", value: 42000 },
    { name: "Feb", value: 45000 },
    { name: "Mar", value: 43000 },
    { name: "Apr", value: 48000 },
    { name: "May", value: 54000 },
    { name: "Jun", value: 52890 },
  ],
  "1y": [
    { name: "2022", value: 28000 },
    { name: "2023", value: 35000 },
    { name: "2024", value: 41000 },
    { name: "2025", value: 49000 },
    { name: "2026", value: 52890 },
  ],
};

export const mockLiveAssets: LiveAsset[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 64250.8,
    change: 2.45,
    isPositive: true,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3450.25,
    change: -1.12,
    isPositive: false,
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 145.1,
    change: 5.82,
    isPositive: true,
  },
  {
    id: 4,
    name: "Binance Coin",
    symbol: "BNB",
    price: 580.4,
    change: 0.15,
    isPositive: true,
  },
];

export const mockRecentTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "Buy",
    asset: "BTC",
    amount: "0.024 BTC",
    value: "+$1,500.00",
    date: "Today, 14:32",
    status: "Completed",
  },
  {
    id: "tx-2",
    type: "Transfer",
    asset: "USDT",
    amount: "450.00 USDT",
    value: "-$450.00",
    date: "Yesterday, 09:15",
    status: "Completed",
  },
  {
    id: "tx-3",
    type: "Buy",
    asset: "SOL",
    amount: "12.5 SOL",
    value: "+$1,813.75",
    date: "Jun 24, 2026",
    status: "Completed",
  },
];
