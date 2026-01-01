"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../atoms/input-group";

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  placeholder?: string;
  className?: string;
  startAddon?: React.ReactNode;
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  step = 1,
  placeholder,
  className,
  startAddon,
}: NumberStepperProps) {
  const safeValue = Number.isFinite(value) ? value : min;

  const dec = () => {
    const next = safeValue - step;
    if (next < min) return;
    onChange(next);
  };

  const inc = () => {
    onChange(safeValue + step);
  };

  return (
    <div className={cn("flex w-full", className)}>
      <InputGroup>
        {startAddon && <InputGroupAddon>{startAddon}</InputGroupAddon>}

        <InputGroupInput
          type="number"
          value={safeValue}
          min={min}
          placeholder={placeholder}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(Number.isFinite(v) ? Math.max(min, v) : min);
          }}
        />

        <InputGroupAddon align="inline-end">
          <div className="flex">
            <InputGroupButton size="icon-sm" aria-label="Decrease" disabled={safeValue <= min} onClick={dec}>
              <Minus />
            </InputGroupButton>

            <InputGroupButton size="icon-sm" aria-label="Increase" onClick={inc}>
              <Plus />
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
