"use client";

import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, HelpCircle, MoreHorizontal } from "lucide-react";

import { COMPANY_TYPE_META } from "@/entities/company";
import { USER_ROLE_META } from "@/entities/user";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";

export type DirectoryEntity = {
  id: string;
  label: string;
  category: "user" | "company";
  iconKey: string;
  count: number;
};

type DirectoryTableActions = {
  onView(entity: DirectoryEntity): void;
};

function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

export function createAllUsersColumns(actions: DirectoryTableActions): ColumnDef<DirectoryEntity>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span className="text-muted-foreground/50 font-mono text-[11px]">{row.index + 1}</span>,
    },
    {
      accessorKey: "category",
      header: "Тип",
      cell: ({ getValue }) => {
        const value = getValue<"user" | "company">();

        const labels = {
          user: "Сотрудник",
          company: "Компания",
        };

        return (
          <span className="text-muted-foreground/80 text-[12px] font-medium tracking-wider uppercase">
            {labels[value] || value}
          </span>
        );
      },
    },
    {
      accessorKey: "label",
      header: "Роль",
      cell: ({ row }) => {
        const { label, iconKey, category } = row.original;

        const meta =
          category === "user"
            ? USER_ROLE_META[iconKey as keyof typeof USER_ROLE_META]
            : COMPANY_TYPE_META[iconKey as keyof typeof COMPANY_TYPE_META];

        const Icon = meta?.Icon || HelpCircle;

        return (
          <MinimalBadge>
            <Icon className="text-muted-foreground/70 h-3 w-3" />
            {label}
          </MinimalBadge>
        );
      },
    },

    {
      accessorKey: "count",
      header: "Кол-во",
      cell: ({ getValue }) => formatQuantity(getValue<number>()),
    },
    {
      id: "actions",
      header: "",
      meta: { align: "right" },
      size: 70,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-gray-500/10"
              title="Просмотр"
              size="icon"
              onClick={() => actions.onView(row.original)}
            >
              <Eye className="text-muted-foreground/70 h-3 w-3" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-gray-500/10">
                  <MoreHorizontal className="text-muted-foreground/70 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel className="text-muted-foreground/50 text-[10px] font-bold uppercase">
                  Действия
                </DropdownMenuLabel>
                <DropdownMenuItem className="text-muted-foreground/80 gap-2 text-xs">
                  <Edit2 className="h-3 w-3 opacity-60" /> Изменить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
