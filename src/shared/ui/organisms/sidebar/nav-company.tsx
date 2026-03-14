"use client";

import { useRouter } from "next/navigation";

import { Building2, ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";
import { ALL_COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { type UserAuth } from "@/shared/types/users/user.auth";
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
  const router = useRouter();

  const CompanyIcon = ALL_COMPANY_TYPE_META[user.company_type]?.Icon || Building2;
  const companyTypeLabel = ALL_COMPANY_TYPE_META[user.company_type]?.label || user.company_type;

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Вы вышли из аккаунта");
      router.push("/auth/login");
      router.refresh();
    } catch {
      toast.error("Ошибка при выходе");
    }
  };

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
              <span>Настройки фирмы</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
