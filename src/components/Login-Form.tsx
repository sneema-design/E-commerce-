import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { loginFormValidationSchema } from "@/validation/login.schema";
import type { LoginFormValues } from "@/types/login";
import { useLoginUser } from "@/service/user/useUserService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/lib/auth";
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
        // 
        setToken(res.access_token,res.access_token)
        console.log(res); // accessToken, refreshToken
        navigate("/");
        toast.success("Logged in successfully 🎉");
        resetForm();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Login failed");
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
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={!formik.isValid || isPending}>
                  {isPending ? "Log In..." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
