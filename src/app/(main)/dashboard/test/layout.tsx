import { ReactNode } from "react";

import { TestHeader } from "./_components/test-header";

export default function LogisticsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-4">
      <TestHeader />
      {children}
    </div>
  );
}
