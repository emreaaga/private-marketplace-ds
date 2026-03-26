import { BranchSummary } from "@/entities/branch";

import { FlightShipment } from "../../model/flight.dto";
import { FlightStatuses } from "../../model/flight.status";

import { CreateFlightPayload } from "./create-flight.pay";

export type DetailFlightRequest = Omit<CreateFlightPayload, "shipments"> & {
  id: number;

  awb_number: string | null;
  final_gross_weight_kg: string | null;

  status: FlightStatuses;

  is_paid: boolean;
  paid_at: string | null;
  created_at: string;

  shipments: FlightShipment[];
  branches_summary: BranchSummary[];

  total_flight_weight_kg: string | null;
};
