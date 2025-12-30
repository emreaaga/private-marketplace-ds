"use client";

import { cn } from "@/shared/lib/utils";

export function StepperDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn("h-2 w-2 rounded-full transition-colors", step === i ? "bg-primary" : "bg-muted")}
        />
      ))}
    </div>
  );
}
