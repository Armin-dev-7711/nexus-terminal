// src/features/notifications/mocks/notifications.mock.ts

import { NotificationItem } from "../types";

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Trade Executed Successfully",
    description:
      "Bought 0.024 BTC at $64,250.80 USD. Ledger funding operation complete.",
    category: "trade",
    status: "unread",
    timestamp: new Date().toISOString(), // Today
    link: "/dashboard/transactions",
  },
  {
    id: "notif-2",
    title: "New Device Authorization",
    description:
      "A new login was detected from Chrome on MacBook Pro (Long Beach, USA).",
    category: "security",
    status: "unread",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    link: "/dashboard/settings?tab=security",
  },
  {
    id: "notif-3",
    title: "Weekly Portfolio Snapshot",
    description:
      "Your portfolio value increased by +2.35% over the last 7 days. Check analytics.",
    category: "system",
    status: "read",
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // Yesterday
    link: "/dashboard/analytics",
  },
  {
    id: "notif-4",
    title: "Security Policy Updated",
    description:
      "Two-Factor Authentication (2FA) enforcement settings have been successfully synchronized.",
    category: "security",
    status: "read",
    timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(), // Days gone by
  },
];
