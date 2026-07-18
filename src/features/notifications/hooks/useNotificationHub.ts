//  src/features/notifications/hooks/useNotificationHub.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { isToday, isYesterday } from "date-fns";
import { NotificationItem, NotificationCategory } from "../types";
import { useNotifications } from "../context/NotificationContext";

export function useNotificationHub() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFilter, setActiveTab] = useState<"all" | "unread">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | NotificationCategory
  >("all");

  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAll,
    deleteNotification,
    viewNotification,
  } = useNotifications();

  // Prevent Hydration error in Next.js
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // eslint-disable-next-line
      setIsMounted(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Smart filtering
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesTab = activeFilter === "all" || n.status === "unread";
      const matchesCategory =
        categoryFilter === "all" || n.category === categoryFilter;
      return matchesTab && matchesCategory;
    });
  }, [notifications, activeFilter, categoryFilter]);

  // Smart time grouping
  const groupedData = useMemo(() => {
    const groups: Record<string, NotificationItem[]> = {
      Today: [],
      Yesterday: [],
      "Older Logs": [],
    };

    filteredNotifications.forEach((item) => {
      const date = new Date(item.timestamp);
      if (isToday(date)) groups["Today"].push(item);
      else if (isYesterday(date)) groups["Yesterday"].push(item);
      else groups["Older Logs"].push(item);
    });

    return groups;
  }, [filteredNotifications]);

  return {
    isMounted,
    activeFilter,
    setActiveTab,
    categoryFilter,
    setCategoryFilter,
    filteredNotifications,
    groupedData,
    unreadCount,
    markAllAsRead,
    clearAll,
    deleteNotification,
    viewNotification,
  };
}
