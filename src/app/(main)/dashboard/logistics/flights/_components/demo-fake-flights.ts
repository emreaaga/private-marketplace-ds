export interface Flight {
  id: string;
  code: string;
  route: string[];
  participantsCount: number;
  shipmentsCount: number;
  totalWeightKg: number;
  totalAmount: number;
  currency: "USD" | "EUR";
  status: "planned" | "in_transit" | "customs" | "delivered";
  departureAt: string;
  arrivalEta: string;
}

export const DemoFakeFlights: Flight[] = [
  {
    id: "001",
    code: "FL-2026-001",
    route: ["TR-IST", "UZ-TAS"],
    participantsCount: 12,
    shipmentsCount: 214,
    totalWeightKg: 1380,
    totalAmount: 18430,
    currency: "EUR",
    status: "planned",
    departureAt: "2026-01-10",
    arrivalEta: "2026-01-15",
  },
  {
    id: "002",
    code: "FL-2026-002",
    route: ["TR-IST", "UZ-TAS"],
    participantsCount: 8,
    shipmentsCount: 96,
    totalWeightKg: 740,
    totalAmount: 9230,
    currency: "EUR",
    status: "delivered",
    departureAt: "2026-01-08",
    arrivalEta: "2026-01-13",
  },
  {
    id: "003",
    code: "FL-2026-003",
    route: ["TR-IST", "UZ-TAS"],
    participantsCount: 21,
    shipmentsCount: 412,
    totalWeightKg: 2860,
    totalAmount: 31200,
    currency: "USD",
    status: "in_transit",
    departureAt: "2026-01-05",
    arrivalEta: "2026-01-18",
  },
  {
    id: "004",
    code: "FL-2026-004",
    route: ["TR-IST", "UZ-TAS"],
    participantsCount: 5,
    shipmentsCount: 44,
    totalWeightKg: 390,
    totalAmount: 6100,
    currency: "USD",
    status: "delivered",
    departureAt: "2025-12-28",
    arrivalEta: "2026-01-03",
  },
];
