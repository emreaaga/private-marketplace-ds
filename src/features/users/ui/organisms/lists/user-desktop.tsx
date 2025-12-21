"use client";

import { useMemo } from "react";

import type { UsersListDesktopProps } from "@/features/users/types/user.types";
import { getUserColumns } from "@/features/users/ui/molecules/user-table-columns";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export function UsersListDesktop({ users, onEdit, onDelete, onRoleChange, onStatusChange }: UsersListDesktopProps) {
  const columns = useMemo(
    () =>
      getUserColumns({
        onEdit,
        onDelete,
        onRoleChange,
        onStatusChange,
      }),
    [onEdit, onDelete, onRoleChange, onStatusChange],
  );

  return (
    <div>
      <DataTable columns={columns} data={users} pageSize={10} />
    </div>
  );
}
