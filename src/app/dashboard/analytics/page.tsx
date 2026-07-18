// src/app/dashboard/analytics/page.tsx
import { Metadata } from "next";
import { AnalyticsClientRoot } from "@/features/analytics/components/AnalyticsClientRoot";

export const metadata: Metadata = {
  title: "Advanced Analytics | NEXUS Terminal",
  description:
    "Deep dive into your portfolio's performance, risk metrics, and cash flow distributions.",
};

export default function AnalyticsPage() {
  return (
    <div className='flex-1 p-6 pt-8 md:p-8 space-y-6'>
      <AnalyticsClientRoot />
    </div>
  );
}
