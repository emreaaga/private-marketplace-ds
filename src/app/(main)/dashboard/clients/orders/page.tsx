import { fakeOrders } from "@/features/orders/fake-orders";
import type { Order } from "@/features/orders/types/order.types";
import { OrdersMain } from "@/features/orders/ui/organisms/sections/orders-main";

export default function ProductsOrdersPage() {
  const orders: Order[] = fakeOrders;

  return <OrdersMain orders={orders} />;
}
