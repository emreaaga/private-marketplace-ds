import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import type { User } from "@/shared/types/users/user.model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

export function UserActions({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit(user: User): void;
  onDelete(user: User): void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Открыть действия"
          className="text-muted-foreground hover:bg-muted focus:ring-ring inline-flex h-6 w-6 items-center justify-center rounded-md focus:ring-2 focus:outline-none"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <Pencil className="h-4 w-4" />
          Обновить
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(user)}>
          <Trash className="h-4 w-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
