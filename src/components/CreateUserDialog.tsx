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

import type { CreateUserForm } from "@/types/signup";
import { signupValidationSchema } from "@/validation/signup.schema";
import { updateValidationSchema } from "@/validation/update.schema";
import {
  useCreateUser,
  UseUpdateUser,
} from "@/service/user/useUserService";
import type { User } from "@/types/user";
import { FormInput } from "@/components/ui/formInput";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "update";
  defaultValues?: User | null;
};


const cleanUserData = (values: CreateUserForm) => {
  const { password, ...rest } = values;

  if (password) {
    return values;
  }

  return rest;
};


export default function CreateUserDialog({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
}: Props) {
  const { mutateAsync: createUser, isPending: creating } =
    useCreateUser();
  const { mutateAsync: updateUser, isPending: updating } =
    UseUpdateUser();

  const isUpdate = mode === "update";

  const formik = useFormik<CreateUserForm>({
    enableReinitialize: true,
    validationSchema: isUpdate
      ? updateValidationSchema
      : signupValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    initialValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      role: defaultValues?.role || "",
      password: "",
      avatar: defaultValues?.avatar || "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdate && defaultValues?.id) {
          const payload = cleanUserData(values);
          await updateUser({
            id: defaultValues.id,
            userData: payload,
          });
        } else {
          await createUser(values);
        }

        resetForm();
        onOpenChange(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update User" : "Create User"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update user details below."
              : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            id="name"
            label="Name"
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
            rightElement={
              isUpdate ? (
                <span className="text-xs text-gray-400">
                  Email cannot be changed
                </span>
              ) : null
            }
          />

          {!isUpdate && (
            <FormInput
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={
                formik.touched.password || formik.submitCount > 0
              }
              error={formik.errors.password}
            />
          )}

          {/* ROLE (select – special case) */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Role
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.role}
              </p>
            )}
          </div>

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
                ? "Update User"
                : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
