import { getAccessToken } from "@/lib/auth";
import { useGetProfile } from "@/service/user/useUserService";
import { useEffect } from "react";

export default function Profile() {
  const access_token = getAccessToken() ?? undefined;

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfile(access_token);

  useEffect(() => {
    if (profile?.avatar) {
      localStorage.setItem("user_image", profile.avatar);
    }
  }, [profile?.avatar]);

  if (isLoading) {
    return (
      <p className="mt-16 text-center text-muted-foreground animate-pulse">
        Loading your profile…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="mt-16 text-center text-red-500">
        {error.message}
      </p>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex justify-center px-4 mt-16">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-background shadow-md">
        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500" />

        <div className="relative -mt-16 flex justify-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-sm"
            onError={(e) => {
              e.currentTarget.src =
                "https://ui-avatars.com/api/?name=" + profile.name;
            }}
          />
        </div>

        <div className="px-6 pb-6 pt-4 text-center space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile.name}
          </h1>

          <p className="text-sm text-muted-foreground">
            {profile.email}
          </p>

          <span className="inline-block rounded-full bg-muted px-4 py-1 text-sm font-medium">
            {profile.role}
          </span>
        </div>
      </div>
    </div>
  );
}
