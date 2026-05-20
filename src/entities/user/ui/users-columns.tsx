import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { COMPANY_TYPE_META, CompanyType } from "@/entities/company";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";

import { USER_STATUS_META } from "../model/user-status.meta";
import { USER_ROLE_META } from "../model/user.meta";
import { type User } from "../model/user.model";

function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

type UsersTableActions = {
  onEdit(user: User): void;
};

const dtf = new Intl.DateTimeFormat("ru-RU", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export function createUsersColumns(actions: UsersTableActions): ColumnDef<User>[] {
  return [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ getValue }) => (
    //     <span className="text-muted-foreground/50 font-mono text-[11px]">{getValue<number>()}</span>
    //   ),
    // },
    {
      accessorKey: "public_id",
      header: "Public ID",
      cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
    },
    {
      accessorKey: "company_type",
      header: "Тип компании",
      cell: ({ getValue }) => {
        const type = getValue<CompanyType>();
        const meta = COMPANY_TYPE_META[type];

        return (
          <MinimalBadge>
            <meta.Icon className="h-3 w-3 opacity-70" />
            {meta.label}
          </MinimalBadge>
        );
      },
    },

    {
      accessorKey: "company_name",
      header: "Компания",
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
    // {
    //   accessorKey: "email",
    //   header: "Email",
    //   cell: ({ getValue }) => <span className="text-muted-foreground text-[13px]">{getValue<string>()}</span>,
    // },
    {
      accessorKey: "created_at",
      header: "Дата",
      cell: ({ getValue }) => {
        const val = getValue<string>();
        if (!val) return "-";
        return <span className="text-muted-foreground/70 text-[12px] tabular-nums">{dtf.format(new Date(val))}</span>;
      },
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
