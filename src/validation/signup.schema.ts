import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  email: Yup.string().email("invalid email").required("email is required"),
  name: Yup.string().required("name is required"),
  password: Yup.string()
    .min(8, "password should be minimun of 8 characters")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  avatar: Yup.string().required("your avatar is required"),
  role:Yup.string()
});
