"use client";

import * as React from "react";

import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Calendar } from "@/shared/ui/atoms/calendar";
import { Input } from "@/shared/ui/atoms/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

type DateTimePickerProps = {
  placeholder: string;
  value?: Date;
  onChange: (date?: Date) => void;
};

export function DateTimePicker({ placeholder, value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const timeValue = value
    ? `${value.getHours().toString().padStart(2, "0")}:${value.getMinutes().toString().padStart(2, "0")}`
    : "12:00";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-9 w-full justify-between px-3 text-sm font-normal", !value && "text-muted-foreground")}
        >
          {value ? value.toLocaleString() : placeholder}
          <ChevronDownIcon className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="bg-background divide-y overflow-hidden rounded-md border">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (!date) return;
              const d = value ? new Date(value) : new Date(date);
              d.setFullYear(date.getFullYear());
              d.setMonth(date.getMonth());
              d.setDate(date.getDate());
              onChange(d);
            }}
          />

          <div className="p-3">
            <Input
              type="time"
              value={timeValue}
              onChange={(e) => {
                if (!value) return;
                const [h, m] = e.target.value.split(":");
                const d = new Date(value);
                d.setHours(Number(h), Number(m));
                onChange(d);
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
