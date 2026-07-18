import { z } from "zod";

export const TRANSACTIONS_TYPES = [
  "Deposit",
  "Withdrawal",
  "Trade",
  "Transfer",
] as const;
export const NETWORKS = [
  "Ethereum",
  "Solana",
  "Binance",
  "Bitcoin",
  "Polygon",
] as const;

export const transactionFormSchema = z.object({
  type: z.enum(TRANSACTIONS_TYPES, { message: "Please select a type." }),
  network: z.enum(NETWORKS, { message: "Please select a network." }),
  assetSymbol: z.string().min(2, "Minimum 2 characters.").max(10),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
