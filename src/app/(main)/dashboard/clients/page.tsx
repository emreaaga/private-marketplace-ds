"use client";

import { AccessSettingsCard } from "./_components/access-settings-card";
import { ClientsSection } from "./_components/clients-section";
import { StoreLinkCard } from "./_components/store-link-card";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Клиенты и доступ</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Управляйте доступом клиентов к вашему приватному каталогу.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StoreLinkCard />
        <AccessSettingsCard />
      </div>

      <ClientsSection />
    </div>
  );
}
