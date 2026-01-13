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

import { HeaderWithIcon } from "./header-icon";
import { type Order } from "./orders.type";
import { stageIcons } from "./stage-icons";

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "col1",
    header: () => <HeaderWithIcon icon={stageIcons.client} label="Клиент" />,
    cell: () => (
      <TableBadge innerBadge="283.00$" tooltip="12.09.2025 · 14:32">
        Клнт.
      </TableBadge>
    ),
  },
  {
    accessorKey: "col2",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Курьер" />,
    cell: () => <TableBadge innerBadge="128.03$">Курь.</TableBadge>,
  },
  {
    accessorKey: "col3",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт1" />,
    cell: ({ row }) => <TableBadge innerBadge="6.00$/кг">{row.original.id}</TableBadge>,
  },
  {
    accessorKey: "col4",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Таможня" />,
    cell: () => <TableBadge innerBadge="123456">Тамж.</TableBadge>,
  },
  {
    accessorKey: "col5",
    header: () => <HeaderWithIcon icon={stageIcons.flight} label="Самолет" />,
    cell: () => <TableBadge innerBadge="001">TR-UZ</TableBadge>,
  },
  {
    accessorKey: "col6",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Таможня" />,
    cell: () => <TableBadge innerBadge="123456">Тамж.</TableBadge>,
  },
  {
    accessorKey: "col7",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт 2" />,
    cell: () => <TableBadge innerBadge="12.00кг">Почт.</TableBadge>,
  },
  {
    accessorKey: "col8",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Курьер" />,
    cell: () => <TableBadge innerBadge="18.05$">Курь.</TableBadge>,
  },
  {
    accessorKey: "col9",
    header: () => <HeaderWithIcon icon={stageIcons.client} label="Клиент" />,
    cell: () => (
      <TableBadge innerBadge="123456" variant="outline">
        Клнт.
      </TableBadge>
    ),
  },
  {
    accessorKey: "col10",
    header: () => <HeaderWithIcon icon={stageIcons.finance} label="Финансы" />,
    cell: () => (
      <TableBadge>
        <div className="flex items-center gap-1">
          <span className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] font-medium text-slate-700 tabular-nums">
            12<span className="ml-0.5 text-slate-400">кг</span>
          </span>

          <span className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] font-medium text-slate-700 tabular-nums">
            6<span className="ml-0.5 text-slate-400">$/кг</span>
          </span>

          <span className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] font-medium text-slate-700 tabular-nums">
            15<span className="ml-0.5 text-slate-400">$</span>
          </span>

          <span className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] font-medium text-slate-700 tabular-nums">
            12<span className="ml-0.5 text-slate-400">$</span>
          </span>

          <span className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] font-medium tabular-nums">
            4<span className="ml-0.5 text-slate-400">$</span>
          </span>
        </div>
      </TableBadge>
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
