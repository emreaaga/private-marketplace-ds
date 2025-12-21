import { Users, Store, ShoppingCart, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";

import { AdminHeader } from "@/features/admin/ui/organisms/admin-header";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/shared/ui/atoms/item";

import { StatCard } from "./stat-card";

export default function MainPage() {
  return (
    <div className="space-y-6">
      <AdminHeader />

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
            <ActivityItem title="Новый продавец" description="A001 зарегистрирован" badge="Новый" icon={Users} />
            <ActivityItem
              title="Заказ на модерации"
              description="A001P10001 ожидает подтверждения"
              badge="Внимание"
              tone="warning"
              icon={ShoppingCart}
            />
            <ActivityItem
              title="Жалоба клиента"
              description="Client B1001 — спор по заказу"
              badge="Критично"
              tone="danger"
              icon={AlertTriangle}
            />
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

const TONE_STYLES = {
  default: "bg-muted text-muted-foreground",
  warning: "bg-yellow-500/15 text-yellow-700",
  danger: "bg-red-500/15 text-red-700",
};

function ActivityItem({
  title,
  description,
  badge,
  tone = "default",
  icon: Icon,
}: {
  title: string;
  description: string;
  badge: string;
  tone?: "default" | "warning" | "danger";
  icon: React.ElementType;
}) {
  return (
    <Item variant="outline" size="sm" className="hover:bg-muted/40 cursor-pointer transition">
      <div className="flex items-start gap-3">
        <div className="bg-muted text-muted-foreground mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg">
          <Icon className="h-4 w-4" />
        </div>

        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </div>

      <ItemActions>
        <Badge variant="secondary" className={TONE_STYLES[tone]}>
          {badge}
        </Badge>
        <ChevronRight className="text-muted-foreground h-4 w-4" />
      </ItemActions>
    </Item>
  );
}
