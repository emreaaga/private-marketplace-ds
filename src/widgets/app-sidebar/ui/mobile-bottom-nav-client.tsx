"use client";

import dynamic from "next/dynamic";

import { sidebarItems } from "@/widgets/app-sidebar/model/sidebar-items";

const MobileBottomNav = dynamic(() => import("@/widgets/app-sidebar/ui/mobile-bottom-nav"), { ssr: false });

export function MobileBottomNavClient() {
  return <MobileBottomNav items={sidebarItems} />;
}
