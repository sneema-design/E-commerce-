import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CategoryFormValue, type Category } from "@/types/category";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./categoryService";
import { toast } from "sonner";

export const UseGetAllCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => getAllCategory(),
  });
};

export const UseDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { id: number }>({
    mutationFn: ({ id }) => deleteCategory({ id }),
    onSuccess: () => {
      // toast.success("Category deleted successFully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const UseCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Category, Error, CategoryFormValue>({
    mutationFn: (categoryData: CategoryFormValue) =>
      createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const UseUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Category,
    Error,
    { id: number; categoryData: CategoryFormValue }
  >({
    mutationFn: ({ id, categoryData }) =>
      updateCategory({
        id,
        categoryData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error) => {
      console.error("Update category failed:", error.message);
    },
  });
};

