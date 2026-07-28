// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://nexus-terminal-two-iota.vercel.app"
          : "http://localhost:3000"),
  plugins: [inferAdditionalFields<typeof auth>()],
});

// اکسپورت کردن توابع برای استفاده راحت در کامپوننت‌های کلاینتی
export const { useSession, signIn, signUp, signOut } = authClient;
