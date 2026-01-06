import { sellerHeaderItems } from "@/features/seller/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export function SellerHeader() {
  return <ResponsiveTabsHeader items={sellerHeaderItems} />;
}
