import * as Yup from "yup";

export const updateValidationSchema = Yup.object({
  email: Yup.string().email("invalid email").required("email is required"),
  name: Yup.string().required("name is required"),
  password: Yup.string()
    .min(8, "password should be minimun of 8 characters").notRequired(),
  avatar: Yup.string().required("your avatar is required"),
  role:Yup.string().required()
});
