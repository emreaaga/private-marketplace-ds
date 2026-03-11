import { ReactNode } from "react";

import { getServerUser } from "@/features/auth/get-server-user";
import { UsersHeader } from "@/features/users/ui/organisms/sections/users-header";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

export default async function UsersLayout({ children }: { children: ReactNode }) {
  const user = await getServerUser();

  return (
    <div className="space-y-4">
      <UsersHeader />
      <UsersToolbar user={user} />

      <main>{children}</main>
    </div>
  );
}
