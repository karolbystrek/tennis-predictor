import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthenticationContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
