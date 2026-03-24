import { ReactNode } from "react";

import { SettingsHeader } from "@/widgets/settings/ui/settings-header";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      <SettingsHeader />
      {children}
    </div>
  );
}
