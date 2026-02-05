import axios from "axios";
import type { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import type { createUserData, LoginUserData, Token, User } from "@/types/user";
export const createUser = async (userData: createUserData): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.post("/users", userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to create user");
    }

    throw new Error("Failed to create user");
  }
};

export const LoginUser = async (
  UserLoginData: LoginUserData,
): Promise<Token> => {
  try {
    const response: AxiosResponse<Token> = await api.post(
      "/auth/login",
      UserLoginData,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Invalide mail or password",
      );
    }

    throw new Error("Failed to Login");
  }
};

export const getProfile = async (access_token: string): Promise<User> => {
  try {

    const response: AxiosResponse<User> = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Unable to fetch Profile",
      );
    }

    throw new Error("Failed to Fetch Profile");
  }
};

export const getAllUser=async():Promise<User[]>=>{
  try {
    const response:AxiosResponse<User[]>=await api.get("/users")
    return response.data;
  } catch (error:unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Unable to fetch Profile",
      );
    }

    throw new Error("Failed to Fetch Profile")
  }
}


export const deleteUser=async({id}:{id:number})=>{
  try {
    const response =await api.delete(`/users/${id}`)
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Unable to delete Profile",
      );
    }

    throw new Error("Failed to delete Profile")
  }
}