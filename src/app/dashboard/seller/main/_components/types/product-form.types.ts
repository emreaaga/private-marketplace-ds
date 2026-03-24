export interface SizeWithQuantity {
  size: string;
  quantity: number;
}

export type ProductFormValues = {
  name: string;
  category: string;
  sub_category: string;
  category_type: string;

  series: number | undefined;
  count_of_series: number | undefined;
  price: number | undefined;

  quantity: number;
  total_amount: number;

  unit: string;
  photo_url: string;

  subcategory: string;
  type: string;
  details: string;
  unit_details: string;
  sizes: SizeWithQuantity[];
};

export const productFormDefaultValues: ProductFormValues = {
  name: "",
  category: "",
  sub_category: "",
  category_type: "",

  series: undefined,
  count_of_series: undefined,
  price: undefined,

  quantity: 0,
  total_amount: 0,

  unit: "",
  photo_url: "",

  subcategory: "",
  type: "",
  details: "",
  unit_details: "",
  sizes: [],
};
