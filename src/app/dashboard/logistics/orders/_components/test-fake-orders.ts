import { Order } from "./test-order";

export const fakeOrders: Order[] = [
  {
    id: "Z100001",
    date: "2025-02-10",
    status: "in_transit",
    sender: { name: "Prodavec1", city: "TR-IST" },
    recipient: { name: "Client1", city: "TAS" },
    weight: 2.4,
    rate: 6.5,
    finances: {
      cargoPrice: 15.6,
      extraPayment: 5.0,
      extraExpense: 2.0,
      deposit: 10.0,
      total: 20.6,
    },
  },
  {
    id: "Z100002",
    date: "2025-02-11",
    status: "delivered",
    sender: { name: "Prodavec3", city: "TR-IST" },
    recipient: { name: "Client3", city: "SKD" },
    weight: 10.0,
    rate: 5.0,
    finances: {
      cargoPrice: 50.0,
      extraPayment: 12.0,
      extraExpense: 0,
      deposit: 62.0,
      total: 62.0,
    },
  },
];
