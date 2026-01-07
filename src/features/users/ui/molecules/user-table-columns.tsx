"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { UserActions } from "@/features/users/ui/user-actions";
import { RoleBadge } from "@/shared/ui/molecules/badges/role-badge";
import { DataTableColumnHeader } from "@/shared/ui/molecules/data-table-column-header";

type UserColumnHandlers = {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onRoleChange: (id: number, role: UserRole) => void;
  onStatusChange: (id: number, status: UserStatus) => void;
};

export const getUserColumns = (handlers: UserColumnHandlers): ColumnDef<User>[] => [
  {
    accessorKey: "public_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Public ID" />,
    cell: ({ row }) => <span className="text-muted-foreground font-mono">{row.original.public_id}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Роль" />,
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "test_col_1",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Test 1" />,
    cell: () => <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "test_col_2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Test 2" />,
    cell: () => <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "test_col_3",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Test 3" />,
    cell: () => <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "test_col_4",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Test 4" />,
    cell: () => <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "test_col_5",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Test 5" />,
    cell: () => <span className="text-muted-foreground">—</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <UserActions
          user={row.original}
          variant="desktop"
          onEdit={() => handlers.onEdit(row.original)}
          onDelete={() => handlers.onDelete(row.original.id)}
          onRoleChange={(role) => handlers.onRoleChange(row.original.id, role)}
          onStatusChange={(status) => handlers.onStatusChange(row.original.id, status)}
        />
      </div>
    ),
  },
];
