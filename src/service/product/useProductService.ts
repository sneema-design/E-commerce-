import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { ProductServices } from "./productService";
import type { ProductFilter } from "@/types/product";
export const useGetAllProduct = (filters?: ProductFilter) => {
  return useQuery<Product[], Error>({
    queryKey: [
      "all-products",
      filters?.title,
      filters?.categoryId,
      filters?.priceMin,
      filters?.priceMax,
      filters?.limit,
      filters?.offset, 
    ],
    queryFn: () => ProductServices.getAllProduct(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useGetProductById = ({ id }: { id?: number }) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => ProductServices.getProductById({ id: id! }),
    enabled: typeof id === "number" && !isNaN(id),
  });
};
