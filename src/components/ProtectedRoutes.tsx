import { Navigate,Outlet } from "react-router-dom";

import { isAuthenticated } from "@/lib/auth";



const ProtectRoutes:React.FC=()=>{
    return isAuthenticated()?<Outlet/>:<Navigate to="/login" replace/>
};

export default ProtectRoutes