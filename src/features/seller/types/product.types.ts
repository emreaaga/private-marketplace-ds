export type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  price: number;
  comment?: string;
  photo_url: string;
  is_public?: boolean;
};
