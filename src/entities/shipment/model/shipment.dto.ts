import type { CountryCode } from "@/entities/geography";

import type { ShipmentStatuses } from "./shipment.status";

export type CreateShipmentDto = {
  company_id: number;
  from_country: CountryCode;
  to_country: CountryCode;
};

export type GetShipmentsLookupParams = GetShipmentQuery & {
  q?: string;
  limit?: number;
};

export type GetShipmentsPageParams = GetShipmentQuery & { page: number };

export type GetShipmentQuery = {
  company_id?: number;
  flight_id?: number;
  status?: ShipmentStatuses;
};

export type ShipmentOption = {
  id: number;
  number: string;
  orders_count: string;
  total_weight_kg: string;
  total_prepaid: string;
  total_remaining: string;
};
