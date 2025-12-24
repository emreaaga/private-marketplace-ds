import { Users, Store, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import ActivityItem from "./_components/activity-item";
import { activities } from "./_components/fake-activities";
import { StatCard } from "./_components/stat-card";

export default function MainPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Продавцы" value={42} icon={Store} subtitle="активные" />
        <StatCard label="Клиенты" value={318} icon={Users} subtitle="зарегистрированы" />
        <StatCard label="Заказы" value={128} icon={ShoppingCart} subtitle="за сегодня" />
        <StatCard label="Оборот" value="$84,500" icon={TrendingUp} subtitle="за месяц" />
        <StatCard label="Проблемы" value={5} icon={AlertTriangle} subtitle="требуют внимания" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-background rounded-2xl border p-4">
          <h2 className="text-sm font-semibold">Последняя активность</h2>

          <div className="mt-4 space-y-2">
            {activities.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>
        </div>

        <div className="bg-background rounded-2xl border p-4">
          <h2 className="flex items-center justify-between text-sm font-semibold">
            Последняя активность
            <Button variant="ghost" size="sm" className="text-xs">
              Смотреть всё
            </Button>
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" className="justify-start">
              <Store className="mr-2 h-4 w-4" />
              Управление продавцами
            </Button>

            <Button variant="outline" className="justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Модерация заказов
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
