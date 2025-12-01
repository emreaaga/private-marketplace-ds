"use client";

import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ClientStatusBadge } from "./client-status-badge";

export type Client = {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

export type ClientAction = "view" | "edit" | "block" | "approve" | "reject" | "unblock";

interface ClientsTableProps {
  clients: Client[];
  onAction: (clientId: number, action: ClientAction) => void;
}

export function ClientsTable({ clients, onAction }: ClientsTableProps) {
  if (!clients.length) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Клиент</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Дата подключения</TableHead>
          <TableHead className="w-[70px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell className="text-muted-foreground">{client.email}</TableCell>
            <TableCell>
              <ClientStatusBadge status={client.status} />
            </TableCell>
            <TableCell className="text-muted-foreground">{client.createdAt}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAction(client.id, "view")}>Открыть профиль</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction(client.id, "edit")}>Редактировать</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {client.status === "active" ? (
                    <DropdownMenuItem onClick={() => onAction(client.id, "block")} className="text-destructive">
                      Заблокировать
                    </DropdownMenuItem>
                  ) : client.status === "pending" ? (
                    <>
                      <DropdownMenuItem onClick={() => onAction(client.id, "approve")}>Одобрить</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(client.id, "reject")} className="text-destructive">
                        Отклонить
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => onAction(client.id, "unblock")}>Разблокировать</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
