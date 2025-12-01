"use client";

import { MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/users";

export function DataTableMobile({
  data,
  onDelete,
  onStatusChange,
  onRoleChange,
}: {
  data: User[];
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, status: User["status"]) => void;
  onRoleChange?: (id: number, role: User["role"]) => void;
}) {
  if (!data.length) {
    return <div className="text-muted-foreground py-8 text-center text-sm">Нет результатов</div>;
  }

  return (
    <div className="space-y-3 md:hidden">
      {data.map((user) => (
        <div key={user.id} className="flex items-start justify-between gap-3 rounded-lg border p-4">
          {/* LEFT BLOCK */}
          <div className="flex-1 space-y-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>

            <div className="flex items-center gap-2 pt-2">
              <Badge variant="outline" className="text-xs capitalize">
                {user.role}
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs capitalize"
                style={{
                  borderColor: user.status === "active" ? "#10b981" : user.status === "pending" ? "#f59e0b" : "#ef4444",
                  backgroundColor:
                    user.status === "active" ? "#10b98120" : user.status === "pending" ? "#f59e0b20" : "#ef444420",
                  color: user.status === "active" ? "#10b981" : user.status === "pending" ? "#f59e0b" : "#ef4444",
                }}
              >
                {user.status}
              </Badge>
            </div>

            <p className="text-muted-foreground text-xs">{new Date(user.created_at).toLocaleString()}</p>
          </div>

          {/* ACTIONS */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRoleChange?.(user.id, "admin")}>Сделать админом</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange?.(user.id, "manager")}>Сделать менеджером</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange?.(user.id, "user")}>Сделать юзером</DropdownMenuItem>

              <DropdownMenuSeparator />

              {user.status === "active" ? (
                <DropdownMenuItem onClick={() => onStatusChange?.(user.id, "blocked")} className="text-destructive">
                  Заблокировать
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onStatusChange?.(user.id, "active")}>Разблокировать</DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive">
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
