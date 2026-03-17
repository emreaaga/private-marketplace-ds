"use client";

import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { HeaderTabItem } from "../model/types";

interface TabsMobileProps {
  items: HeaderTabItem[];
  activeTab: string;
  onSelect: (value: string) => void;
  isPending: boolean;
}

export function TabsMobile({ items, activeTab, onSelect, isPending }: TabsMobileProps) {
  return (
    <div className="mb-4 sm:hidden">
      <Select value={activeTab} onValueChange={onSelect}>
        <SelectTrigger className="border-border/40 bg-background/50 h-10 w-full rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {items.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
