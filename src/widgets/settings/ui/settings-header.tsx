import { getServerSession } from "@/entities/session/server";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header/ui/responsive-tabs-header";
import { GeneralSettingsItems as items } from "@/widgets/settings/model/navigation-items";

export async function SettingsHeader() {
  const user = await getServerSession();

  return <ResponsiveTabsHeader items={items} user={user} />;
}
