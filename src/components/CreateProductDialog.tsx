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

import { useCreateProduct, useUpdateProduct } from "@/service/product/useProductService";
import type { CreateProuct, Product } from "@/types/product";
import { ProductValidationSchema } from "@/validation/product.schema";

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

  const isUpdate = mode === "update";

  const formik = useFormik<CreateProuct>({
    enableReinitialize: true,

    initialValues: {
      title: defaultValues?.title || "",
      price: defaultValues?.price || 0,
      description: defaultValues?.description || "",
      categoryId: defaultValues?.category?.id || 0,
      images: defaultValues?.images?.length
        ? [defaultValues.images[0]]
        : [""],
    },

    validationSchema: ProductValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,

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
          toast.success("Product created successfully");
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

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

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

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.title}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <label className={labelClass}>Price</label>
            <input
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.price}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className={labelClass}>Category ID</label>
            <input
              name="categoryId"
              type="number"
              value={formik.values.categoryId}
              onChange={(e) =>
                formik.setFieldValue("categoryId", Number(e.target.value))
              }
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.categoryId}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.description &&
              formik.errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.description}
                </p>
              )}
          </div>

          {/* IMAGE */}
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              name="images[0]"
              value={formik.values.images[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {imagesTouched?.[0] && imagesErrors?.[0] && (
              <p className="mt-1 text-xs text-red-500">
                {imagesErrors[0]}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={creating || updating}
              className="w-full"
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
