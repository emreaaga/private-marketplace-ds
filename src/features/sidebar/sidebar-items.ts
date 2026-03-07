"use client";

import { BarChart3, Package, Settings, Store, UserCircle, Users, Wallet } from "lucide-react";

import { NavGroup } from "@/features/sidebar/types/sidebar.types";

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Панели",
    items: [
      {
        title: "Главная",
        url: "/dashboard/main",
        icon: BarChart3,
      },
      {
        title: "Пользователи",
        url: "/dashboard/users/main",
        icon: Users,
      },
      {
        title: "Настройки",
        url: "/dashboard/settings/roles",
        icon: Settings,
      },
    ],
  },
  {
    id: 2,
    label: "Логистика",
    items: [
      {
        title: "Логистика",
        url: "/dashboard/test/flights",
        icon: Package,
      },
      {
        title: "Продавцы",
        url: "/dashboard/seller/orders",
        icon: Store,
      },
      {
        title: "Клиенты",
        url: "/dashboard/clients/orders",
        icon: UserCircle,
      },
      {
        title: "Почта 2.0",
        url: "/dashboard/logistics/flights",
        icon: Package,
      },
    ],
  },
  {
    id: 3,
    label: "Финансы",
    items: [
      {
        title: "Кошелек",
        url: "/dashboard/wallet",
        icon: Wallet,
      },
    ],
  },
];
