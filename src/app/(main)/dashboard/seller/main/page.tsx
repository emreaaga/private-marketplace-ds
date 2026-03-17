import { productTableMock } from "@/app/(main)/dashboard/seller/main/_components/fake-products";
import { productColumns } from "@/app/(main)/dashboard/seller/main/_components/product-table-columns";
import { DataTable } from "@/widgets/data-table/ui/data-table";

export default function SellerMainPage() {
  return (
    <div className="space-y-4">
      <DataTable data={productTableMock} columns={productColumns} emptyMessage="Товары не найдены" />
    </div>
  );
}
