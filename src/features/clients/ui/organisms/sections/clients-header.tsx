import { getServerUser } from "@/features/auth/get-server-user";
import { clientsHeaderItems } from "@/features/clients/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export async function ClientsHeader() {
  const user = await getServerUser();

  return <ResponsiveTabsHeader items={clientsHeaderItems} user={user} />;
}
