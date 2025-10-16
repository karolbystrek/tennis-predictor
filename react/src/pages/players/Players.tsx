import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePlayers } from "../../hooks/usePlayers.ts";
import { PlayerInfo } from "../../components/players/PlayerInfo.tsx";
import { useRole } from "../../hooks/useRole.ts";
import { PlayerSearchField } from "../../components/players/PlayerSearchField.tsx";

export const Players = () => {
  const { data: players, isLoading, error } = usePlayers();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const { isAdmin } = useRole();

  const selectedPlayer = players?.find((p) => p.id === selectedPlayerId);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 8 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography component="h1" variant="h4">
            Tennis Players
          </Typography>
          <Button
            component={Link}
            to="/players/add"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Player
          </Button>
        </Box>

        <PlayerSearchField
          label="Search and select player"
          value={selectedPlayerId}
          onChange={setSelectedPlayerId}
        />

        {isAdmin() && (
          <Stack direction="row" spacing={2} sx={{ my: 3 }}>
            <Button
              component={Link}
              to={`/players/update/${selectedPlayerId}`}
              variant="outlined"
              startIcon={<EditIcon />}
              disabled={!selectedPlayerId}
            >
              Update Player
            </Button>
            <Button
              component={Link}
              to={`/players/delete/${selectedPlayerId}`}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              disabled={!selectedPlayerId}
            >
              Delete Player
            </Button>
          </Stack>
        )}

        {selectedPlayer && <PlayerInfo player={selectedPlayer} />}
      </Box>
    </Container>
  );
};
