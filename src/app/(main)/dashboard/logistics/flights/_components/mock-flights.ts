import { Flight } from "./types";

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "1",
    fromCode: "IST",
    toCode: "TAS",
    fromCountryCode: "TR",
    toCountryCode: "UZ",
    date: "2026-03-14",
    departureTime: "22:30",
    cutoffTime: "18:00",
    status: "confirmed",
  },
  {
    id: "2",
    fromCode: "IST",
    toCode: "ALA",
    fromCountryCode: "TR",
    toCountryCode: "KZ",
    date: "2026-03-21",
    departureTime: "21:00",
    cutoffTime: "17:00",
    status: "planned",
  },
];
