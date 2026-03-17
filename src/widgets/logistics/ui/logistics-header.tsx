import { getServerSession } from "@/entities/session/server";
import { logisticsHeaderItems } from "@/widgets/logistics/model/navigation-items";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header/ui/responsive-tabs-header";

export async function LogisticsHeader() {
  const user = await getServerSession();

  return <ResponsiveTabsHeader items={logisticsHeaderItems} user={user} />;
}
