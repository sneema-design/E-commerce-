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
import { useCreateUser, UseUpdateUser } from "@/service/user/useUserService";
import type { User } from "@/types/user";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "update";
  defaultValues?: User | null;
};

const cleanUserData = (values: CreateUserForm) => {
  const data = { ...values };
  if (!data.password) delete data.password;
  return data;
};

export default function CreateUserDialog({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
}: Props) {
  const { mutateAsync: createUser, isPending: creating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: updating } = UseUpdateUser();

  const isUpdate = mode === "update";

  const formik = useFormik<CreateUserForm>({
    enableReinitialize: true,

    initialValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      role: defaultValues?.role || "",
      password: "",
      avatar: defaultValues?.avatar || "",
    },

    validationSchema: isUpdate
      ? updateValidationSchema
      : signupValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
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
          <DialogTitle>{isUpdate ? "Update User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update user details below."
              : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* NAME */}
          <input
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
          {/* EMAIL (disabled on update) */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={isUpdate}
            className="w-full rounded border px-3 py-2 disabled:bg-gray-100"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
          {/* PASSWORD (create only) */}
          {!isUpdate && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full rounded border px-3 py-2"
            />
          )}
          {(formik.touched.password || formik.submitCount > 0) &&
            formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          {/* ROLE */}
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            className="w-full rounded border bg-white px-3 py-2"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-sm text-red-500">{formik.errors.role}</p>
          )}
          {/* AVATAR */}
          <input
            name="avatar"
            placeholder="Avatar URL"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {formik.touched.avatar && formik.errors.avatar && (
            <p className="text-sm text-red-500">{formik.errors.avatar}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={creating || updating}>
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
