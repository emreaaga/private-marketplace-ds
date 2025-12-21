export const users = [
  {
    id: "1",
    name: "Arham Khan",
    username: "Aarhamkhnz",
    email: "hello@arhamkhnz.com",
    avatar: "/avatars/arhamkhnz.png",
    role: "administrator",
  },
];

type City = {
  name: string;
  districts: string[];
};

type Country = {
  name: string;
  phoneCode: string;
  cities: Record<string, City>;
};

export const locationData: Record<string, Country> = {
  uzbekistan: {
    name: "🇺🇿 Узбекистан",
    phoneCode: "+998",
    cities: {
      tashkent: { name: "Ташкент", districts: ["Чиланзар", "Юнусабад", "Мирзо Улугбек", "Яккасарай", "Сергели"] },
      samarkand: { name: "Самарканд", districts: ["Центр", "Багишамал", "Согдиана"] },
      bukhara: { name: "Бухара", districts: ["Центр", "Каган", "Гиждуван"] },
    },
  },
  turkey: {
    name: "🇹🇷 Турция",
    phoneCode: "+90",
    cities: {
      istanbul: { name: "Стамбул", districts: ["Бешикташ", "Кадыкёй", "Фатих", "Султанахмет"] },
      ankara: { name: "Анкара", districts: ["Чанкая", "Кечиорен", "Йенимахалле"] },
      izmir: { name: "Измир", districts: ["Конак", "Карсьяка", "Борнова"] },
    },
  },
  russia: {
    name: "🇷🇺 Россия",
    phoneCode: "+7",
    cities: {
      moscow: { name: "Москва", districts: ["Центральный", "Северный", "Южный", "Западный", "Восточный"] },
      spb: { name: "Санкт-Петербург", districts: ["Центральный", "Адмиралтейский", "Василеостровский"] },
      kazan: { name: "Казань", districts: ["Вахитовский", "Советский", "Ново-Савиновский"] },
    },
  },
  china: {
    name: "🇨🇳 Китай",
    phoneCode: "+86",
    cities: {
      beijing: { name: "Пекин", districts: ["Дунчэн", "Сичэн", "Чаоян", "Хайдянь"] },
      shanghai: { name: "Шанхай", districts: ["Пудун", "Хуанпу", "Цзинъань"] },
      guangzhou: { name: "Гуанчжоу", districts: ["Юэсю", "Тяньхэ", "Хайчжу"] },
    },
  },
};

export const rootUser = users[0];
