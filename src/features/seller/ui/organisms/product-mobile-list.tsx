import type { ProductRow } from "../../fake-products";

import { ProductMobileCard } from "./product-mobile-card";

interface Props {
  data: ProductRow[];
}

export function ProductsMobileList({ data }: Props) {
  if (!data.length) {
    return (
      <div className="text-muted-foreground rounded-md border border-dashed p-6 text-center text-sm">Товаров нет</div>
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border md:hidden">
      <div className="divide-border divide-y">
        {data.map((product) => (
          <ProductMobileCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
