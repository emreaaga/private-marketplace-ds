"use client";

import { forwardRef } from "react";

import { FORM_FIELD_STYLES, getFieldStatusClass } from "@/shared/config/form-styles";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { type CompanyType } from "../model/company.types";
import { COMPANY_TYPE_META } from "../model/company.types.meta";

interface Props {
  value: CompanyType;
  onChange: (value: CompanyType) => void;
  error?: boolean;
  isDirty?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CompanyTypeSelect = forwardRef<HTMLButtonElement, Props>(
  ({ value, onChange, error, isDirty, disabled, className }, ref) => {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          ref={ref}
          className={cn(
            "h-10 w-full px-3 text-sm font-normal shadow-sm",
            FORM_FIELD_STYLES.base,
            getFieldStatusClass(error, isDirty),
            !error && !isDirty && "bg-background border-input hover:bg-accent/50",
            className,
          )}
        >
          <SelectValue placeholder="Тип фирмы" />
        </SelectTrigger>

        <SelectContent className="border-muted/40 rounded-xl shadow-xl">
          {Object.entries(COMPANY_TYPE_META).map(([type, meta]) => {
            const Icon = meta.Icon;
            const isAlwaysDisabled = type === "airline";

            return (
              <SelectItem
                key={type}
                value={type}
                disabled={isAlwaysDisabled}
                className="focus:bg-accent rounded-lg py-2"
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isAlwaysDisabled ? "text-muted-foreground/40" : "text-muted-foreground/70",
                    )}
                  />
                  <span className={cn(isAlwaysDisabled && "text-muted-foreground")}>
                    {meta.label}
                    {isAlwaysDisabled}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
);

CompanyTypeSelect.displayName = "CompanyTypeSelect";
