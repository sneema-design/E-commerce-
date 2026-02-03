import { useGetProfile } from "@/service/user/useUserService";
export default function Profile() {
  const { data:Profile, isLoading, isError, error } = useGetProfile();
  if(isLoading) return <p className="text-center mt-10">Loading the profile....</p>
  if(isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>
  return (
    <>
      <h1>{Profile?.name}</h1>
      <h1>{Profile?.email}</h1>
      <img src={Profile?.avatar}/>
    </>
  );
}
