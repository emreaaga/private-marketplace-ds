import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/atoms/dropdown-menu";
import { TableBadge } from "@/shared/ui/molecules/table-badge";

import { type Order } from "./orders.type";
import { stageIcons } from "./stage-icons";

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "order",
    header: "Заказ",
    size: 120,
    cell: ({ row }) => <span className="font-mono text-[11px] whitespace-nowrap">{row.original.id}-001</span>,
  },
  {
    accessorKey: "col1",
    header: "Клиент",
    cell: () => (
      <TableBadge icon={stageIcons.client} tooltip="12.09.2025 · 14:32">
        Клнт.
      </TableBadge>
    ),
  },
  {
    accessorKey: "col2",
    header: "Курьер",
    cell: () => <TableBadge icon={stageIcons.courier}>Курь.</TableBadge>,
  },
  {
    accessorKey: "col3",
    header: "Пункт1",
    cell: () => <TableBadge icon={stageIcons.point}>Почт.</TableBadge>,
  },
  {
    accessorKey: "col4",
    header: "Таможня",
    cell: () => <TableBadge icon={stageIcons.customs}>Тамж.</TableBadge>,
  },
  {
    accessorKey: "col5",
    header: "Самолет",
    cell: () => <TableBadge icon={stageIcons.flight}>Самл.</TableBadge>,
  },
  {
    accessorKey: "col6",
    header: "Таможня",
    cell: () => <TableBadge icon={stageIcons.customs}>Тамж.</TableBadge>,
  },
  {
    accessorKey: "col7",
    header: "Пункт2",
    cell: () => <TableBadge icon={stageIcons.point}>Почт.</TableBadge>,
  },
  {
    accessorKey: "col8",
    header: "Курьер",
    cell: () => <TableBadge icon={stageIcons.courier}>Курь.</TableBadge>,
  },
  {
    accessorKey: "col9",
    header: "Клиент",
    cell: () => (
      <TableBadge icon={stageIcons.client} variant="outline">
        Клнт.
      </TableBadge>
    ),
  },
  {
    accessorKey: "col10",
    header: "Финансы",
    cell: () => (
      <div className="flex items-center gap-1 rounded-md whitespace-nowrap">
        <span className="text-xs font-medium">
          12<span className="text-[10px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">кг</span>
        </span>

        <span className="text-xs font-medium">
          6<span className="text-[10px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$/кг</span>
        </span>

        <span className="text-xs font-medium">
          15<span className="text-[10px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>

        <span className="text-xs font-medium">
          12<span className="text-[10px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>

        <span className="text-xs font-medium">
          4<span className="text-[10px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>
      </div>
    ),
  },
  {
    id: "expand",
    header: "",
    size: 28,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="text-muted-foreground hover:text-foreground text-xs leading-none"
      >
        {row.getIsExpanded() ? "−" : "+"}
      </button>
    ),
  },

  {
    id: "actions",
    header: "",
    size: 32,
    enableSorting: false,
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Изменить</DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
