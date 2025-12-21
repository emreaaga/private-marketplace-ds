"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { UserActions } from "@/features/users/ui/user-actions";
import { RoleBadge } from "@/shared/ui/molecules/badges/role-badge";
import { DataTableColumnHeader } from "@/shared/ui/molecules/data-table-column-header";

export const getUserColumns = (handlers?: {
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
  onRoleChange?: (id: number, role: UserRole) => void;
  onStatusChange?: (id: number, status: UserStatus) => void;
}): ColumnDef<User>[] => [
  {
    accessorKey: "public_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Public ID" />,
    cell: ({ row }) => <span className="text-muted-foreground font-mono">{row.original.public_id}</span>,
  },
  {
    accessorKey: "Роль",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Роль" />,
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Дата создания" />,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formatted = date.toLocaleDateString("ru-RU");

      return <span className="text-muted-foreground">{formatted}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <UserActions
          user={row.original}
          variant="desktop"
          onEdit={() => handlers?.onEdit?.(row.original)}
          onDelete={() => handlers?.onDelete?.(row.original.id)}
          onRoleChange={(role) => handlers?.onRoleChange?.(row.original.id, role)}
          onStatusChange={(status) => handlers?.onStatusChange?.(row.original.id, status)}
        />
      </div>
    ),
  },
];
