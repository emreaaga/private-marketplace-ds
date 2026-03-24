import { DataTable } from "@/widgets/data-table/ui/data-table";

import { FakeTransactions } from "./_components/fake-transactions";
import { transactionColumns } from "./_components/transactions-columns";
import WalletHeader from "./_components/wallet-header";

export default function WalletPage() {
  return (
    <div className="space-y-4">
      <WalletHeader />
      <DataTable columns={transactionColumns} data={FakeTransactions} emptyMessage="Транзакций нет" />
    </div>
  );
}
