import type { CreateFlightPayload } from "./create-flight.pay";

export type UpdateFlightRequest = Omit<CreateFlightPayload, "shipments"> & {
  awb_number: string | null;
  final_gross_weight_kg: string | null;

  shipments: {
    id: number;
    total_weight_kg: string;
  }[];
};
