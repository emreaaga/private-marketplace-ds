import type { Order } from "@/features/orders/types/order.types";

export const fakeOrders: Order[] = [
  {
    id: "A001Z100001",
    customer: "Client1",
    total: 24500,
    status: "confirmed",
    date: "2025-02-10",
    items: [
      { name: "Футболка Basic White (M)", sku: "TS-WH-M-001", price: 7500, qty: 2 },
      { name: "Джинсы Slim Fit Blue (32)", sku: "JN-BL-32-210", price: 9500, qty: 1 },
    ],
  },
  {
    id: "A001Z100002",
    customer: "Client2",
    total: 17800,
    status: "pending",
    date: "2025-02-10",
    items: [{ name: "Худи Oversize Black (L)", sku: "HD-BLK-L-400", price: 8900, qty: 2 }],
  },
  {
    id: "A002Z100001",
    customer: "Client3",
    total: 12900,
    status: "canceled",
    date: "2025-02-09",
    items: [{ name: "Куртка Lightweight Windbreaker (M)", sku: "JK-WND-M-550", price: 12900, qty: 1 }],
  },
  {
    id: "A002Z100002",
    customer: "Client4",
    total: 16400,
    status: "confirmed",
    date: "2025-02-09",
    items: [{ name: "Свитшот Classic Grey (L)", sku: "SW-GRY-L-330", price: 8200, qty: 2 }],
  },
];
