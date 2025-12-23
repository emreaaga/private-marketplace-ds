"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { data, transactionColumns } from "./_components/transactions-columns";
import { TransactionsMobileList } from "./_components/transactions-mobile-list";
import WalletHeader from "./_components/wallet-header";

export default function WalletPage() {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="space-y-4">
        <WalletHeader />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <WalletHeader />
      {isMobile ? (
        <TransactionsMobileList data={data} />
      ) : (
        <DataTable columns={transactionColumns} data={data} pageSize={10} emptyMessage="Транзакций нет" />
      )}
    </div>
  );
}
