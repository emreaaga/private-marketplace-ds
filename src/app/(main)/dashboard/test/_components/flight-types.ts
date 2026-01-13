export type FlightStatus =
  | "PLANNED"
  | "READY_FOR_CUSTOMS"
  | "CUSTOMS_OUT"
  | "IN_AIR"
  | "CUSTOMS_IN"
  | "ARRIVED"
  | "CLOSED";

export interface Flight {
  id: string;
  route: string; // Istanbul → Tashkent
  departureDate: string;
  status: FlightStatus;

  shipmentsCount: number;
  totalWeightKg: number;

  expensesUsd: number; // airplane + customs + penalties
  incomeUsd: number; // service fees
}
