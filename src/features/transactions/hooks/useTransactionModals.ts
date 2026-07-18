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

export function useTransactionModals(
  type: TransactionActionType,
  isOpen: boolean,
  onClose: () => void,
) {
  const [isPending, startTransition] = useTransition();
  const isDelete = type === "delete";
  const isImport = type === "import";

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
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Ledger Updated", {
          description: `Successfully processed ${data.type} of ${data.amount} ${data.assetSymbol}.`,
        });
        onClose();
      });
    },
    [onClose],
  );

  const handleImportSubmit = useCallback(() => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("CSV Imported", {
        description: "142 new transactions added to your ledger.",
      });
      onClose();
    });
  }, [onClose]);

  const handleDeleteSubmit = useCallback(() => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      toast.error("Record Deleted", {
        description: "The transaction has been permanently removed.",
      });
      onClose();
    });
  }, [onClose]);

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
