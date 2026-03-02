"use client";

import { Button } from "@/shared/ui/atoms/button";

import { PartiesSummary } from "./parties-summary";
import { PartyForm } from "./party-form";
import { ProductList } from "./product-list";
import { useOrderCreateForm } from "./use-order-create-form";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export function OrderCreateFormContent({ onSuccess, onCancel }: Props) {
  const { state, actions, isPending } = useOrderCreateForm(onSuccess);

  return (
    <div className="bg-background flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-0 overflow-hidden px-0">
        <aside className="custom-scrollbar border-border/40 bg-muted/5 w-90 shrink-0 overflow-y-auto border-r p-6">
          <div className="space-y-8">
            <PartyForm
              title="Отправитель"
              value={state.sender}
              onChange={(p) => actions.setSender((s) => ({ ...s, ...p }))}
            />
            <div className="from-border/60 h-px w-full bg-linear-to-r to-transparent" />
            <PartyForm
              title="Получатель"
              value={state.receiver}
              onChange={(p) => actions.setReceiver((r) => ({ ...r, ...p }))}
            />
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-6">
          <div className="border-border/40 bg-background flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex-1 overflow-hidden">
              <ProductList items={state.items} onChange={actions.setItems} />
            </div>
          </div>

          <div className="mt-4 px-2">
            <PartiesSummary value={state.summary} onChange={(p) => actions.setSummary((s) => ({ ...s, ...p }))} />
          </div>
        </main>
      </div>

      <footer className="bg-background border-border/40 shrink-0 border-t px-6 py-4">
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
            className="border-border/40 hover:bg-muted h-8 rounded-lg px-4 text-[13px] font-medium transition-colors"
          >
            Отмена
          </Button>
          <Button
            size="sm"
            onClick={actions.handleCreate}
            disabled={isPending}
            className="bg-foreground text-background hover:bg-foreground/90 h-8 min-w-35 rounded-lg text-[13px] font-bold transition-all active:scale-[0.98]"
          >
            {isPending ? "Сохранение..." : "Создать заказ"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
