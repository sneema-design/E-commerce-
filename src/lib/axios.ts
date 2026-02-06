import axios from "axios";
import {
  setToken,
  getAccessToken,
  getRefreshToken,
  logout,
} from "./auth";

export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  console.log("accessToken:", accessToken);
  if (accessToken) {
    config.headers?.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const response = await api.post("/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        if (!accessToken || !newRefreshToken) {
          throw new Error("Invalid refresh token response");
        }

        console.log("after running refersh token", accessToken, refreshToken);
        setToken(accessToken, newRefreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        logout();
        window.location.replace("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
