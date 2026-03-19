export const FORM_FIELD_STYLES = {
  // Базовые стили для плавных переходов
  base: "transition-all duration-200",

  // Когда поле изменено (Dirty)
  dirty: "border-yellow-400 focus:ring-yellow-400/20 focus-visible:ring-yellow-400/20",

  // Когда в поле ошибка
  error: "border-destructive focus:ring-destructive/20 focus-visible:ring-destructive/20",

  // Обычное состояние (по умолчанию)
  default: "border-input",
} as const;

/**
 * Утилита для получения нужного класса границы в зависимости от состояния
 */
export const getFieldStatusClass = (hasError?: boolean, isDirty?: boolean) => {
  if (hasError) return FORM_FIELD_STYLES.error;
  if (isDirty) return FORM_FIELD_STYLES.dirty;
  return "";
};
