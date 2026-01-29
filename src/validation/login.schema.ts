import * as Yup from "yup"


export const loginFormValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .required('Password is required'),
  })
