// src/app/auth/reset-password/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import DashboardLoading from "@/app/loading";

export const metadata: Metadata = {
  title: "Reset Security Key | NEXUS Terminal",
  description:
    "Override your secret security key to regain access to your NEXUS node matrix.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
