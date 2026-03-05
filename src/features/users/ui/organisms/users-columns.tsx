import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { USER_STATUS_META } from "@/shared/types/users/user-status.meta";
import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { User } from "@/shared/types/users/user.model";
import { Button } from "@/shared/ui/atoms/button";

export function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export type UsersTableActions = {
  onEdit(user: User): void;
};

const dtf = new Intl.DateTimeFormat("ru-RU");

export function createUsersColumns(actions: UsersTableActions): ColumnDef<User>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground/50 font-mono text-[11px]">{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Имя",
      cell: ({ row, getValue }) => {
        const status = row.original.status;
        const meta = USER_STATUS_META[status];

        return (
          <div className="flex items-center gap-1">
            <div className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dotClass)} title={meta.label} />
            <span className="text-[13px] font-medium tracking-tight">{getValue<string>()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => <span className="text-muted-foreground text-[13px]">{getValue<string>()}</span>,
    },
    {
      accessorKey: "company_name",
      header: "Компания",
      cell: ({ row }) => {
        const type = row.original.company_type;
        const meta = COMPANY_TYPE_META[type];

        return (
          <div className="inline-flex items-center gap-2 text-[13px]">
            <meta.Icon className="text-muted-foreground/60 h-3.5 w-3.5" />
            <span className="truncate">{row.original.company_name}</span>
          </div>
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
            <meta.Icon className="h-3 w-3 opacity-70" />
            {meta.label}
          </MinimalBadge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Дата",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground/70 text-[12px] tabular-nums">
          {dtf.format(new Date(getValue<string>()))}
        </span>
      ),
    },

    {
      id: "actions",
      header: "",
      meta: { align: "right" },
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-gray-500/10"
            title="Просмотр"
            onClick={() => actions.onEdit(row.original)}
          >
            <Eye className="text-muted-foreground/70 h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];
}
