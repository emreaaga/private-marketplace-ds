"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { ClientStatus } from "../model/client.status";

export interface Client {
  id: number;
  public_id?: string;
  name: string;
  surname: string;
  email: string | null;
  phone_number: string;
  country: string;
  city: string;
  status: ClientStatus;
  created_at: string;
}

const dtf = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function createClientsColumns(): ColumnDef<Client>[] {
  return [
    {
      accessorKey: "public_id",
      header: "Public ID",
      cell: () => {
        return (
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground/50 font-mono">C01X</span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "surname",
      header: "Фамилия",
    },
    {
      accessorKey: "phone_number",
      header: "Телефон",
      cell: ({ getValue }) => <span className="text-muted-foreground/80 tabular-nums">{getValue<string>()}</span>,
    },
    {
      id: "location",
      header: "Локация",
      cell: ({ row }) => {
        const { country, city } = row.original;
        return (
          <div className="text-muted-foreground/80 uppercase">
            {country} <span className="text-muted-foreground/40 mx-0.5">/</span> {city}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Регистрация",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground/70 tabular-nums">{dtf.format(new Date(getValue<string>()))}</span>
      ),
    },
  ];
}
