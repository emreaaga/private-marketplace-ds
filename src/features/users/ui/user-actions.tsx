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
  onEdit?: () => void;
  onDelete?: () => void;
  onRoleChange?: (role: UserRole) => void;
  onStatusChange?: (status: UserStatus) => void;
}

export function UserActions({ onEdit, onDelete }: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-42">
        {onEdit && (
          <>
            <DropdownMenuItem disabled onClick={onEdit}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {onDelete && (
          <DropdownMenuItem disabled onClick={onDelete} variant="destructive">
            Удалить
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
