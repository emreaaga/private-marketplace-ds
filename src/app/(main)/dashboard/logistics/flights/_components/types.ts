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
