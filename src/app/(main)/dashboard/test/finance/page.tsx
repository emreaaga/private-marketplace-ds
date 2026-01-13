"use client";

import { ListChecks, DollarSign, ArrowDownRight, Scale } from "lucide-react";

import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../main/_components/stat-card";

import { FinancialEventsColumns } from "./_components/financial-event-columns";
import { getFinancialEventsStats } from "./_components/financial-events-stats";
import { MOCK_FINANCIAL_EVENTS } from "./_components/mock-finance";

export default function FinancialEventsPage() {
  const stats = getFinancialEventsStats(MOCK_FINANCIAL_EVENTS);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего операций" value={stats.totalEvents} icon={ListChecks} />

        <StatCard label="Доходы" value={`${stats.totalIncome.toFixed(2)} $`} icon={DollarSign} />

        <StatCard
          label="Расходы"
          value={`${stats.totalExpense.toFixed(2)} $`}
          icon={ArrowDownRight}
          variant="warning"
        />

        <StatCard
          label="Чистый результат"
          value={`${stats.result.toFixed(2)} $`}
          icon={Scale}
          variant={stats.result < 0 ? "danger" : "default"}
        />
      </div>

      <DataTable
        columns={FinancialEventsColumns}
        data={MOCK_FINANCIAL_EVENTS}
        emptyMessage="Финансовые события отсутствуют"
        pageSize={10}
      />
    </div>
  );
}
