"use client";

import { useState } from "react";

import { Check, Plus, Trash2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/atoms/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

const UZ_CODES = [
  { code: "TAS", name: "Ташкент" },
  { code: "SKD", name: "Самарканд" },
  { code: "NVI", name: "Навои" },
  { code: "FEG", name: "Фергана" },
  { code: "UGC", name: "Ургенч" },
];

export function DemoRouteBuilder() {
  const [points, setPoints] = useState([{ id: 1, code: "TAS" }]);
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const addPoint = () => {
    setPoints((prev) => [...prev, { id: Date.now(), code: "" }]);
  };

  const removePoint = (id: number) => {
    if (points.length <= 1) return;
    setPoints(points.filter((p) => p.id !== id));
  };

  const updatePoint = (id: number, code: string) => {
    setPoints(points.map((p) => (p.id === id ? { ...p, code } : p)));
    setOpenStates((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="flex h-full flex-col bg-white font-sans antialiased">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/80 px-4 py-2 backdrop-blur-md">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-md border-zinc-200 bg-white text-zinc-950 shadow-sm hover:bg-zinc-50 active:scale-95"
          onClick={addPoint}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex w-min flex-col items-center">
          {points.map((point, index) => {
            const isLast = index === points.length - 1;
            const hasCode = Boolean(point.code);
            const isOpen = openStates[point.id] || false;

            return (
              <div key={point.id} className="flex flex-col items-center">
                <div className="group relative flex items-center">
                  <div className="absolute -left-8 opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <button
                      type="button"
                      className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
                      onClick={() => removePoint(point.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  <Popover
                    open={isOpen}
                    onOpenChange={(open) => setOpenStates((prev) => ({ ...prev, [point.id]: open }))}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex h-7 w-12 items-center justify-center rounded-md border text-[10px] font-semibold transition-all duration-200 focus:outline-none",
                          hasCode
                            ? "border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-zinc-800"
                            : "border-dashed border-zinc-300 text-zinc-400 hover:border-zinc-400 hover:bg-zinc-50",
                          isOpen && "border-zinc-950 ring-1 ring-zinc-950 ring-offset-0",
                        )}
                      >
                        {hasCode ? point.code : <Plus className="h-3 w-3" />}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-44 border-zinc-200 p-0 shadow-xl"
                      align="start"
                      side="right"
                      sideOffset={12}
                    >
                      <Command className="rounded-lg">
                        <CommandInput placeholder="Search..." className="h-8 border-none text-xs focus:ring-0" />
                        <CommandList className="border-t border-zinc-100">
                          <CommandEmpty className="px-3 py-2 text-[10px] text-zinc-500">No results</CommandEmpty>
                          <CommandGroup>
                            {UZ_CODES.map((c) => (
                              <CommandItem
                                key={c.code}
                                value={`${c.code} ${c.name}`}
                                onSelect={() => updatePoint(point.id, c.code)}
                                className="flex cursor-pointer items-center justify-between px-3 py-1.5 text-[11px] hover:bg-zinc-50"
                              >
                                <span className="font-medium text-zinc-700">{c.name}</span>
                                <span className="text-[9px] tracking-tighter text-zinc-400 uppercase">{c.code}</span>
                                {point.code === c.code && <Check className="ml-2 h-3 w-3 text-zinc-950" />}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Еле заметная линия */}
                {!isLast && <div className="h-3 w-px bg-zinc-100" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
