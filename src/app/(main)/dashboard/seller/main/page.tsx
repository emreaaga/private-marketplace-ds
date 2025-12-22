"use client";

import { toast } from "sonner";

import { productTableMock } from "@/features/seller/fake-products";
import { productColumns } from "@/features/seller/ui/molecules/product-table-columns";
import { ProductsToolbar } from "@/features/seller/ui/organisms/sections/products-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function SellerMainPage() {
  const handleCreateProduct = () => {
    toast.success("Продукт успешно создан!");
  };

  return (
    <div className="space-y-6">
      <ProductsToolbar onCreate={handleCreateProduct} />
      <DataTable data={productTableMock} columns={productColumns} pageSize={10} emptyMessage="Нет товаров" />
    </div>
  );
}
