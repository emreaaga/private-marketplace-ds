import type { CountryCode } from "@/shared/types/geography/country.types";

import type { ShipmentStatuses } from "./shipment.status";

export type CreateShipmentDto = {
  company_id: number;
  from_country: CountryCode;
  to_country: CountryCode;
};

export type GetShipmentQuery = {
  company_id?: number;
  flight_id?: number;
  status?: ShipmentStatuses;
};
