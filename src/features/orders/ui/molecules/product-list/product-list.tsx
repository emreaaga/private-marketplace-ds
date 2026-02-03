"use client";

import * as React from "react";

import { Plus } from "lucide-react";

import type { ItemCreateForm } from "@/shared/types/order/item/item-create.form";
import { EMPTY_ITEM_CREATE_FORM } from "@/shared/types/order/item/item-create.form.empty";
import type { ItemUI } from "@/shared/types/order/item/item-ui";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { ItemCreateRow } from "./item-create-row";
import { ProductRow } from "./product-row";
import { Totals } from "./totals";
import { normalizeMoneyString, toInt, toMoney } from "./utils";

type EntryRow = {
  id: string;
  value: ItemCreateForm;
};

type Props = {
  items: ItemUI[];
  onItemsChange: (next: ItemUI[]) => void;
};

function makeUiId() {
  return crypto.randomUUID();
}
function makeEntryId() {
  return crypto.randomUUID();
}

export function ProductList({ items, onItemsChange }: Props) {
  const initialId = React.useMemo(() => makeEntryId(), []);

  const [entryRows, setEntryRows] = React.useState<EntryRow[]>([{ id: initialId, value: EMPTY_ITEM_CREATE_FORM }]);

  const [focusEntryId, setFocusEntryId] = React.useState<string | null>(initialId);

  const totalQuantity = React.useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  const totalPrice = React.useMemo(() => items.reduce((s, i) => s + toMoney(i.unit_price, 0) * i.quantity, 0), [items]);

  const removeItem = (ui_id: string) => onItemsChange(items.filter((i) => i.ui_id !== ui_id));

  const changeQuantity = (ui_id: string, delta: number) => {
    onItemsChange(items.map((i) => (i.ui_id === ui_id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));
  };

  const addEntryRow = () => {
    const id = makeEntryId();
    setEntryRows((prev) => [...prev, { id, value: EMPTY_ITEM_CREATE_FORM }]);
    setFocusEntryId(id);
  };

  const updateEntryRow = (id: string, patch: Partial<ItemCreateForm>) => {
    setEntryRows((prev) => prev.map((r) => (r.id === id ? { ...r, value: { ...r.value, ...patch } } : r)));
  };

  const removeEntryRow = (id: string) => {
    setEntryRows((prev) => prev.filter((r) => r.id !== id));
    setFocusEntryId((cur) => (cur === id ? null : cur));
  };

  const autoCommitEntryRow = (id: string) => {
    const row = entryRows.find((r) => r.id === id);
    if (!row) return;

    const name = row.value.name.trim();
    const qtyRaw = row.value.quantity.trim();
    const priceRaw = row.value.unit_price.trim();

    if (!name || !qtyRaw || !priceRaw) return;

    const quantity = Math.max(1, toInt(qtyRaw, 1));
    const unit_price = normalizeMoneyString(priceRaw);

    const next: ItemUI = {
      ui_id: makeUiId(),
      name,
      category: row.value.category,
      quantity,
      unit_price,
    };

    onItemsChange([...items, next]);

    setEntryRows((prev) => prev.map((r) => (r.id === id ? { ...r, value: EMPTY_ITEM_CREATE_FORM } : r)));
    setFocusEntryId(id);
  };

  const startIndex = 1;
  const entryStartIndex = startIndex + items.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="rounded-md border">
        <div className="bg-muted/30 grid grid-cols-[28px_1fr_92px_110px_110px] items-center gap-1 border-b px-2 py-1 text-[11px] font-medium">
          <div className="flex justify-center">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-6 w-6"
              onClick={addEntryRow}
              title="Добавить строку"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          <span className="text-muted-foreground">Товар</span>
          <span className="text-muted-foreground text-right">Цена</span>
          <span className="text-muted-foreground text-right">Кол-во</span>
          <span className="text-muted-foreground text-right">Сумма</span>
        </div>

        <ScrollArea className="h-[360px]">
          <div className="divide-y">
            {items.map((it, idx) => (
              <ProductRow
                key={it.ui_id}
                index={startIndex + idx}
                item={it}
                onChangeQuantity={(delta) => changeQuantity(it.ui_id, delta)}
                onRemove={() => removeItem(it.ui_id)}
              />
            ))}

            {entryRows.map((r, idx) => (
              <ItemCreateRow
                key={r.id}
                index={entryStartIndex + idx}
                value={r.value}
                onChange={(patch) => updateEntryRow(r.id, patch)}
                onAutoCommit={() => autoCommitEntryRow(r.id)}
                onRemove={() => removeEntryRow(r.id)}
                autoFocus={focusEntryId === r.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <Totals totalQuantity={totalQuantity} totalPrice={totalPrice} />
    </div>
  );
}
