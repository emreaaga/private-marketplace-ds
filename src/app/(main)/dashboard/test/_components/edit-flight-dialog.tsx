"use client";

import { useEffect, useMemo, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import type { FlightDetails } from "@/shared/types/flight/flight.dto";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { EditFlightForm } from "./edit-flight-form";
import { EditFlightShipments } from "./edit-flight-shipments";
import { useFlightDetails } from "./use-flight-details";

export type EditFlightFormValues = {
  departure_location: { country: CountryCode | null; city: string | null };
  arrival_location: { country: CountryCode | null; city: string | null };

  air_partner_id?: number;
  sender_customs_id?: number;
  receiver_customs_id?: number;

  air_kg_price: string;

  loading_at?: Date;
  departure_at?: Date;
  arrival_at?: Date;
  unloading_at?: Date;

  awb_number: string;

  final_gross_weight_kg: string;
  shipments: number[];
};

const DEFAULT_VALUES: EditFlightFormValues = {
  departure_location: { country: null, city: null },
  arrival_location: { country: null, city: null },
  air_kg_price: "",
  awb_number: "",
  final_gross_weight_kg: "",
  shipments: [],
};

function parseDate(v: string): Date | undefined {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "";
}

function kg2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "";
}

function normalizeKg(v: string): string | null {
  const s = v.trim();
  if (!s) return null;

  const n = Number(s.replace(",", "."));
  if (!Number.isFinite(n)) return null;

  return n.toFixed(2);
}

function toFormValues(f: FlightDetails): EditFlightFormValues {
  return {
    departure_location: { country: f.departure_location.country, city: f.departure_location.city },
    arrival_location: { country: f.arrival_location.country, city: f.arrival_location.city },

    air_partner_id: f.air_partner_id,
    sender_customs_id: f.sender_customs_id,
    receiver_customs_id: f.receiver_customs_id,

    air_kg_price: money2(f.air_kg_price),

    loading_at: parseDate(f.loading_at),
    departure_at: parseDate(f.departure_at),
    arrival_at: parseDate(f.arrival_at),
    unloading_at: parseDate(f.unloading_at),

    awb_number: f.awb_number ?? "",

    final_gross_weight_kg: f.final_gross_weight_kg == null ? "" : kg2(f.final_gross_weight_kg),

    shipments: f.shipments.map((s) => s.id),
  };
}

// eslint-disable-next-line complexity
function toUpdatePayload(v: EditFlightFormValues) {
  if (!v.departure_location.country || !v.departure_location.city) throw new Error("departure_location");
  if (!v.arrival_location.country || !v.arrival_location.city) throw new Error("arrival_location");
  if (!v.loading_at || !v.departure_at || !v.arrival_at || !v.unloading_at) throw new Error("dates");
  if (!v.air_partner_id || !v.sender_customs_id || !v.receiver_customs_id) throw new Error("companies");
  if (!v.air_kg_price || v.air_kg_price.trim().length === 0) throw new Error("air_kg_price");
  if (v.shipments.length === 0) {
    throw new Error("shipments");
  }

  const finalKg = normalizeKg(v.final_gross_weight_kg);
  if (v.final_gross_weight_kg.trim() && finalKg == null) throw new Error("final_gross_weight_kg");

  return {
    departure_location: { country: v.departure_location.country, city: v.departure_location.city },
    arrival_location: { country: v.arrival_location.country, city: v.arrival_location.city },

    air_partner_id: v.air_partner_id,
    sender_customs_id: v.sender_customs_id,
    receiver_customs_id: v.receiver_customs_id,

    air_kg_price: v.air_kg_price,

    loading_at: v.loading_at.toISOString(),
    departure_at: v.departure_at.toISOString(),
    arrival_at: v.arrival_at.toISOString(),
    unloading_at: v.unloading_at.toISOString(),

    awb_number: v.awb_number.length ? v.awb_number : null,
    final_gross_weight_kg: finalKg,

    shipments: v.shipments,
  };
}

type EditFlightDialogProps = {
  open: boolean;
  flightId: number | null;
  onOpenChangeAction: (open: boolean) => void;
};

export function EditFlightDialog({ open, flightId, onOpenChangeAction }: EditFlightDialogProps) {
  const { loading, flight } = useFlightDetails(open, flightId);
  const [sessionKey, setSessionKey] = useState(0);

  const title = useMemo(() => (flightId == null ? "Рейс" : `Рейс #${flightId}`), [flightId]);

  const form = useForm<EditFlightFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!flight) return;
    form.reset(toFormValues(flight));
  }, [flight, form]);

  const canSave = Boolean(flight) && form.formState.isDirty && !form.formState.isSubmitting;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (flight) form.reset(toFormValues(flight));
      else form.reset(DEFAULT_VALUES);
      setSessionKey((k) => k + 1);
    }

    onOpenChangeAction(nextOpen);
  };

  const onSave = form.handleSubmit(async (values) => {
    if (!flight) return;

    try {
      const payload = toUpdatePayload(values);
      await flightsService.updateFlight(flight.id, payload);

      toast.success("Рейс обновлён");
      form.reset(values);

      handleOpenChange(false);
    } catch {
      toast.error("Проверьте обязательные поля");
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={[
          "w-[1500px]! max-w-[calc(100vw-2rem)]!",
          "h-[560px]! max-h-[calc(100vh-2rem)]!",
          "flex flex-col overflow-hidden p-0",
        ].join(" ")}
      >
        <DialogHeader className="border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <DialogTitle className="leading-none">{title}</DialogTitle>

            {flight &&
              (() => {
                const meta = FLIGHT_STATUS_META[flight.status];
                const Icon = meta.Icon;
                return (
                  <Badge variant="secondary" className="gap-1">
                    <Icon className="h-4 w-4 opacity-70" />
                    {meta.label}
                  </Badge>
                );
              })()}
          </div>
        </DialogHeader>

        <FormProvider {...form}>
          <div className="min-h-0 flex-1">
            {loading && <div className="text-muted-foreground px-6 py-4 text-sm">Загрузка...</div>}

            {!loading && !flight && <div className="text-muted-foreground px-6 py-4 text-sm">Нет данных</div>}

            {!loading && flight && (
              <div className="grid h-full min-h-0 grid-cols-[1fr_520px]">
                <div className="min-w-0 overflow-auto px-6 py-5">
                  <EditFlightForm />
                </div>

                <div className="bg-muted/20 min-w-0 overflow-hidden border-l px-6 py-5">
                  <EditFlightShipments key={`${flight.id}-${sessionKey}`} initialShipments={flight.shipments} />
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t px-6 py-3">
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => handleOpenChange(false)}>
                Закрыть
              </Button>

              <Button onClick={onSave} disabled={!canSave}>
                {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
