"use client";

import { Users, Package, ClipboardList, UserCircle, BarChart3, Settings, Store } from "lucide-react";

import { NavGroup } from "@/features/sidebar/types/sidebar.types";
import { UserRole } from "@/shared/lib/rbac/roles";

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Панели",
    items: [
      {
        title: "Главная",
        url: "/dashboard/main",
        icon: BarChart3,
        roles: [UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER],
      },
    ],
  },
  {
    id: 2,
    label: "Страницы",
    items: [
      {
        title: "Пользователи",
        url: "/dashboard/users/main",
        icon: Users,
        roles: [UserRole.ADMIN],
      },
      {
        title: "Почта",
        url: "/dashboard/logistics/orders",
        icon: Package,
        roles: [UserRole.ADMIN],
      },
      {
        title: "Продавцы",
        url: "/dashboard/products/orders",
        icon: Store,
        roles: [UserRole.ADMIN],
      },
      {
        title: "Клиенты",
        url: "/dashboard/clients/orders",
        icon: UserCircle,
        roles: [UserRole.ADMIN],
      },
      {
        title: "Настройки",
        url: "/dashboard/settings/roles",
        icon: Settings,
        roles: [UserRole.ADMIN],
      },
    ],
  },
];
