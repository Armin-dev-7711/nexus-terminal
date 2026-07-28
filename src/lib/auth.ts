// // src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma";

// export const auth = betterAuth({
//   // اتصال به آداپتور پریزمای دپلو شده ما
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   // قابلیت ورود با ایمیل و پسورد
//   emailAndPassword: {
//     enabled: true,
//   },
// });

// // src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma";

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   // 🚀 فعال‌سازی ماتریس‌های ورود خارجی (OAuth)
//   socialProviders: {
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//     apple: {
//       clientId: process.env.APPLE_CLIENT_ID as string,
//       clientSecret: process.env.APPLE_CLIENT_SECRET as string,
//     },
//   },
// });

// // src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma";

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   // 🚀 تعیین آدرس مبدا برای اعتبارسنجی دقیق درخواست‌ها
//   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://nexus-terminal-two-iota.vercel.app",
//   ],
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//   },
//   // 🚀 حل قطعی مشکل کوکی در فایرفاکس و لوکال‌هوست
//   advanced: {
//     useSecureCookies: process.env.NODE_ENV === "production", // روی لوکال‌هوست اجبار Secure را برمی‌دارد تا فایرفاکس کوکی را فوری ست کند
//   },
// });

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend"; // 🚀 ۱. ایمپورت Resend
import prisma from "./prisma";
import { getVerificationEmailHtml } from "./email/verify-template"; // 🚀 ۲. ایمپورت قالب ایمیل
import { getResetPasswordEmailHtml } from "./email/reset-template"; // 🚀 ایمپورت قالب ریست پسورد

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      newsletter: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: true,
      },
      termsAcceptedAt: {
        type: "date",
        required: false,
        input: true,
      },
    },
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NODE_ENV === "production"
          ? "https://nexus-terminal-7711.vercel.app"
          : "http://localhost:3000"),
  trustedOrigins: [
    "http://localhost:3000",
    "https://nexus-terminal-7711.vercel.app",
    "https://nexus-terminal-two-iota.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // 🚀 ۳. اجبار کاربری که با ایمیل ثبت‌نام می‌کند به تایید ایمیل
    sendResetPassword: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: "NEXUS Core <onboarding@resend.dev>",
          to: user.email,
          subject: "🔑 NEXUS Network: Emergency Security Key Reset",
          html: getResetPasswordEmailHtml({
            userName: user.name || "Operator",
            resetUrl: url,
          }),
        });
      } catch (error) {
        console.error("Failed to send reset password email:", error);
      }
    },
  },
  // 🚀 ۴. تنظیمات ارسال ایمیل تایید با Resend
  emailVerification: {
    sendOnSignUp: true, // موقع ثبت‌نام خودش خودکار ایمیل می‌فرستد
    autoSignInAfterVerification: true, // بعد از زدن روی لینک ایمیل، کاربر خودکار لاگین شود
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: "NEXUS Core <onboarding@resend.dev>", // ایمیل تست پیش‌فرض Resend
          to: user.email,
          subject: "⚡ NEXUS Network: Verify Your Identity Node",
          html: getVerificationEmailHtml({
            userName: user.name || "Operator",
            verificationUrl: url,
          }),
        });
      } catch (error) {
        console.error("Failed to send verification email:", error);
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
