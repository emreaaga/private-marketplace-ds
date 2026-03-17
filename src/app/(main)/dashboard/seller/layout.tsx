import { ReactNode } from "react";

import { sellerHeaderItems } from "@/app/(main)/dashboard/seller/main/_components/header-items";
import { getServerSession } from "@/entities/session/server";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header/ui/responsive-tabs-header";

export default async function SellerLayout({ children }: { children: ReactNode }) {
  const user = await getServerSession();

  return (
    <div className="space-y-2 sm:space-y-4">
      <ResponsiveTabsHeader items={sellerHeaderItems} user={user} />

      <main>{children}</main>
    </div>
  );
}
