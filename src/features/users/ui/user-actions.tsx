import { MoreVertical, EllipsisVertical } from "lucide-react";

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

export function UserActions({
  user,
  variant = "desktop",
  onEdit,
  onDelete,
  onRoleChange,
  onStatusChange,
}: UserActionsProps) {
  const Icon = variant === "desktop" ? EllipsisVertical : MoreVertical;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={variant === "mobile" ? "h-8 w-8" : undefined}>
          <Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {onEdit && (
          <>
            <DropdownMenuItem onClick={onEdit}>Редактировать</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {onRoleChange && (
          <>
            <DropdownMenuItem onClick={() => onRoleChange("admin")}>Сделать админом</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleChange("manager")}>Сделать менеджером</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleChange("user")}>Сделать пользователем</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {onStatusChange && (
          <>
            {user.status === "active" ? (
              <DropdownMenuItem onClick={() => onStatusChange("blocked")} className="text-destructive">
                Заблокировать
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onStatusChange("active")}>Разблокировать</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </>
        )}

        {onDelete && (
          <DropdownMenuItem onClick={onDelete} variant="destructive">
            Удалить
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
