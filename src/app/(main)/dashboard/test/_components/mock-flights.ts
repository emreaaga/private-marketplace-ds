import { Flight } from "./flight-types";

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "001",
    route: "TR → UZ",
    departureDate: "2026-01-05",
    status: "CLOSED",

    shipmentsCount: 8,
    totalWeightKg: 1040,

    expensesUsd: 7200,
    incomeUsd: 8350,
  },
  {
    id: "002",
    route: "TR → UZ",
    departureDate: "2026-01-10",
    status: "ARRIVED",

    shipmentsCount: 6,
    totalWeightKg: 910,

    expensesUsd: 5800,
    incomeUsd: 6450,
  },
  {
    id: "003",
    route: "TR → UZ",
    departureDate: "2026-01-13",
    status: "CUSTOMS_IN",

    shipmentsCount: 5,
    totalWeightKg: 760,

    expensesUsd: 5200,
    incomeUsd: 6000,
  },
  {
    id: "004",
    route: "TR → UZ",
    departureDate: "2026-01-15",
    status: "IN_AIR",

    shipmentsCount: 7,
    totalWeightKg: 880,

    expensesUsd: 4900,
    incomeUsd: 6200,
  },
  {
    id: "005",
    route: "TR → UZ",
    departureDate: "2026-01-17",
    status: "CUSTOMS_OUT",

    shipmentsCount: 4,
    totalWeightKg: 640,

    expensesUsd: 4100,
    incomeUsd: 500,
  },
  {
    id: "006",
    route: "TR → UZ",
    departureDate: "2026-01-19",
    status: "READY_FOR_CUSTOMS",

    shipmentsCount: 3,
    totalWeightKg: 520,

    expensesUsd: 0,
    incomeUsd: 0,
  },
  {
    id: "007",
    route: "TR → UZ",
    departureDate: "2026-01-20",
    status: "PLANNED",

    shipmentsCount: 5,
    totalWeightKg: 700,

    expensesUsd: 0,
    incomeUsd: 0,
  },
];
