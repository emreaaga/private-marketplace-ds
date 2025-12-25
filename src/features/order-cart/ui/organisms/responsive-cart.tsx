import dynamic from "next/dynamic";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ListSkeleton } from "@/shared/ui/molecules/list-skeleton";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

const CartTable = dynamic(() => import("../organisms/cart-table").then((m) => m.CartTable), {
  ssr: false,
  loading: () => <TableSkeleton rows={5} columns={4} />,
});

const CartList = dynamic(() => import("./cart-list").then((m) => m.CartList), {
  ssr: false,
  loading: () => <ListSkeleton rows={6} />,
});

export function ResponsiveCart({ items }: any) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder />;
  }

  return isMobile ? <CartList items={items} /> : <CartTable items={items} />;
}
