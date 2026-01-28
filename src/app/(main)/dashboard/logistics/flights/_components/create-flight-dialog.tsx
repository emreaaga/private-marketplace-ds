"use client";

import { useRef, useState } from "react";

import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import type { CreateFlightDto } from "@/shared/types/flight/flight.dto";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

import { FlightPartiesForm, type FlightFormValues, type FlightPartiesFormHandle } from "./flight-parties-form";
import { ShipmentList, type ShipmentListHandle } from "./shipment-list";

interface FlightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CompleteCountryCity = { country: CountryCode; city: string };

type CompleteFlightFormValues = FlightFormValues & {
  departure_location: CompleteCountryCity;
  arrival_location: CompleteCountryCity;

  air_partner_id: number;
  sender_customs_id: number;
  receiver_customs_id: number;

  air_kg_price: string;

  loading_at: Date;
  departure_at: Date;
  arrival_at: Date;
  unloading_at: Date;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// eslint-disable-next-line complexity
function validateForCreate(
  flight: FlightFormValues | undefined,
  shipmentIds: number[],
): flight is CompleteFlightFormValues {
  const flags: unknown[] = [
    flight,
    shipmentIds.length > 0,

    flight?.departure_location?.country,
    isNonEmptyString(flight?.departure_location?.city),

    flight?.arrival_location?.country,
    isNonEmptyString(flight?.arrival_location?.city),

    flight?.air_partner_id,
    flight?.sender_customs_id,
    flight?.receiver_customs_id,

    isNonEmptyString(flight?.air_kg_price),

    flight?.loading_at,
    flight?.departure_at,
    flight?.arrival_at,
    flight?.unloading_at,
  ];

  return flags.every(Boolean);
}

function toCreateFlightDto(flight: CompleteFlightFormValues, shipmentIds: number[]): CreateFlightDto {
  return {
    departure_location: flight.departure_location,
    arrival_location: flight.arrival_location,

    air_partner_id: flight.air_partner_id,
    sender_customs_id: flight.sender_customs_id,
    receiver_customs_id: flight.receiver_customs_id,

    air_kg_price: flight.air_kg_price,
    sender_customs_kg_price: "0.00",
    receiver_customs_kg_price: "0.00",

    loading_at: flight.loading_at.toISOString(),
    departure_at: flight.departure_at.toISOString(),
    arrival_at: flight.arrival_at.toISOString(),
    unloading_at: flight.unloading_at.toISOString(),

    shipments: shipmentIds,
  };
}

export function FlightsDialog({ open, onOpenChange }: FlightsDialogProps) {
  const [tab, setTab] = useState<"create" | "filters">("create");
  const [saving, setSaving] = useState(false);

  const formRef = useRef<FlightPartiesFormHandle>(null);
  const shipmentsRef = useRef<ShipmentListHandle>(null);

  const saveDisabled = tab !== "filters" || saving;

  async function handleSave() {
    const flight = formRef.current?.getValues();
    const shipmentIds = shipmentsRef.current?.getShipmentIds() ?? [];

    if (!validateForCreate(flight, shipmentIds)) {
      toast.error("Заполните все поля и выберите отправки");
      return;
    }

    const payload = toCreateFlightDto(flight, shipmentIds);

    setSaving(true);
    try {
      await flightsService.createFlight(payload);
      toast.success("Рейс успешно создан");
      onOpenChange(false);
    } catch {
      toast.error("Не удалось создать рейс");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[600px] w-[560px] max-w-none flex-col">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "create" | "filters")} className="mt-2">
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="create">Рейс</TabsTrigger>
                <TabsTrigger value="filters">Отправки</TabsTrigger>
              </TabsList>

              <Button size="sm" onClick={handleSave} disabled={saveDisabled}>
                {saving ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </div>

          <TabsContent value="create" forceMount className="mt-4">
            <div className={tab === "create" ? "block" : "hidden"}>
              <FlightPartiesForm ref={formRef} />
            </div>
          </TabsContent>

          <TabsContent value="filters" forceMount className="mt-4">
            <div className={tab === "filters" ? "block" : "hidden"}>
              <ShipmentList ref={shipmentsRef} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
