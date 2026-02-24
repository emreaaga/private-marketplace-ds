"use client";

import type { ClientForm } from "@/shared/types/client/client.form";
import { emptyClientForm } from "@/shared/types/client/client.form.empty";
import { ItemUI } from "@/shared/types/order/item/item-ui";

// eslint-disable-next-line complexity
export function mapApiToClientForm(apiParty: any): ClientForm {
  if (!apiParty) return emptyClientForm();

  return {
    code: apiParty.code ?? "",
    firstName: apiParty.name ?? "",
    lastName: apiParty.surname ?? "",
    passports: apiParty.passports?.map((p: any) => p.passport_number) ?? [],
    country: apiParty.country?.toLowerCase() ?? null,
    city: apiParty.city?.toLowerCase() ?? null,
    district: apiParty.district ?? null,
    phone_country_code: apiParty.phone_country_code ?? "",
    phone_number: apiParty.phone_number ?? "",
    address: apiParty.address_line ?? "",
  };
}

export function mapApiToOrderItems(orderItems: any[]): ItemUI[] {
  return orderItems.map((item) => ({
    ui_id: crypto.randomUUID(),
    name: item.name ?? "",
    quantity: item.quantity ?? 1,
    unit_price: item.unit_price?.toString() ?? "0.00",
    category: "",
  }));
}
