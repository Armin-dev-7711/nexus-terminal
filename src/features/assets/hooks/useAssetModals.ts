// src/features/assets/hooks/useAssetModals.ts
"use client";

import { useTransition, useEffect, useCallback } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { assetFormSchema, AssetFormValues } from "../schemas/asset.schema";

export function useAssetModals(
  type: "add" | "edit" | "delete" | null,
  isOpen: boolean,
  onClose: () => void,
) {
  const isDelete = type === "delete";
  const [isPending, startTransition] = useTransition();

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema) as Resolver<AssetFormValues>,
    defaultValues: {
      network: undefined,
      symbol: "",
      amount: "" as unknown as number,
      purchasePrice: "" as unknown as number,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit: SubmitHandler<AssetFormValues> = useCallback(
    (data) => {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const isAdd = type === "add";
        const actionVerb = isAdd ? "added to" : "updated in";

        toast.success("Asset Ledger Updated", {
          description: `Successfully ${actionVerb} your portfolio.`,
          action: {
            label: `${data.symbol} on ${data.network}`,
            onClick: () => console.log("User clicked action"),
          },
        });

        onClose();
      });
    },
    [type, onClose],
  );

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      toast.error("Asset Removed", {
        description: "The asset and its history have been permanently deleted.",
      });
      onClose();
    });
  }, [onClose]);

  return {
    form,
    isPending,
    isDelete,
    onSubmit: form.handleSubmit(onSubmit),
    handleDelete,
  };
}
