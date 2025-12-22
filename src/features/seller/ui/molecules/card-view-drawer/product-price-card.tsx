interface Props {
  price: number;
}

export function ProductPriceCard({ price }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Цена</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">{price.toLocaleString()}</span>
          <span className="text-lg text-gray-600">$</span>
        </div>
      </div>
    </div>
  );
}
