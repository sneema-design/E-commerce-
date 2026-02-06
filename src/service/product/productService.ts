import { api } from "@/lib/axios";
import axios from "axios";
import type { CreateProuct, Product, ProductFilter } from "@/types/product";
import { buildProductQuery } from "@/utils/buildProuctQuery";
export const ProductServices = {
  getAllProduct: async (filters?: ProductFilter): Promise<Product[]> => {
    const query = buildProductQuery(filters);
    const response = await api.get<Product[]>(
      query ? `/products?${query}` : "/products",
    );
    return response.data;
  },
  getProductById: async ({ id }: { id: number }): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  createProduct: async (productData: CreateProuct): Promise<Product> => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to create product",
        );
      }

      throw new Error("Failed to create product");
    }
  },
  deleteProduct: async ({ id }: { id: number }) => {
    try {
      const response = await api.delete(`/products/${id}`);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to delete product",
        );
      }

      throw new Error("Failed to delete product");
    }
  },
  updateProduct: async ({
    id,
    productData,
  }: {
    id: number;
    productData: CreateProuct;
  }) => {
    try {
      const response=await api.put(`/products/${id}`,productData);
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to update product",
        );
      }

      throw new Error("Failed to update product");
    }
  },
};
