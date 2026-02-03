import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getProfile, LoginUser } from "./userService";
import type { User, createUserData, LoginUserData, Token } from "@/types/user";

export const useCreateUser = () => {
  return useMutation<User, Error, createUserData>({
    mutationFn: (userData: createUserData) => createUser(userData),
  });
};
export const useLoginUser = () => {
  return useMutation<Token, Error, LoginUserData>({
    mutationFn: (logData: LoginUserData) => LoginUser(logData),
  });
};

export const useGetProfile=()=>{
  return useQuery<User,Error>({
    queryKey:["profile"],
    queryFn:getProfile,
  });
  
}