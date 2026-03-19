import { getServerSession } from "@/entities/session/server";
import OrdersClient from "@/pages/orders";

export default async function Page() {
  const user = await getServerSession();

  return <OrdersClient user={user} />;
}
