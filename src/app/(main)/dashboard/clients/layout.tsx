import { ReactNode } from "react";

import { ClientsHeader } from "@/features/clients/ui/organisms/sections/clients-header";

export default function ClientsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-4">
      <ClientsHeader />
      {children}
    </div>
  );
}
