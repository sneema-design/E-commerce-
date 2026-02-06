import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";

import {
  UseCreateCategory,
  UseUpdateCategory,
} from "@/service/category/useCategoryService";

import type { CategoryFormValue, category as Category } from "@/types/category";
import { CategorySchemaValidaion } from "@/validation/category.schema";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "update";
  defaultValues?: Category | null;
};

export default function CreateCategoryDialog({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
}: Props) {
  const { mutateAsync: createCategory, isPending: creating } =
    UseCreateCategory();
  const { mutateAsync: updateCategory, isPending: updating } =
    UseUpdateCategory();

  const isUpdate = mode === "update";

  const formik = useFormik<CategoryFormValue>({
    enableReinitialize: true,
    validationSchema: CategorySchemaValidaion,

    initialValues: {
      name: defaultValues?.name || "",
      image: defaultValues?.image || "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdate && defaultValues?.id) {
          await updateCategory({
            id: defaultValues.id,
            categoryData: values,
          });
          toast.success("Category updated successfully");
        } else {
          await createCategory(values);
          toast.success("Category created successfully");
        }

        resetForm();
        onOpenChange(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    },
  });

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update category details below."
              : "Fill in the details to create a new category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className={labelClass}>Name</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${inputClass} ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500 focus:ring-red-500/20"
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className={errorClass}>{formik.errors.name}</p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${inputClass} ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500 focus:ring-red-500/20"
                  : ""
              }`}
            />
            {formik.touched.image && formik.errors.image && (
              <p className={errorClass}>{formik.errors.image}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!formik.isValid || creating || updating}
              className="w-full"
            >
              {updating
                ? "Updating..."
                : creating
                  ? "Creating..."
                  : isUpdate
                    ? "Update Category"
                    : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
