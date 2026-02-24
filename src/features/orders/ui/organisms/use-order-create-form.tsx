"use client";

import * as React from "react";

import { toast } from "sonner";

import { useCreateOrder } from "@/features/orders/mutations/use-create-order";
import { toFixedScaleForApi } from "@/shared/lib/money";
import type { ClientForm } from "@/shared/types/client/client.form";
import { emptyClientForm } from "@/shared/types/client/client.form.empty";
import type { ItemUI } from "@/shared/types/order/item/item-ui";
import type { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import { EMPTY_ORDER_SUMMARY_FORM } from "@/shared/types/order/order-summary.form.empty";

export function useOrderCreateForm(onSuccess: () => void) {
  const [sender, setSender] = React.useState(emptyClientForm);
  const [receiver, setReceiver] = React.useState(emptyClientForm);
  const [items, setItems] = React.useState<ItemUI[]>([]);
  const [summary, setSummary] = React.useState<OrderSummaryForm>(EMPTY_ORDER_SUMMARY_FORM);

  const createOrder = useCreateOrder();

  const validate = () => {
    const isClientValid = (c: ClientForm, label: string) => {
      if (!c.firstName || !c.lastName) {
        toast.error(`Введите имя и фамилию ${label}`);
        return false;
      }
      if (!c.country || !c.city) {
        toast.error(`Выберите страну и город ${label}`);
        return false;
      }
      if (!c.address) {
        toast.error(`Укажите адрес ${label}`);
        return false;
      }
      if (!c.phone_number) {
        toast.error(`Укажите телефон ${label}`);
        return false;
      }
      return true;
    };

    if (!isClientValid(sender, "отправителя")) return false;
    if (!isClientValid(receiver, "получателя")) return false;
    if (items.length === 0) {
      toast.error("Добавьте хотя бы один товар");
      return false;
    }
    if (items.some((it) => !it.name || !it.unit_price)) {
      toast.error("Заполните название и цену всех товаров");
      return false;
    }

    if (!summary.shipment_id) {
      toast.error("Выберите партию отправки");
      return false;
    }
    if (Number(summary.weight_kg) <= 0) {
      toast.error("Вес должен быть больше 0");
      return false;
    }
    if (Number(summary.rate_per_kg) <= 0) {
      toast.error("Ставка должна быть больше 0");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (createOrder.isPending || !validate()) return;

    const payload = {
      sender: mapClientToApi(sender),
      receiver: mapClientToApi(receiver),
      order_items: items.map((it) => ({
        category: it.category ?? "general",
        name: it.name,
        quantity: it.quantity,
        unit_price: Number(it.unit_price).toFixed(2),
      })),
      summary: {
        shipment_id: Number(summary.shipment_id),
        weight_kg: toFixedScaleForApi(summary.weight_kg, 2),
        rate_per_kg: toFixedScaleForApi(summary.rate_per_kg, 2),
        extra_fee: toFixedScaleForApi(summary.extra_fee, 2),
        deposit: toFixedScaleForApi(summary.deposit, 2),
      },
    };

    try {
      await createOrder.mutateAsync(payload);
      onSuccess();
    } catch {
      /* ошибка в хуке */
    }
  };

  return {
    state: { sender, receiver, items, summary },
    actions: { setSender, setReceiver, setItems, setSummary, handleCreate },
    isPending: createOrder.isPending,
  };
}

function mapClientToApi(value: ClientForm) {
  return {
    name: value.firstName,
    surname: value.lastName,
    country: value.country,
    city: value.city,
    district: value.district,
    phone_country_code: value.phone_country_code.replace("+", "") || "",
    phone_number: value.phone_number,
    address_line: value.address,
    passports: value.passports.filter(Boolean).map((p) => ({ passport_number: p.trim() })),
  };
}
