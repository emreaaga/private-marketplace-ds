"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";

import { AppSidebar } from "./app-sidebar";

export function AppSidebarClient() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return <AppSidebar />;
}
