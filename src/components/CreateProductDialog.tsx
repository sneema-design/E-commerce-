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
  useCreateProduct,
  useUpdateProduct,
} from "@/service/product/useProductService";

import type { CreateProuct, Product } from "@/types/product";
import { ProductValidationSchema } from "@/validation/product.schema";
import { FormInput } from "@/components/ui/formInput";
import { UseGetAllCategories } from "@/service/category/useCategoryService";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "update";
  defaultValues?: Product | null;
};

export default function CreateProductDialog({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
}: Props) {
  const { mutateAsync: createProduct, isPending: creating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: updating } =
    useUpdateProduct();
  const { data: categories = []} = UseGetAllCategories();
  const isUpdate = mode === "update";

  const formik = useFormik<CreateProuct>({
    enableReinitialize: true,
    validationSchema: ProductValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    initialValues: {
      title: defaultValues?.title || "",
      price: defaultValues?.price || 0,
      description: defaultValues?.description || "",
      categoryId: defaultValues?.category?.id || 0,
      images: defaultValues?.images?.length ? [defaultValues.images[0]] : [""],
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdate && defaultValues?.id) {
          await updateProduct({
            id: defaultValues.id,
            productData: values,
          });
          toast.success("Product updated successfully");
        } else {
          await createProduct(values);
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

  const imagesTouched = formik.touched.images as boolean[] | undefined;
  const imagesErrors = formik.errors.images as string[] | undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update product details below."
              : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            id="title"
            label="Title"
            placeholder="Product title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.title}
            error={formik.errors.title}
          />

          <FormInput
            id="price"
            label="Price"
            type="number"
            value={String(formik.values.price)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.price}
            error={formik.errors.price}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>

            <select
              name="categoryId"
              value={formik.values.categoryId || ""}
              onChange={(e) =>
                formik.setFieldValue("categoryId", Number(e.target.value))
              }
              onBlur={formik.handleBlur}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.categoryId}
              </p>
            )}
          </div>
          {/* DESCRIPTION (textarea – special case) */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* IMAGE URL (array index) */}
          <FormInput
            id="images[0]"
            label="Image URL"
            placeholder="https://image-url.com"
            value={formik.values.images[0]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={imagesTouched?.[0]}
            error={imagesErrors?.[0]}
          />

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={creating || updating}
            >
              {updating
                ? "Updating..."
                : creating
                  ? "Creating..."
                  : isUpdate
                    ? "Update Product"
                    : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
