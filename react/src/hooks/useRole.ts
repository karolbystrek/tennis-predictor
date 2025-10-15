import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import type { UserRole } from "../utils/types.ts";

export const useRole = () => {
  const { user } = useApplicationContext();

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const isAdmin = (): boolean => {
    return hasRole(["ADMIN"]);
  };

  const isUser = (): boolean => {
    return hasRole(["USER"]);
  };

  return {
    currentRole: user?.role || null,
    hasRole,
    isAdmin,
    isUser,
  };
};
