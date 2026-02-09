import { UsegetAllUser, UseDeleteuser } from "@/service/user/useUserService";
import type { User } from "@/types/user";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

type Props = {
  onUpdate: (user: User) => void;
};

export default function UserTable({ onUpdate }: Props) {
  const { data: users, isPending, isError } = UsegetAllUser();
  const { mutateAsync: deleteUser, isPending: isDeleting } = UseDeleteuser();

  const handleDelete = async (id: number) => {
    await deleteUser({ id });
  };

  if (isPending)
    return (
      <p className="flex items-center justify-center mt-16">
        <Spinner />
      </p>
    );

  if (isError)
    return <p className="p-4 text-red-500">Failed to load users</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-left">Avatar</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>

              <td className="px-6 py-4 font-medium">{user.name}</td>
              <td className="px-6 py-4 text-gray-600">{user.email}</td>
              <td className="px-6 py-4 capitalize">{user.role}</td>

              <td className="px-6 py-4 text-center space-x-2">
                <Button
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={() => onUpdate(user)}
                >
                  Update
                </Button>

                <DeleteConfirmDialog
                  title="Delete user?"
                  itemName={user.name}
                  onConfirm={() => handleDelete(user.id)}
                  isLoading={isDeleting}
                  triggerClassName="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-50"
                  triggerLabel="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
