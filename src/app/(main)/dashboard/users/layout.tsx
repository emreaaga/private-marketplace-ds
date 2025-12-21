import { ReactNode } from "react";

import { UsersHeader } from "@/features/users/ui/organisms/sections/users-header";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <UsersHeader />
      {children}
    </div>
  );
}
