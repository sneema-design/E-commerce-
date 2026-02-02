import { api } from "@/lib/axios";
import type { Product,ProductFilter } from "@/types/product";
import { buildProductQuery } from "@/utils/buildProuctQuery";
export const ProductServices = {
  getAllProduct: async (filters?:ProductFilter): Promise<Product[]> => {
    const query=buildProductQuery(filters)
    const response = await api.get<Product[]>(query?`/products?${query}`:"/products");
    return response.data;
  },
  getProductById: async ({ id }: { id: number }): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
};
