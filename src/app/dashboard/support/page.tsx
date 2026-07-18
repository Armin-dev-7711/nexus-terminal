// src/app/dashboard/support/page.tsx
import { SupportDashboard } from "@/features/support/components/SupportDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support Center | NEXUS",
  description:
    "Search system documentation, view live network grids, and audit active tickets.",
};

export default function SupportPageRoot() {
  return <SupportDashboard />;
}
