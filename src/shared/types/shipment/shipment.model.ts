import { ShipmentStatuses } from "./shipment.statuses";

export type Shipment = {
  id: number;
  company_name: string;
  flight_id: null | number;
  route: string;
  orders_count: string;
  total_weight_kg: string;
  status: ShipmentStatuses;
  created_at: string;
};
