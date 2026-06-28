"use client";

import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, HelpCircle } from "lucide-react";

import { COMPANY_TYPE_META } from "@/entities/company";
import { USER_ROLE_META } from "@/entities/user";
import { Button } from "@/shared/ui/atoms/button";
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
      header: "Код",
      cell: ({ row }) => {
        const { category, iconKey } = row.original;

        const companyCodes: Record<string, string> = {
          postal: "A01P",
          customs_broker: "A02T",
          air_partner: "A03S",
          airline: "A04L",
          platform: "A05F",
        };

        const roleCodes: Record<string, string> = {
          company_owner: "B01D",
          employee: "B02K",
        };

        let displayCode = "";
        if (category === "company") {
          displayCode = companyCodes[iconKey] || "A00";
        } else {
          displayCode = roleCodes[iconKey] || "C01X";
        }

        return (
          <span className="text-muted-foreground/80 font-mono text-[12px] font-bold tracking-wider">{displayCode}</span>
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
          </div>
        );
      },
    },
  ];
}
