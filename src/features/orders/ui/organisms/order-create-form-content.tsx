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
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-white p-4">
        <aside className="custom-scrollbar w-110 shrink-0 space-y-6 overflow-y-auto pr-2">
          <PartyForm
            title="Отправитель"
            value={state.sender}
            onChange={(p) => actions.setSender((s) => ({ ...s, ...p }))}
          />
          <PartyForm
            title="Получатель"
            value={state.receiver}
            onChange={(p) => actions.setReceiver((r) => ({ ...r, ...p }))}
          />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="border-muted/20 flex-1 overflow-hidden rounded-xl border">
            <ProductList items={state.items} onChange={actions.setItems} />
          </div>

          <div className="border-muted/20 overflow-hidden">
            <PartiesSummary value={state.summary} onChange={(p) => actions.setSummary((s) => ({ ...s, ...p }))} />
          </div>
        </main>
      </div>

      <div className="bg-background shrink-0 border-t px-4 py-2">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={isPending}>
            Отмена
          </Button>
          <Button size="sm" onClick={actions.handleCreate} disabled={isPending} className="min-w-[140px]">
            {isPending ? "Сохранение..." : "Создать заказ"}
          </Button>
        </div>
      </div>
    </div>
  );
}
