// src/components/shared/AppSidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  Hexagon,
  LifeBuoy,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { SidebarMainMenuItems, SidebarManagementMenuItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size='lg'>
              <Link href='/dashboard' className='flex items-center gap-3 mt-2'>
                <div className='size-8 aspect-square flex justify-center items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Hexagon className='w-10 h-10' />
                </div>
                <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground tracking-wider'>
                  NEXUS
                </h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main part */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {SidebarMainMenuItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <SidebarMenuItem className='mb-1' key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all rounded-xl",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-semibold"
                        : "text-foreground hover:text-foreground",
                    )}
                  >
                    <Link href={item.route}>
                      <item.icon
                        className={cn(
                          "size-4 transition-colors",
                          isActive && "text-primary",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <div className='mx-2 my-2 h-px bg-sidebar-border' />

        {/* Management Part */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            {SidebarManagementMenuItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <SidebarMenuItem className='mb-1' key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all rounded-xl",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-semibold"
                        : "text-foreground hover:text-foreground",
                    )}
                  >
                    <Link href={item.route}>
                      <item.icon
                        className={cn(
                          "size-4 transition-colors",
                          isActive && "text-primary",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Account upgrade smart card */}
        <div className={cn(isCollapsed ? "py-2" : "px-3 py-2 mb-2", "mt-auto")}>
          {isCollapsed ? (
            /* 🚀 Fixed: Added aria-label for the upgrade button in collapsed mode */
            <Link href='/dashboard/billing' aria-label='Upgrade to Premium Pro'>
              <div className='flex justify-center items-center size-8 mx-auto rounded-xl bg-primary/10 text-primary border border-primary/20 cursor-pointer hover:bg-primary/20 transition-all'>
                <Sparkles className='w-4 h-4' />
              </div>
            </Link>
          ) : (
            <div className='bg-sidebar-accent/40 border border-sidebar-border p-4 rounded-xl relative overflow-hidden backdrop-blur-md'>
              <div className='absolute -right-4 -top-4 w-12 h-12 bg-primary/10 rounded-full blur-xl' />
              <div className='flex items-center gap-2 mb-1'>
                <Sparkles className='w-4 h-4 text-primary' />
                <h4 className='text-xs font-semibold text-foreground'>
                  Upgrade to Pro
                </h4>
              </div>
              <p className='text-[11px] text-muted-foreground mb-3 leading-relaxed'>
                Unlock real-time AI insights and advanced websocket features.
              </p>
              <Button
                asChild
                size='sm'
                className='w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 text-xs font-medium h-8 rounded-lg transition-all shadow-md shadow-primary/10'
              >
                <Link href='/dashboard/billing'>Upgrade Now</Link>
              </Button>
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* 🚀 Fixed: Added custom aria-label to user profile menu trigger */}
                <SidebarMenuButton
                  size='lg'
                  aria-label='User account menu'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full cursor-pointer'
                >
                  <div className='flex items-center gap-3 w-full text-left'>
                    {/* 🚀 Fixed: Remove component with empty src to prevent fake network data */}
                    <Avatar className='size-8 rounded-lg'>
                      <AvatarFallback className='rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xs'>
                        NX
                      </AvatarFallback>
                    </Avatar>

                    {!isCollapsed && (
                      <div className='flex flex-col flex-1 text-left truncate'>
                        <span className='text-xs font-semibold text-foreground truncate'>
                          Arshad Dev
                        </span>
                        <span className='text-[10px] text-muted-foreground truncate'>
                          candidate@nexus.cap
                        </span>
                      </div>
                    )}

                    {!isCollapsed && (
                      <ChevronsUpDown className='ml-auto size-4 text-muted-foreground' />
                    )}
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-popover text-popover-foreground border-border shadow-xl shadow-black/40'
                side={isCollapsed ? "right" : "bottom"}
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='size-8 rounded-lg'>
                      <AvatarFallback className='rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xs'>
                        NX
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold text-foreground text-xs'>
                        Arshad Dev
                      </span>
                      <span className='truncate text-[10px] text-muted-foreground'>
                        candidate@nexus.cap
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    id='upgrade-item'
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/billing'>
                      <Sparkles className='size-4 text-primary' />
                      <span>Upgrade to Premium</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/settings?tab=account'>
                      <User className='size-4 text-muted-foreground' />
                      <span>Account Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/settings?tab=preferences'>
                      <Settings className='size-4 text-muted-foreground' />
                      <span>System Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/billing'>
                      <CreditCard className='size-4 text-muted-foreground' />
                      <span>Billing & Plans</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/notifications'>
                      <Bell className='size-4 text-muted-foreground' />
                      <span>Notifications Inbox</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/settings?tab=security'>
                      <ShieldCheck className='size-4 text-muted-foreground' />
                      <span>Security & Privacy</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer gap-2 text-xs py-2'
                  >
                    <Link href='/dashboard/support'>
                      <LifeBuoy className='size-4 text-muted-foreground' />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  asChild
                  className='cursor-pointer gap-2 text-xs py-2 text-destructive hover:text-destructive focus:bg-destructive/10 focus:text-destructive'
                >
                  <Link href='/login'>
                    <LogOut className='size-4' />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
