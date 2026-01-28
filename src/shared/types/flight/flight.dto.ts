import type { CountryCode } from "@/shared/types/geography/country.types";

export type CountryCityDto = {
  country: CountryCode;
  city: string;
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
