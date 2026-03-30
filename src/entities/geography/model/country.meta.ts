type CityMeta = {
  code: string;
  label: string;
  districts: string[];
};

export const COUNTRY_META: Record<
  string,
  {
    label: string;
    phoneCode: string;
    flag: string;
    cities: Record<string, CityMeta>;
  }
> = {
  tr: {
    label: "Turkey",
    phoneCode: "90",
    flag: "https://flagcdn.com/w40/tr.png",
    cities: {
      istanbul: {
        code: "ist",
        label: "Istanbul",
        districts: ["Besiktas", "Kadikoy", "Fatih", "Sultanahmet"],
      },
      ankara: {
        code: "ank",
        label: "Ankara",
        districts: ["Cankaya", "Kecioren", "Yenimahalle"],
      },
      izmir: {
        code: "izm",
        label: "Izmir",
        districts: ["Konak", "Karsiyaka", "Bornova"],
      },
    },
  },

  uz: {
    label: "Uzbekistan",
    phoneCode: "998",
    flag: "https://flagcdn.com/w40/uz.png",
    cities: {
      tashkent: {
        code: "tas",
        label: "Tashkent",
        districts: ["Chilanzar", "Yunusabad", "Mirzo Ulugbek", "Yakkasaray", "Sergeli"],
      },
      samarkand: {
        code: "skd",
        label: "Samarkand",
        districts: ["Pastdargom", "Bulungur", "Taylak", "Jomboy", "Ishtixon"],
      },
      bukhara: {
        code: "bhk",
        label: "Bukhara",
        districts: ["Gijduvan", "Kagan", "Shofirkon", "Vobkent", "Jondor"],
      },
      namangan: {
        code: "nma",
        label: "Namangan",
        districts: ["Pap", "Chust", "Chartak", "Uychi", "Uchkurgan"],
      },
      andijan: {
        code: "azn",
        label: "Andijan",
        districts: ["Asaka", "Shahrixon", "Kurgantepa", "Izboskan", "Altinkul"],
      },
      fergana: {
        code: "feg",
        label: "Fergana",
        districts: ["Kokand", "Margilan", "Kuva", "Rishtan", "Oltiariq"],
      },
      nukus: {
        code: "ncu",
        label: "Nukus",
        districts: ["Beruniy", "Kungrad", "Turtkul", "Khodjeyli", "Muynak"],
      },
      qarshi: {
        code: "ksq",
        label: "Qarshi",
        districts: ["Shahrisabz", "Kitab", "Guzar", "Nishon", "Kamashi"],
      },
      urgench: {
        code: "ugc",
        label: "Urgench",
        districts: ["Khiva", "Gurlan", "Shavat", "Bagat", "Hazarasp"],
      },
      termez: {
        code: "tmz",
        label: "Termez",
        districts: ["Denau", "Sherabad", "Jarqurgan", "Boysun", "Sariosiyo"],
      },
      navoi: {
        code: "nvi",
        label: "Navoi",
        districts: ["Zarafshan", "Uchkuduk", "Karmana", "Kyzyltepa", "Khatirchi"],
      },
      jizzakh: {
        code: "jiz",
        label: "Jizzakh",
        districts: ["Zaamin", "Gallaorol", "Dustlik", "Zarbdor", "Pakhtakor"],
      },
      gulistan: {
        code: "gul",
        label: "Gulistan",
        districts: ["Yangiyer", "Shirin", "Sardoba", "Sayhunabad", "Bayaut"],
      },
    },
  },

  ch: {
    label: "China",
    phoneCode: "86",
    flag: "https://flagcdn.com/w40/cn.png",
    cities: {
      beijing: {
        code: "pek",
        label: "Beijing",
        districts: ["Dongcheng", "Xicheng", "Chaoyang", "Haidian"],
      },
      shanghai: {
        code: "sha",
        label: "Shanghai",
        districts: ["Pudong", "Huangpu", "Jing'an"],
      },
      guangzhou: {
        code: "can",
        label: "Guangzhou",
        districts: ["Yuexiu", "Tianhe", "Haizhu"],
      },
    },
  },
} as const;
