import { ReactNode } from "react";

import { UsersHeader } from "@/features/users/ui/organisms/sections/users-header";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-2">
      <UsersHeader />
      {children}
    </div>
  );
}
