export function LoadingPlaceholder({ label = "Загрузка интерфейса…" }: { label?: string }) {
  return (
    <div className="bg-muted/30 flex items-center justify-center rounded-md border py-8">
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
