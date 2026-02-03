"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ChevronRight } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";
import { Button } from "@/shared/ui/atoms/button";

export function createFlightsActionsColumn(onEdit: (id: number) => void): ColumnDef<Flight> {
  return {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => onEdit(row.original.id)} title="Просмотр">
          <Eye className="h-3 w-3" />
        </Button>

        <Button asChild variant="ghost" className="h-6 w-6 p-0">
          <Link href={`/dashboard/test/flights/${row.original.id}/shipments`} title="Открыть отправки">
            <ChevronRight className="text-muted-foreground h-3 w-3" />
          </Link>
        </Button>
      </div>
    ),
  };
}
