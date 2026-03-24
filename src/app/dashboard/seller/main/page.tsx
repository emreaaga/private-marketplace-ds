import { DataTable } from "@/widgets/data-table/ui/data-table";

import { productTableMock } from "./_components/fake-products";
import { productColumns } from "./_components/product-table-columns";

export default function SellerMainPage() {
  return (
    <div className="space-y-4">
      <DataTable data={productTableMock} columns={productColumns} emptyMessage="Товары не найдены" />
    </div>
  );
}
