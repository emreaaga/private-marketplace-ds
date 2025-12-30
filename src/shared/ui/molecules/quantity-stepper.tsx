import { Minus, Plus } from "lucide-react";

import { Button } from "../atoms/button";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  disabled?: boolean;
  stopPropagation?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  size = "md",
  disabled,
  stopPropagation,
}: QuantityStepperProps) {
  const dec = (e?: React.MouseEvent) => {
    if (stopPropagation) e?.stopPropagation();
    if (value <= min) return;
    onChange(value - 1);
  };

  const inc = (e?: React.MouseEvent) => {
    if (stopPropagation) e?.stopPropagation();
    if (max && value >= max) return;
    onChange(value + 1);
  };

  const btnSize = size === "sm" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex items-center">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={disabled ?? value <= min}
        className={btnSize}
        onClick={dec}
      >
        <Minus />
      </Button>

      <span className="w-4 text-center text-xs font-medium">{value}</span>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={disabled ?? (max ? value >= max : false)}
        className={btnSize}
        onClick={inc}
      >
        <Plus />
      </Button>
    </div>
  );
}
