import { ReactNode } from "react";

import { getServerSession } from "@/entities/session/server";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header/ui/responsive-tabs-header";
import { UsersToolbar, usersHeaderItems } from "@/widgets/users-toolbar";

export default async function UsersLayout({ children }: { children: ReactNode }) {
  const user = await getServerSession();

  return (
    <div className="space-y-2">
      <ResponsiveTabsHeader items={usersHeaderItems} user={user} />
      <UsersToolbar user={user} />

      <main>{children}</main>
    </div>
  );
}
