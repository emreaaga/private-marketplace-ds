"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

export type GhostInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const GhostInput = React.forwardRef<HTMLInputElement, GhostInputProps>(function GhostInput(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        // layout
        "h-8 w-full rounded-md px-2 text-xs",

        // ghost styles
        "border-0 bg-transparent shadow-none",
        "transition-colors",
        "hover:bg-white/80 focus:bg-white",

        // focus reset
        "focus:outline-none",

        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className,
      )}
      {...props}
    />
  );
});
