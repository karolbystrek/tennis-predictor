import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";

export const NavBar = () => {
  const { isAuthenticated, clearAuthentication } = useAuthenticationContext();
  const { setUser } = useApplicationContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthentication();
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Tennis Predictor
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate("/predictions")}>
                Make prediction
              </Button>
              <Button color="inherit" onClick={() => navigate("/players")}>
                Players
              </Button>
              <Button color="inherit" onClick={() => navigate("/account")}>
                Account
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
