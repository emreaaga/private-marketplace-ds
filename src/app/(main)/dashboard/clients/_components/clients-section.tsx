"use client";

import { UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ClientsMobileList } from "./clients-mobile-list";
import { ClientsTable, type ClientAction } from "./clients-table";
import { MOCK_CLIENTS } from "./fake-users";

export function ClientsSection() {
  const handleClientAction = (clientId: number, action: ClientAction) => {
    console.log("Client action:", clientId, action);
    toast.success(`Действие: ${action}`);
  };

  const hasClients = MOCK_CLIENTS.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Клиенты ({MOCK_CLIENTS.length})</CardTitle>
            <CardDescription>Все клиенты с доступом к каталогу.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!hasClients ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserPlus className="text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-2 text-sm">Пока нет клиентов</p>
            <p className="text-muted-foreground text-xs">Отправьте приглашение, чтобы добавить первого.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <ClientsTable clients={MOCK_CLIENTS} onAction={handleClientAction} />
            </div>

            <ClientsMobileList clients={MOCK_CLIENTS} onAction={handleClientAction} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
