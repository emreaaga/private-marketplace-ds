import type { CountryCode } from "./country.types";

export type CityMeta = {
  code: string;
  label: string;
  districts: string[];
};

export const COUNTRY_META: Record<
  CountryCode,
  {
    label: string;
    phoneCode: string;
    cities: Record<string, CityMeta>;
  }
> = {
  tr: {
    label: "Turkey",
    phoneCode: "+90",
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
    phoneCode: "+998",
    cities: {
      tashkent: {
        code: "tas",
        label: "Tashkent",
        districts: ["Chilanzar", "Yunusabad", "Mirzo Ulugbek", "Yakkasaray", "Sergeli"],
      },
      samarkand: {
        code: "sam",
        label: "Samarkand",
        districts: ["Central", "Bagishamol", "Sogdiana"],
      },
      bukhara: {
        code: "bkh",
        label: "Bukhara",
        districts: ["Central", "Kagan", "Gijduvan"],
      },
    },
  },

  ch: {
    label: "China",
    phoneCode: "+86",
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
};
