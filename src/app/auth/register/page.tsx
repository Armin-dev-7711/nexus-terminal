//src/app/auth/register/page.tsx
import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Suspense } from "react";
import DashboardLoading from "@/app/loading";

export const metadata: Metadata = {
  title: "Create Master Key | NEXUS Terminal",
  description:
    "Initialize your secure decentralized account node and join the network cluster.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <RegisterForm />
    </Suspense>
  );
}
