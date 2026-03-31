"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/atoms/dialog";

import { TripCreateForm } from "./trip-create-form";

interface TripCreateDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  flightId: number | null;
}

export function TripCreateDialog({ open, onOpenChangeAction, flightId }: TripCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="border-border/60 flex flex-col gap-0 overflow-hidden p-0 shadow-lg sm:h-150 sm:max-w-105">
        <div className="border-border/60 shrink-0 border-b px-6 py-2">
          <DialogTitle className="text-lg font-semibold tracking-tight">Создание маршрута</DialogTitle>
          <DialogDescription hidden />
        </div>

        {flightId && <TripCreateForm open={open} flightId={flightId} onCancel={() => onOpenChangeAction(false)} />}
      </DialogContent>
    </Dialog>
  );
}
