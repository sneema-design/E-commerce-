import CreateProductDialog from "@/components/CreateProductDialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { useState } from "react";
import ProductTable from "@/components/ProductTable";

export default function Products() {
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [selectedProduct, setSelectProduct] =
    useState<Product | null>(null);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  const handleUpdate = (product: Product) => {
    setSelectProduct(product);
    setOpenUpdateProduct(true);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Button onClick={() => setOpenCreateProduct(true)}>
          Create Product
        </Button>
      </div>

      {/* TABLE */}
      <ProductTable onUpdate={handleUpdate} />

      {/* CREATE */}
      <CreateProductDialog
        open={openCreateProduct}
        onOpenChange={setOpenCreateProduct}
      />

      {/* UPDATE */}
      <CreateProductDialog
        open={openUpdateProduct}
        onOpenChange={setOpenUpdateProduct}
        mode="update"
        defaultValues={selectedProduct}
      />
    </div>
  );
}
