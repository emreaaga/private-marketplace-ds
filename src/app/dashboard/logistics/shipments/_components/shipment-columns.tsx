"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Switch } from "@/shared/ui/atoms/switch";
import { TableBadge } from "@/shared/ui/molecules/table-badge";

import { HeaderWithIcon } from "../../orders/_components/header-icon";
import { stageIcons } from "../../orders/_components/stage-icons";

import { Shipment } from "./types";

export const ShipmentColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "code",
    header: () => <HeaderWithIcon icon={stageIcons.order} label="ID" />,
    cell: ({ row }) => {
      const shipment = row.original;

      return (
        <div className="flex items-center gap-1">
          <Switch checked={!shipment.locked} />
          001
          <span
            className={shipment.locked ? "text-muted-foreground text-[10px] line-through" : "text-[10px] font-medium"}
          >
            {shipment.code}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "col1",
    header: () => <HeaderWithIcon icon={stageIcons.client} label="Клиент" />,
    cell: () => (
      <TableBadge icon={stageIcons.client} tooltip="12.09.2025 · 14:32">
        Клнт.
      </TableBadge>
    ),
  },

  {
    accessorKey: "col2",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Курьер" />,
    cell: () => <TableBadge icon={stageIcons.courier}>Курь.</TableBadge>,
  },

  {
    accessorKey: "col3",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт1" />,
    cell: () => <TableBadge icon={stageIcons.point}>Почт.</TableBadge>,
  },

  {
    accessorKey: "col4",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Таможня" />,
    cell: () => <TableBadge icon={stageIcons.customs}>Тамж.</TableBadge>,
  },

  {
    accessorKey: "col5",
    header: () => <HeaderWithIcon icon={stageIcons.flight} label="Самолет" />,
    cell: () => <TableBadge icon={stageIcons.flight}>Самл.</TableBadge>,
  },

  {
    accessorKey: "col6",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Таможня" />,
    cell: () => <TableBadge icon={stageIcons.customs}>Тамж.</TableBadge>,
  },

  {
    accessorKey: "col7",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт 2" />,
    cell: () => <TableBadge icon={stageIcons.point}>Почт.</TableBadge>,
  },

  {
    accessorKey: "col8",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Курьер" />,
    cell: () => <TableBadge icon={stageIcons.courier}>Курь.</TableBadge>,
  },

  {
    accessorKey: "col9",
    header: () => <HeaderWithIcon icon={stageIcons.client} label="Клиент" />,
    cell: () => (
      <TableBadge icon={stageIcons.client} variant="outline">
        Клнт.
      </TableBadge>
    ),
  },

  {
    id: "actions",
    header: "",
    enableHiding: false,
    cell: () => (
      <Link href="/dashboard/logistics/orders">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];
