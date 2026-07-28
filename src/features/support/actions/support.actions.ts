"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { createNotification } from "@/features/notifications/actions/notifications.actions";
import { SupportCategory, SupportTicket } from "../types";

export async function getTickets(): Promise<SupportTicket[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;
  const cacheKey = `user:tickets:${userId}`;

  try {
    const cachedData = await redis.get<SupportTicket[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  } catch (err) {
    console.error("Redis Cache Error:", err);
  }

  const tickets = await prisma.supportTicket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const formatted: SupportTicket[] = tickets.map((t) => ({
    id: t.id,
    ticketId: t.ticketId,
    subject: t.subject,
    category: t.category as SupportCategory,
    status: t.status as "open" | "processing" | "resolved",
    createdAt: t.createdAt.toISOString(),
    lastUpdate: t.updatedAt.toISOString(),
  }));

  try {
    await redis.set(cacheKey, formatted, { ex: 3600 });
  } catch (err) {
    console.error("Redis Cache Save Error:", err);
  }

  return formatted;
}

export async function createTicket(data: {
  subject: string;
  category: SupportCategory;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) throw new Error("Unauthorized Access: Please log in.");

    const userId = session.user.id;

    // Generate unique TCK-XXXX ID
    const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket = await prisma.supportTicket.create({
      data: {
        userId,
        ticketId,
        subject: data.subject,
        category: data.category,
        status: "open",
      },
    });

    // Clear Redis Cache
    try {
      await redis.del(`user:tickets:${userId}`);
    } catch (err) {
      console.error("Redis Cache Del Error:", err);
    }

    // Create System Notification
    try {
      await createNotification(userId, {
        title: `Support Ticket ${ticketId} Created`,
        description: `Your ticket regarding "${data.subject}" has been successfully indexed and is awaiting processing.`,
        category: "system",
        link: "/dashboard/support",
      });
    } catch (err) {
      console.error("Failed to create notification:", err);
    }

    // Revalidate Dashboard paths
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/support");

    return {
      id: newTicket.id,
      ticketId: newTicket.ticketId,
      subject: newTicket.subject,
      category: newTicket.category as SupportCategory,
      status: newTicket.status as "open" | "processing" | "resolved",
      createdAt: newTicket.createdAt.toISOString(),
      lastUpdate: newTicket.updatedAt.toISOString(),
    };
  } catch (error: unknown) {
    console.error("❌ Error in createTicket Server Action:", error);
    const message = error instanceof Error ? error.message : "Failed to create ticket";
    throw new Error(message);
  }
}
