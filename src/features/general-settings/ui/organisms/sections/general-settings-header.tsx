import { getServerUser } from "@/features/auth/get-server-user";
import { GeneralSettingsItems as items } from "@/features/general-settings/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export async function SettingsHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={items} user={user} />;
}
