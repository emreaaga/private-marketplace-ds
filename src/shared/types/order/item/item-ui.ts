import type { ItemCreateDTO } from "@/shared/types/order/item/item-create.dto";

/**
 * UI-модель позиции товара.
 * Используется только на клиенте для списка.
 * Никогда не уходит на сервер.
 */
export type ItemUI = ItemCreateDTO & {
  ui_id: string;
};
