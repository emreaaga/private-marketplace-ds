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

export function StatusText({ active }: { active: boolean }) {
  return (
    <span className={`text-sm font-medium ${active ? "text-green-600" : "text-red-600"}`}>
      {active ? "Активна" : "Неактивна"}
    </span>
  );
}

export function StatusIndicator({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`} />
      <span className="text-sm">{active ? "Активна" : "Неактивна"}</span>
    </div>
  );
}

export const companiesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Название",
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
    accessorKey: "employee",
    header: "Сотрудники",
    cell: () => {
      return <span className="text-sm">1</span>;
    },
  },
  {
    accessorKey: "country",
    header: "Страна",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span className="text-sm uppercase">{value}</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: "Статус",
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>();
      return <StatusText active={isActive} />;
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
