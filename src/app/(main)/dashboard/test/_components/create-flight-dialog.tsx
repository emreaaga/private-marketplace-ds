"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateFlight } from "@/features/flights/queries/use-create-flight";
import { flightFormSchema, type FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { toCreateFlightDto } from "../../logistics/flights/_components/to-create-flight-dto";

import { FlightGeneralForm } from "./flight-general-form";
import { ShipmentList } from "./shipment-list";

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
      departure_location: { country: "tr", city: "ist" },
      arrival_location: { country: "uz", city: "tas" },
      shipments: [],
    },
  });

  const onSave = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync(toCreateFlightDto(values));
      handleClose();
    } catch (error) {
      // Ошибки сервера обработает глобальный провайдер,
      // но mutateAsync прокидывает ошибку дальше, поэтому ловим её здесь,
      // чтобы handleClose() не сработал при ошибке сервера.
      console.error("Mutation failed", error);
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

              <div className="bg-muted/20 min-w-0 overflow-hidden">
                <ShipmentList />
              </div>
            </div>
          </div>

          <div className="border-border/40 bg-background shrink-0 border-t px-8 py-5">
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="border-border/40 hover:bg-muted h-8 rounded-lg px-4 text-[13px] font-medium transition-colors"
              >
                Отмена
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={createMutation.isPending}
                className="bg-foreground text-background hover:bg-foreground/90 h-8 min-w-35 rounded-lg text-[13px] font-bold transition-all active:scale-[0.98]"
              >
                {createMutation.isPending ? "Сохранение..." : "Создать рейс"}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
