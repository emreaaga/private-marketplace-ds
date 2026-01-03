import type { Order } from "./order.types";

export const fakeOrders: Order[] = [
  {
    counter: 1,
    id: "A001Z100001",

    sender: {
      name: "Prodavec1",
      phone: "+90 555 123 45 67",
      city: "Самарканд",
    },

    recipient: {
      name: "Client1",
      phone: "+998 90 123 45 67",
      city: "Ташкент",
    },

    weight: 2.4,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Упаковка", amount: 5 }],

    payment1: {
      type: "prepaid",
      amount: 15,
      location: "turkey",
    },

    payment2: {
      type: "cod",
      amount: 10,
      location: "destination",
    },

    status: "in_transit",
    date: "2025-02-10",
  },

  {
    counter: 2,
    id: "A001Z100002",

    sender: {
      name: "Prodavec2",
      phone: "+90 532 987 65 43",
      city: "Ташкент",
    },

    recipient: {
      name: "Client2",
      phone: "+998 93 456 78 90",
      city: "Бухара",
    },

    weight: 1.8,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Таможенный сбор", amount: 8 }],

    payment1: {
      type: "prepaid",
      amount: 11,
      location: "turkey",
    },

    status: "created",
    date: "2025-02-10",
  },

  {
    counter: 3,
    id: "A002Z100001",

    sender: {
      name: "Prodavec3",
      phone: "+90 544 321 00 11",
      city: "Ташкент",
    },

    recipient: {
      name: "Client3",
      phone: "+998 91 222 33 44",
      city: "Андижан",
    },

    weight: 3.6,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Штраф (таможня)", amount: 12 }],

    payment1: {
      type: "prepaid",
      amount: 23,
      location: "turkey",
    },

    payment2: {
      type: "cod",
      amount: 12,
      location: "destination",
    },

    status: "canceled",
    date: "2025-02-09",
  },
];
