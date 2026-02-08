import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "@/validation/login.schema";
import type { LoginFormValues } from "@/types/login";
import { useLoginUser } from "@/service/user/useUserService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/lib/auth";
import { ROUTES } from "@/constants/ROUTES";
import { getProfile } from "@/service/user/userService";
import { FormInput } from "@/components/ui/formInput";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync, isPending } = useLoginUser();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValidationSchema,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await mutateAsync(values);
        const { access_token, refresh_token } = res;

        setToken(access_token, refresh_token);

        const userProfile = await getProfile(access_token);
        localStorage.setItem("role", userProfile.role);

        toast.success("Logged in successfully 🎉");
        navigate(ROUTES.HOME);
        resetForm();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Login failed"
        );
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <FieldGroup>
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
                rightElement={
                  <button
                    type="button"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </button>
                }
              />

              <Button
                type="submit"
                disabled={!formik.isValid || isPending}
              >
                {isPending ? "Log In..." : "Login"}
              </Button>

              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => navigate(ROUTES.SIGNUP)}
                >
                  Sign up
                </button>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
