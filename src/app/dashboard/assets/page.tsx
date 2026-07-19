// // src/app/dashboard/assets/page.tsx
// import { Metadata } from "next";
// import { AssetsClientRoot } from "@/features/assets/components/AssetsClientRoot";

// export const metadata: Metadata = {
//   title: "Assets Portfolio | NEXUS Terminal",
//   description:
//     "Manage, track, and analyze your decentralized assets across all networks.",
// };

// export default function AssetsPage() {
//   return <AssetsClientRoot />;
// }

// src/app/dashboard/assets/page.tsx
import { Metadata } from "next";
import { AssetsClientRoot } from "@/features/assets/components/AssetsClientRoot";

export const metadata: Metadata = {
  title: "Assets Portfolio | NEXUS Terminal",
  description:
    "Manage, track, and analyze your decentralized assets across all networks.",
};

// 🚀 فیکس شد: تبدیل به async برای تریگر کردن loading.tsx
export default async function AssetsPage() {
  // 🚀 فیکس شد: تریگر کردن loading.tsx با یک تأخیر مصنوعی
  // روی ورسل، این تأخیر باعث می‌شود لودینگ شش‌ضلعی فوراً نشان داده شود
  await new Promise((resolve) => setTimeout(resolve, 800));

  return <AssetsClientRoot />;
}
