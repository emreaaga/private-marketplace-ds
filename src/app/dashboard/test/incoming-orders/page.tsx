import { ArrowDownLeft, Construction } from "lucide-react";

export default function IncomingOrdersPage() {
  return (
    <div className="border-border/40 bg-muted/5 hover:bg-muted/10 flex min-h-100 flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="bg-primary/5 absolute inset-0 animate-pulse rounded-full" />

        <div className="bg-background border-border/50 relative flex h-16 w-16 items-center justify-center rounded-full border shadow-sm">
          <ArrowDownLeft className="text-primary/60 h-8 w-8" strokeWidth={1.5} />
        </div>

        <div className="bg-background border-border/50 absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border shadow-sm">
          <Construction className="h-3 w-3 text-orange-500/70" />
        </div>
      </div>

      <div className="max-w-[320px] space-y-1.5">
        <h2 className="text-foreground/90 text-sm font-bold tracking-[0.15em] uppercase">Входящие заказы</h2>

        <p className="text-muted-foreground/50 text-[13px] leading-snug">
          Здесь будут видны входящие заказы и приемка грузов.
        </p>

        <div className="flex items-center justify-center gap-1.5 pt-3">
          <div className="bg-primary/30 h-1 w-8 rounded-full" />
          <div className="bg-muted h-1 w-2 rounded-full" />
        </div>
      </div>
    </div>
  );
}
