"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

import { FlightPartiesForm } from "./flight-parties-form";
import { ShipmentList } from "./shipment-list";

interface FlightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FlightsDialog({ open, onOpenChange }: FlightsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[600px] w-[560px] max-w-none flex-col">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <Tabs defaultValue="create" className="mt-2">
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="create">Рейс</TabsTrigger>
                <TabsTrigger value="filters">Отправки</TabsTrigger>
              </TabsList>

              <Button size="sm">Сохранить</Button>
            </div>
          </div>

          <TabsContent value="create" className="mt-4">
            <FlightPartiesForm />
          </TabsContent>

          <TabsContent value="filters" className="mt-4">
            <ShipmentList />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
