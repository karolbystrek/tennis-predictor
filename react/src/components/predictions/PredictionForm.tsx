import { type ChangeEvent, type FormEvent, useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import type { PredictionRequest } from "../../hooks/useMakePrediction.ts";
import { PlayerSearchField } from "../players/PlayerSearchField.tsx";

type PredictionFormProps = {
  onSubmit: (request: PredictionRequest) => void;
  isSubmitting: boolean;
};

const SURFACES = ["Hard", "Clay", "Grass", "Carpet"];
const TOURNEY_LEVELS = ["G", "M", "A", "D", "F"];
const BEST_OF_OPTIONS = [3, 5];
const ROUNDS = ["R128", "R64", "R32", "R16", "QF", "SF", "F"];

export const PredictionForm = ({
  onSubmit,
  isSubmitting,
}: PredictionFormProps) => {
  const [formData, setFormData] = useState({
    player1Id: null as number | null,
    player2Id: null as number | null,
    surface: "",
    tourneyLevel: "",
    bestOf: "",
    round: "",
  });

  const handlePlayerChange =
    (field: "player1Id" | "player2Id") => (playerId: number | null) => {
      setFormData({ ...formData, [field]: playerId });
    };

  const handleChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.player1Id || !formData.player2Id) return;

    onSubmit({
      player1Id: formData.player1Id,
      player2Id: formData.player2Id,
      surface: formData.surface,
      tourneyLevel: formData.tourneyLevel,
      bestOf: Number(formData.bestOf),
      round: formData.round,
      tokenValue: "",
    });
  };

  const isFormValid =
    formData.player1Id &&
    formData.player2Id &&
    formData.surface &&
    formData.tourneyLevel &&
    formData.bestOf &&
    formData.round;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Make a Prediction
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <PlayerSearchField
          label="Player 1"
          value={formData.player1Id}
          onChange={handlePlayerChange("player1Id")}
        />
        <PlayerSearchField
          label="Player 2"
          value={formData.player2Id}
          onChange={handlePlayerChange("player2Id")}
        />
        <TextField
          select
          label="Surface"
          value={formData.surface}
          onChange={handleChange("surface")}
          required
          fullWidth
        >
          {SURFACES.map((surface) => (
            <MenuItem key={surface} value={surface}>
              {surface}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Tournament Level"
          value={formData.tourneyLevel}
          onChange={handleChange("tourneyLevel")}
          required
          fullWidth
        >
          {TOURNEY_LEVELS.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Best Of"
          value={formData.bestOf}
          onChange={handleChange("bestOf")}
          required
          fullWidth
        >
          {BEST_OF_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Round"
          value={formData.round}
          onChange={handleChange("round")}
          required
          fullWidth
        >
          {ROUNDS.map((round) => (
            <MenuItem key={round} value={round}>
              {round}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isFormValid}
          fullWidth
        >
          {isSubmitting ? "Making Prediction..." : "Submit"}
        </Button>
      </Box>
    </Paper>
  );
};
