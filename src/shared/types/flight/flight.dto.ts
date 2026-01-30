import type { CountryCode } from "@/shared/types/geography/country.types";

import { FlightStatuses } from "./flight.statuses";

export type CountryCityDto = {
  country: CountryCode;
  city: string;
};

export type FlightShipment = {
  id: number;
  company_id: number;
  company_name: string;
  orders_count: string;
  total_weight_kg: string;
};

export type CreateFlightDto = {
  departure_location: CountryCityDto;
  arrival_location: CountryCityDto;

  air_partner_id: number;
  sender_customs_id: number;
  receiver_customs_id: number;

  air_kg_price: string;
  sender_customs_kg_price: string;
  receiver_customs_kg_price: string;

  loading_at: string;
  departure_at: string;
  arrival_at: string;
  unloading_at: string;

  shipments: number[];
};

export type FlightDetails = Omit<CreateFlightDto, "shipments"> & {
  id: number;

  awb_number: string | null;
  final_gross_weight_kg: string | null;

  status: FlightStatuses;

  is_paid: boolean;
  paid_at: string | null;
  created_at: string;

  shipments: FlightShipment[];
};

export type ApiResponse<T> = { data: T };
