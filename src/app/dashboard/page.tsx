// src/app/dashboard/page.tsx
import { Metadata } from "next";
import { DashboardClientRoot } from "@/features/dashboard/components/DashboardClientRoot";

export const metadata: Metadata = {
  title: "Dashboard Overview | NEXUS Terminal",
  description:
    "Monitor your cryptocurrency portfolio, live market data, and recent transactions.",
};

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return <DashboardClientRoot />;
}
