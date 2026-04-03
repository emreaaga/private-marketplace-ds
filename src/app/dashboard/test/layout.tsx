import { ReactNode } from "react";

import { getServerSession } from "@/entities/session/server";
import { ResponsiveTabsHeader } from "@/widgets/responsive-tabs-header";

const TestHeaderItems = [
  {
    href: "/dashboard/test/flights",
    label: "Авиа Рейсы",
    icon: "flights",
  },
  {
    href: "/dashboard/test/shipments",
    label: "Отправки",
    icon: "shipments",
  },
  {
    href: "/dashboard/test/orders",
    label: "Заказы",
    icon: "orders",
  },
] as const;

export default async function LogisticsLayout({ children }: { children: ReactNode }) {
  const user = await getServerSession();

  return (
    <div className="space-y-2 sm:space-y-4">
      <ResponsiveTabsHeader items={TestHeaderItems} user={user} />

      <main>{children}</main>
    </div>
  );
}
