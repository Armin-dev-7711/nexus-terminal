// src/app/dashboard/notifications/page.tsx
import { Metadata } from "next";
import { NotificationHub } from "@/features/notifications/components/NotificationHub";

export const metadata: Metadata = {
  title: "Notifications Inbox | NEXUS Terminal",
  description:
    "Monitor your synchronized crypto ledger operations, smart alerts, and security nodes.",
};

export default function NotificationsInboxPage() {
  return (
    <div className='flex-1 space-y-6 p-6 pt-8 md:p-8 max-w-5xl mx-auto w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground'>
          Notifications Inbox
        </h2>
        <p className='text-sm text-muted-foreground'>
          Monitor your synchronized crypto ledger operations, smart alerts, and
          security nodes.
        </p>
      </div>

      {/* Main Component */}
      <NotificationHub />
    </div>
  );
}
