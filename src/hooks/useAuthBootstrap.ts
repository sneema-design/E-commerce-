import { useEffect } from "react";
import { useGetProfile } from "@/service/user/useUserService";
import { getAccessToken } from "@/lib/auth";

export function useAuthBootStrap() {
  const token = getAccessToken();

  const { refetch } = useGetProfile();

  useEffect(() => {
    if (!token) return;

    const bootstrap = async () => {
      try {
        const res = await refetch();
        const user = res.data;

        if (user) {
          localStorage.setItem("role", user.role);
          localStorage.setItem("userData", JSON.stringify(user));
        }
      } catch (error) {
        localStorage.clear();
        console.error(error);
      }
    };

    bootstrap();
  }, [token, refetch]);
}
