import { api } from "@/lib/axios";
import type { Category, CategoryFormValue } from "@/types/category";
import axios from "axios";
import { toast } from "sonner";

export const getAllCategory = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to create user");
    }

    throw new Error("Failed to create user");
  }
};

export const deleteCategory = async ({ id }: { id: number }) => {
  try {
    await api.delete(`/categories/${id}`);
    toast.success("category deleted successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to create user");
    }

    throw new Error("Failed to create user");
  }
};
export const createCategory = async (
  categoryData: CategoryFormValue,
): Promise<Category> => {
  try {
    const response = await api.post('/categories',categoryData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to create user");
    }

    throw new Error("Failed to create user");
  }

};

export const updateCategory = async ({
  id,
  categoryData,
}: {
  id: number;
  categoryData: CategoryFormValue;
}) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to update category"
      );
    }

    throw new Error("Failed to update category");
  }
};