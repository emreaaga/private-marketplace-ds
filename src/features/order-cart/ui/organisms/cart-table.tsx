import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export function CartTable({ items }: any) {
  const columns: ColumnDef<any>[] = [
    {
      header: "Товар",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md border">
              <Image src={item.photo_url} alt={item.name} fill className="object-cover" sizes="48px" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-medium">{item.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Цена",
      cell: ({ row }) => `${row.original.price} $`,
    },
    {
      header: "Кол-во",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex items-center gap-1">
            <Button variant="outline" className="h-6 w-6">
              <Minus className="h-6 w-6" />
            </Button>

            <span className="w-4 text-center text-sm">{item.quantity}</span>

            <Button variant="outline" className="h-6 w-6">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        );
      },
    },
    {
      header: "Сумма",
      cell: ({ row }) => row.original.price * row.original.quantity,
    },
  ];

  return <DataTable data={items} columns={columns} pageSize={5} />;
}
