// src/app/dashboard/assets/page.tsx
import { Metadata } from "next";
import { AssetsClientRoot } from "@/features/assets/components/AssetsClientRoot";

export const metadata: Metadata = {
  title: "Assets Portfolio | NEXUS Terminal",
  description:
    "Manage, track, and analyze your decentralized assets across all networks.",
};

export default function AssetsPage() {
  return <AssetsClientRoot />;
}
