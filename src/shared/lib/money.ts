/** Очищает и нормализует decimal-ввод (запятая → точка, одна точка) */
export function normalizeDecimalInput(v: string): string {
  const s = v.replace(",", ".").replace(/[^\d.]/g, "");
  const parts = s.split(".");
  if (parts.length <= 2) return s;
  return parts[0] + "." + parts.slice(1).join("");
}

/** Ограничивает количество знаков после запятой без округления */
export function clampScale(v: string, scale: number): string {
  const s = normalizeDecimalInput(v);
  const [a, b] = s.split(".");
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (b == null) return a;
  return `${a}.${b.slice(0, scale)}`;
}

const BI_0 = BigInt(0);
const BI_100 = BigInt(100);
const BI_1000 = BigInt(1000);

/** Строка → cents (2 знака) как bigint */
export function toCents(v: string): bigint {
  const s = normalizeDecimalInput(v).trim();
  if (!s) return BI_0;

  const [intPartRaw, fracRaw = ""] = s.split(".");
  const intPart = intPartRaw.replace(/^0+(?=\d)/, "") || "0";
  const frac = (fracRaw + "00").slice(0, 2);

  return BigInt(intPart) * BI_100 + BigInt(frac);
}

/** Строка → milli-единицы (3 знака), например вес */
export function toMilli(v: string): bigint {
  const s = normalizeDecimalInput(v).trim();
  if (!s) return BI_0;

  const [intPartRaw, fracRaw = ""] = s.split(".");
  const intPart = intPartRaw.replace(/^0+(?=\d)/, "") || "0";
  const frac = (fracRaw + "000").slice(0, 3);

  return BigInt(intPart) * BI_1000 + BigInt(frac);
}

/** (milli × cents) / 1000 → cents */
export function mulMilliByCents(milli: bigint, cents: bigint): bigint {
  return (milli * cents) / BI_1000;
}

/** cents (bigint) → строка с 2 знаками */
export function centsToString(cents: bigint): string {
  const sign = cents < BI_0 ? "-" : "";
  const abs = cents < BI_0 ? -cents : cents;
  const i = abs / BI_100;
  const f = abs % BI_100;
  return `${sign}${i.toString()}.${f.toString().padStart(2, "0")}`;
}

/** Приводит значение к фиксированному scale для API */
export function toFixedScaleForApi(v: string, scale: number): string {
  const s = normalizeDecimalInput(v).trim();
  if (!s) return `0.${"0".repeat(scale)}`;

  const [aRaw, bRaw = ""] = s.split(".");
  const a = (aRaw || "0").replace(/^0+(?=\d)/, "") || "0";
  const b = (bRaw + "0".repeat(scale)).slice(0, scale);

  return `${a}.${b}`;
}
