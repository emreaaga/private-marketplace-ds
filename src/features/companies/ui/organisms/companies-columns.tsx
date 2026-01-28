import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { Company } from "@/shared/types/company/company.model";

export function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export function StatusIndicator({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${active ? "bg-green-400" : "bg-red-400"}`} />
      <span className="text-sm">{active ? "Активна" : "Неактивна"}</span>
    </div>
  );
}

export const companiesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row, getValue }) => {
      const isActive = row.original.is_active;

      return (
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden
            className={["inline-flex h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-green-500" : "bg-red-500"].join(
              " ",
            )}
          />
          <span className="leading-none">{getValue<string>()}</span>
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
          <Icon className="text-muted-foreground h-3.5 w-3.5" />
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

      if (!country && !city) return "—";

      return (
        <span className="text-sm uppercase">
          {country}-<span className="text-muted-foreground">{city}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Создана",
    cell: ({ getValue }) => {
      return new Date(getValue<string>()).toLocaleDateString("ru-RU");
    },
  },
];
