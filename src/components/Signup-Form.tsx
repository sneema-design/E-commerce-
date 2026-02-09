import { Button } from "@/components/ui/button";
import { useCreateUserSignUp } from "@/service/user/useUserService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldDescription } from "@/components/ui/field";
import { useFormik } from "formik";
import type { SignupFormValues } from "@/types/signup";
import { signupValidationSchema } from "@/validation/signup.schema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/ROUTES";
import { FormInput } from "@/components/ui/formInput";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateUserSignUp();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      const { ...payload } = values;
      try {
        delete payload.confirmPassword
        const res = await mutateAsync(payload);
        console.log(res.email, res.name, res.role);

        navigate(ROUTES.LOGIN);
        resetForm();
      } catch (err) {
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
            <FormInput
              id="name"
              label="Full Name"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
              error={formik.errors.name}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="m@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              error={formik.errors.email}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword||''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />

            <FormInput
              id="avatar"
              label="Avatar URL"
              placeholder="https://avatar.com/me.png"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.avatar}
              error={formik.errors.avatar}
            />

            <Button type="submit" disabled={!formik.isValid || isPending}>
              {isPending ? "Creating account..." : "Create Account"}
            </Button>

            <FieldDescription className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="underline"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Login
              </button>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
