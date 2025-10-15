import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import type { UserRole } from "../utils/types.ts";
import { Alert, Box, Container } from "@mui/material";

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  showError?: boolean;
};

export const RoleGuard = ({
  children,
  allowedRoles,
  redirectTo = "/",
  showError = false,
}: RoleGuardProps) => {
  const { user } = useApplicationContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (showError) {
      return (
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 8 }}>
            <Alert severity="error">
              Access denied. You don't have permission to view this page.
            </Alert>
          </Box>
        </Container>
      );
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
