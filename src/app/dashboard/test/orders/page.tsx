import { getOrders } from "@/entities/order/api-server/get-orders";
import { getServerSession } from "@/entities/session/server";
import { OrdersTableClient } from "@/widgets/orders-table";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const user = await getServerSession();

  const data = await getOrders({ page: currentPage });

  return (
    <OrdersTableClient
      initialData={data.data}
      pageCount={data.pagination.totalPages}
      currentPage={currentPage}
      user={user}
    />
  );
}
