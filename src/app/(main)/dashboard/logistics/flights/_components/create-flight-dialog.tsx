"use client";

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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="create" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Участники</TabsTrigger>
            <TabsTrigger value="filters">Отправки</TabsTrigger>
          </TabsList>

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
