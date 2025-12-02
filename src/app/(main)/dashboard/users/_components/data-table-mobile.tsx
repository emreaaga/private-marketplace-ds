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
    <div className="divide-y rounded-lg border bg-white md:hidden">
      {data.map((user) => (
        <div key={user.id} className="flex items-start justify-between p-3">
          {/* LEFT SIDE */}
          <div className="flex flex-col space-y-1">
            <p className="text-[15px] font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs">{user.email}</p>

            <div className="flex items-center gap-2 pt-1">
              <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px] capitalize">
                {user.role}
              </Badge>

              <Badge
                variant="secondary"
                className="rounded-md border px-2 py-0.5 text-[10px] capitalize"
                style={{
                  borderColor: user.status === "active" ? "#10b981" : user.status === "pending" ? "#f59e0b" : "#ef4444",
                  backgroundColor:
                    user.status === "active" ? "#10b98115" : user.status === "pending" ? "#f59e0b15" : "#ef444415",
                  color: user.status === "active" ? "#059669" : user.status === "pending" ? "#b45309" : "#b91c1c",
                }}
              >
                {user.status}
              </Badge>
            </div>

            <p className="text-muted-foreground pt-1 text-[10px]">{new Date(user.created_at).toLocaleString()}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
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
