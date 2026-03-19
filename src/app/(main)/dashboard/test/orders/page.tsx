export const dynamic = "force-dynamic"; // <--- ВОТ ЭТА СТРОКА

import { getServerSession } from "@/entities/session/server";
import OrdersPage from "@/pages/orders";

export default async function Page() {
  const user = await getServerSession();
  return <OrdersPage initialUser={user} />;
}
