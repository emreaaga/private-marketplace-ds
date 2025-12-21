import { ReactNode } from "react";

import { LogisticsHeader } from "@/features/logistics/ui/organisms/logistics-header";

export default function LogisticsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <LogisticsHeader />
      {children}
    </div>
  );
}
