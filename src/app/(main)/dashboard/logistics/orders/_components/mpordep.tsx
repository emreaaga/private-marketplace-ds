import type { Order } from "./orders.type";

export function mapOrderPayment(order: Order) {
  const { pricing, payments } = order;

  const weight = pricing.weightKg;
  const rate = pricing.ratePerKg;

  const cargoCostCents = Math.round(weight * rate * 100);

  const extrasTotalCents = pricing.extraCharges.reduce((sum, c) => sum + Math.round(c.amount * 100), 0);

  const totalCents = cargoCostCents + extrasTotalCents;

  const paidOriginCents = payments
    .filter((p) => p.location === "origin")
    .reduce((sum, p) => sum + Math.round(p.amount * 100), 0);

  const paidDestinationCents = payments
    .filter((p) => p.location === "destination")
    .reduce((sum, p) => sum + Math.round(p.amount * 100), 0);

  return {
    weightKg: weight,
    ratePerKg: rate,

    cargoCost: cargoCostCents / 100,
    extrasTotal: extrasTotalCents / 100,
    total: totalCents / 100,

    paidOrigin: paidOriginCents / 100,
    paidDestination: paidDestinationCents / 100,

    remaining: (totalCents - paidOriginCents - paidDestinationCents) / 100,

    currency: "USD",
  };
}
