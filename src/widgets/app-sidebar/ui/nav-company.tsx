"use client";

import { Bell, Building2, ChevronsUpDown, Settings } from "lucide-react";

import { ALL_COMPANY_TYPE_META } from "@/entities/company";
import { type UserAuth } from "@/entities/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shared/ui/atoms/sidebar";

interface NavCompanyProps {
  readonly user: UserAuth;
}

export function NavCompany({ user }: NavCompanyProps) {
  const { isMobile } = useSidebar();

  const CompanyIcon = ALL_COMPANY_TYPE_META[user.company_type as keyof typeof ALL_COMPANY_TYPE_META]?.Icon || Building2;
  const companyTypeLabel =
    ALL_COMPANY_TYPE_META[user.company_type as keyof typeof ALL_COMPANY_TYPE_META]?.label || user.company_type;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-background flex size-8 items-center justify-center rounded-lg border">
                <CompanyIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.company_name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "bottom"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="bg-background flex size-8 items-center justify-center rounded-lg border">
                  <CompanyIcon className="size-4 shrink-0" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold">{user.company_name}</span>
                  <span className="text-muted-foreground truncate text-xs">{companyTypeLabel}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem disabled className="cursor-pointer">
              <Settings className="text-muted-foreground mr-2 size-4" />
              <span>Настройки</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="cursor-pointer">
              <Bell className="text-muted-foreground mr-2 size-4" />
              <span>Уведомления</span>
              <span className="bg-primary/10 text-primary ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium">
                2
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
