import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { usePlayers } from "../../hooks/usePlayers.ts";

type PlayerSearchFieldProps = {
  label: string;
  value: number | null;
  onChange: (playerId: number | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};

export const PlayerSearchField = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled,
}: PlayerSearchFieldProps) => {
  const { data: players, isLoading } = usePlayers();

  const sortedPlayers = useMemo(() => {
    if (!players) return [];
    return [...players].sort((a, b) => b.elo - a.elo);
  }, [players]);

  const selectedPlayer = useMemo(() => {
    if (!value || !players) return null;
    return players.find((p) => p.id === value) || null;
  }, [value, players]);

  return (
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
      onChange={(_, newValue) => onChange(newValue?.id || null)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Start typing to search..."
          variant="outlined"
          error={error}
          helperText={helperText}
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
      noOptionsText={isLoading ? "Loading players..." : "No players found"}
      disabled={disabled || isLoading}
      loading={isLoading}
      fullWidth
    />
  );
};
