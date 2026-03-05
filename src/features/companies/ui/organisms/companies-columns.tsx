"use client";

import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { Company } from "@/shared/types/company/company.model";
import { Button } from "@/shared/ui/atoms/button";

export function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export type CompaniesTableActions = {
  onView(company: Company): void;
};

const dtf = new Intl.DateTimeFormat("ru-RU");

export function createCompaniesColumns(actions: CompaniesTableActions): ColumnDef<Company>[] {
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
      header: "Фирма",
      cell: ({ row, getValue }) => {
        const name = getValue<string>() ?? "";
        const isActive = row.original.is_active;

        const CHAR_LIMIT = 6;
        const isTooLong = name.length > CHAR_LIMIT;

        const displayName = isTooLong ? name.slice(0, CHAR_LIMIT).trim() + ".." : name;

        return (
          <div className="flex items-center gap-2">
            <div className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-emerald-500" : "bg-red-500")} />

            <span className="text-foreground text-[13px] font-medium tracking-tight" title={name}>
              {displayName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Тип",
      cell: ({ getValue }) => {
        const type = getValue<Company["type"]>();
        const { label, Icon } = COMPANY_TYPE_META[type];

        return (
          <MinimalBadge>
            <Icon className="text-muted-foreground/70 h-3 w-3" />
            {label}
          </MinimalBadge>
        );
      },
    },
    {
      id: "location",
      header: "Локация",
      cell: ({ row }) => {
        const { country, city } = row.original;
        return (
          <div className="text-muted-foreground/80 text-[12px] font-medium tracking-wider uppercase">
            {country} <span className="text-muted-foreground/40 mx-0.5">/</span> {city}
          </div>
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
      size: 40,
      cell: ({ row }) => (
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
      ),
    },
  ];
}
