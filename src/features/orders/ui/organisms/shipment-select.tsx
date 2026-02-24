"use client";

import { useQuery } from "@tanstack/react-query";
import { Box } from "lucide-react";

import { ShipmentsService, type ShipmentOption } from "@/features/shipments/api/shipment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface ShipmentSelectProps {
  value: string | number | null;
  onChange: (id: number) => void;
}

export function ShipmentSelect({ value, onChange }: ShipmentSelectProps) {
  const { data: shipments, isLoading } = useQuery({
    queryKey: ["shipments", "lookup"],
    queryFn: () => ShipmentsService.getShipmentsLookup({ status: "draft" }),
  });

  const currentId = value ? Number(value) : null;

  const displayShipments: ShipmentOption[] = shipments ? [...shipments] : [];

  if (currentId && !displayShipments.some((s) => s.id === currentId)) {
    displayShipments.unshift({
      id: currentId,
      number: currentId.toString(),
    });
  }

  return (
    <div className="group relative">
      <span className="bg-background text-muted-foreground/60 group-focus-within:text-primary absolute -top-2 left-2 z-10 px-1 text-xs transition-all">
        Отправка
      </span>

      <Select value={currentId?.toString()} onValueChange={(val) => onChange(Number(val))} disabled={isLoading}>
        <SelectTrigger className="focus:ring-primary/20 h-8 w-full border text-xs shadow-none focus:ring-1">
          <div className="flex items-center gap-2 truncate font-normal">
            <Box size={14} className="text-muted-foreground/60 shrink-0" />
            <SelectValue placeholder={isLoading ? "..." : ""} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {displayShipments.map((s) => (
            <SelectItem key={s.id} value={s.id.toString()} className="text-xs">
              {s.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
