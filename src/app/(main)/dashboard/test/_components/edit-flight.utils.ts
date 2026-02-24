import Big from "big.js";

import type { FlightDetails } from "@/shared/types/flight/flight.dto";
import type { CountryCode } from "@/shared/types/geography/country.types";

export function distributeWeightProportionally<T extends { total_weight_kg: string | number }>(
  actualWeight: string | number,
  shipments: T[],
): T[] {
  const totalActual = new Big(actualWeight || 0);

  const totalCalculated = shipments.reduce((acc, s) => acc.plus(new Big(s.total_weight_kg || 0)), new Big(0));

  if (totalCalculated.eq(0)) return shipments;

  const ratio = totalActual.div(totalCalculated);

  return shipments.map((s) => ({
    ...s,
    total_weight_kg: new Big(s.total_weight_kg).times(ratio).toFixed(2),
  }));
}

export type EditFlightFormValues = {
  departure_location: { country: CountryCode | null; city: string | null };
  arrival_location: { country: CountryCode | null; city: string | null };
  air_partner_id?: number;
  sender_customs_id?: number;
  receiver_customs_id?: number;
  total_flight_weight_kg?: string;
  air_kg_price: string;
  loading_at?: Date;
  departure_at?: Date;
  arrival_at?: Date;
  unloading_at?: Date;
  awb_number: string;
  final_gross_weight_kg: string;
  shipments: number[];
  shipments_data: {
    id: number;
    total_weight_kg: string;
    original_weight_kg?: string;
    company_name: string;
    total_prepaid?: unknown;
    total_remaining?: unknown;
  }[];
};

const parseDate = (v: string | null | undefined): Date | undefined => {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

const formatNumber = (v: unknown): string => {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "";
};

const normalizeKg = (v: string): string | null => {
  const s = v.trim();
  if (!s) return null;
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) ? n.toFixed(2) : null;
};

export function toFormValues(f: FlightDetails): EditFlightFormValues {
  return {
    departure_location: { ...f.departure_location },
    arrival_location: { ...f.arrival_location },
    air_partner_id: f.air_partner_id,
    sender_customs_id: f.sender_customs_id,
    receiver_customs_id: f.receiver_customs_id,
    total_flight_weight_kg: formatNumber(f.total_flight_weight_kg),
    air_kg_price: formatNumber(f.air_kg_price),
    loading_at: parseDate(f.loading_at),
    departure_at: parseDate(f.departure_at),
    arrival_at: parseDate(f.arrival_at),
    unloading_at: parseDate(f.unloading_at),
    awb_number: f.awb_number ?? "",
    final_gross_weight_kg: f.final_gross_weight_kg == null ? "" : formatNumber(f.final_gross_weight_kg),
    shipments: f.shipments.map((s) => s.id),
    shipments_data: f.shipments.map((s) => {
      const shipmentRecord = s as Record<string, unknown>;

      return {
        id: s.id,
        company_name: s.company_name,
        total_weight_kg: formatNumber(s.total_weight_kg),
        original_weight_kg: formatNumber(s.total_weight_kg),
        total_prepaid: shipmentRecord.total_prepaid,
        total_remaining: shipmentRecord.total_remaining,
      };
    }),
  };
}

export function toUpdatePayload(v: EditFlightFormValues) {
  const finalKg = normalizeKg(v.final_gross_weight_kg);

  return {
    departure_location: v.departure_location,
    arrival_location: v.arrival_location,
    air_partner_id: v.air_partner_id,
    sender_customs_id: v.sender_customs_id,
    receiver_customs_id: v.receiver_customs_id,
    air_kg_price: v.air_kg_price,
    loading_at: v.loading_at?.toISOString(),
    departure_at: v.departure_at?.toISOString(),
    arrival_at: v.arrival_at?.toISOString(),
    unloading_at: v.unloading_at?.toISOString(),
    awb_number: v.awb_number.length ? v.awb_number : null,
    final_gross_weight_kg: finalKg,
    shipments: v.shipments,
  };
}
