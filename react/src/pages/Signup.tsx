import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
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
import { type SignupRequest, useSignup } from "../hooks/useSignup.ts";

const Signup = () => {
  const { isAuthenticated } = useAuthenticationContext();
  const [credentials, setCredentials] = useState<SignupRequest>({
    username: "",
    email: "",
    password: "",
  });
  const { mutate: signup, isPending, error } = useSignup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !credentials.username.trim() ||
      !credentials.email.trim() ||
      !credentials.password.trim()
    ) {
      return;
    }

    signup(credentials);
  };

  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
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
          Sign up
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
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <TextField
            required
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
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
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Signup;
