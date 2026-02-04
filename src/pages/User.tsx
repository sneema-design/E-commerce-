import { UsegetAllUser } from "@/service/user/useUserService";
export default function User() {
  const { data: users, isPending, isError } = UsegetAllUser();

  if (isPending) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users</p>;

  return (
    <>
      {users?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
