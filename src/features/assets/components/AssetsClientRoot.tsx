// src/features/assets/components/AssetsClientRoot.tsx
"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic"; // 🚀 وارد کردن داینامیک

import { columns } from "./columns";
import { AssetsTable } from "./AssetsTable";
import { AssetsTableSkeleton } from "./AssetsTableSkeleton";

import { Asset } from "../types";
import { mockAssetsData } from "../mocks/assets.mock";

const AssetActionModals = dynamic(
  () => import("./AssetActionModals").then((mod) => mod.AssetActionModals),
  { ssr: false },
);

const AssetDetailSheet = dynamic(
  () => import("./AssetDetailSheet").then((mod) => mod.AssetDetailSheet),
  { ssr: false },
);

export function AssetsClientRoot() {
  const [sheetAsset, setSheetAsset] = React.useState<Asset | null>(null);
  const [modalConfig, setModalConfig] = React.useState<{
    type: "add" | "edit" | "delete" | null;
    assetId?: string;
  }>({ type: null });

  const [isLoading, setIsLoading] = React.useState(true);
  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    let mounted = true;
    const fetchAssets = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (mounted) {
        setAssets(mockAssetsData);
        setIsLoading(false);
      }
    };
    fetchAssets();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className='flex-1 space-y-6 p-6 pt-8 md:p-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground'>
            Assets Portfolio
          </h2>
          <p className='text-sm text-muted-foreground'>
            Manage, track, and analyze your decentralized assets across all
            networks.
          </p>
        </div>
        <Button
          onClick={() => setModalConfig({ type: "add" })}
          className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl cursor-pointer w-full sm:w-auto sm:self-auto self-start shadow-md shadow-primary/10'
        >
          <Plus className='mr-2 size-4' /> Add Asset
        </Button>
      </div>

      {isLoading ? (
        <AssetsTableSkeleton />
      ) : (
        <AssetsTable
          columns={columns}
          data={assets}
          onRowClick={setSheetAsset}
          onAction={(type, assetId) => setModalConfig({ type, assetId })}
          onAddAsset={() => setModalConfig({ type: "add" })}
        />
      )}

      {sheetAsset !== null && (
        <AssetDetailSheet
          asset={sheetAsset}
          isOpen={sheetAsset !== null}
          onClose={() => setSheetAsset(null)}
        />
      )}

      {modalConfig.type !== null && (
        <AssetActionModals
          type={modalConfig.type}
          assetId={modalConfig.assetId}
          isOpen={modalConfig.type !== null}
          onClose={() => setModalConfig({ type: null })}
        />
      )}
    </div>
  );
}
