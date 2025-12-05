"use client";

import { Users, LayoutDashboard, Package, Contact, ShoppingCart } from "lucide-react";

import { NavGroup } from "@/features/sidebar/types/sidebar.types";

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Панели",
    items: [
      {
        title: "Главная",
        url: "/dashboard/main",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Страницы",
    items: [
      {
        title: "Пользователи",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Мои продукты",
        url: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Клиенты",
        url: "/dashboard/clients",
        icon: Contact,
      },
      {
        title: "Корзина",
        url: "/dashboard/order-cart",
        icon: ShoppingCart,
      },
    ],
  },
];
