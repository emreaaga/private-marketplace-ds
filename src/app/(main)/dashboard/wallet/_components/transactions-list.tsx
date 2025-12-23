import { Badge } from "@/shared/ui/atoms/badge";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: string;
}

export function TransactionsList({ items }: { items: Transaction[] }) {
  return (
    <div className="space-y-2">
      {items.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {tx.type === "deposit" ? "Пополнение" : tx.type === "withdrawal" ? "Вывод" : "Оплата"}
            </span>
            <span className="text-muted-foreground text-xs">{tx.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-medium ${tx.amount > 0 ? "text-emerald-600" : ""}`}>
              {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
            </span>

            {tx.status === "pending" && (
              <Badge variant="secondary" className="text-[10px]">
                В обработке
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
