import type { CategorySchema } from "./product-attributes";

export const PRODUCT_CATEGORIES = {
  clothing: {
    label: "Одежда",
    units: ["шт"],
    attributes: {
      size: {
        type: "select",
        label: "Размер",
        options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        required: true,
      },
      color: {
        type: "select",
        label: "Цвет",
        options: ["Белый", "Черный", "Синий", "Красный", "Зеленый", "Серый", "Другой"],
      },
      brand: {
        type: "text",
        label: "Бренд",
      },
      sex: {
        type: "select",
        label: "Для кого",
        options: ["Мужское", "Женское", "Унисекс", "Детское"],
      },
      season: {
        type: "select",
        label: "Сезон",
        options: ["Зима", "Весна", "Лето", "Осень", "Круглый год"],
      },
      material: {
        type: "text",
        label: "Материал",
      },
    },
  },
  shoes: {
    label: "Обувь",
    units: ["пара"],
    attributes: {
      size: {
        type: "select",
        label: "Размер",
        options: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
        required: true,
      },
      color: {
        type: "select",
        label: "Цвет",
        options: ["Белый", "Черный", "Коричневый", "Синий", "Другой"],
      },
      brand: {
        type: "text",
        label: "Бренд",
      },
      material: {
        type: "select",
        label: "Материал",
        options: ["Кожа", "Эко-кожа", "Текстиль", "Резина", "Комбинированный"],
      },
    },
  },
  food: {
    label: "Продукты питания",
    units: ["кг", "г", "л", "мл", "шт"],
    attributes: {
      expiryDate: {
        type: "date",
        label: "Срок годности",
      },
      batch: {
        type: "text",
        label: "Партия/Серия",
      },
      brand: {
        type: "text",
        label: "Бренд",
      },
      organic: {
        type: "boolean",
        label: "Органический продукт",
      },
    },
  },
} satisfies Record<string, CategorySchema>;

export type CategoryKey = keyof typeof PRODUCT_CATEGORIES;
