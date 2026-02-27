"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { TrendingUp, TrendingDown, Receipt, Wallet, Package } from "lucide-react";

import { useFlightExpensesList } from "@/features/flight-expenses/queries/use-flight-expenses-list";
import { useFlightSummary } from "@/features/flights/queries/use-flight-summary";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../../main/_components/stat-card";

import { flightExpensesColumns } from "./_components/flight-expenses-columns";

// eslint-disable-next-line complexity
export default function FlightFinancePage() {
  const { id } = useParams();
  const flight_id = Number(id);
  const [page, setPage] = useState(1);

  const { data: summary, isLoading: isSummaryLoading } = useFlightSummary(flight_id);
  const { data, isLoading: isTableLoading } = useFlightExpensesList({ flight_id, page });

  const expenses = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-6">
        <StatCard
          label="Общ. вес"
          value={formatWeight(summary?.total_weight)}
          icon={Package}
          isLoading={isSummaryLoading}
        />

        <StatCard label="Общ. сумма" value={formatMoney(summary?.revenue)} icon={Wallet} isLoading={isSummaryLoading} />
        <StatCard
          label="Взнос"
          value={formatMoney(summary?.total_prepaid)}
          icon={Wallet}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Остаток"
          value={formatMoney(summary?.total_remaining)}
          icon={Receipt}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Расход"
          value={formatMoney(summary?.total_expenses)}
          icon={TrendingDown}
          variant="default"
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Прибыль"
          value={formatMoney(summary?.total_profit)}
          icon={TrendingUp}
          variant={Number(summary?.total_profit) >= 0 ? "success" : "danger"}
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
