import { logisticsHeaderItems } from "@/features/logistics/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export function LogisticsHeader() {
  return <ResponsiveTabsHeader items={logisticsHeaderItems} />;
}
