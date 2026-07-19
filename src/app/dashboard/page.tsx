// //  src/app/dashboard/page.tsx
// import { Metadata } from "next";
// import { DashboardClientRoot } from "@/features/dashboard/components/DashboardClientRoot";

// export const metadata: Metadata = {
//   title: "Dashboard Overview | NEXUS Terminal",
//   description:
//     "Monitor your cryptocurrency portfolio, live market data, and recent transactions.",
// };

// export default function DashboardPage() {
//   return <DashboardClientRoot />;
// }

// src/app/dashboard/page.tsx
import { Metadata } from "next";
import { DashboardClientRoot } from "@/features/dashboard/components/DashboardClientRoot";

export const metadata: Metadata = {
  title: "Dashboard Overview | NEXUS Terminal",
  description:
    "Monitor your cryptocurrency portfolio, live market data, and recent transactions.",
};

// 🚀 فیکس شد: اضافه کردن async به کامپوننت سروری
export default async function DashboardPage() {
  // 🚀 فیکس شد: ایجاد یک تأخیر سروری برای فعال شدن قطعی loading.tsx
  // در آینده که Prisma را وصل کردی، اینجا مینویسی: await prisma.user.findUnique(...)
  // فعلاً با این کار به Next.js می‌فهمانیم که باید لودینگ را نشان دهد:
  await new Promise((resolve) => setTimeout(resolve, 800));

  return <DashboardClientRoot />;
}
