"use client";

import { useState } from "react";

import { useClientsPageState } from "@/features/clients/model/use-clients-page-state";
import { ClientsAccessSection } from "@/features/clients/ui/organisms/sections/clients-access-section";
import { ClientsHeaderSection } from "@/features/clients/ui/organisms/sections/clients-header-section";
import { ClientsUsersSection } from "@/features/clients/ui/organisms/sections/clients-users-section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/atoms/tabs";

export default function ClientsPage() {
  const state = useClientsPageState();
  const [tab, setTab] = useState("access");

  return (
    <div className="mt-2">
      <ClientsHeaderSection />

      <div className="sm:hidden">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="access">Настройки</TabsTrigger>
            <TabsTrigger value="users">Клиенты</TabsTrigger>
          </TabsList>

          <TabsContent value="access">
            <ClientsAccessSection />
          </TabsContent>

          <TabsContent value="users">
            <ClientsUsersSection {...state} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden space-y-6 sm:block">
        <ClientsAccessSection />
        <ClientsUsersSection {...state} />
      </div>
    </div>
  );
}
