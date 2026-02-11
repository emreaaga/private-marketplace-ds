"use client";

import * as React from "react";

import { Input } from "./input";

type FloatingLabelInputProps = Omit<React.ComponentPropsWithoutRef<typeof Input>, "placeholder"> & {
  label: string;
  containerClassName?: string;
};

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ id: idProp, label, containerClassName, className, ...props }, ref) => {
    const autoId = React.useId();
    const id = idProp ?? autoId;

    return (
      <div className={["group relative w-full", containerClassName].filter(Boolean).join(" ")}>
        <label
          htmlFor={id}
          className="origin-start text-muted-foreground/60 absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs"
        >
          <span className="bg-background inline-flex px-1">{label}</span>
        </label>

        <Input
          id={id}
          ref={ref}
          placeholder=" "
          className={["dark:bg-background", className].filter(Boolean).join(" ")}
          {...props}
        />
      </div>
    );
  },
);

FloatingLabelInput.displayName = "FloatingLabelInput";
