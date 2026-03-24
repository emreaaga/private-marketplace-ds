"use client";

import { type ClientForm, emptyClientForm } from "@/entities/client";
import { ItemUI } from "@/entities/item";

const generateId = () => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

// eslint-disable-next-line complexity
export function mapApiToClientForm(apiParty: any): ClientForm {
  if (!apiParty) return emptyClientForm();

  const doc = apiParty.identity_document;

  return {
    code: apiParty.code ?? "",
    firstName: apiParty.name ?? "",
    lastName: apiParty.surname ?? "",

    passport_number: doc?.passport_number ?? "",
    national_id: doc?.national_id ?? "",

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
