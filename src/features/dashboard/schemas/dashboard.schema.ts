import { z } from "zod";

export const NETWORKS = [
  "Ethereum",
  "Solana",
  "Binance",
  "Bitcoin",
  "Polygon",
] as const;

export const dashboardActionSchema = z.object({
  network: z.enum(NETWORKS, {
    message: "Please select a valid network.",
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  // We make the destination address field optional because it is only needed for Transfer mode.
  destinationAddress: z.string().optional(),
});

export type DashboardActionFormValues = z.infer<typeof dashboardActionSchema>;
