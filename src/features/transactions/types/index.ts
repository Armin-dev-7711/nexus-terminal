// src/features/transactions/types/index.ts

export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionType = "Deposit" | "Withdrawal" | "Trade" | "Transfer";
export type NetworkType =
  | "Ethereum"
  | "Solana"
  | "Binance"
  | "Bitcoin"
  | "Polygon";

export interface TransactionDetail {
  id: string;
  txHash: string; // Blockchain hash (e.g. 0x...)
  type: TransactionType;
  assetSymbol: string;
  assetName: string;
  network: NetworkType;
  amount: number;
  valueUsd: number; // Dollar value at the time of the transaction
  status: TransactionStatus;
  date: string;
  feeUsd?: number; // Network fee (Gas Fee)
  destinationAddress?: string; // For pick-up/transfer only
}
