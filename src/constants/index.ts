import { SidebarMenuTypes } from "@/types";
import {
  History,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Wallet,
} from "lucide-react";

const SidebarMainMenuItems: SidebarMenuTypes[] = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
  { label: "Assets", icon: Wallet, route: "/dashboard/assets" },
  { label: "Analytics", icon: TrendingUp, route: "/dashboard/analytics" },
];

const SidebarManagementMenuItems: SidebarMenuTypes[] = [
  {
    label: "Transactions",
    icon: History,
    route: "/dashboard/transactions",
  },
  { label: "Settings", icon: Settings, route: "/dashboard/settings" },
];

export { SidebarMainMenuItems, SidebarManagementMenuItems };
