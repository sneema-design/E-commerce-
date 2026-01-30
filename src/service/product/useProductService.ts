import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { ProductServices } from "./productService";

export const useGetAllProduct = () => {
  return useQuery<Product[], Error>({
    queryKey: ["all-products"],
    queryFn: ProductServices.getAllProduct,
  });
};
