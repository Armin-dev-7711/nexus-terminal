// src/components/shared/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Sun,
  Moon,
  Search,
  Activity,
  ShieldAlert,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { formatDistanceToNow } from "date-fns";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useNotifications } from "@/features/notifications/context/NotificationContext";
import { NotificationCategory } from "@/features/notifications/types";

const getMiniIcon = (category: NotificationCategory) => {
  switch (category) {
    case "trade":
      return <Activity className='size-3.5 text-emerald-400' />;
    case "security":
      return <ShieldAlert className='size-3.5 text-amber-400' />;
    case "system":
      return <Bell className='size-3.5 text-blue-400' />;
  }
};

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const { notifications, unreadCount, markAllAsRead, viewNotification } =
    useNotifications();

  const segments = pathname.split("/").filter(Boolean);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className='sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-md gap-4'>
        <div className='flex items-center gap-3 min-w-0'>
          {/* 🚀 فیکس شد: اضافه شدن aria-label برای سایدبار */}
          <SidebarTrigger
            aria-label='Toggle Sidebar'
            className='cursor-pointer text-muted-foreground hover:text-foreground transition-colors shrink-0'
          />
          <div className='h-4 w-px bg-border shrink-0' />

          <Breadcrumb className='truncate'>
            <BreadcrumbList className='flex-nowrap'>
              <BreadcrumbItem className='hidden sm:inline-flex'>
                <BreadcrumbLink href='/dashboard'>Platform</BreadcrumbLink>
              </BreadcrumbItem>

              {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;
                const formattedSegment =
                  segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                  <React.Fragment key={segment}>
                    <BreadcrumbSeparator className='text-muted-foreground/50 hidden sm:inline-flex' />
                    <BreadcrumbItem className='truncate'>
                      {isLast ? (
                        <BreadcrumbPage className='font-semibold text-foreground truncate'>
                          {formattedSegment}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={href}
                          className='capitalize hidden sm:inline-flex'
                        >
                          {formattedSegment}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='hidden lg:flex w-full max-w-md items-center justify-center px-2'>
          <Button
            variant='outline'
            aria-label='Open global search'
            className='h-9 w-full justify-between bg-muted/20 border-border text-muted-foreground hover:bg-muted/40 hover:text-muted-foreground transition-all cursor-pointer rounded-xl px-3 font-normal group'
            onClick={() => setOpen(true)}
          >
            <div className='flex items-center gap-2'>
              <Search className='size-3.5 text-muted-foreground/70 group-hover:text-muted-foreground transition-colors' />
              <span className='text-xs'>Search assets, transactions...</span>
            </div>
            <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium opacity-100'>
              <span>⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className='flex items-center gap-2 md:gap-3 shrink-0'>
          {/* 🚀 فیکس شد: aria-label دکمه سرچ موبایل */}
          <Button
            variant='ghost'
            size='icon'
            aria-label='Open search'
            className='size-9 rounded-xl text-muted-foreground hover:text-foreground lg:hidden cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <Search className='size-4' />
          </Button>

          <div className='hidden xl:flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-primary'></span>
            </span>
            <span className='text-[9px] font-medium text-muted-foreground uppercase tracking-wider'>
              Live Connection
            </span>
          </div>

          {/* 🚀 فیکس شد: aria-label دکمه تغییر تم */}
          <Button
            variant='ghost'
            size='icon'
            aria-label='Toggle theme'
            className='size-9 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* 🚀 فیکس شد: aria-label دکمه نوتیفیکیشن‌ها */}
              <Button
                variant='ghost'
                size='icon'
                aria-label='View notifications'
                className='size-9 rounded-xl text-muted-foreground hover:text-foreground relative cursor-pointer data-[state=open]:bg-muted/40'
              >
                <Bell className='size-4' />
                {unreadCount > 0 && (
                  <span className='absolute top-2 right-2.5 size-2 rounded-full bg-primary ring-2 ring-background animate-pulse' />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='end'
              className='w-64 sm:w-96 max-sm:mx-4 rounded-2xl border-border/80 bg-popover/95 backdrop-blur-md shadow-2xl overflow-y-auto scrollbar-thin p-0'
            >
              <div className='flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/5'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-bold text-foreground'>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge className='h-5 px-1.5 bg-primary/20 text-primary border-0 text-[10px]'>
                      {unreadCount} New
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={markAllAsRead}
                    className='h-7 px-2 text-[10px] text-muted-foreground hover:text-foreground cursor-pointer'
                  >
                    <Check className='size-3 mr-1' /> Mark all read
                  </Button>
                )}
              </div>

              <div className='max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-border py-1'>
                {notifications.length > 0 ? (
                  notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => viewNotification(notif)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/40",
                        notif.status === "unread"
                          ? "bg-primary/[0.02]"
                          : "opacity-70",
                      )}
                    >
                      <div className='mt-0.5 shrink-0 bg-background border border-border/40 p-1.5 rounded-lg shadow-sm'>
                        {getMiniIcon(notif.category)}
                      </div>
                      <div className='flex-1 min-w-0 space-y-1'>
                        <p
                          className={cn(
                            "text-xs truncate",
                            notif.status === "unread"
                              ? "font-bold text-foreground"
                              : "font-medium text-muted-foreground",
                          )}
                        >
                          {notif.title}
                        </p>
                        <p className='text-[10px] text-muted-foreground line-clamp-1'>
                          {notif.description}
                        </p>
                        <p className='text-[9px] text-muted-foreground/60 pt-0.5'>
                          {formatDistanceToNow(new Date(notif.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      {notif.status === "unread" && (
                        <div className='size-1.5 rounded-full bg-primary shrink-0 mt-1.5' />
                      )}
                    </div>
                  ))
                ) : (
                  <div className='py-8 text-center flex flex-col items-center gap-2'>
                    <Bell className='size-6 text-muted-foreground/30' />
                    <p className='text-xs text-muted-foreground font-medium'>
                      You&apos;re all caught up!
                    </p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator className='m-0 bg-border/40' />
              <div className='p-2 bg-muted/5'>
                <Button
                  asChild
                  variant='ghost'
                  className='w-full h-8 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10 cursor-pointer'
                >
                  <Link href='/dashboard/notifications'>
                    View All Activity Log
                  </Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* 🚀 فیکس شد: محتوای سنگین مودالِ سرچ فقط زمانی رندر می‌شود که کاربر آن را باز کند (Lazy Evaluation) */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {open && (
          <Command className='border-0 bg-transparent shadow-none'>
            <CommandInput
              placeholder='Type a command or search...'
              className='h-11 bg-transparent text-sm focus:ring-0'
            />
            <div className='mb-2 mt-4 h-px bg-border/40 mx-2' />
            <CommandList className='max-h-[65vh] sm:max-h-[400px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-muted-foreground/20'>
              <CommandEmpty className='py-6 text-center text-xs text-muted-foreground'>
                No results found.
              </CommandEmpty>
              <CommandGroup
                heading='Suggestions'
                className='px-2 text-muted-foreground text-[10px] font-medium tracking-wider uppercase'
              >
                <CommandItem className='cursor-pointer rounded-xl py-2.5 px-3 text-xs text-foreground/90 data-[selected=true]:bg-sidebar-accent data-[selected=true]:text-sidebar-accent-foreground transition-all duration-150 mt-1'>
                  Dashboard Overview
                </CommandItem>
                <CommandItem className='cursor-pointer rounded-xl py-2.5 px-3 text-xs text-foreground/90 data-[selected=true]:bg-sidebar-accent data-[selected=true]:text-sidebar-accent-foreground transition-all duration-150 mt-1'>
                  Crypto Assets Portfolio
                </CommandItem>
                <CommandItem className='cursor-pointer rounded-xl py-2.5 px-3 text-xs text-foreground/90 data-[selected=true]:bg-sidebar-accent data-[selected=true]:text-sidebar-accent-foreground transition-all duration-150 mt-1'>
                  Transaction History
                </CommandItem>
              </CommandGroup>
              <div className='my-2 h-px bg-border/40 mx-2' />
              <CommandGroup
                heading='Settings'
                className='px-2 text-muted-foreground text-[10px] font-medium tracking-wider uppercase'
              >
                <CommandItem className='cursor-pointer rounded-xl py-2.5 px-3 text-xs text-foreground/90 data-[selected=true]:bg-sidebar-accent data-[selected=true]:text-sidebar-accent-foreground transition-all duration-150 mt-1'>
                  Account Profile
                </CommandItem>
                <CommandItem className='cursor-pointer rounded-xl py-2.5 px-3 text-xs text-foreground/90 data-[selected=true]:bg-sidebar-accent data-[selected=true]:text-sidebar-accent-foreground transition-all duration-150 mt-1'>
                  System Settings
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </CommandDialog>
    </>
  );
}
