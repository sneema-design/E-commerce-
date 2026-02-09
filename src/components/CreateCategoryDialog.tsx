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

import type { CategoryFormValue, Category } from "@/types/category";
import { CategorySchemaValidaion } from "@/validation/category.schema";
import { FormInput } from "@/components/ui/formInput";

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
    validateOnChange: true,

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

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            id="name"
            label="Name"
            placeholder="Category name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />

          <FormInput
            id="image"
            label="Image URL"
            placeholder="https://image-url.com"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.image}
            error={formik.errors.image}
          />

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!formik.isValid || creating || updating}
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
