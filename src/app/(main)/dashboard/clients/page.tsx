"use client";

import { useClientsPageState } from "@/features/clients/model/use-clients-page-state";
import { ClientsAccessSection } from "@/features/clients/ui/organisms/sections/clients-access-section";
import { ClientsHeaderSection } from "@/features/clients/ui/organisms/sections/clients-header-section";
import { ClientsUsersSection } from "@/features/clients/ui/organisms/sections/clients-users-section";

export default function ClientsPage() {
  const state = useClientsPageState();

  return (
    <div className="space-y-6">
      <ClientsHeaderSection />
      <ClientsAccessSection />
      <ClientsUsersSection {...state} />
    </div>
  );
}
