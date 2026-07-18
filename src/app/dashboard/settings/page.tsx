// src/app/dashboard/settings/page.tsx
import { Metadata } from "next";
import { SettingsClientRoot } from "@/features/settings/components/SettingsClientRoot";

export const metadata: Metadata = {
  title: "Account Settings | NEXUS Terminal",
  description:
    "Manage your account preferences, security policies, and developer API keys.",
};

export default function SettingsPage() {
  return <SettingsClientRoot />;
}
