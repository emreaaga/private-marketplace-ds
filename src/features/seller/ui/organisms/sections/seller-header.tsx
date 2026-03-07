import { getServerUser } from "@/features/auth/get-server-user";
import { sellerHeaderItems } from "@/features/seller/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export async function SellerHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={sellerHeaderItems} user={user} />;
}
