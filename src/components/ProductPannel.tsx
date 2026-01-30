import { useGetAllProduct } from "@/service/product/useProductService";

import { ImageCard } from "./Image-Card";
import { useNavigate } from "react-router-dom";

export default function ProductPannel() {
  const navigate = useNavigate();
  const { data: products, isLoading, isError, error } = useGetAllProduct();

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">{error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products?.map((product) => (
        <ImageCard
          key={product.id}
          product={product}
          onClick={() => navigate(`/product/${product.id}`)}
        />
      ))}
    </div>
  );
}
