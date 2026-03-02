import { ColumnDef } from "@tanstack/react-table";

import { TableBadge } from "@/shared/ui/molecules/table-badge";

import { HeaderWithIcon } from "../../orders/_components/header-icon";
import { stageIcons } from "../../orders/_components/stage-icons";

import { Flight } from "./flights.type";

export const FlightsColumns: ColumnDef<Flight>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courier1",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Сбор Денег" />,
    // innerBadge = сколько собрали предоплаты
    cell: ({ row }) => <TableBadge innerBadge={row.original.prepaid_sum}>Курьер 1</TableBadge>,
  },
  {
    accessorKey: "point1",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт 1" />,
    // innerBadge = сколько отправок собрали в стране отправления
    cell: ({ row }) => <TableBadge innerBadge={`${row.original.shipments_count} шт`}>Склад отправ.</TableBadge>,
  },
  {
    accessorKey: "sender_customs",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Экспорт" />,
    // innerBadge = ставка таможни
    cell: ({ row }) => (
      <TableBadge innerBadge={row.original.sender_customs_price}>{row.original.sender_customs}</TableBadge>
    ),
  },
  {
    accessorKey: "flight",
    header: () => <HeaderWithIcon icon={stageIcons.flight} label="Рейс" />,
    // innerBadge = ID рейса, текст = Маршрут
    cell: ({ row }) => <TableBadge innerBadge={row.original.air_kg_price}>{row.original.route}</TableBadge>,
  },
  {
    accessorKey: "receiver_customs",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Импорт" />,
    // innerBadge = ставка таможни прибытия
    cell: ({ row }) => (
      <TableBadge innerBadge={row.original.receiver_customs_price}>{row.original.receiver_customs}</TableBadge>
    ),
  },
  {
    accessorKey: "point2",
    header: () => <HeaderWithIcon icon={stageIcons.point} label="Пункт 2" />,
    // innerBadge = финальный вес из аэропорта (или "Взвешивается", если null)
    cell: ({ row }) => (
      <TableBadge innerBadge={row.original.final_gross_weight_kg ?? "Взвешивается"}>Склад получ.</TableBadge>
    ),
  },
  {
    accessorKey: "courier2",
    header: () => <HeaderWithIcon icon={stageIcons.courier} label="Долг кассы" />,
    // innerBadge = сколько курьер должен собрать при выдаче
    cell: ({ row }) => <TableBadge innerBadge={row.original.remaining_sum}>Курьер 2</TableBadge>,
  },
  {
    accessorKey: "clients",
    header: () => <HeaderWithIcon icon={stageIcons.customs} label="Выдача" />,
    // innerBadge = соотношение выданных заказов к общему числу
    cell: ({ row }) => (
      <TableBadge innerBadge={`${row.original.delivered_count} / ${row.original.shipments_count}`}>Клиенты</TableBadge>
    ),
  },
];
