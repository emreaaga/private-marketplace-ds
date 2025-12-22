import type { Order } from "./order.types";

export const fakeOrders: Order[] = [
  {
    id: "A001Z100001",
    recipient: { name: "Client A", city: "Ташкент" },
    sender: { city: "Самарканд" },
    weight: 2.4,
    payment: { type: "prepaid", amount: 24500 },
    status: "in_transit",
    date: "2025-02-10",
  },
  {
    id: "A001Z100002",
    recipient: { name: "Client B", city: "Бухара" },
    sender: { city: "Ташкент" },
    weight: 1.8,
    payment: { type: "cod", amount: 17800 },
    status: "created",
    date: "2025-02-10",
  },
  {
    id: "A002Z100001",
    recipient: { name: "Client C", city: "Андижан" },
    sender: { city: "Ташкент" },
    weight: 3.6,
    payment: { type: "prepaid", amount: 12900 },
    status: "canceled",
    date: "2025-02-09",
  },
];
