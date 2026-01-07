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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Итог" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.total}</span>,
  },
  {
    accessorKey: "test_col_2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Дал услугу" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_given}</span>,
  },
  {
    accessorKey: "test_col_3",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Взл услуг" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_taken}</span>,
  },
  {
    accessorKey: "test_col_4",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Отдал" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_lent}</span>,
  },
  {
    accessorKey: "test_col_5",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Взял" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_borrowed}</span>,
  },
  {
    accessorKey: "test_col_6",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Дал" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_received}</span>,
  },
  {
    accessorKey: "test_col_7",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Взял" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.services_provided}</span>,
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
