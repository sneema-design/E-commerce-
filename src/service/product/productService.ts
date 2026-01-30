import { api } from "@/lib/axios";
import type { Product } from "@/types/product";
export const ProductServices={
         getAllProduct:async():Promise<Product[]>=>{
               const response=await api.get<Product[]>("/products")
               return response.data
         }
         
}