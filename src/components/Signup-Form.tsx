import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/service/user/useUserService";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/ROUTES";
import { FormInput } from "@/components/ui/formInput";

export function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
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

        toast.success("Account created successfully, Please Login!!");
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
              id="avatar"
              label="Avatar URL"
              placeholder="https://avatar.com/me.png"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.avatar}
              error={formik.errors.avatar}
            />

            <Button
              type="submit"
              disabled={!formik.isValid || isPending}
            >
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
