//src/app/auth/register/page.tsx
import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Master Key | NEXUS Terminal",
  description:
    "Initialize your secure decentralized account node and join the network cluster.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
