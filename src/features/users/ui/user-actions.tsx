import { memo } from "react";

import { MoreHorizontal } from "lucide-react";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/atoms/dropdown-menu";

interface UserActionsProps {
  user: User;
  variant?: "desktop" | "mobile";
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onRoleChange?: (role: UserRole) => void;
  onStatusChange?: (status: UserStatus) => void;
}

export const UserActions = memo(function UserActions({ user, onEdit, onDelete }: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem disabled onClick={() => onEdit(user)}>
          Редактировать
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled onClick={() => onDelete(user.id)} variant="destructive">
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
