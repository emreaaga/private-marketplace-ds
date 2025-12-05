import type { CategoryKey } from "./product-categories";

export type ProductAttributes = Record<string, any>;

export const productFormDefaultValues = {
  name: "",
  category: "" as CategoryKey | "",
  unit: "",
  quantity: "",
  price: "",
  comment: "",
  is_public: false,
  photo_url: "",
  attributes: {} as ProductAttributes,
};

export type ProductFormValues = typeof productFormDefaultValues;
