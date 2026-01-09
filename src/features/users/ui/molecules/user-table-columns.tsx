"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { UserActions } from "@/features/users/ui/user-actions";
import { RoleBadge } from "@/shared/ui/molecules/badges/role-badge";
// import { DataTableColumnHeader } from "@/shared/ui/molecules/data-table-column-header";

type UserColumnHandlers = {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onRoleChange: (id: number, role: UserRole) => void;
  onStatusChange: (id: number, status: UserStatus) => void;
};

export const getUserColumns = (handlers: UserColumnHandlers): ColumnDef<User>[] => [
  {
    accessorKey: "public_id",
    header: "Public ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono">{row.original.public_id}</span>,
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "test_col_1",
    header: "Итог",
    cell: ({ row }) => {
      const total = row.original.total;
      const colorClass = total > 0 ? "text-green-600" : total < 0 ? "text-red-600" : "text-muted-foreground";

      return <span className={colorClass}>${total}</span>;
    },
  },
  {
    accessorKey: "test_col_2",
    header: "Дал услуг",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_given}</span>,
  },
  {
    accessorKey: "test_col_3",
    header: "Взл услуг",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_taken}</span>,
  },
  {
    accessorKey: "test_col_4",
    header: "Отдал",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_lent}</span>,
  },
  {
    accessorKey: "test_col_5",
    header: "Взял",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_borrowed}</span>,
  },
  {
    accessorKey: "test_col_6",
    header: "Дал",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_received}</span>,
  },
  {
    accessorKey: "test_col_7",
    header: "Взял",
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.services_provided}</span>,
  },
  {
    id: "actions",
    header: "",
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
