import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { COMPANY_TYPE_META } from "@/entities/company";
import { Service } from "@/entities/service/model/services.model";
import { SERVICE_PRICING_META } from "@/entities/service/model/services.pricing.meta";
import { SERVICE_TYPE_META } from "@/entities/service/model/services.types.meta";
import { Button } from "@/shared/ui/atoms/button";

function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export type ServicesTableActions = {
  onEdit: (service: Service) => void;
};

export function createServicesColumns(actions: ServicesTableActions): ColumnDef<Service>[] {
  return [
    { accessorKey: "id", header: "ID", size: 60 },
    {
      accessorKey: "company_name",
      header: "Фирма",
      cell: ({ row, getValue }) => {
        const { is_active, company_type } = row.original;
        const { Icon } = COMPANY_TYPE_META[company_type];
        return (
          <div className="flex items-center gap-2">
            <Icon className={["h-4 w-4", is_active ? "text-muted-foreground" : "text-red-500"].join(" ")} />
            <span className="leading-none">{getValue<string>()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Тип услуги",
      cell: ({ getValue }) => {
        const type = getValue<Service["type"]>();
        const { label, Icon } = SERVICE_TYPE_META[type];
        return (
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Icon className="h-3.5 w-3.5" />
            {label}
          </span>
        );
      },
    },
    {
      accessorKey: "pricing_type",
      header: "Тариф",
      cell: ({ getValue }) => {
        const pricing = getValue<Service["pricing_type"]>();
        const { label, Icon } = SERVICE_PRICING_META[pricing];
        return (
          <MinimalBadge>
            <Icon className="text-muted-foreground h-3.5 w-3.5" />
            {label}
          </MinimalBadge>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Цена",
      cell: ({ getValue }) => {
        const price = getValue<number>();
        return <span className="font-medium">${price.toLocaleString("ru-RU")}</span>;
      },
    },
    {
      id: "actions",
      header: "",
      meta: { align: "right" },
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            title="Просмотр"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-gray-500/10"
            onClick={(e) => {
              e.stopPropagation();
              actions.onEdit(row.original);
            }}
          >
            <Eye className="text-muted-foreground/70 h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];
}
