import { z } from "zod";

export const NETWORKS = [
  "Ethereum",
  "Solana",
  "Binance",
  "Bitcoin",
  "Polygon",
] as const;

export const assetFormSchema = z.object({
  network: z.enum(NETWORKS, {
    message: "Please select a valid network.",
  }),
  symbol: z
    .string()
    .min(2, "Symbol must be at least 2 characters.")
    .max(10, "Symbol is too long."),
  amount: z.coerce.number().positive("Volume must be greater than 0."),
  purchasePrice: z.coerce.number().positive("Price must be greater than 0."),
});

export type AssetFormValues = z.infer<typeof assetFormSchema>;
