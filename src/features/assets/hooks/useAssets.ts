import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAssets, addAsset, updateAsset, deleteAsset } from "../actions/assets.actions";
import { Asset, AssetNetwork } from "../types";
import { toast } from "sonner";
import { AssetFormValues } from "../schemas/asset.schema";

const ASSETS_QUERY_KEY = ["assets"];

export function useAssetsData() {
  return useQuery({
    queryKey: ASSETS_QUERY_KEY,
    queryFn: () => getAssets(),
    staleTime: 1000 * 30, // 30 seconds
  });
}

export function useAddAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssetFormValues) => addAsset(data),
    onMutate: async (newAsset) => {
      await queryClient.cancelQueries({ queryKey: ASSETS_QUERY_KEY });
      const previousAssets = queryClient.getQueryData<Asset[]>(ASSETS_QUERY_KEY);

      const optimisticAsset: Asset = {
        id: `temp-${Date.now()}`, // Temporary ID
        name: newAsset.network,
        symbol: newAsset.symbol,
        network: newAsset.network as AssetNetwork,
        price: newAsset.purchasePrice, // Mock current price
        change24h: 0,
        marketCap: 0,
        holdingsAmount: newAsset.amount,
        holdingsValue: newAsset.amount * newAsset.purchasePrice,
      };

      queryClient.setQueryData<Asset[]>(ASSETS_QUERY_KEY, (old) => {
        return [optimisticAsset, ...(old || [])];
      });

      return { previousAssets };
    },
    onError: (err, newAsset, context) => {
      queryClient.setQueryData(ASSETS_QUERY_KEY, context?.previousAssets);
      toast.error("Failed to add asset");
    },
    onSuccess: () => {
      toast.success("Asset added successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssetFormValues }) => updateAsset(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ASSETS_QUERY_KEY });
      const previousAssets = queryClient.getQueryData<Asset[]>(ASSETS_QUERY_KEY);

      queryClient.setQueryData<Asset[]>(ASSETS_QUERY_KEY, (old) => {
        return old?.map((asset) => 
          asset.id === id 
            ? { 
                ...asset, 
                symbol: data.symbol, 
                network: data.network as AssetNetwork, 
                name: data.network,
                holdingsAmount: data.amount,
                holdingsValue: data.amount * data.purchasePrice // Mock holding value
              } 
            : asset
        );
      });

      return { previousAssets };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(ASSETS_QUERY_KEY, context?.previousAssets);
      toast.error("Failed to update asset");
    },
    onSuccess: () => {
      toast.success("Asset updated successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAsset(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ASSETS_QUERY_KEY });
      const previousAssets = queryClient.getQueryData<Asset[]>(ASSETS_QUERY_KEY);

      queryClient.setQueryData<Asset[]>(ASSETS_QUERY_KEY, (old) => {
        return old?.filter((asset) => asset.id !== id);
      });

      return { previousAssets };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(ASSETS_QUERY_KEY, context?.previousAssets);
      toast.error("Failed to delete asset");
    },
    onSuccess: () => {
      toast.success("Asset deleted successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
