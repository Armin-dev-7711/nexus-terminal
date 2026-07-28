// src/features/transactions/hooks/useTransactionModals.ts
"use client";

import { useTransition, useEffect, useCallback } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  transactionFormSchema,
  TransactionFormValues,
} from "../schemas/transaction.schema";
import { TransactionActionType } from "../components/TransactionActionModals";
import { useAddTransaction, useDeleteTransaction } from "./useTransactions";

export function useTransactionModals(
  type: TransactionActionType,
  isOpen: boolean,
  onClose: () => void,
  transactionId?: string
) {
  const isDelete = type === "delete";
  const isImport = type === "import";

  const addMutation = useAddTransaction();
  const deleteMutation = useDeleteTransaction();
  const isPending = addMutation.isPending || deleteMutation.isPending;

  // Safe form formatting with Zod
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(
      transactionFormSchema,
    ) as Resolver<TransactionFormValues>,
    defaultValues: {
      type: undefined,
      network: undefined,
      assetSymbol: "",
      amount: "" as unknown as number,
    },
  });

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form]);

  const onSubmit: SubmitHandler<TransactionFormValues> = useCallback(
    (data) => {
      addMutation.mutate(data, {
        onSuccess: () => {
          onClose();
          form.reset();
        }
      });
    },
    [addMutation, onClose, form],
  );

  const handleImportSubmit = useCallback(() => {
    // Import not strictly requested yet, just a mock closing logic
    toast.success("CSV Imported", {
      description: "Demo mode: CSV import successful.",
    });
    onClose();
  }, [onClose]);

  const handleDeleteSubmit = useCallback(() => {
    if (!transactionId) return;
    deleteMutation.mutate(transactionId, {
      onSuccess: () => {
        onClose();
      }
    });
  }, [deleteMutation, transactionId, onClose]);

  return {
    form,
    isPending,
    isDelete,
    isImport,
    onSubmit: form.handleSubmit(onSubmit),
    handleImportSubmit,
    handleDeleteSubmit,
  };
}
