import { ProductComment } from "@/features/seller/ui/molecules/card-view-drawer/product-comment";
import { ProductInfoGrid } from "@/features/seller/ui/molecules/card-view-drawer/product-info-grid";
import { ProductPriceCard } from "@/features/seller/ui/molecules/card-view-drawer/product-price-card";

interface Props {
  product: any;
}

export function ProductDetailsSection({ product }: Props) {
  return (
    <div className="mt-5 space-y-4 px-4 pb-6">
      <ProductPriceCard price={product.price} />
      <ProductInfoGrid unit={product.unit} quantity={product.quantity} />
      {product.comment && <ProductComment comment={product.comment} />}
    </div>
  );
}
