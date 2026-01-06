import { FakeTransactions } from "./_components/fake-transactions";
import { transactionColumns } from "./_components/transactions-columns";
import { TransactionsResponsive } from "./_components/transactions-responsive";
import WalletHeader from "./_components/wallet-header";

export default function WalletPage() {
  return (
    <div className="space-y-4">
      <WalletHeader />
      <TransactionsResponsive data={FakeTransactions} columns={transactionColumns} />
    </div>
  );
}
