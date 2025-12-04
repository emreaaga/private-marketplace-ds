import { ShoppingCart, ShoppingCartIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Toggle } from "@/shared/ui/atoms/toggle";

export function AddToCartToggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Toggle
      pressed={checked}
      onPressedChange={onChange}
      aria-label="Добавить в корзину"
      size="sm"
      className={cn(
        "rounded-full bg-white/90 shadow backdrop-blur transition-all",
        "active:scale-95",
        "data-[state=on]:bg-emerald-600 data-[state=on]:text-white",
      )}
    >
      {checked ? <ShoppingCartIcon className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4 text-gray-800" />}
    </Toggle>
  );
}
