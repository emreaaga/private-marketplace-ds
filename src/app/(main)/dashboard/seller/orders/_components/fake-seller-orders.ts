import type { Order } from "./orders.type";

export const fakeOrders: Order[] = [
  {
    id: "Z100001A01",
    counter: 1,
    test: "001",

    sender: {
      name: "Prodavec1",
      phone: "+90 555 123 45 67",
      city: "TR-IST",
    },
    recipient: {
      name: "Client1",
      phone: "+998 90 123 45 67",
      city: "TAS",
    },

    pricing: {
      weightKg: 2.40,
      ratePerKg: 6.5,
      extraCharges: [{ title: "Упаковка", amount: 5 }],
    },

    payments: [
      {
        method: "prepaid",
        amount: 15.6,
        location: "origin",
      },
    ],

    paymentSummary: {
      cargoCost: 15.6,
      extrasTotal: 5,
      total: 20.6,
      paidOrigin: 15.6,
      paidDestination: 0,
      currency: "USD",
    },

    status: "in_transit",
    date: "2025-02-10 14:32",
  },

  {
    id: "Z100002A02",
    counter: 3,
    test: "002",

    sender: {
      name: "Prodavec3",
      phone: "+90 544 321 00 11",
      city: "TR-IST",
    },
    recipient: {
      name: "Client3",
      phone: "+998 91 222 33 44",
      city: "SKD",
    },

    pricing: {
      weightKg: 3.60,
      ratePerKg: 6.5,
      extraCharges: [{ title: "Штраф (таможня)", amount: 12 }],
    },

    payments: [
      {
        method: "prepaid",
        amount: 20,
        location: "origin",
      },
      {
        method: "cod",
        amount: 16,
        location: "destination",
      },
    ],

    paymentSummary: {
      cargoCost: 23.4,
      extrasTotal: 12,
      total: 35.4,
      paidOrigin: 20,
      paidDestination: 16,
      currency: "USD",
    },

    status: "canceled",
    date: "2025-02-10 11:23",
  },
  {
    id: "Z100003A03",
    counter: 1,
    test: "003",

    sender: {
      name: "Prodavec1",
      phone: "+90 555 123 45 67",
      city: "TR-IST",
    },
    recipient: {
      name: "Client1",
      phone: "+998 90 123 45 67",
      city: "TAS",
    },

    pricing: {
      weightKg: 2.30,
      ratePerKg: 6.5,
      extraCharges: [{ title: "Упаковка", amount: 5 }],
    },

    payments: [
      {
        method: "prepaid",
        amount: 15.6,
        location: "origin",
      },
    ],

    paymentSummary: {
      cargoCost: 15.6,
      extrasTotal: 5,
      total: 20.6,
      paidOrigin: 15.6,
      paidDestination: 0,
      currency: "USD",
    },

    status: "delivered",
    date: "2025-02-10",
  },
  {
    id: "Z100004A04",
    counter: 1,
    test: "004",

    sender: {
      name: "Prodavec1",
      phone: "+90 555 123 45 67",
      city: "TR-IST",
    },
    recipient: {
      name: "Client1",
      phone: "+998 90 123 45 67",
      city: "TAS",
    },

    pricing: {
      weightKg: 2.4,
      ratePerKg: 6.5,
      extraCharges: [{ title: "Упаковка", amount: 5 }],
    },

    payments: [
      {
        method: "prepaid",
        amount: 15.6,
        location: "origin",
      },
    ],

    paymentSummary: {
      cargoCost: 15.6,
      extrasTotal: 5,
      total: 20.6,
      paidOrigin: 15.6,
      paidDestination: 0,
      currency: "USD",
    },

    status: "created",
    date: "2025-02-10 18:00",
  },
];
