import { useGetAllProduct } from "@/service/product/useProductService";
import { ImageCard } from "./Image-Card";
import { useNavigate } from "react-router-dom";
import type { ProductFilter } from "@/types/product";
import ProductPagination from "./ProductPagination";

interface Props {
  filters: ProductFilter; // includes limit & offset
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export default function ProductPannel({
  filters,
  page,
  onPageChange,
  pageSize,
}: Props) {
  const navigate = useNavigate();

  const { data: products = [], isLoading, isError, error } = useGetAllProduct(filters);

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  const hasNextPage = products.length === pageSize;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <ImageCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>

      <ProductPagination
        page={page}
        onPagechange={onPageChange}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
