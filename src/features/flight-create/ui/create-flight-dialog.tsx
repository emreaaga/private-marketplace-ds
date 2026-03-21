"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { flightFormSchema, useCreateFlight, type FlightFormValues } from "@/entities/flight";
import { toCreateFlightDto } from "@/entities/flight/lib";
import { FlightGeneralForm } from "@/entities/flight/ui";
import { ShipmentList } from "@/entities/shipment/ui";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

export function FlightsDialog({
  open,
  onOpenChangeAction,
}: {
  open: boolean;
  onOpenChangeAction: (o: boolean) => void;
}) {
  const createMutation = useCreateFlight();

  const onInvalid = () => {
    toast.error("Пожалуйста, заполните все поля");
  };

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(flightFormSchema),
    mode: "onSubmit",
    defaultValues: {
      departure_location: { country: "", city: "" },
      arrival_location: { country: "", city: "" },
      shipments: [],
    },
  });

  const onSave = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync(toCreateFlightDto(values));
      handleClose();
    } catch {
      // Обработка ошибок
    }
  }, onInvalid);

  const handleClose = () => {
    form.reset();
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className={[
          "w-375! max-w-[calc(100vw-2rem)]!",
          "h-150! max-h-[calc(100vh-2rem)]!",
          "flex flex-col overflow-hidden p-0",
        ].join(" ")}
      >
        <DialogHeader className="border-b px-6 py-3">
          <DialogTitle>Создание рейса</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <div className="min-h-0 flex-1">
            <div className="grid h-full min-h-0 grid-cols-[450px_1fr]">
              <div className="min-w-0 overflow-auto px-4 py-4">
                <FlightGeneralForm mode="create" isVisible={open} />
              </div>

              <div className="min-w-0 overflow-hidden">
                <ShipmentList />
              </div>
            </div>
          </div>

          <div className="border-border/40 bg-background shrink-0 border-t px-4 py-2">
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={handleClose}>
                Отмена
              </Button>
              <Button size="sm" onClick={onSave} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Сохранение..." : "Создать рейс"}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
