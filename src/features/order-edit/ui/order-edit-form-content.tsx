"use client";

import { useState } from "react";

import { type ClientForm, PartyForm } from "@/entities/client";
import { ItemUI } from "@/entities/item";
import { ProductList } from "@/entities/item/ui";
import { OrderSummaryForm } from "@/entities/order";
import { PartiesSummary } from "@/entities/order/ui";

import { mapApiToClientForm, mapApiToOrderItems } from "../model/order-mappers";

function mapApiToSummary(summary: any): OrderSummaryForm {
  return {
    shipment_id: summary?.shipment_id?.toString() ?? "",
    weight_kg: summary?.weight_kg ?? "0",
    rate_per_kg: summary?.rate_per_kg ?? "0",
    extra_fee: summary?.extra_fee ?? "0",
    deposit: summary?.prepaid_amount ?? "0",
  };
}

export function OrderEditFormContent({ order }: { order: any }) {
  const [sender, setSender] = useState<ClientForm>(() => mapApiToClientForm(order.sender));
  const [receiver, setReceiver] = useState<ClientForm>(() => mapApiToClientForm(order.receiver));
  const [items, setItems] = useState<ItemUI[]>(() => mapApiToOrderItems(order.orderItems));

  const [summary, setSummary] = useState<OrderSummaryForm>(() => mapApiToSummary(order.summary));

  return (
    <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-white p-4">
      <aside className="custom-scrollbar w-110 shrink-0 space-y-6 overflow-y-auto pr-2">
        <PartyForm
          title="Отправитель"
          value={sender}
          onChange={(patch) => setSender((prev) => ({ ...prev, ...patch }))}
        />
        <PartyForm
          title="Получатель"
          value={receiver}
          onChange={(patch) => setReceiver((prev) => ({ ...prev, ...patch }))}
        />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="border-muted/20 flex-1 overflow-hidden rounded-xl border">
          <ProductList items={items} onChange={setItems} />
        </div>

        <div className="border-muted/20 overflow-hidden">
          <PartiesSummary value={summary} onChange={(patch) => setSummary((prev) => ({ ...prev, ...patch }))} />
        </div>
      </main>
    </div>
  );
}
