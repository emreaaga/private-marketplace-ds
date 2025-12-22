"use client";

import { ShoppingCartIcon, StoreIcon, Package, ClipboardList } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  { href: "/dashboard/seller/orders", label: "Заказы", icon: ClipboardList },
  { href: "/dashboard/seller/main", label: "Продукты", icon: Package },
  { href: "/dashboard/seller/store", label: "Витрина", icon: StoreIcon },
  { href: "/dashboard/seller/order-cart", label: "Корзина", icon: ShoppingCartIcon },
];

export function SellerHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
