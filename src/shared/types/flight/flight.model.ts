import { type FlightStatuses } from "./flight.status";

export type Flight = {
  id: number;
  route: string;
  air_partner_name: string;
  air_kg_price: string;
  final_gross_weight_kg: string | null;
  shipments_count: number;
  status: FlightStatuses;
  arrival_at: string;
};
