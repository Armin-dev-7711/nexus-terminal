// src/features/notifications/actions/notifications.actions.ts
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { NotificationCategory, NotificationItem } from "../types";

export async function getNotifications(): Promise<NotificationItem[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;
  const cacheKey = `user:notifications:${userId}`;

  try {
    const cachedData = await redis.get<NotificationItem[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  } catch (err) {
    console.error("Redis Cache Error:", err);
  }

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const formatted: NotificationItem[] = notifications.map((n) => ({
    id: n.id,
    title: n.title,
    description: n.description,
    category: n.category as NotificationCategory,
    status: n.status as "read" | "unread",
    timestamp: n.createdAt.toISOString(),
    link: n.link || undefined,
  }));

  try {
    await redis.set(cacheKey, formatted, { ex: 3600 });
  } catch (err) {
    console.error("Redis Cache Save Error:", err);
  }

  return formatted;
}

export async function createNotification(
  userId: string,
  data: { title: string; description: string; category: NotificationCategory; link?: string }
) {
  const newNotif = await prisma.notification.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      category: data.category,
      link: data.link,
      status: "unread",
    },
  });

  try {
    await redis.del(`user:notifications:${userId}`);
  } catch (err) {
    console.error("Redis Cache Del Error:", err);
  }
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/notifications");

  return newNotif;
}

export async function markAsRead(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { status: "read" },
  });

  await redis.del(`user:notifications:${session.user.id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/notifications");
}

export async function markAllAsRead() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.updateMany({
    where: { userId: session.user.id, status: "unread" },
    data: { status: "read" },
  });

  await redis.del(`user:notifications:${session.user.id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/notifications");
}

export async function deleteNotification(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.delete({
    where: { id, userId: session.user.id },
  });

  await redis.del(`user:notifications:${session.user.id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/notifications");
}

export async function clearAllNotifications() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.deleteMany({
    where: { userId: session.user.id },
  });

  await redis.del(`user:notifications:${session.user.id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/notifications");
}
