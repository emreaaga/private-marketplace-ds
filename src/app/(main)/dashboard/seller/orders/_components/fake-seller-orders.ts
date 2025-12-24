import type { Order } from "./orders.type";

export const fakeOrders: Order[] = [
  {
    counter: 1,
    id: "A001Z100001",
    test: "001",

    sender: {
      name: "Prodavec1",
      phone: "+90 555 123 45 67",
      city: "TR-IST",
    },

    recipient: {
      name: "Client1",
      phone: "+998 90 123 45 67",
      city: "UZ-TAS",
    },

    weight: 2.4,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Упаковка", amount: 5.0 }],

    payment1: {
      type: "prepaid",
      amount: 15.6,
      location: "turkey",
    },

    status: "in_transit",
    date: "2025-02-10",
  },
  {
    counter: 2,
    id: "A001Z100002",
    test: "002",

    sender: {
      name: "Prodavec2",
      phone: "+90 532 987 65 43",
      city: "TR-IST",
    },

    recipient: {
      name: "Client2",
      phone: "+998 93 456 78 90",
      city: "UZ-BHK",
    },

    weight: 1.8,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Таможенный сбор", amount: 8.0 }],

    payment1: {
      type: "prepaid",
      amount: 19.7,
      location: "turkey",
    },

    status: "created",
    date: "2025-02-10",
  },
  {
    counter: 3,
    id: "A002Z100001",
    test: "003",

    sender: {
      name: "Prodavec3",
      phone: "+90 544 321 00 11",
      city: "UZ-TAS",
    },

    recipient: {
      name: "Client3",
      phone: "+998 91 222 33 44",
      city: "UZ-SKD",
    },

    weight: 3.6,
    ratePerKg: 6.5,

    extraCharges: [{ title: "Штраф (таможня)", amount: 12.0 }],

    payment1: {
      type: "prepaid",
      amount: 20.0,
      location: "turkey",
    },

    payment2: {
      type: "cod",
      amount: 16.0,
      location: "destination",
    },

    status: "canceled",
    date: "2025-02-09",
  },
];
