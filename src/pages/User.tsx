import { Button } from "@/components/ui/button";
import { UsegetAllUser,UseDeleteuser } from "@/service/user/useUserService";

export default function User() {
  const { data: users, isPending:userPending, isError } = UsegetAllUser();
  const {mutateAsync:deletUserMutate,isPending}=UseDeleteuser()
  const handleUpdate = (user) => {
    console.log("Update user:", user);
    // navigate to update page or open modal
    // router.push(`/users/update/${user.id}`)
  };

  const handleDelete = (id:number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deletUserMutate({id})
      console.log("Delete user id:", id);
      // call delete API here
    }
  };

  if (userPending) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        <Button>
          Create User
        </Button>
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Avatar</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
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
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)} disabled={isPending}
                    className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

