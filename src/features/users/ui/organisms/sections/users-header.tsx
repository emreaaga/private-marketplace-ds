import { getServerUser } from "@/features/auth/get-server-user";
import { usersHeaderItems } from "@/features/users/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export async function UsersHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={usersHeaderItems} user={user} />;
}
