import * as Yup from "yup";

export const ProductValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  price: Yup.number()
    .typeError("Price is required")
    .required("Price is required"),

  description: Yup.string().required("Description is required"),

  categoryId: Yup.number()
    .typeError("CategoryId is required")
    .required("CategoryId is required"),

  images: Yup.array()
    .of(
      Yup.string()
        .url("Invalid image URL")
        .required("Image is required"),
    )
    .min(1, "At least one image is required"),
});
