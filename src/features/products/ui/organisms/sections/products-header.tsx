"use client";

import { ShoppingCartIcon, StoreIcon, Package, ClipboardList } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  { href: "/dashboard/products/orders", label: "Заказы", icon: ClipboardList },
  { href: "/dashboard/products/main", label: "Продукты", icon: Package },
  { href: "/dashboard/products/store", label: "Витрина", icon: StoreIcon },
  { href: "/dashboard/products/order-cart", label: "Корзина", icon: ShoppingCartIcon },
];

export function ProductsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
