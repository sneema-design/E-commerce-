import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateProuct, Product } from "@/types/product";
import type { ProductFilter } from "@/types/product";
import { ProductServices } from "./productService";
import { toast } from "sonner";

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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProuct>({
    mutationFn: (productData) => ProductServices.createProduct(productData),

    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({
        queryKey: ["all-products"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { id: number }>({
    mutationFn: ({ id }) => ProductServices.deleteProduct({ id }),

    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["all-products"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: number; productData: CreateProuct }>({
    mutationFn: ({ id, productData }) =>
      ProductServices.updateProduct({
        id,
        productData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },

    onError: (error) => {
      console.error("Update product failed:", error.message);
    },
  });
};

