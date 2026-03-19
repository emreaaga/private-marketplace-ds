export const dynamic = "force-dynamic";

import { getServerSession } from "@/entities/session/server";
import OrdersPage from "@/pages/orders"; // Он придет уже завернутый в dynamic(ssr:false)

export default async function Page() {
  const user = await getServerSession();

  // Если юзера нет, лучше сразу здесь его отсечь (опционально)
  if (!user) {
    return <div>Доступ запрещен</div>;
  }

  return <OrdersPage initialUser={user} />;
}
