"use client";

import { useState } from "react";

import type { Table } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/users";

import { EditUserDialog } from "./edit-user-dialog";

export function ActionsCell({ user, meta }: { user: User; meta: Table<User>["options"]["meta"] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditUserDialog
        user={user}
        open={open}
        onOpenChange={setOpen}
        onSave={async ({ role, status }) => {
          if (role !== user.role) {
            meta?.onRoleChange?.(user.id, role);
          }
          if (status !== user.status) {
            meta?.onStatusChange?.(user.id, status);
          }
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setOpen(true)}>Редактировать</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" onClick={() => meta?.onDelete?.(user.id)}>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
