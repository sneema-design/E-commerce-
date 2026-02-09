import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getAllUser,
  getProfile,
  LoginUser,
  deleteUser,
  updateUser,
  createUserSignup,
} from "./userService";

import type {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserData,
  Token,
} from "@/types/user";

import { toast } from "sonner";
import type { SignupFormValues } from "@/types/signup";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserDTO>({
    mutationFn: (userData) => createUser(userData),

    onSuccess: () => {
      toast.success("User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCreateUserSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, SignupFormValues>({
    mutationFn: (userData) => createUserSignup(userData),

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
    mutationFn: (logData) => LoginUser(logData),
  });
};
export const useGetProfile = (accessToken?: string) => {
  return useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: () => getProfile(accessToken!),
    enabled: !!accessToken, // 🔑 only runs when token exists
  });
};
export const UsegetAllUser = () => {
  return useQuery<User[], Error>({
    queryKey: ["UserAll"],
    queryFn: getAllUser,
  });
};

/* ===================== DELETE USER ===================== */
export const UseDeleteuser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser({ id }),

    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

/* ===================== UPDATE USER ===================== */
export const UseUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: number;
      userData: UpdateUserDTO;
    }) => updateUser({ id, userData }),

    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["UserAll"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
