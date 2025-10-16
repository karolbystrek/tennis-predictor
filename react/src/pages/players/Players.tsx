import { useMemo, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePlayers } from "../../hooks/usePlayers.ts";
import { PlayerInfo } from "../../components/players/PlayerInfo.tsx";
import type { Player } from "../../utils/types.ts";
import { useRole } from "../../hooks/useRole.ts";

export const Players = () => {
  const { data: players, isLoading, error } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { isAdmin } = useRole();

  const sortedPlayers = useMemo(() => {
    if (!players) return [];
    return [...players].sort((a, b) => b.elo - a.elo);
  }, [players]);

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

        <Autocomplete
          options={sortedPlayers}
          getOptionLabel={(option) =>
            `${option.firstName} ${option.lastName} (ELO: ${option.elo.toFixed(0)})`
          }
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography>
                  {option.firstName} {option.lastName}
                </Typography>
                <Chip
                  label={`ELO: ${option.elo.toFixed(0)}`}
                  size="small"
                  color="primary"
                />
              </Box>
            </li>
          )}
          value={selectedPlayer}
          onChange={(_, newValue) => setSelectedPlayer(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search and select player"
              placeholder="Start typing to search..."
              variant="outlined"
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterOptions={(options, state) => {
            const query = state.inputValue.toLowerCase().trim();
            if (!query) return options.slice(0, 10);

            return options
              .filter(
                (player) =>
                  player.firstName.toLowerCase().includes(query) ||
                  player.lastName.toLowerCase().includes(query) ||
                  `${player.firstName} ${player.lastName}`
                    .toLowerCase()
                    .includes(query) ||
                  player.ioc.toLowerCase().includes(query),
              )
              .slice(0, 10);
          }}
          noOptionsText="No players found"
          sx={{ mb: 3 }}
        />

        {isAdmin() && (
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              component={Link}
              to={`/players/update/${selectedPlayer?.id}`}
              variant="outlined"
              startIcon={<EditIcon />}
              disabled={!selectedPlayer}
            >
              Update Player
            </Button>
            <Button
              component={Link}
              to={`/players/delete/${selectedPlayer?.id}`}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              disabled={!selectedPlayer}
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
