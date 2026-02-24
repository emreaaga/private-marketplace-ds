"use client";

import Link from "next/link";

import { Building2, Users, Package, HandCoins, PlusCircle, ArrowRightLeft, BarChart3, History } from "lucide-react";

import { useDashboardStats } from "@/features/dashboard/queries/use-dashboard-stats";
import { Button } from "@/shared/ui/atoms/button";
import { formatMoney } from "@/shared/ui/molecules/format-money";

import ActivityItem from "./_components/activity-item";
import { activities } from "./_components/fake-activities";
import { StatCard } from "./_components/stat-card";

export default function MainPage() {
  const { data, isLoading } = useDashboardStats();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Активные почты" icon={Building2} value={data?.totalPostal ?? 0} isLoading={isLoading} />
        <StatCard label="Пользователи" icon={Users} value={data?.totalUsers ?? 0} isLoading={isLoading} />
        <StatCard
          label="Ожидаемые отправки"
          icon={Package}
          value={data?.expectedShipments ?? 0}
          isLoading={isLoading}
        />
        <StatCard
          label="Ожидаемая оплата"
          icon={HandCoins}
          value={data ? formatMoney(data.expectedPayment) : "0"}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-background rounded-2xl border p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground/80 flex items-center gap-2 text-sm font-semibold">
              <History className="text-muted-foreground h-4 w-4" />
              История действий
            </h2>
          </div>
          <div className="space-y-2">
            {activities.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-background rounded-2xl border p-4 shadow-sm">
            <h2 className="text-foreground/80 mb-4 text-sm font-semibold">Быстрые действия</h2>
            <div className="flex flex-col gap-2">
              <Button asChild className="justify-start shadow-sm" variant="default">
                <Link href="/dashboard/test/flights">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Создать рейс
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/dashboard/wallet">
                  <ArrowRightLeft className="text-muted-foreground mr-2 h-4 w-4" />
                  Внутренний перевод
                </Link>
              </Button>
              <Button variant="outline" className="justify-start">
                <BarChart3 className="text-muted-foreground mr-2 h-4 w-4" />
                Финансовый отчет
              </Button>
            </div>
          </div>

          <div className="bg-muted/30 dark:bg-muted/10 rounded-2xl border p-4">
            <h3 className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Вес рейсов за этот месяц
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">0. 00</span>
              <span className="text-muted-foreground text-sm font-medium">кг</span>
            </div>
            <div className="bg-border mt-3 h-1 w-full overflow-hidden rounded-full">
              <div className="bg-foreground/20 h-full w-[65%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
