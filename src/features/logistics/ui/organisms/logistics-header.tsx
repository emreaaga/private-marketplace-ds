import { getServerUser } from "@/features/auth/get-server-user";
import { logisticsHeaderItems } from "@/features/logistics/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export async function LogisticsHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={logisticsHeaderItems} user={user} />;
}
