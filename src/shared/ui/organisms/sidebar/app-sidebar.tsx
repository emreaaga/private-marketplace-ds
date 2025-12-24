"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Command } from "lucide-react";

const NavMain = dynamic(() => import("@/shared/ui/organisms/sidebar/nav-main").then((m) => m.NavMain), {
  ssr: false,
});

import { sidebarItems } from "@/features/sidebar/sidebar-items";
import { rootUser } from "@/features/users/fake-user";
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

import { NavUser } from "./nav-user";

export function AppSidebar() {
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
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
