import { Button } from "@/shared/ui/atoms/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/ui/atoms/card";

interface CartItem {
  price: number;
  quantity: number;
}

export function CartSummary({ items }: { items: CartItem[] }) {
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Card className="w-full rounded-3xl shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Итог заказа</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="text-muted-foreground flex items-center justify-between">
          <span>Товары, {count} шт.</span>
          <span>{total}$</span>
        </div>

        <div className="bg-border h-px" />

        <div className="flex items-end justify-between">
          <span className="text-lg font-semibold">Итого</span>
          <span className="text-2xl font-bold tracking-tight">{total}$</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button size="lg" className="w-full rounded-2xl py-5 text-base font-semibold">
          Подтвердить заказ
        </Button>
      </CardFooter>
    </Card>
  );
}
