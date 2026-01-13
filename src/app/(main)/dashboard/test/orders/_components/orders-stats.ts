import { Order } from "./order-type";

export function getOrdersStats(orders: Order[]) {
  const totalOrders = orders.length;

  const totalIncome = orders.reduce((sum, o) => sum + o.incomeUsd, 0);

  const totalPaid = orders.reduce((sum, o) => sum + o.paidUsd, 0);

  const totalRemaining = orders.reduce((sum, o) => sum + o.remainingUsd, 0);

  return {
    totalOrders,
    totalIncome,
    totalPaid,
    totalRemaining,
  };
}
