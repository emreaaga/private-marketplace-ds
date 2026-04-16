"use client";

import { useId, useMemo, useState } from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { COUNTRY_META, type CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/atoms/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

type CityMultiSelectProps = {
  countryCode: CountryCode | undefined | null;
  value: string[];
  onChangeAction: (value: string[]) => void;
  className?: string;
};

export function CityMultiSelect({ countryCode, value, onChangeAction, className }: CityMultiSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const availableCities = useMemo(() => {
    if (!countryCode || !COUNTRY_META[countryCode]) return [];
    return Object.values(COUNTRY_META[countryCode].cities);
  }, [countryCode]);

  const toggleSelection = (cityCode: string) => {
    const newValue = value.includes(cityCode) ? value.filter((v) => v !== cityCode) : [...value, cityCode];
    onChangeAction(newValue);
  };

  const countryLabel = countryCode ? COUNTRY_META[countryCode].label : "";

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={!countryCode}
            className={cn(
              "bg-background/50 h-8 w-full justify-between px-3 text-[12px] font-normal focus:ring-0",
              "border-input hover:bg-accent/50 shadow-sm transition-all disabled:opacity-50",
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {value.length > 0 ? (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 h-5 px-1.5 text-[10px] font-bold"
                  >
                    {value.length}
                  </Badge>
                  <span className="text-foreground/80 truncate font-medium">городов выбрано ({countryLabel})</span>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  {countryCode ? "Выберите города..." : "Сначала выберите страну"}
                </span>
              )}
            </div>
            <ChevronsUpDownIcon className="text-muted-foreground/50 h-3.5 w-3.5 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-muted/40 w-(--radix-popper-anchor-width) overflow-hidden p-0 shadow-xl"
          align="start"
        >
          <Command className="flex h-full max-h-75 flex-col">
            <CommandInput placeholder="Поиск города..." className="h-8 text-[12px]" />

            <CommandList className="max-h-none overflow-hidden">
              <CommandEmpty className="text-muted-foreground py-2 text-center text-[11px]">
                Город не найден
              </CommandEmpty>

              <ScrollArea className="h-62.5" onWheel={(e) => e.stopPropagation()}>
                <CommandGroup className="p-1">
                  {availableCities.map((city) => (
                    <CommandItem
                      key={city.code}
                      value={city.label}
                      onSelect={() => toggleSelection(city.code)}
                      className="cursor-pointer rounded-md text-[12px]"
                    >
                      <div className="flex w-full items-center gap-2">
                        <div
                          className={cn(
                            "border-primary/20 flex h-4 w-4 items-center justify-center rounded border transition-colors",
                            value.includes(city.code) ? "bg-primary text-primary-foreground" : "bg-transparent",
                          )}
                        >
                          {value.includes(city.code) && <CheckIcon size={10} strokeWidth={3} />}
                        </div>
                        <span className="truncate">{city.label}</span>
                        <span className="text-muted-foreground ml-auto text-[10px] uppercase opacity-40">
                          {city.code}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
