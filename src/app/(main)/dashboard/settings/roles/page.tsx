"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GeneralSettingsRoleToolbar } from "@/features/general-settings/ui/organisms/sections/general-settings-role-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ROLE_META } from "./_components/roles-meta";

type User = {
  id: number;
  role: string;
  name: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.role}</span>,
  },

  {
    accessorKey: "name",
    header: "Имя",
    cell: ({ row }) => {
      const code = row.original.role;
      const meta = ROLE_META[code];

      if (!meta) {
        return row.original.name;
      }

      const { Icon, label } = meta;

      return (
        <div className="flex items-center gap-2">
          <Icon className="text-muted-foreground h-4 w-4" />
          <span>{label}</span>
        </div>
      );
    },
  },
];

const mockData: User[] = [
  { id: 1, role: "A", name: "Почта" },
  { id: 2, role: "B", name: "Продавец" },
  { id: 3, role: "C", name: "Клиент" },
  { id: 4, role: "D", name: "Курьер" },
  { id: 5, role: "E", name: "Рейс" },
  { id: 6, role: "F", name: "Декларант" },
];

export default function Test1Page() {
  return (
    <div className="space-y-4">
      <GeneralSettingsRoleToolbar />
      <DataTable columns={columns} data={mockData} emptyMessage="Пока нет записей" />
    </div>
  );
}
