import type { LucideIcon } from "lucide-react";

type SidebarMenuItemLabels =
  | "Dashboard"
  | "Analytics"
  | "Assets"
  | "Transactions"
  | "Settings";

type SidebarMenuRoutes =
  | "/dashboard"
  | "/dashboard/analytics"
  | "/dashboard/assets"
  | "/dashboard/transactions"
  | "/dashboard/settings";

export interface SidebarMenuTypes<
  TLabel extends string = SidebarMenuItemLabels,
  TRoute extends string = SidebarMenuRoutes,
> {
  icon: LucideIcon;
  label: TLabel;
  route: TRoute;
}
