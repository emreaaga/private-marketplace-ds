"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ShieldCheck, Briefcase, User as UserIcon, ShieldAlert, CircleCheck, Loader } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/users";

import { ActionsCell } from "./actions-cell";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <span className="text-muted-foreground font-mono">{row.original.id}</span>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Имя" />,
  },

  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },

  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Роль" />,
    cell: ({ row }) => {
      const role = row.original.role;

      const map = {
        admin: { icon: ShieldCheck },
        manager: { icon: Briefcase },
        user: { icon: UserIcon },
      };

      const Icon = map[role].icon;

      return (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5 text-xs capitalize">
          <Icon className="text-muted-foreground size-3.5" />
          {role}
        </Badge>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Статус" />,
    cell: ({ row }) => {
      const status = row.original.status;

      const map = {
        active: {
          icon: CircleCheck,
          color: "#10b981",
        },
        pending: {
          icon: Loader,
          color: "#f59e0b",
        },
        blocked: {
          icon: ShieldAlert,
          color: "#ef4444",
        },
      };

      const Icon = map[status].icon;
      const color = map[status].color;

      return (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 border px-2 py-0.5 text-xs capitalize"
          style={{
            borderColor: color,
            backgroundColor: color + "20",
            color: color,
          }}
        >
          <Icon className="size-3.5" style={{ color }} />
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Создан" />,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      return <ActionsCell user={row.original} meta={table.options.meta} />;
    },
  },
];
