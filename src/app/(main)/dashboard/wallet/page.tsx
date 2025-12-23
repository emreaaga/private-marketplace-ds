"use client";

import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { data, transactionColumns } from "./_components/transactions-columns";
import { TransactionsMobileList } from "./_components/transactions-mobile-list";
import WalletHeader from "./_components/wallet-header";

export default function WalletPage() {
  const isMobile = useMediaQuery("(max-width: 640px)");

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
