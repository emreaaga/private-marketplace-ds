import { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { Service } from "@/shared/types/services/services.model";
import { SERVICE_PRICING_META } from "@/shared/types/services/services.pricing.meta";
import { SERVICE_TYPE_META } from "@/shared/types/services/services.types.meta";

function MinimalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export const servicesColumns: ColumnDef<Service>[] = [
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
];
