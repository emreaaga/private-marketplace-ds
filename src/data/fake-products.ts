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

export const fakeProducts: Product[] = [
  {
    id: 1,
    name: "Сумка",
    category: "Одежда",
    unit: "Серия",
    quantity: 500,
    price: 8,
    photo_url: "/products-photo/bag.jpg",
    is_public: false,
  },
  {
    id: 2,
    name: "Одежда",
    category: "Одежда",
    unit: "Серия",
    quantity: 300,
    price: 12,
    photo_url: "/products-photo/clothes.jpg",
    is_public: false,
  },
  {
    id: 3,
    name: "Пальто",
    category: "Одежда",
    unit: "Серия",
    quantity: 240,
    price: 3,
    photo_url: "/products-photo/coat.jpg",
    is_public: false,
  },
  {
    id: 4,
    name: "Двойка",
    category: "Одежда",
    unit: "Серия",
    quantity: 240,
    price: 3,
    photo_url: "/products-photo/dvoyka.jpg",
    is_public: false,
  },
  {
    id: 5,
    name: "Платье",
    category: "Одежда",
    unit: "Серия",
    quantity: 240,
    price: 3,
    photo_url: "/products-photo/platye.jpg",
    is_public: false,
  },
];
