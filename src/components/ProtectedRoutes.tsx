import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

const ProtectRoutes: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminProtectRoutes: React.FC = () => {
  const userRole = localStorage.getItem("role");
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (userRole && userRole !== "admin" && !hasShownToast.current) {
      toast.error("You are not allowed");
      hasShownToast.current = true;
    }
  }, [userRole]);
  if (!userRole) return <Navigate to="/login" replace />;
  if (userRole !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectRoutes;
