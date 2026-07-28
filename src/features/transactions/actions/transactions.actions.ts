"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redis, CACHE_KEYS } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import {
  TransactionDetail,
  TransactionType,
  NetworkType,
  TransactionStatus,
} from "../types";
import { TransactionFormValues } from "../schemas/transaction.schema";
import { Prisma } from "@/app/generated/prisma/client";

interface GetTransactionsOptions {
  type?: string;
  network?: string;
  assetSymbol?: string;
}

export async function getTransactions(
  options?: GetTransactionsOptions,
): Promise<TransactionDetail[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;

  // Construct a stable query string for the cache key
  const queryStr = options ? JSON.stringify(options) : "all";
  const cacheKey = CACHE_KEYS.USER_TRANSACTIONS(userId, queryStr);

  // 1. Check Redis Cache
  const cachedTx = await redis.get<TransactionDetail[]>(cacheKey);
  if (cachedTx) {
    return cachedTx;
  }

  // 2. Fetch from Database
  const whereClause: Prisma.TransactionWhereInput = { userId };
  if (options?.type && options.type !== "All") whereClause.type = options.type;
  if (options?.network && options.network !== "All")
    whereClause.network = options.network;
  if (options?.assetSymbol)
    whereClause.assetSymbol = {
      contains: options.assetSymbol,
      mode: "insensitive",
    };

  const dbTransactions = await prisma.transaction.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // 3. Map to UI Model
  const mappedTransactions: TransactionDetail[] = dbTransactions.map((tx) => ({
    id: tx.id,
    txHash: tx.txHash,
    type: tx.type as TransactionType,
    assetSymbol: tx.assetSymbol,
    assetName: tx.assetName,
    network: tx.network as NetworkType,
    amount: tx.amount,
    valueUsd: tx.valueUsd,
    status: tx.status as TransactionStatus,
    date: tx.createdAt.toISOString(),
    feeUsd: tx.feeUsd || undefined,
    destinationAddress: tx.destinationAddress || undefined,
  }));

  // 4. Store in Redis
  await redis.set(cacheKey, mappedTransactions, { ex: 3600 }); // Cache for 1 hour

  return mappedTransactions;
}

import { createNotification } from "@/features/notifications/actions/notifications.actions";

export async function addTransaction(data: TransactionFormValues) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;

  // Generate mock data for missing fields
  const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
  const mockValueUsd = data.amount * (Math.random() * 1000 + 100); // Arbitrary price between 100 and 1100
  const mockFeeUsd = Math.random() * 5 + 1; // Arbitrary fee between $1 and $6
  const mockStatus = "Completed";
  const assetName = data.assetSymbol.toUpperCase(); // Fallback name

  await prisma.transaction.create({
    data: {
      userId,
      type: data.type,
      network: data.network,
      assetSymbol: data.assetSymbol,
      assetName,
      amount: data.amount,
      txHash: mockTxHash,
      valueUsd: mockValueUsd,
      feeUsd: mockFeeUsd,
      status: mockStatus,
      // destinationAddress and note can remain null
    },
  });

  // Invalidate cache
  const keys = await redis.keys(`user:transactions:${userId}:*`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }

  // Trigger Notification
  await createNotification(userId, {
    title: "New Transaction",
    description: `Successfully executed ${data.type} of ${data.amount} ${data.assetSymbol} on ${data.network}.`,
    category: "trade",
    link: "/dashboard/transactions",
  });

  revalidatePath("/dashboard/transactions");

  return { success: true };
}

export async function deleteTransaction(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;

  await prisma.transaction.delete({
    where: { id, userId },
  });

  const keys = await redis.keys(`user:transactions:${userId}:*`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }

  revalidatePath("/dashboard/transactions");

  return { success: true };
}
