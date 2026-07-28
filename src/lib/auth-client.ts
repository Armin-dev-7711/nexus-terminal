// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

// اکسپورت کردن توابع برای استفاده راحت در کامپوننت‌های کلاینتی
export const { useSession, signIn, signUp, signOut } = authClient;
