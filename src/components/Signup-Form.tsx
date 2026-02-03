import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/service/user/useUserService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import type { SignupFormValues } from "@/types/signup";
import { signupValidationSchema } from "@/validation/signup.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/ROUTES";
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateUser();
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
    validationSchema: signupValidationSchema,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await mutateAsync(values);
        console.log(res.email, res.name, res.role);
        toast("Account created successfully, Please Login!!");
        navigate(ROUTES.LOGIN)
        resetForm();
      } catch (err) {
        // error already handled by React Query
        console.error(err);
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="m@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="avatar">avatar</FieldLabel>
              <Input
                id="avatar"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.avatar}
              />
              {formik.touched.avatar && formik.errors.avatar && (
                <p className="text-sm text-red-500">{formik.errors.avatar}</p>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={!formik.isValid || isPending}>
                  {isPending ? "Creating account..." : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center" >
                  Already have an account? <a  href="#" onClick={()=>navigate(ROUTES.LOGIN)}>Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
