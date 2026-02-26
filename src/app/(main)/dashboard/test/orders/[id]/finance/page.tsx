"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { ArrowDownRight, DollarSign, ListChecks, Scale } from "lucide-react";

import { useOrderFinancialEvents } from "@/features/financial-events/queries/use-order-financial-events";
import { useOrderSummary } from "@/features/orders/queries/user-order-summary";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../../../main/_components/stat-card";

import { financialEventsColumns } from "./_components/financial-events-columns";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

// eslint-disable-next-line complexity
export default function OrderFinancePage() {
  const { id } = useParams();
  const orderId = Number(id);

  const [page, setPage] = useState(1);

  const { data: summary, isLoading: isLoadingSummary } = useOrderSummary(orderId);

  const { data: eventsResponse, isLoading: isLoadingEvents } = useOrderFinancialEvents(orderId, page);

  const total = summary?.total_amount ?? "0.00";
  const paid = summary?.prepaid_amount ?? "0.00";
  const balance = summary?.balance ?? "0.00";
  const isDebt = Number(balance) > 0;

  const pageCount = eventsResponse?.pagination.totalPages ?? 1;

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Итого"
          value={`$${total}`}
          icon={DollarSign}
          subtitle={`Доп. оплата: $${summary?.extra_fee ?? "0.00"}`}
          isLoading={isLoadingSummary}
        />
        <StatCard
          label="Взнос"
          value={`$${paid}`}
          icon={ListChecks}
          variant={Number(paid) > 0 ? "success" : "default"}
          isLoading={isLoadingSummary}
        />
        <StatCard
          label="Остаток"
          value={`$${balance}`}
          icon={ArrowDownRight}
          variant={isDebt ? "warning" : "success"}
          isLoading={isLoadingSummary}
        />
        <StatCard
          label="Ставка"
          value={`$${summary?.rate_per_kg ?? "0"}/кг`}
          icon={Scale}
          subtitle={`Вес: ${summary?.air_kg_price ?? "0"} кг`}
          isLoading={isLoadingSummary}
        />
      </div>

      <div>
        <DataTable
          columns={financialEventsColumns}
          data={eventsResponse?.data ?? []}
          emptyMessage={isLoadingEvents ? "Загрузка транзакций..." : "Транзакции не найдены"}
          serverPagination={{
            page,
            pageCount,
            onPageChange,
          }}
        />
      </div>
    </div>
  );
}
