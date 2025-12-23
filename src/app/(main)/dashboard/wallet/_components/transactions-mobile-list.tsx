import { TransactionCard } from "./transaction-card";
import { Transaction } from "./transactions-columns";

interface Props {
  data: Transaction[];
}

export function TransactionsMobileList({ data }: Props) {
  if (!data.length) {
    return (
      <div className="text-muted-foreground rounded-md border border-dashed p-6 text-center text-sm">
        Транзакций нет
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((tx) => (
        <TransactionCard key={tx.id} tx={tx} />
      ))}
    </div>
  );
}
