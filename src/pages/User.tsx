import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "@/components/CreateUserDialog";
import type { User } from "@/types/user";
import UserTable from "@/components/UserTable";

export default function User() {
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setOpenUpdateUser(true);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button onClick={() => setOpenCreateUser(true)}>
          Create User
        </Button>
      </div>

      {/* CREATE */}
      <CreateUserDialog
        open={openCreateUser}
        onOpenChange={setOpenCreateUser}
        mode="create"
      />

      {/* TABLE */}
      <UserTable onUpdate={handleUpdate} />

      {/* UPDATE */}
      {selectedUser && (
        <CreateUserDialog
          open={openUpdateUser}
          onOpenChange={(open) => {
            setOpenUpdateUser(open);
            if (!open) setSelectedUser(null);
          }}
          mode="update"
          defaultValues={selectedUser}
        />
      )}
    </div>
  );
}
