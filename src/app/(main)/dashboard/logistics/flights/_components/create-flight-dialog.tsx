"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import { flightFormSchema, type FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import type { CreateFlightDto } from "@/shared/types/flight/flight.dto";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

import { FlightPartiesForm } from "./flight-parties-form";
import { ShipmentList } from "./shipment-list";

function toCreateFlightDto(v: FlightFormValues): CreateFlightDto {
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

export function FlightsDialog({
  open,
  onOpenChangeAction,
}: {
  open: boolean;
  onOpenChangeAction: (o: boolean) => void;
}) {
  const [tab, setTab] = useState<"create" | "filters">("create");
  const [saving, setSaving] = useState(false);

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(flightFormSchema),
    mode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      departure_location: { country: "tr", city: "ist" },
      arrival_location: { country: "uz", city: "tas" },
      shipments: [],
    },
  });

  const onSave = form.handleSubmit(
    async (values: FlightFormValues) => {
      setSaving(true);
      try {
        await flightsService.createFlight(toCreateFlightDto(values));
        toast.success("Рейс успешно создан");
        onOpenChangeAction(false);
      } catch {
        toast.error("Не удалось создать рейс");
      } finally {
        setSaving(false);
      }
    },
    (errors) => {
      console.log(errors);
      toast.error("Заполните обязательные поля");
    },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="flex h-[600px] w-[560px] max-w-none flex-col">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <FormProvider {...form}>
          <Tabs value={tab} onValueChange={(v) => setTab(v as "create" | "filters")} className="mt-2">
            <div className="flex justify-center">
              <div className="flex items-center gap-3">
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="create">Рейс</TabsTrigger>
                  <TabsTrigger value="filters">Отправки</TabsTrigger>
                </TabsList>

                <Button size="sm" onClick={onSave} disabled={saving}>
                  {saving ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            </div>

            <TabsContent value="create" forceMount className="mt-4">
              <div className={tab === "create" ? "block" : "hidden"}>
                <FlightPartiesForm />
              </div>
            </TabsContent>

            <TabsContent value="filters" forceMount className="mt-4">
              <div className={tab === "filters" ? "block" : "hidden"}>
                <ShipmentList />
              </div>
            </TabsContent>
          </Tabs>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
