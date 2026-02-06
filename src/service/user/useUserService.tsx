import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getAllUser,
  getProfile,
  LoginUser,
  deleteUser,
  updateUser,
} from "./userService";
import type { User, createUserData, LoginUserData, Token } from "@/types/user";
import { toast } from "sonner";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, createUserData>({
    mutationFn: (userData: createUserData) => createUser(userData),
    onSuccess: () => {
      toast.success("User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useLoginUser = () => {
  return useMutation<Token, Error, LoginUserData>({
    mutationFn: (logData: LoginUserData) => LoginUser(logData),
  });
};

export const useGetProfile = (access_token: any) => {
  return useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: () => getProfile(access_token),
  });
};

export const UsegetAllUser = () => {
  return useQuery<User[], Error>({
    queryKey: ["UserAll"],
    queryFn: getAllUser,
  });
};

export const UseDeleteuser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser({ id }),
    onSuccess: () => {
      toast.success("Delete the User Successfully!!!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
export const UseUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: createUserData }) =>
      updateUser({ id, userData }),

    onSuccess: () => {
      toast.success("User Updated Successfully!!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
