// src/features/notifications/types/index.ts

export type NotificationCategory = "trade" | "security" | "system";
export type NotificationStatus = "read" | "unread";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  status: NotificationStatus;
  timestamp: string; // ISO format
  link?: string; // The link the user is directed to when clicking on the notification
}
