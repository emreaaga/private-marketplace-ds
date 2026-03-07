"use client";

import Link from "next/link";

import { Command } from "lucide-react";

import { sidebarItems } from "@/features/sidebar/sidebar-items";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { APP_CONFIG } from "@/shared/lib/app-config";
import { type UserAuth } from "@/shared/types/users/user.auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/atoms/sidebar";
import { NavMain } from "@/shared/ui/organisms/sidebar/nav-main";

import { NavUser } from "./nav-user";

interface AppSidebarProps {
  user: UserAuth | null;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <Link prefetch={false} href="/dashboard/main">
                <Command />
                <span className="text-base font-semibold">{APP_CONFIG.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarItems} user={user} />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
