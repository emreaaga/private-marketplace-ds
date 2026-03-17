import { ReactNode } from "react";

import { LogisticsHeader } from "@/widgets/logistics/ui/logistics-header";

export default function LogisticsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-4">
      <LogisticsHeader />
      {children}
    </div>
  );
}
