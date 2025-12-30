import { Input } from "@/shared/ui/atoms/input";

export function PartiesSummary() {
  return (
    <div className="mt-1 flex flex-nowrap items-center gap-0.5">
      <Input className="h-8 min-w-20 flex-1 px-2 py-0 text-xs leading-6" placeholder="Код" />
      <Input className="h-8 min-w-14 flex-1 px-2 py-0 text-xs leading-6" placeholder="Вес/кг" type="number" />
      <Input className="h-8 min-w-14 flex-1 px-2 py-0 text-xs leading-6" placeholder="Цена/кг" type="number" />
      <Input className="h-8 min-w-14 flex-1 px-2 py-0 text-xs leading-6" placeholder="Доп.опл" type="number" />
      <Input className="h-8 min-w-[72px] flex-1 px-2 py-0 text-xs leading-6" placeholder="Взнос" type="number" />
      <Input className="h-8 min-w-20 flex-1 px-2 py-0 text-xs leading-6" placeholder="Остаток" disabled />
    </div>
  );
}
