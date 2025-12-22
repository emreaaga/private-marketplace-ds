import { ReactNode } from "react";

import { SellerHeader } from "@/features/seller/ui/organisms/sections/products-header";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-4">
      <SellerHeader />
      {children}
    </div>
  );
}
