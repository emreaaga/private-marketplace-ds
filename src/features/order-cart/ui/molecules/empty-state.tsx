export function EmptyState() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-lg font-semibold">Корзина пустая</p>
      <p className="text-muted-foreground mt-1 text-sm">Добавьте товары, чтобы оформить заказ</p>
    </div>
  );
}
