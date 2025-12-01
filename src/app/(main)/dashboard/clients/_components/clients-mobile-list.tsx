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

import { ClientStatusBadge } from "./client-status-badge";
import type { Client, ClientAction } from "./clients-table";

interface ClientsMobileListProps {
  clients: Client[];
  onAction: (clientId: number, action: ClientAction) => void;
}

export function ClientsMobileList({ clients, onAction }: ClientsMobileListProps) {
  if (!clients.length) return null;

  return (
    <div className="space-y-3 md:hidden">
      {clients.map((client) => (
        <div key={client.id} className="flex items-start justify-between gap-3 rounded-lg border p-4">
          <div className="min-w-0 flex-1 space-y-2">
            <div>
              <p className="truncate font-medium">{client.name}</p>
              <p className="text-muted-foreground truncate text-sm">{client.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <ClientStatusBadge status={client.status} />
              <span className="text-muted-foreground text-xs">{client.createdAt}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
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
        </div>
      ))}
    </div>
  );
}
