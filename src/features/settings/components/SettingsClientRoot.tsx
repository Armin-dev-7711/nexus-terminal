// src/features/settings/components/SettingsClientRoot.tsx
"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Palette, Shield, Bell, Code, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { AccountTab } from "./tabs/AccountTab";

const TabLoadingFallback = () => (
  <div className='flex items-center justify-center w-full h-64 rounded-2xl border border-border/40 bg-card/10 animate-pulse'>
    <Loader2 className='size-6 animate-spin text-muted-foreground/50' />
  </div>
);

const PreferencesTab = dynamic(
  () => import("./tabs/PreferencesTab").then((m) => m.PreferencesTab),
  { loading: TabLoadingFallback },
);
const SecurityTab = dynamic(
  () => import("./tabs/SecurityTab").then((m) => m.SecurityTab),
  { loading: TabLoadingFallback },
);
const NotificationsTab = dynamic(
  () => import("./tabs/NotificationsTab").then((m) => m.NotificationsTab),
  { loading: TabLoadingFallback },
);
const DeveloperTab = dynamic(
  () => import("./tabs/DeveloperTab").then((m) => m.DeveloperTab),
  { loading: TabLoadingFallback },
);

type SettingsTab =
  | "account"
  | "preferences"
  | "security"
  | "notifications"
  | "developer";

const SIDEBAR_NAV = [
  { id: "account", label: "Account", icon: User },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "developer", label: "Developer API", icon: Code },
] as const;

export function SettingsClientRoot() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as SettingsTab | null;
  const activeTab =
    tabParam && SIDEBAR_NAV.some((n) => n.id === tabParam)
      ? tabParam
      : "account";

  const handleTabChange = (tabId: SettingsTab) => {
    router.push(`/dashboard/settings?tab=${tabId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountTab />;
      case "preferences":
        return <PreferencesTab />;
      case "security":
        return <SecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "developer":
        return <DeveloperTab />;
      default:
        return null;
    }
  };

  return (
    <div className='flex-1 space-y-6 p-6 pt-8 md:p-8 max-w-6xl mx-auto w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground'>
          Platform Settings
        </h2>
        <p className='text-sm text-zinc-400'>
          Manage your account preferences, security policies, and API keys.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8'>
        <aside className='w-full lg:w-64 shrink-0'>
          <nav className='flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide'>
            {SIDEBAR_NAV.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  aria-label={`${item.label} Settings`}
                  onClick={() => handleTabChange(item.id as SettingsTab)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer text-left w-full",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                      : "text-zinc-400 hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4",
                      isActive ? "text-primary-foreground" : "text-zinc-400",
                    )}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className='flex-1 min-w-0'>{renderTabContent()}</main>
      </div>
    </div>
  );
}
