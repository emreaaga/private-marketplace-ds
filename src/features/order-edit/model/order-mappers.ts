"use client";

import { type ClientForm, emptyClientForm } from "@/entities/client";
import { ItemUI } from "@/entities/item";

const generateId = () => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

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
  if (!orderItems) return [];

  return orderItems.map((item) => ({
    ui_id: generateId(),
    name: item.name ?? "",
    quantity: item.quantity ?? 1,
    unit_price: item.unit_price?.toString() ?? "0.00",
    category: "",
  }));
}
