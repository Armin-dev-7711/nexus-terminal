// src/features/assets/hooks/useAssetModals.ts
"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { assetFormSchema, AssetFormValues } from "../schemas/asset.schema";
import { useAddAsset, useUpdateAsset, useDeleteAsset, useAssetsData } from "./useAssets";

export function useAssetModals(
  type: "add" | "edit" | "delete" | null,
  isOpen: boolean,
  onClose: () => void,
  assetId?: string
) {
  const isDelete = type === "delete";

  const { data: assets } = useAssetsData();
  const assetToEdit = useMemo(() => assets?.find((a) => a.id === assetId), [assets, assetId]);

  const { mutateAsync: addAsset, isPending: isAdding } = useAddAsset();
  const { mutateAsync: updateAsset, isPending: isUpdating } = useUpdateAsset();
  const { mutateAsync: deleteAsset, isPending: isDeleting } = useDeleteAsset();

  const isPending = isAdding || isUpdating || isDeleting;

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
    if (isOpen && type === "edit" && assetToEdit) {
      form.reset({
        network: assetToEdit.network,
        symbol: assetToEdit.symbol,
        amount: assetToEdit.holdingsAmount,
        purchasePrice: assetToEdit.price, // We map price to purchasePrice in mock
      });
    } else if (!isOpen) {
      form.reset({
        network: undefined,
        symbol: "",
        amount: "" as unknown as number,
        purchasePrice: "" as unknown as number,
      });
    }
  }, [isOpen, type, assetToEdit, form]);

  const onSubmit: SubmitHandler<AssetFormValues> = useCallback(
    async (data) => {
      try {
        if (type === "add") {
          await addAsset(data);
        } else if (type === "edit" && assetId) {
          await updateAsset({ id: assetId, data });
        }
        onClose();
      } catch (error) {
        console.error("Mutation failed", error);
      }
    },
    [type, assetId, addAsset, updateAsset, onClose],
  );

  const handleDelete = useCallback(async () => {
    if (assetId) {
      try {
        await deleteAsset(assetId);
        onClose();
      } catch (error) {
        console.error("Deletion failed", error);
      }
    }
  }, [assetId, deleteAsset, onClose]);

  return {
    form,
    isPending,
    isDelete,
    onSubmit: form.handleSubmit(onSubmit),
    handleDelete,
  };
}
