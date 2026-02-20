import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import type { CreateFlightDto } from "@/shared/types/flight/flight.dto";

export function toCreateFlightDto(v: FlightFormValues): CreateFlightDto {
  return {
    departure_location: {
      country: v.departure_location.country,
      city: v.departure_location.city,
    },
    arrival_location: {
      country: v.arrival_location.country,
      city: v.arrival_location.city,
    },

    air_partner_id: v.air_partner_id,
    sender_customs_id: v.sender_customs_id,
    receiver_customs_id: v.receiver_customs_id,

    air_kg_price: v.air_kg_price,
    sender_customs_kg_price: "0.00",
    receiver_customs_kg_price: "0.00",

    loading_at: v.loading_at.toISOString(),
    departure_at: v.departure_at.toISOString(),
    arrival_at: v.arrival_at.toISOString(),
    unloading_at: v.unloading_at.toISOString(),

    shipments: v.shipments,
  };
}
