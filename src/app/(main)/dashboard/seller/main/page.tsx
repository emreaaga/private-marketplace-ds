import { productTableMock } from "@/features/seller/fake-products";
import { productColumns } from "@/features/seller/ui/molecules/product-table-columns";
import { ProductsResponsive } from "@/features/seller/ui/organisms/products-responsive";
import { ProductsToolbar } from "@/features/seller/ui/organisms/sections/products-toolbar";

export default function SellerMainPage() {
  return (
    <div className="space-y-4">
      <ProductsToolbar />
      <ProductsResponsive data={productTableMock} columns={productColumns} />
    </div>
  );
}
