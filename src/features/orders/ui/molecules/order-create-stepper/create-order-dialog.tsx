"use client";

import * as React from "react";

import { toast } from "sonner";

import { centsToString, mulMilliByCents, toCents, toFixedScaleForApi, toMilli } from "@/shared/lib/money";
import type { ClientForm } from "@/shared/types/client/client.form";
import { emptyClientForm } from "@/shared/types/client/client.form.empty";
import type { ItemCreateDTO } from "@/shared/types/order/item/item-create.dto";
import type { ItemUI } from "@/shared/types/order/item/item-ui";
import type { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import { EMPTY_ORDER_SUMMARY_FORM } from "@/shared/types/order/order-summary.form.empty";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/atoms/dialog";

import { ProductList } from "../product-list";

import { PartiesSummary } from "./steps/parties-summary";
import { StepParties } from "./steps/step-parties";

function mapClientToApi(value: ClientForm) {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    country: value.country ?? null,
    city: value.city ?? null,
    district: value.district ?? null,
    address: value.address,
    phone_country_code: value.phone_country_code,
    phone_number: value.phone_number,
    passports: value.passports.map((p) => p.trim()).filter(Boolean),
  };
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CreateOrderDialog({ open, onOpenChange }: Props) {
  const [sender, setSender] = React.useState(emptyClientForm);
  const [receiver, setReceiver] = React.useState(emptyClientForm);
  const [items, setItems] = React.useState<ItemUI[]>([]);
  const [summary, setSummary] = React.useState<OrderSummaryForm>(EMPTY_ORDER_SUMMARY_FORM);

  const reset = React.useCallback(() => {
    setSender(emptyClientForm);
    setReceiver(emptyClientForm);
    setItems([]);
    setSummary(EMPTY_ORDER_SUMMARY_FORM);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  // ---- money math (bigint-safe) ----
  const weightMilli = React.useMemo(() => toMilli(summary.weight_kg), [summary.weight_kg]);

  const rateCents = React.useMemo(() => toCents(summary.rate_per_kg), [summary.rate_per_kg]);

  const shippingCents = React.useMemo(() => mulMilliByCents(weightMilli, rateCents), [weightMilli, rateCents]);

  const extraFeeCents = React.useMemo(() => toCents(summary.extra_fee), [summary.extra_fee]);

  const depositCents = React.useMemo(() => toCents(summary.deposit), [summary.deposit]);

  const servicesCents = React.useMemo(() => shippingCents + extraFeeCents, [shippingCents, extraFeeCents]);

  const balanceCents = React.useMemo(() => servicesCents - depositCents, [servicesCents, depositCents]);

  const balance = React.useMemo(() => centsToString(balanceCents), [balanceCents]);

  const handleCreate = () => {
    const itemsDto: ItemCreateDTO[] = items.map(({ ui_id, ...dto }) => dto);

    const payload = {
      sender: mapClientToApi(sender),
      receiver: mapClientToApi(receiver),
      items: itemsDto,
      summary: {
        shipment_id: summary.shipment_id ? Number(summary.shipment_id) : null,
        weight_kg: toFixedScaleForApi(summary.weight_kg, 2),
        rate_per_kg: toFixedScaleForApi(summary.rate_per_kg, 2),
        extra_fee: toFixedScaleForApi(summary.extra_fee, 2),
        deposit: toFixedScaleForApi(summary.deposit, 2),
      },
    };

    console.log("ORDER_CREATE_PAYLOAD:", payload);
    toast.success("Payload выведен в консоль");
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={[
          "w-[1400px]! max-w-[calc(100vw-2rem)]!",
          "h-[80vh]! max-h-[calc(100vh-2rem)]!",
          "flex flex-col overflow-hidden",
          "p-1 pt-8",
        ].join(" ")}
      >
        <DialogTitle className="sr-only">Создание заказа</DialogTitle>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="bg-muted/10 w-[440px] shrink-0 overflow-y-auto px-1">
            <StepParties
              sender={sender}
              receiver={receiver}
              onSenderChangeAction={(p) => setSender((s) => ({ ...s, ...p }))}
              onReceiverChangeAction={(p) => setReceiver((r) => ({ ...r, ...p }))}
            />
          </aside>

          <main className="flex min-w-0 flex-1 flex-col px-2 py-2">
            <div className="flex-1 overflow-y-auto">
              <ProductList items={items} onItemsChange={setItems} />
            </div>

            <div className="mt-1 px-2 py-1">
              <PartiesSummary
                value={summary}
                onChangeAction={(p) => setSummary((s) => ({ ...s, ...p }))}
                balance={balance}
              />
            </div>
          </main>
        </div>

        <div className="bg-background shrink-0 border-t px-2 py-2">
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={() => handleOpenChange(false)}>
              Закрыть
            </Button>
            <Button size="sm" onClick={handleCreate}>
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
