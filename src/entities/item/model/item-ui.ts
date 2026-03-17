import type { ItemCreateDTO } from "./item-create.dto";

/**
 * UI-модель позиции товара.
 * Используется только на клиенте для списка.
 * Никогда не уходит на сервер.
 */
export type ItemUI = ItemCreateDTO & {
  ui_id: string;
};
