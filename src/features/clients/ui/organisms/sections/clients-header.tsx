import { clientsHeaderItems } from "@/features/clients/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export function ClientsHeader() {
  return <ResponsiveTabsHeader items={clientsHeaderItems} />;
}
