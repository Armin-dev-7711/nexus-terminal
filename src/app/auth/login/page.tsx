// src/app/auth/login/page.tsx
import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Secure Login | NEXUS Terminal",
  description:
    "Sign in to continue managing your decentralized crypto portfolio and edge node arrays.",
};

export default function LoginPage() {
  return <LoginForm />;
}
