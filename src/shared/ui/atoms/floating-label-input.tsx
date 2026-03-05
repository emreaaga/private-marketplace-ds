"use client";

import * as React from "react";

import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { Input } from "./input";

type InputMode = "text" | "letters" | "numbers";

type FloatingLabelInputProps = Omit<React.ComponentPropsWithoutRef<typeof Input>, "placeholder"> & {
  label: string;
  containerClassName?: string;
  icon?: LucideIcon;
  mode?: InputMode;
};

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ id: idProp, label, containerClassName, className, icon: Icon, mode = "text", onChange, ...props }, ref) => {
    const autoId = React.useId();
    const id = idProp ?? autoId;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (mode === "letters") {
        value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
      } else if (mode === "numbers") {
        value = value.replace(/\D/g, "");
      }

      e.target.value = value;

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cn("group relative w-full", containerClassName)}>
        {Icon && (
          <div className="text-muted-foreground/60 absolute top-1/2 left-2 -translate-y-1/2">
            <Icon size={14} strokeWidth={2} />
          </div>
        )}

        <label
          htmlFor={id}
          className={cn(
            "origin-start text-muted-foreground/60 absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all",
            "group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs",
            "has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs",
            Icon ? "left-9" : "left-2",
          )}
        >
          <span className="bg-background inline-flex px-1">{label}</span>
        </label>

        <Input
          id={id}
          ref={ref}
          placeholder=" "
          onChange={handleOnChange}
          className={cn("dark:bg-background transition-all", Icon ? "pl-8" : "", className)}
          {...props}
        />
      </div>
    );
  },
);

FloatingLabelInput.displayName = "FloatingLabelInput";
