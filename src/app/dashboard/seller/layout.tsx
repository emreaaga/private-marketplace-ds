import { ReactNode } from "react";

import { getServerSession } from "@/entities/session/server";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header/ui/responsive-tabs-header";

import { sellerHeaderItems } from "./main/_components/header-items";

export default async function SellerLayout({ children }: { children: ReactNode }) {
  const user = await getServerSession();

  return (
    <div className="space-y-2 sm:space-y-4">
      <ResponsiveTabsHeader items={sellerHeaderItems} user={user} />

      <main>{children}</main>
    </div>
  );
}
