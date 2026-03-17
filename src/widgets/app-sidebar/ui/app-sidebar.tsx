"use client";

import { Command } from "lucide-react";

import { type UserAuth } from "@/entities/user";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { APP_CONFIG } from "@/shared/lib/app-config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/atoms/sidebar";
import { sidebarItems } from "@/widgets/app-sidebar/model/sidebar-items";

import { NavCompany } from "./nav-company";
import { NavMain } from "./nav-main";
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
        {user ? (
          <NavCompany user={user} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Command />
                <span className="font-semibold">{APP_CONFIG.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarItems} user={user} />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
