import { Tag, Package } from "lucide-react";

interface Props {
  unit: string;
  quantity: number;
}

export function ProductInfoGrid({ unit, quantity }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="mb-1 flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-500" />
          <span className="text-xs tracking-wide text-gray-500 uppercase">Единица</span>
        </div>
        <p className="text-base font-semibold text-gray-900">{unit}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="mb-1 flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-500" />
          <span className="text-xs tracking-wide text-gray-500 uppercase">Кол-во</span>
        </div>
        <p className="text-base font-semibold text-gray-900">{quantity}</p>
      </div>
    </div>
  );
}
