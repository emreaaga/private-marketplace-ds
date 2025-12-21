import { ReactNode } from "react";

import { ProductsHeader } from "@/features/products/ui/organisms/sections/products-header";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <ProductsHeader />
      {children}
    </div>
  );
}
