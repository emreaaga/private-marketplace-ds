"use client";

import React from "react";

import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface StatusProgressProps {
  step: number;
  totalSteps?: number;
  Icon: LucideIcon | React.FC<{ className?: string }>;
  label?: string;
  className?: string;
}

export const StatusProgress = ({ step, totalSteps = 5, Icon, label, className }: StatusProgressProps) => {
  const percentage = (step / totalSteps) * 100;
  const circumference = 56.5;

  return (
    <div className={cn("relative flex h-6 w-6 shrink-0 items-center justify-center", className)} title={label}>
      <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="transparent"
          className="text-muted/20"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * percentage) / 100}
          strokeLinecap="round"
          className="text-muted-foreground/60 transition-all duration-500"
        />
      </svg>
      <Icon className="text-muted-foreground/80 relative z-10 h-3 w-3" />
    </div>
  );
};
