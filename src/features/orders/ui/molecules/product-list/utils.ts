export function toInt(v: string, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : fallback;
}

export function toMoney(v: string, fallback: number) {
  const normalized = v.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? Math.max(0, n) : fallback;
}

export function normalizeMoneyString(v: string): string {
  const cleaned = v.replace(",", ".").replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned === "" ? "0" : cleaned;

  const before = cleaned.slice(0, firstDot + 1);
  const after = cleaned.slice(firstDot + 1).replace(/\./g, "");
  const out = before + after;

  return out === "" || out === "." ? "0" : out;
}

export function moneyFmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calcRowSum(unit_price: string, quantity: number) {
  return toMoney(unit_price, 0) * quantity;
}
