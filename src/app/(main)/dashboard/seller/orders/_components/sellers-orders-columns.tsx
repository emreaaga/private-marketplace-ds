import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import { OrderStatus, type Order } from "./orders.type";

type StatusStepperProps = {
  status: OrderStatus;
};

const DOT_RADIUS = 5;
const STEP_GAP = 24;
const HEIGHT = 14;

const STEPS: OrderStatus[] = ["created", "in_transit", "at_hub", "with_courier", "delivered"];

export const StatusStepper = ({ status }: StatusStepperProps) => {
  if (status === "canceled") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r={5} fill="#991b1b" />
      </svg>
    );
  }

  const activeIndex = STEPS.indexOf(status);
  const width = STEP_GAP * (STEPS.length - 1) + DOT_RADIUS * 2;

  return (
    <svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`}>
      {STEPS.map((_, i) => {
        const cx = DOT_RADIUS + i * STEP_GAP;

        const isPast = i < activeIndex;
        const isCurrent = i === activeIndex;

        return (
          <g key={i}>
            {i < STEPS.length - 1 && (
              <line
                x1={cx + DOT_RADIUS}
                y1={HEIGHT / 2}
                x2={cx + STEP_GAP}
                y2={HEIGHT / 2}
                stroke="#1f2937"
                strokeWidth={2}
                strokeLinecap="round"
              />
            )}

            <circle
              cx={cx}
              cy={HEIGHT / 2}
              r={DOT_RADIUS}
              fill={isCurrent ? "#020617" : isPast ? "#374151" : "#d1d5db"}
            />
          </g>
        );
      })}
    </svg>
  );
};

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "sent",
    header: "Отправка",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        <span className="font-mono">{row.original.test}</span>
      </span>
    ),
  },
  {
    id: "order",
    header: "Заказ",
    size: 140,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },
  {
    id: "recipient",
    header: "Получатель",
    size: 220,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.recipient.name}</span>,
  },
  // {
  //   id: "city",
  //   header: "Город",
  //   size: 140,
  //   cell: ({ row }) => <span className="mx-1">{row.original.recipient.city}</span>,
  // },
  {
    id: "weight",
    header: "Вес",
    cell: ({ row }) => {
      const [int, frac] = "120.50".split(".");

      return (
        <span className="font-mono text-sm">
          {int}
          <span className="text-muted-foreground text-xs">.{frac}</span>
          <span className="text-muted-foreground ml-1 text-xs">кг</span>
        </span>
      );
    },
  },
  {
    id: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      const [int, frac] = "150.50".split(".");

      return (
        <span className="font-mono text-sm">
          ${int}
          <span className="text-muted-foreground text-xs">.{frac}</span>
        </span>
      );
    },
  },
  {
    id: "date",
    header: "Дата",
    cell: ({ row }) => {
      return <span className="text-muted-foreground text-xs">{row.original.date}</span>;
    },
  },
  {
    id: "status",
    header: "Статус",
    size: 120,
    minSize: 120,
    maxSize: 120,
    enableResizing: false,
    cell: ({ row }) => <StatusStepper status={row.original.status} />,
  },

  {
    id: "expand",
    header: "",
    size: 32,
    enableSorting: false,
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="text-muted-foreground hover:text-foreground text-lg leading-none"
      >
        {row.getIsExpanded() ? "−" : "+"}
      </button>
    ),
  },
  {
    id: "actions",
    header: "",
    size: 40,
    enableSorting: false,
    cell: () => (
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-7 w-7">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
