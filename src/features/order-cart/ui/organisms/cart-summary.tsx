import { Button } from "@/shared/ui/atoms/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/ui/atoms/card";

export function CartSummary() {
  return (
    <Card className="w-full rounded-3xl shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Итог заказа</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="text-muted-foreground flex items-center justify-between">
          <span>Товары, 10 шт.</span>
          <span>$245</span>
        </div>

        <div className="bg-border h-px" />

        <div className="flex items-end justify-between">
          <span className="text-lg font-semibold">Итого</span>
          <span className="text-2xl font-bold tracking-tight">$245</span>
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
