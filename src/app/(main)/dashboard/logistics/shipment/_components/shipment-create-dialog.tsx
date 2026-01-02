"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface ShipmentCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COUNTRIES = [
  { value: "TR", label: "Турция" },
  { value: "CN", label: "Китай" },
  { value: "UZ", label: "Узбекистан" },
  { value: "KZ", label: "Казахстан" },
  { value: "RU", label: "Россия" },
  { value: "AE", label: "ОАЭ" },
];

export function ShipmentCreateDialog({ open, onOpenChange }: ShipmentCreateDialogProps) {
  const [originCountry, setOriginCountry] = useState<string>();
  const [destinationCountry, setDestinationCountry] = useState<string>();
  const [departureDate, setDepartureDate] = useState<string>();
  const [capacityKg, setCapacityKg] = useState<string>();

  const canSubmit = originCountry && destinationCountry && departureDate && capacityKg;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать отправку</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <Select value={originCountry} onValueChange={setOriginCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Откуда" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={destinationCountry} onValueChange={setDestinationCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Куда" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button size="sm" disabled={!canSubmit}>
            Создать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
