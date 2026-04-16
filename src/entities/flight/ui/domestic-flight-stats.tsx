"use client";

import { ScrollArea } from "@/shared/ui/atoms/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/atoms/table";

const MOCK_STATS = {
  summary: {
    totalWeight: 779.02,
    totalOrders: 50,
    totalAmount: 3455.0,
    balance: 1858.67,
  },
  postalCompanies: [
    { name: "Tea express", orders: 10, weight: 92.07, amount: 390.85, balance: 257.6 },
    { name: "Lol", orders: 10, weight: 153.4, amount: 772.54, balance: 274.58 },
    { name: "Test", orders: 10, weight: 205.27, amount: 769.13, balance: 615.13 },
    { name: "Testtwo", orders: 10, weight: 178.45, amount: 807.44, balance: 402.5 },
    { name: "Testthree", orders: 10, weight: 149.83, amount: 715.04, balance: 308.86 },
  ],
  distribution: [
    { city: "BHK", orders: 10, weight: 172.4, amount: 794.24, balance: 376.38 },
    { city: "NMA", orders: 10, weight: 167.22, amount: 729.93, balance: 407.02 },
    { city: "SKD", orders: 15, weight: 197.72, amount: 859.09, balance: 501.08 },
    { city: "TAS", orders: 15, weight: 241.68, amount: 1071.74, balance: 574.19 },
  ],
};

export function DomesticFlightStats() {
  const { summary, postalCompanies, distribution } = MOCK_STATS;

  const firstGroupLength = postalCompanies.length;

  return (
    <ScrollArea className="h-full border-l">
      <Table className="text-black">
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="h-8 border-b hover:bg-transparent">
            <TableHead className="w-8 p-1 text-center text-[10px] font-bold text-black uppercase">№</TableHead>
            <TableHead className="w-10 p-1 text-center text-[10px] font-bold text-black uppercase">ID</TableHead>
            <TableHead className="p-1 text-[10px] font-bold text-black uppercase">Фирма / Город</TableHead>
            <TableHead className="p-1 text-right text-[10px] font-bold text-black uppercase">Зак.</TableHead>
            <TableHead className="p-1 text-right text-[10px] font-bold text-black uppercase">Вес</TableHead>
            <TableHead className="p-1 text-right text-[10px] font-bold text-black uppercase">Взнос</TableHead>
            <TableHead className="p-1 text-right text-[10px] font-bold text-black uppercase">Остаток</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ГРУППА 1: Компании */}
          {postalCompanies.map((item, idx) => (
            <TableRow key={`comp-${idx}`} className="h-7 border-b hover:bg-transparent">
              <TableCell className="p-1 text-center text-[11px] text-black/50">{idx + 1}</TableCell>
              <TableCell className="p-1 text-center text-[11px] font-medium text-black/40">{idx + 1}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{item.name}</TableCell>
              <TableCell className="p-1 text-right text-xs">{item.orders}</TableCell>
              <TableCell className="p-1 text-right text-xs">{item.weight.toFixed(2)}</TableCell>
              <TableCell className="p-1 text-right text-xs">${item.amount.toFixed(2)}</TableCell>
              <TableCell className="p-1 text-right text-xs font-bold">${item.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}

          {/* ИТОГО */}
          <TableRow className="h-7 border-y bg-slate-50 font-bold hover:bg-slate-50">
            <TableCell className="p-1"></TableCell> {/* Пустая ячейка для колонки № */}
            <TableCell colSpan={2} className="p-1 pr-2 text-right text-[10px] font-bold uppercase">
              итого:
            </TableCell>
            <TableCell className="p-1 text-right text-xs">{summary.totalOrders} зак</TableCell>
            <TableCell className="p-1 text-right text-xs">{summary.totalWeight} кг</TableCell>
            <TableCell className="p-1 text-right text-xs">${summary.totalAmount.toFixed(2)}</TableCell>
            <TableCell className="p-1 text-right text-xs">${summary.balance.toFixed(2)}</TableCell>
          </TableRow>

          {/* ГРУППА 2: Распределение */}
          {distribution.map((item, idx) => (
            <TableRow key={`dist-${idx}`} className="h-7 border-b hover:bg-transparent">
              {/* Продолжение нумерации: длина первой группы + текущий индекс + 1 */}
              <TableCell className="p-1 text-center text-[11px] text-black/50">{firstGroupLength + idx + 1}</TableCell>
              <TableCell className="p-1 text-center text-[11px] font-medium text-black/40">{idx + 15}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{item.city}</TableCell>
              <TableCell className="p-1 text-right text-xs">{item.orders}</TableCell>
              <TableCell className="p-1 text-right text-xs">{item.weight.toFixed(2)}</TableCell>
              <TableCell className="p-1 text-right text-xs">${item.amount.toFixed(2)}</TableCell>
              <TableCell className="p-1 text-right text-xs font-bold">${item.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
