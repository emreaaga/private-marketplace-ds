import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { USER_STATUS_META } from "@/shared/types/users/user-status.meta";
import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { User } from "@/shared/types/users/user.model";

export function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company_name",
    header: "Компания",
  },
  {
    accessorKey: "company_type",
    header: "Тип компании",
    cell: ({ getValue }) => {
      const type = getValue<User["company_type"]>();
      const meta = COMPANY_TYPE_META[type];

      return (
        <MinimalBadge>
          <meta.Icon className="text-muted-foreground h-3.5 w-3.5" />
          {meta.label}
        </MinimalBadge>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ getValue }) => {
      const role = getValue<User["role"]>();
      const meta = USER_ROLE_META[role];

      return (
        <MinimalBadge>
          <meta.Icon className="text-muted-foreground h-3.5 w-3.5" />
          {meta.label}
        </MinimalBadge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ getValue }) => {
      const status = getValue<User["status"]>();
      const meta = USER_STATUS_META[status];

      return <span className={`text-sm font-medium ${meta.colorClass}`}>{meta.label}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Создан",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString("ru-RU"),
  },
];
