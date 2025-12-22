import { useState } from "react";

import { Heart, ShoppingCart, Check } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Toggle } from "@/shared/ui/atoms/toggle";

interface Props {
  quantity: number;
}

export function ProductActionBar({ quantity }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t bg-white px-4 py-4 shadow-xl">
      <div className="flex items-center gap-3">
        <Toggle
          pressed={isFavorite}
          onPressedChange={setIsFavorite}
          variant="outline"
          className="h-11 w-11 rounded-xl border-gray-300 bg-white hover:bg-gray-100 data-[state=on]:bg-gray-100"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-gray-800 stroke-gray-800" : "stroke-gray-600"}`} />
        </Toggle>

        <Button
          disabled={quantity === 0}
          onClick={() => setInCart(true)}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:bg-gray-100"
        >
          {inCart ? (
            <>
              <Check className="h-5 w-5 text-emerald-600" />В корзине
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              Добавить в корзину
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
