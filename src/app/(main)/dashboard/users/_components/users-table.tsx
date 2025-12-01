"use client";

import type { User } from "@/types/users";

import { DataTable } from "./data-table";
import { userColumns } from "./table-columns";

export function UsersTable({
  users,
  handleDelete,
  handleStatusChange,
  handleRoleChange,
}: {
  users: User[];
  handleDelete: (id: number) => void;
  handleRoleChange: (id: number, role: User["role"]) => void;
  handleStatusChange: (id: number, status: User["status"]) => void;
}) {
  return (
    <DataTable
      columns={userColumns}
      data={users}
      onDelete={handleDelete}
      onStatusChange={handleStatusChange}
      onRoleChange={handleRoleChange}
    />
  );
}
