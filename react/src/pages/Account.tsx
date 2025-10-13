import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { Avatar, Box, Chip, Container, Divider, Paper, Typography } from "@mui/material";
import {
  AccountCircle as UserIcon,
  AdminPanelSettings as AdminIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Person as PersonIcon
} from "@mui/icons-material";

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Account = () => {
  const { user } = useApplicationContext();

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No user information available
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              fontSize: "2rem",
              mr: 3,
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Account Information
            </Typography>
            <Chip
              icon={user.role === "ADMIN" ? <AdminIcon /> : <UserIcon />}
              label={user.role}
              color={user.role === "ADMIN" ? "secondary" : "primary"}
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ mr: 2, color: "primary.main" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Username
              </Typography>
              <Typography variant="h6">{user.username}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography variant="h6">{user.email}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarIcon sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Account Created
              </Typography>
              <Typography variant="body1">
                {formatDate(user.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarIcon sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {formatDate(user.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
