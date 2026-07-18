// src/app/dashboard/transactions/page.tsx
import { Metadata } from "next";
import { TransactionsClientRoot } from "@/features/transactions/components/TransactionsClientRoot";

export const metadata: Metadata = {
  title: "Transaction History | NEXUS Terminal",
  description:
    "Review your complete ledger activity, deposits, withdrawals, and trades.",
};

export default function TransactionsPage() {
  return <TransactionsClientRoot />;
}
