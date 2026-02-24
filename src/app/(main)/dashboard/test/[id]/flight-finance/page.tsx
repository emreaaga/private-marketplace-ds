"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { TrendingUp, TrendingDown, Receipt, Wallet, Package } from "lucide-react";

import { useFlightExpensesList } from "@/features/flight-expenses/queries/use-flight-expenses-list";
import { useFlightSummary } from "@/features/flights/queries/use-flight-summary";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../../main/_components/stat-card";

import { flightExpensesColumns } from "./_components/flight-expenses-columns";

// eslint-disable-next-line complexity
export default function FlightFinancePage() {
  const { id } = useParams();
  const flight_id = Number(id);
  const [page, setPage] = useState(1);

  const { data: summary, isLoading: isSummaryLoading } = useFlightSummary(flight_id);

  const { data, isLoading: isTableLoading } = useFlightExpensesList({
    flight_id,
    page,
  });

  const expenses = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-6">
        <StatCard
          label="Общ. вес"
          value={`${summary?.total_weight ?? "0.00"} кг`}
          icon={Package}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Общ. сумма"
          value={`$${summary?.revenue ?? "0.00"}`}
          icon={Wallet}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Предоплата"
          value={`$${summary?.total_prepaid ?? "0.00"}`}
          icon={Wallet}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Остаток"
          value={`$${summary?.total_remaining ?? "0.00"}`}
          icon={Receipt}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Расход"
          value={`$${summary?.total_expenses ?? "0.00"}`}
          icon={TrendingDown}
          variant="default"
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Прибыль"
          value={`$${summary?.total_profit ?? "0.00"}`}
          icon={TrendingUp}
          variant="default"
          isLoading={isSummaryLoading}
        />
      </div>

      <DataTable
        columns={flightExpensesColumns}
        data={expenses}
        emptyMessage={isTableLoading ? "Загрузка..." : "Нет данных"}
        serverPagination={{
          page,
          pageCount,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
