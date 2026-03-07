import { getServerUser } from "@/features/auth/get-server-user";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

import { TestHeaderItems } from "./test-header-items";

export async function TestHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={TestHeaderItems} user={user} />;
}
