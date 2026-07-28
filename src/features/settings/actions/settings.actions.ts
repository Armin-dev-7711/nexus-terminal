// // src/features/settings/actions/settings.actions.ts
// "use server";

// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { redis, CACHE_KEYS } from "@/lib/redis";
// import { revalidatePath } from "next/cache";

// // 🚀 ۱. خواندن تمام تنظیمات (با ترکیب Redis و دیتابیس)
// export async function getUserSettings() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) throw new Error("Unauthorized Access");

//   const userId = session.user.id;
//   const cacheKey = CACHE_KEYS.USER_SETTINGS(userId);

//   // الف) ابتدا Redis را چک می‌کنیم (فوق سریع)
//   const cachedSettings = await redis.get(cacheKey);
//   if (cachedSettings) {
//     return cachedSettings;
//   }

//   // ب) اگر در Redis نبود، از دیتابیس می‌گیریم
//   const userSettings = await prisma.user.findUnique({
//     where: { id: userId },
//     select: {
//       name: true,
//       email: true,
//       image: true,
//       timezone: true,
//       currency: true,
//       language: true,
//       theme: true,
//       twoFactorEnabled: true,
//       securityAlerts: true,
//       tradeExecutions: true,
//       weeklyReports: true,
//       accounts: { select: { providerId: true } }, // 💡 این برای تشخیص OAuth یا رمز عبور است
//     },
//   });

//   if (!userSettings) throw new Error("Node Data Missing");

//   // پ) دیتای گرفته شده را در Redis ذخیره می‌کنیم (برای ۱ ساعت)
//   await redis.set(cacheKey, userSettings, { ex: 3600 });

//   return userSettings;
// }

// // 🚀 ۲. آپدیت تنظیمات و پاک کردن کَش
// export async function updatePreferences(data: {
//   theme?: string;
//   currency?: string;
//   language?: string;
//   timezone?: string;
// }) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) throw new Error("Unauthorized Access");

//   const userId = session.user.id;

//   // آپدیت دیتابیس
//   await prisma.user.update({
//     where: { id: userId },
//     data,
//   });

//   // 🚀 پاک کردن حافظه Redis تا تغییرات بلافاصله اعمال شود
//   await redis.del(CACHE_KEYS.USER_SETTINGS(userId));

//   // رفرش کردن استیت سرور Next.js
//   revalidatePath("/dashboard/settings");

//   return { success: true };
// }

// // 🚀 ۳. آپدیت پروفایل شخصی
// export async function updateProfile(data: { name: string; email: string }) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) throw new Error("Unauthorized Access");

//   await prisma.user.update({
//     where: { id: session.user.id },
//     data: { name: data.name, email: data.email },
//   });

//   await redis.del(CACHE_KEYS.USER_SETTINGS(session.user.id));
//   revalidatePath("/dashboard/settings");

//   return { success: true };
// }

// src/features/settings/actions/settings.actions.ts
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redis, CACHE_KEYS } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { UserSettingsResponse } from "../types";
import { createNotification } from "@/features/notifications/actions/notifications.actions";

export async function getUserSettings(): Promise<UserSettingsResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;
  const cacheKey = CACHE_KEYS.USER_SETTINGS(userId);

  // 🚀 تعیین تایپ دقیق در دریافت از Redis
  const cachedSettings = await redis.get<UserSettingsResponse>(cacheKey);
  if (cachedSettings) {
    return cachedSettings;
  }

  const userSettings = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      image: true,
      timezone: true,
      currency: true,
      language: true,
      theme: true,
      twoFactorEnabled: true,
      securityAlerts: true,
      tradeExecutions: true,
      weeklyReports: true,
      accounts: { select: { providerId: true } },
    },
  });

  if (!userSettings) throw new Error("Node Data Missing");

  await redis.set(cacheKey, userSettings, { ex: 3600 });

  return userSettings;
}

export async function updatePreferences(data: {
  theme?: string;
  currency?: string;
  language?: string;
  timezone?: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  const userId = session.user.id;

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  await redis.del(CACHE_KEYS.USER_SETTINGS(userId));
  revalidatePath("/dashboard/settings");

  return { success: true };
}

export async function updateProfile(data: {
  name: string;
  email: string;
  image?: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  });

  await redis.del(CACHE_KEYS.USER_SETTINGS(session.user.id));

  // Trigger Notification
  await createNotification(session.user.id, {
    title: "Profile Updated",
    description: "Your personal details or avatar have been updated.",
    category: "system",
    link: "/dashboard/settings",
  });

  revalidatePath("/dashboard/settings");

  return { success: true };
}

export async function updateSecuritySettings(data: { twoFactorEnabled?: boolean; securityAlerts?: boolean }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized Access");

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  });

  await redis.del(CACHE_KEYS.USER_SETTINGS(session.user.id));

  // Trigger Notification
  await createNotification(session.user.id, {
    title: "Security Settings Updated",
    description: "Your account security preferences have been modified.",
    category: "security",
    link: "/dashboard/settings",
  });

  revalidatePath("/dashboard/settings");

  return { success: true };
}
