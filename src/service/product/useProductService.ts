import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { ProductServices } from "./productService";

export const useGetAllProduct = () => {
  return useQuery<Product[], Error>({
    queryKey: ["all-products"],
    queryFn: ProductServices.getAllProduct,
  });
};

export const useGetProductById = ({ id }: { id?: number }) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => ProductServices.getProductById({ id: id! }),
    enabled: typeof id === "number" && !isNaN(id),
  });
};
