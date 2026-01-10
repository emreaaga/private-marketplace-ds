import { GeneralSettingsItems as items } from "@/features/general-settings/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export function SettingsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
