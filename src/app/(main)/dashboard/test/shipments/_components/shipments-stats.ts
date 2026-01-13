import { Shipment } from "./shipment-types";

export function getShipmentsStats(shipments: Shipment[]) {
  const totalShipments = shipments.length;

  const totalOrders = shipments.reduce((sum, s) => sum + s.ordersCount, 0);

  const totalWeight = shipments.reduce((sum, s) => sum + s.totalWeightKg, 0);

  const totalIncome = shipments.reduce((sum, s) => sum + s.incomeUsd, 0);

  const totalExpenses = shipments.reduce((sum, s) => sum + s.expensesUsd, 0);

  const balance = totalIncome - totalExpenses;

  return {
    totalShipments,
    totalOrders,
    totalWeight,
    totalIncome,
    totalExpenses,
    balance,
  };
}
