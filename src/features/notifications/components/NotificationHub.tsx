// src/features/notifications/components/NotificationHub.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Check, Trash2, MailOpen, CheckSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getCategoryConfig } from "../context/NotificationContext";
import { useNotificationHub } from "../hooks/useNotificationHub";

export function NotificationHub() {
  const {
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
  } = useNotificationHub();

  if (!isMounted) {
    return (
      <div className='animate-pulse h-96 bg-muted/5 rounded-2xl border border-border/40' />
    );
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* ---------------- Toolbar / Filters ---------------- */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4'>
        <div className='flex items-center gap-1 bg-muted/40 p-1 border border-border/40 rounded-xl shrink-0 self-start'>
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
              activeFilter === "all"
                ? "bg-background text-foreground shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All Logs
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
              activeFilter === "unread"
                ? "bg-background text-foreground shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <Badge className='h-4 min-w-4 px-1 flex justify-center items-center text-[9px] bg-primary text-primary-foreground font-bold'>
                {unreadCount}
              </Badge>
            )}
          </button>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "trade", "security", "system"] as const).map((cat) => (
            <Button
              key={cat}
              variant='outline'
              size='sm'
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "h-8 text-[11px] rounded-xl font-medium border-border/60 cursor-pointer uppercase tracking-wider",
                categoryFilter === cat
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-muted/10 text-muted-foreground hover:bg-muted/30",
              )}
            >
              {cat}
            </Button>
          ))}

          <div className='h-4 w-px bg-border/60 mx-1 hidden sm:block' />

          {unreadCount > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={markAllAsRead}
              className='h-8 text-[11px] rounded-xl text-muted-foreground hover:text-foreground cursor-pointer'
            >
              <CheckSquare className='size-3.5 mr-1.5' /> Read All
            </Button>
          )}
          {filteredNotifications.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={clearAll}
              className='h-8 text-[11px] rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer'
            >
              <Trash2 className='size-3.5 mr-1.5' /> Clear All
            </Button>
          )}
        </div>
      </div>

      {/* ---------------- Notifications List ---------------- */}
      <div className='space-y-6'>
        {Object.entries(groupedData).map(([groupName, items]) => {
          if (items.length === 0) return null;

          return (
            <div key={groupName} className='space-y-3'>
              <h3 className='text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2'>
                {groupName}
              </h3>
              <div className='space-y-2'>
                {items.map((notif) => {
                  const catConfig = getCategoryConfig(notif.category);
                  const Icon = catConfig.icon;
                  const isUnread = notif.status === "unread";

                  return (
                    <div
                      key={notif.id}
                      onClick={() => viewNotification(notif)}
                      className={cn(
                        "group relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-sm",
                        isUnread
                          ? "bg-primary/[0.02] border-primary/20 hover:bg-primary/[0.04]"
                          : "bg-card/20 border-border/40 hover:bg-muted/5",
                      )}
                    >
                      <div
                        className={cn(
                          "size-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5",
                          catConfig.color,
                        )}
                      >
                        <Icon className='size-4.5' />
                      </div>

                      <div className='flex-1 min-w-0 space-y-1'>
                        <div className='flex items-center justify-between gap-4'>
                          <p
                            className={cn(
                              "text-sm font-semibold truncate",
                              isUnread
                                ? "text-foreground font-bold"
                                : "text-muted-foreground",
                            )}
                          >
                            {notif.title}
                          </p>
                          <span className='text-[10px] text-muted-foreground/60 shrink-0'>
                            {format(new Date(notif.timestamp), "HH:mm a")}
                          </span>
                        </div>
                        <p className='text-xs text-muted-foreground leading-relaxed max-w-3xl truncate'>
                          {notif.description}
                        </p>
                      </div>

                      <div className='absolute right-4 bottom-4 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm p-1 rounded-lg border border-border/60'>
                        {isUnread && (
                          <Button
                            variant='ghost'
                            size='icon'
                            aria-label='Mark notification as read' // 🚀 فیکس شد
                            className='size-7 rounded-md'
                            onClick={(e) => {
                              e.stopPropagation();
                              viewNotification(notif);
                            }}
                          >
                            <Check className='size-3.5 text-primary' />
                          </Button>
                        )}
                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label='Delete notification' // 🚀 فیکس شد
                          className='size-7 rounded-md text-destructive hover:bg-destructive/10'
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                        >
                          <Trash2 className='size-3.5' />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ---------------- Empty State ---------------- */}
        {filteredNotifications.length === 0 && (
          <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-8 text-center'>
            <div className='flex flex-col items-center justify-center gap-3 py-12 max-w-sm mx-auto'>
              <div className='size-12 rounded-xl bg-muted/20 border border-border/40 flex items-center justify-center text-muted-foreground/60'>
                <MailOpen className='size-5' />
              </div>
              <h4 className='text-sm font-semibold text-foreground mt-2'>
                Inbox is perfectly empty
              </h4>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                There are no network log operations or transaction signals
                matching your active filter index.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
