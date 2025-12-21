import { type LucideIcon } from "lucide-react";

import { UserRole } from "@/shared/lib/rbac/roles";

export interface NavSubItem {
  title: string;
  url: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  roles: UserRole[];
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}
