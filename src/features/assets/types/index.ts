export type AssetNetwork =
  | "Ethereum"
  | "Solana"
  | "Binance"
  | "Bitcoin"
  | "Polygon";

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  network: AssetNetwork;
  price: number;
  change24h: number;
  marketCap: number;
  holdingsAmount: number;
  holdingsValue: number;
  sparklineData?: number[]; // برای نمایش مینی‌چارت در آینده
}
