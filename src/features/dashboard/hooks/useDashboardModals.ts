// src/features/dashboard/hooks/useDashboardModals.ts
"use client";

import { useCallback, useEffect } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  dashboardActionSchema,
  DashboardActionFormValues,
} from "../schemas/dashboard.schema";

import { useAddAsset } from "@/features/assets/hooks/useAssets";
import { useAddTransaction } from "@/features/transactions/hooks/useTransactions";

const NETWORK_SYMBOL_MAP: Record<string, string> = {
  Ethereum: "ETH",
  Solana: "SOL",
  Binance: "BNB",
  Bitcoin: "BTC",
  Polygon: "POL",
};

export function useDashboardModals(
  activeModal: "add" | "transfer" | null,
  onClose: () => void,
) {
  const isTransfer = activeModal === "transfer";
  const { mutateAsync: addAsset, isPending: isAddingAsset } = useAddAsset();
  const { mutateAsync: addTransaction, isPending: isAddingTransaction } = useAddTransaction();
  
  const isPending = isAddingAsset || isAddingTransaction;

  const form = useForm<DashboardActionFormValues>({
    resolver: zodResolver(
      dashboardActionSchema,
    ) as Resolver<DashboardActionFormValues>,
    defaultValues: {
      network: undefined,
      amount: "" as unknown as number,
      destinationAddress: "",
    },
  });

  useEffect(() => {
    if (activeModal === null) {
      form.reset();
    }
  }, [activeModal, form]);

  const onSubmit: SubmitHandler<DashboardActionFormValues> = useCallback(
    async (data) => {
      try {
        const symbol = NETWORK_SYMBOL_MAP[data.network] || data.network.substring(0, 3).toUpperCase();
        
        if (isTransfer) {
          await addTransaction({
            type: "Transfer",
            network: data.network,
            assetSymbol: symbol,
            amount: Number(data.amount),
          });
          toast.success("Transfer Initiated", {
            description: `Successfully initiated transfer on ${data.network}.`,
          });
        } else {
          await addAsset({
            network: data.network,
            symbol: symbol,
            amount: Number(data.amount),
            purchasePrice: 1000, // Using a mock price since we don't have a price input in the dashboard modal
          });
          toast.success("Funds Added", {
            description: `Successfully added funds via ${data.network}.`,
          });
        }
        
        onClose();
      } catch (error) {
        console.error("Action failed", error);
      }
    },
    [isTransfer, addAsset, addTransaction, onClose],
  );

  return {
    form,
    isPending,
    isTransfer,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
