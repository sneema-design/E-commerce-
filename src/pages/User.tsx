import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "@/components/CreateUserDialog";
import { UsegetAllUser, UseDeleteuser } from "@/service/user/useUserService";
import type { User } from "@/types/user";

export default function User() {
  const { data: users, isPending: userPending, isError } = UsegetAllUser();
  const { mutateAsync: deleteUserMutate, isPending: isDeleting } =UseDeleteuser();

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUserMutate({ id });
    }
  };

  if (userPending) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button onClick={() => setOpenCreateUser(true)}>Create User</Button>
      </div>

      {/* CREATE USER DIALOG */}
      <CreateUserDialog
        open={openCreateUser}
        onOpenChange={setOpenCreateUser}
        mode="create"
      />

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-sm uppercase text-gray-700">
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
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenUpdateUser(true);
                    }}
                  >
                    Update
                  </button>

                  <button
                    disabled={isDeleting}
                    className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE USER DIALOG */}
      {selectedUser && (
        <CreateUserDialog
          open={openUpdateUser}
          onOpenChange={(open) => {
            setOpenUpdateUser(open);
            if (!open) setSelectedUser(null); // 🔑 cleanup
          }}
          mode="update"
          defaultValues={selectedUser}
        />
      )}
    </div>
  );
}
