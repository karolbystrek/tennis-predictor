import { Navigate } from "react-router-dom";
import { type FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { type LoginRequest, useLogin } from "../hooks/useLogin.ts";

export const Login = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const { isAuthenticated } = useAuthenticationContext();
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      return;
    }

    login(credentials);
  };

  const handleUsernameChange = (value: string) => {
    setCredentials((prev) => ({ ...prev, username: value }));
  };

  const handlePasswordChange = (value: string) => {
    setCredentials((prev) => ({ ...prev, password: value }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          <TextField
            required
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={credentials.username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            disabled={isPending}
          />
          <TextField
            required
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            disabled={isPending}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
