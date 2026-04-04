import { ReactNode } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Factory, ShieldCheck } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

// Тот же бейдж, что и в юзерах для консистентности
function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

export type DirectoryEntity = {
  id: string | number;
  label: string;
  category: "Роль" | "Компания";
  Icon: React.ComponentType<{ className?: string }>;
  rawKey: string;
};

export const directoryColumns: ColumnDef<DirectoryEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground/50 font-mono text-[11px]">{String(row.index + 1).padStart(2, "0")}</span>
    ),
  },
  {
    accessorKey: "label",
    header: "Наименование",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <div className="bg-muted/40 text-muted-foreground/60 flex h-7 w-7 shrink-0 items-center justify-center rounded-md">
            <item.Icon className="h-4 w-4" />
          </div>
          <span className="text-foreground/90 text-[13px] font-semibold tracking-tight">{item.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Категория",
    cell: ({ getValue }) => {
      const category = getValue<string>();
      return (
        <div className="flex items-center gap-1.5">
          {category === "Роль" ? (
            <ShieldCheck className="h-3 w-3 text-blue-500/70" />
          ) : (
            <Factory className="h-3 w-3 text-orange-500/70" />
          )}
          <span className="text-muted-foreground/70 text-[11px] font-bold tracking-wider uppercase">{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rawKey",
    header: "Системный ключ",
    cell: ({ getValue }) => (
      <MinimalBadge>
        <code className="text-[10px] opacity-70">{getValue<string>()}</code>
      </MinimalBadge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        <Button variant="ghost" className="hover:bg-muted h-7 w-7 p-0">
          <Eye className="text-muted-foreground/70 h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
];
