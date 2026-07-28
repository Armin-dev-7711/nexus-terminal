// src/lib/redis.ts
import { Redis } from "@upstash/redis";

// اتصال به کلاستر Redis با استفاده از متغیرهای محیطی
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// کلیدهای کش اختصاصی برای نکسوس
export const CACHE_KEYS = {
  USER_SETTINGS: (userId: string) => `user:settings:${userId}`,
  USER_ASSETS: (userId: string) => `user:assets:${userId}`,
  USER_TRANSACTIONS: (userId: string, query?: string) => `user:transactions:${userId}:${query || 'all'}`,
};
