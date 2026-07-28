// src/app/auth/login/page.tsx
import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Suspense } from "react";
import DashboardLoading from "@/app/loading";

export const metadata: Metadata = {
  title: "Secure Login | NEXUS Terminal",
  description:
    "Sign in to continue managing your decentralized crypto portfolio and edge node arrays.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <LoginForm />
    </Suspense>
  );
}
