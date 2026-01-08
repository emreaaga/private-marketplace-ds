type City = {
  value: string;
  label: string;
};

type Country = {
  label: string;
  flag: string;
  cities: City[];
};

export const countries: Record<string, Country> = {
  UZ: {
    label: "Узбекистан",
    flag: "https://flagcdn.com/w40/uz.png",
    cities: [
      { value: "TAS", label: "Ташкент" },
      { value: "SAM", label: "Самарканд" },
      { value: "BUH", label: "Бухара" },
      { value: "AND", label: "Андижан" },
      { value: "NAM", label: "Наманган" },
    ],
  },

  TR: {
    label: "Турция",
    flag: "https://flagcdn.com/w40/tr.png",
    cities: [
      { value: "IST", label: "Стамбул" },
      { value: "ANK", label: "Анкара" },
      { value: "IZM", label: "Измир" },
      { value: "ANT", label: "Анталья" },
      { value: "BRS", label: "Бурса" },
    ],
  },

  CN: {
    label: "Китай",
    flag: "https://flagcdn.com/w40/cn.png",
    cities: [
      { value: "PEK", label: "Пекин" },
      { value: "SHA", label: "Шанхай" },
      { value: "CAN", label: "Гуанчжоу" },
      { value: "SZX", label: "Шэньчжэнь" },
      { value: "CTU", label: "Чэнду" },
    ],
  },
};
