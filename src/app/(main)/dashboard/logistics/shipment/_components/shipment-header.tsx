"use client";

import { usePathname, useRouter } from "next/navigation";

import { Badge } from "@/shared/ui/atoms/badge";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

export default function ShipmentHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { label: "Заказы", value: "orders", href: "/dashboard/logistics/shipment/orders" },
    { label: "Почты", value: "posts", href: "/dashboard/logistics/shipment/posts" },
  ];

  const activeTab = tabs.find((t) => pathname.startsWith(t.href))?.value ?? "review";

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">CARGO-001</h1>
          <Badge variant="secondary">OPEN</Badge>
          <span className="text-muted-foreground text-sm">IST → TAS · Дата вылета: 20.02.2026</span>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          const tab = tabs.find((t) => t.value === value);
          if (tab) router.push(tab.href);
        }}
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
