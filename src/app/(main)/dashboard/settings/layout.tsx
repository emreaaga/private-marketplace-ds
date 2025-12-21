import { ReactNode } from "react";

import { SettingsHeader } from "@/features/general-settings/ui/organisms/sections/general-settings-header";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      <SettingsHeader />
      {children}
    </div>
  );
}
