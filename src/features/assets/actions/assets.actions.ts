"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redis, CACHE_KEYS } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { Asset, AssetNetwork } from "../types";
import { AssetFormValues } from "../schemas/asset.schema";

// Helper to simulate live market data since we don't have an API yet.
function generateMockMarketData(averagePrice: number, amount: number) {
  // Simulate current price as +/- 5% of average price for demo
  const mockCurrentPrice = averagePrice * (1 + (Math.random() * 0.1 - 0.03)); // Slightly biased to positive
  const change24h = (Math.random() * 10) - 5;
  const marketCap = mockCurrentPrice * 1000000 * (Math.random() * 10 + 1);
  
  const startPrice = mockCurrentPrice / (1 + change24h / 100);
  const steps = 24;
  const sparklineData: number[] = [];
  
  for (let i = 0; i < steps; i++) {
    const progress = i / (steps - 1);
    const trend = startPrice + (mockCurrentPrice - startPrice) * progress;
    const wave = Math.sin(progress * Math.PI * 3) * (mockCurrentPrice * 0.015);
    const noise = (Math.random() - 0.5) * (mockCurrentPrice * 0.008);
    const val = i === steps - 1 ? mockCurrentPrice : Math.max(0.01, trend + wave + noise);
    sparklineData.push(Number(val.toFixed(2)));
  }

  return {
    price: mockCurrentPrice,
    change24h,
    marketCap,
    holdingsAmount: amount,
    holdingsValue: amount * mockCurrentPrice,
    sparklineData,
  };
}

export async function getAssets(): Promise<Asset[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;
  const cacheKey = CACHE_KEYS.USER_ASSETS(userId);

  // 1. Check Redis Cache
  const cachedAssets = await redis.get<Asset[]>(cacheKey);
  if (cachedAssets) {
    return cachedAssets;
  }

  // 2. Fetch from Database
  const dbAssets = await prisma.asset.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  // 3. Map to UI Model & generate mock market data
  const mappedAssets: Asset[] = dbAssets.map((dbAsset) => {
    const marketData = generateMockMarketData(dbAsset.averagePrice, dbAsset.amount);
    
    return {
      id: dbAsset.id,
      name: dbAsset.name,
      symbol: dbAsset.symbol,
      network: dbAsset.network as AssetNetwork,
      ...marketData,
    };
  });

  // 4. Store in Redis
  await redis.set(cacheKey, mappedAssets, { ex: 3600 }); // Cache for 1 hour

  return mappedAssets;
}

import { createNotification } from "@/features/notifications/actions/notifications.actions";

export async function addAsset(data: AssetFormValues) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;
  const name = data.network; // Use network as name for now
  const coinId = data.symbol.toLowerCase(); // coinId defaults to symbol lowercased

  await prisma.asset.create({
    data: {
      userId,
      coinId,
      name,
      symbol: data.symbol,
      network: data.network,
      amount: data.amount,
      averagePrice: data.purchasePrice,
    },
  });

  // Invalidate cache
  await redis.del(CACHE_KEYS.USER_ASSETS(userId));

  // Trigger Notification
  await createNotification(userId, {
    title: "Asset Added",
    description: `Added ${data.amount} ${data.symbol} to your portfolio.`,
    category: "system",
    link: "/dashboard/assets",
  });

  revalidatePath("/dashboard/assets");

  return { success: true };
}

export async function updateAsset(id: string, data: AssetFormValues) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;
  const name = data.network;
  const coinId = data.symbol.toLowerCase();

  await prisma.asset.update({
    where: { id, userId }, // Ensure the asset belongs to the user
    data: {
      coinId,
      name,
      symbol: data.symbol,
      network: data.network,
      amount: data.amount,
      averagePrice: data.purchasePrice,
    },
  });

  // Invalidate cache
  await redis.del(CACHE_KEYS.USER_ASSETS(userId));
  revalidatePath("/dashboard/assets");

  return { success: true };
}

export async function deleteAsset(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;

  await prisma.asset.delete({
    where: { id, userId },
  });

  // Invalidate cache
  await redis.del(CACHE_KEYS.USER_ASSETS(userId));
  revalidatePath("/dashboard/assets");

  return { success: true };
}
