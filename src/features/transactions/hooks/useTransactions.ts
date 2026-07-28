import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTransactions, addTransaction, deleteTransaction } from "../actions/transactions.actions";
import { TransactionDetail, TransactionType, NetworkType } from "../types";
import { toast } from "sonner";
import { TransactionFormValues } from "../schemas/transaction.schema";

const TRANSACTIONS_QUERY_KEY = "transactions";

export function useTransactionsData(options?: { type?: string; network?: string; assetSymbol?: string }) {
  // Construct array key to include filters
  const queryKey = [TRANSACTIONS_QUERY_KEY, options];

  return useQuery({
    queryKey,
    queryFn: () => getTransactions(options),
    staleTime: 1000 * 30, // 30 seconds
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionFormValues) => addTransaction(data),
    onMutate: async (newTx) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      // We can't easily append to ALL cached queries with filters, but we can update the "all" filter
      // or invalidate. For optimistic update, updating the exact matching cache key is hard if filters are active.
      // Usually, it's safer to invalidate or just update the base key.
      
      // Let's just create a toast for now since we rely on `onSettled` to invalidate.
      const optimisticTx: TransactionDetail = {
        id: `temp-${Date.now()}`,
        txHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}...`,
        type: newTx.type as TransactionType,
        assetSymbol: newTx.assetSymbol,
        assetName: newTx.assetSymbol.toUpperCase(),
        network: newTx.network as NetworkType,
        amount: newTx.amount,
        valueUsd: newTx.amount * 100, // Mock
        status: "Pending",
        date: new Date().toISOString(),
      };

      // Best effort update all queries starting with TRANSACTIONS_QUERY_KEY
      queryClient.setQueriesData<TransactionDetail[]>({ queryKey: [TRANSACTIONS_QUERY_KEY] }, (old) => {
        return old ? [optimisticTx, ...old] : [optimisticTx];
      });

      return { optimisticTx };
    },
    onError: () => {
      toast.error("Failed to record transaction.");
    },
    onSuccess: () => {
      toast.success("Transaction recorded successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      queryClient.setQueriesData<TransactionDetail[]>({ queryKey: [TRANSACTIONS_QUERY_KEY] }, (old) => {
        return old?.filter((tx) => tx.id !== id);
      });
    },
    onError: () => {
      toast.error("Failed to delete transaction.");
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
