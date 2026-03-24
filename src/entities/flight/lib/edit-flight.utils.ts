import Big from "big.js";

import type { CountryCode } from "@/entities/geography";

import type { DetailFlightRequest } from "../api/types/detail-flight.req";
import type { UpdateFlightRequest } from "../api/types/update-flight.pay";

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

  air_kg_price: string;
  total_flight_weight_kg?: string;

  loading_at?: Date;
  departure_at?: Date;
  arrival_at?: Date;
  unloading_at?: Date;
  awb_number: string;
  final_gross_weight_kg: string;
  shipments: number[];
  shipments_data: {
    id: number;
    internal_number: number;
    orders_count: string | number;
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

export function toFormValues(f: DetailFlightRequest): EditFlightFormValues {
  return {
    departure_location: { ...f.departure_location },
    arrival_location: { ...f.arrival_location },
    air_partner_id: f.air_partner_id,
    sender_customs_id: f.sender_customs_id,
    receiver_customs_id: f.receiver_customs_id,

    air_kg_price: formatNumber(f.air_kg_price),
    total_flight_weight_kg: formatNumber(f.total_flight_weight_kg),

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
        internal_number: s.internal_number,
        orders_count: s.orders_count,
        company_name: s.company_name,
        total_weight_kg: formatNumber(s.total_weight_kg),
        original_weight_kg: formatNumber(s.total_weight_kg),
        total_prepaid: shipmentRecord.total_prepaid,
        total_remaining: shipmentRecord.total_remaining,
      };
    }),
  };
}

export function toUpdatePayload(v: EditFlightFormValues): UpdateFlightRequest {
  const finalKg = normalizeKg(v.final_gross_weight_kg);

  return {
    departure_location: {
      country: v.departure_location.country as string,
      city: v.departure_location.city as string,
    },
    arrival_location: {
      country: v.arrival_location.country as string,
      city: v.arrival_location.city as string,
    },
    air_partner_id: v.air_partner_id as number,
    sender_customs_id: v.sender_customs_id as number,
    receiver_customs_id: v.receiver_customs_id as number,

    air_kg_price: v.air_kg_price,

    loading_at: v.loading_at?.toISOString() as string,
    departure_at: v.departure_at?.toISOString() as string,
    arrival_at: v.arrival_at?.toISOString() as string,
    unloading_at: v.unloading_at?.toISOString() as string,

    awb_number: v.awb_number.length ? v.awb_number : null,
    final_gross_weight_kg: finalKg,

    shipments: v.shipments_data.map((s) => ({
      id: s.id,
      total_weight_kg: s.total_weight_kg,
    })),
  } as UpdateFlightRequest;
}
