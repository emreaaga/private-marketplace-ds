"use client";

import { useRouter } from "next/navigation";

import { CircleUser, CreditCard, EllipsisVertical, LogOut, MessageSquareDot } from "lucide-react";
import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";
import { getInitials } from "@/shared/lib/utils";
import { ALL_COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { ALL_USER_ROLE_META } from "@/shared/types/users";
import { type UserAuth } from "@/shared/types/users/user.auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shared/ui/atoms/sidebar";

interface NavUserProps {
  readonly user: UserAuth;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const roleLabel = ALL_USER_ROLE_META[user.role]?.label || user.role;
  const CompanyIcon = ALL_COMPANY_TYPE_META[user.company_type]?.Icon;

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

  const avatarUrl = "/avatars/arhamkhnz.png";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground flex items-center gap-1 truncate text-xs">
                  {user.company_name}
                  {CompanyIcon && <CompanyIcon className="size-3" />}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={avatarUrl} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="text-foreground truncate text-sm font-semibold">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.company_name}</span>
                </div>
                <div className="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                  {roleLabel}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <CircleUser className="mr-2 size-4" />
                <span>Аккаунт</span>
                <span className="text-muted-foreground/50 ml-auto font-mono text-[10px] tracking-tighter">
                  {user.id}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 size-4" />
                <span>Компания</span>
                <span className="text-muted-foreground/50 ml-auto font-mono text-[10px] tracking-tighter">
                  {user.company_id}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <MessageSquareDot className="mr-2 size-4" />
                <span>Уведомления</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="mr-2 size-4" /> Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
