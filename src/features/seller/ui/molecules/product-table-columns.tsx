import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { CountBadge } from "@/shared/ui/atoms/count-badge";

import type { ProductRow } from "../../fake-products";

export const productColumns: ColumnDef<ProductRow>[] = [
  {
    id: "product",
    header: "Товар",
    cell: ({ row }) => {
      const sizesCount = row.original.sizes.length;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.photo_url}
            alt={row.original.sub_category}
            width={36}
            height={36}
            className="h-9 w-9 rounded object-cover"
          />

          <div className="leading-tight">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-medium">{row.original.sub_category}</span>

              <CountBadge value={sizesCount} />
            </div>

            <div className="text-muted-foreground font-mono text-xs">{row.original.id}</div>
          </div>
        </div>
      );
    },
    size: 240,
  },
  {
    id: "plan",
    header: "План",
    cell: ({ row }) => {
      const unitsPerSeries = row.original.sizes.reduce((sum, s) => sum + s.quantity, 0);

      const totalSum = row.original.count_of_series * unitsPerSeries * row.original.price;

      return (
        <div className="leading-tight">
          <div className="text-sm font-medium">${totalSum}</div>
          <div className="text-muted-foreground text-xs">{row.original.count_of_series} серий</div>
        </div>
      );
    },
    size: 140,
  },
  {
    id: "sold",
    header: "Продано",
    cell: ({ row }) => (
      <div className="leading-tight">
        <div className="text-sm font-medium">${row.original.sold_amount}</div>
        <div className="text-muted-foreground text-xs">{row.original.sold_series} серий</div>
      </div>
    ),
    size: 140,
  },
  {
    id: "remaining",
    header: "Остаток",
    cell: ({ row }) => {
      const unitsPerSeries = row.original.sizes.reduce((sum, s) => sum + s.quantity, 0);

      const remainingSeries = row.original.count_of_series - row.original.sold_series;

      const remainingSum = remainingSeries * unitsPerSeries * row.original.price;

      const color = remainingSeries <= 1 ? "text-red-600" : remainingSeries <= 3 ? "text-yellow-600" : "text-green-600";

      return (
        <div className="leading-tight">
          <div className={`text-sm font-medium ${color}`}>${remainingSum}</div>
          <div className="text-muted-foreground text-xs">{remainingSeries} серий</div>
        </div>
      );
    },
    size: 140,
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    ),
    size: 48,
  },
];
