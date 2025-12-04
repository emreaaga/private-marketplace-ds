export type Product = {
  id: number;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  price: number;
  comment?: string;
  photo_url: string;
  is_public?: boolean;
};
