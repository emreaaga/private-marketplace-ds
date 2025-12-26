import Image from "next/image";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { CountBadge } from "@/shared/ui/atoms/count-badge";

import type { ProductRow } from "../../fake-products";

interface Props {
  product: ProductRow;
}

export function ProductMobileCard({ product }: Props) {
  const unitsPerSeries = product.sizes.reduce((sum, s) => sum + s.quantity, 0);

  const planTotal = product.count_of_series * unitsPerSeries * product.price;

  const remainingSeries = product.count_of_series - product.sold_series;

  const remainingTotal = remainingSeries * unitsPerSeries * product.price;

  const remainingColor =
    remainingSeries <= 1 ? "text-red-600" : remainingSeries <= 3 ? "text-yellow-600" : "text-green-600";

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Image
        src={product.photo_url}
        alt={product.sub_category}
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-medium">{product.sub_category}</span>
          <CountBadge value={product.sizes.length} />
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-[11px]">
          <span className="shrink-0 font-mono">{product.id}</span>
          <span>•</span>
          <span>
            {product.sold_series}/{product.count_of_series} серий
          </span>
        </div>
      </div>

      <div className="shrink-0 text-right leading-tight">
        <div className="text-xs font-medium">${planTotal}</div>
        <div className={`text-[10px] ${remainingColor}`}>${remainingTotal}</div>
      </div>

      <Button variant="ghost" size="icon" className="text-muted-foreground h-7 w-7 shrink-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}
