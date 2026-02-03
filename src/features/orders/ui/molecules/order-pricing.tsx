import type { OrderCreateForm } from "@/shared/types/order/oder-create.form";

function n(v: string) {
  const x = Number(String(v).replace(",", "."));
  return Number.isFinite(x) ? x : 0;
}

export function calcOrderPricing(v: OrderCreateForm) {
  const weight = n(v.weight_kg);
  const rate = n(v.rate_per_kg);
  const extra = n(v.extra_fee);
  const prepaid = n(v.prepaid_amount);

  const subtotal = weight * rate;
  const total = subtotal + extra;
  const balance = total - prepaid;

  return { subtotal, total, balance };
}
