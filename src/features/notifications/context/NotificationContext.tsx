"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  BellRing,
  Activity,
  ShieldAlert,
  Bell,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { NotificationItem, NotificationCategory } from "../types";
import { mockNotifications } from "../mocks/notifications.mock";

// 🔥 Move the style function here and export it for use in the header and hub
export const getCategoryConfig = (category: NotificationCategory) => {
  switch (category) {
    case "trade":
      return {
        label: "Trading System",
        icon: Activity,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    case "security":
      return {
        label: "Security Node",
        icon: ShieldAlert,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    case "system":
      return {
        label: "Platform Core",
        icon: Bell,
        color: "text-blue-400 bg-blue-500/10 border-blue-200/20",
      };
  }
};

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  deleteNotification: (id: string) => void;
  viewNotification: (notif: NotificationItem) => void;
}

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(mockNotifications);
  const [isMounted, setIsMounted] = React.useState(false);

  // Global state for the modal
  const [selectedNotif, setSelectedNotif] =
    React.useState<NotificationItem | null>(null);

  // 🔥 Solution: First effect only for Hydration management
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      // eslint-disable-next-line
      setIsMounted(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  // 🔥 Second effect for timer logic and live data
  React.useEffect(() => {
    const liveAlerts = [
      {
        title: "Limit Order Filled",
        description: "Sold 1.5 ETH at $3,450.25 USD.",
        category: "trade" as const,
      },
      {
        title: "API Key Rotation",
        description: "Binance Sync Read-Only key was utilized recently.",
        category: "security" as const,
      },
      {
        title: "Network Upgrade Status",
        description: "Ethereum gas optimization ledger sync completed.",
        category: "system" as const,
      },
    ];

    const interval = setInterval(() => {
      const randomAlert =
        liveAlerts[Math.floor(Math.random() * liveAlerts.length)];
      const newNotif: NotificationItem = {
        id: `live-notif-${Date.now()}`,
        title: randomAlert.title,
        description: randomAlert.description,
        category: randomAlert.category,
        status: "unread",
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotif, ...prev]);
      toast("Nexus Live Alert", {
        description: randomAlert.title,
        icon: <BellRing className='size-4 text-primary' />,
      });
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" })));
  };

  const clearAll = () => setNotifications([]);

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // 🔥 Combination function: both marks the message as read and opens the modal
  const viewNotification = (notif: NotificationItem) => {
    markAsRead(notif.id);
    setSelectedNotif(notif);
  };

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const modalConfig = selectedNotif
    ? getCategoryConfig(selectedNotif.category)
    : null;
  const ModalIcon = modalConfig?.icon;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: isMounted ? unreadCount : 0,
        markAsRead,
        markAllAsRead,
        clearAll,
        deleteNotification,
        viewNotification,
      }}
    >
      {children}

      {/* 🌟 Global modal that is accessible anywhere in the application 🌟 */}
      <Dialog
        open={selectedNotif !== null}
        onOpenChange={(open) => !open && setSelectedNotif(null)}
      >
        <DialogContent className='sm:max-w-[420px] border-border/60 bg-card/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl z-[100]'>
          {selectedNotif && modalConfig && ModalIcon && (
            <div className='space-y-5 animate-in fade-in zoom-in-95 duration-200'>
              <DialogHeader className='text-left'>
                <div className='flex items-center gap-3 mb-2'>
                  <div
                    className={cn(
                      "p-2 rounded-xl border flex items-center justify-center shrink-0",
                      modalConfig.color,
                    )}
                  >
                    <ModalIcon className='size-4' />
                  </div>
                  <span className='text-[10px] font-bold uppercase tracking-widest opacity-60'>
                    {modalConfig.label}
                  </span>
                </div>
                <DialogTitle className='text-base font-bold text-foreground leading-snug'>
                  {selectedNotif.title}
                </DialogTitle>
                <DialogDescription className='hidden'>
                  Detailed view of the alert
                </DialogDescription>
              </DialogHeader>

              <div className='border-t border-dashed border-border/60 my-2' />

              <p className='text-xs text-muted-foreground leading-relaxed bg-muted/10 p-4 rounded-xl border border-border/40'>
                {selectedNotif.description}
              </p>

              <div className='grid grid-cols-2 gap-3 text-[11px] text-muted-foreground bg-muted/5 border border-border/20 p-3 rounded-xl'>
                <div className='flex items-center gap-1.5'>
                  <Calendar className='size-3.5 opacity-60 text-primary' />
                  <span>
                    {format(new Date(selectedNotif.timestamp), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className='flex items-center gap-1.5 justify-end'>
                  <Clock className='size-3.5 opacity-60 text-primary' />
                  <span>
                    {format(new Date(selectedNotif.timestamp), "HH:mm:ss a")}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 pt-2'>
                <Button
                  variant='outline'
                  onClick={() => setSelectedNotif(null)}
                  className='flex-1 rounded-xl text-xs h-9 border-border/60 hover:bg-muted/30 cursor-pointer'
                >
                  Close
                </Button>
                {selectedNotif.link && (
                  <Button
                    asChild
                    className='flex-1 rounded-xl text-xs h-9 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10 cursor-pointer'
                  >
                    <Link
                      href={selectedNotif.link}
                      onClick={() => setSelectedNotif(null)}
                    >
                      <ExternalLink className='size-3.5 mr-1.5' /> Take Action
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
