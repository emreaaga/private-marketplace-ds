"use client";

import dynamic from "next/dynamic";

import { sidebarItems } from "@/features/sidebar/sidebar-items";

const MobileBottomNav = dynamic(() => import("@/shared/ui/organisms/sidebar/mobile-bottom-nav"), { ssr: false });

export function MobileBottomNavClient() {
  return <MobileBottomNav items={sidebarItems} />;
}
