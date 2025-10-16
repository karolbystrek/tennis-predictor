import { useNavigate } from "react-router-dom";
import { useAddPlayer } from "../../hooks/useAddPlayer.ts";
import { usePlayerForm } from "../../hooks/usePlayerForm.ts";
import { FormActions } from "../../components/players/FormActions.tsx";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useState } from "react";
import { PlayerForm } from "../../components/players/PlayerForm.tsx";

export const AddPlayer = () => {
  const navigate = useNavigate();
  const {
    formData,
    errorMessage,
    handleChange,
    validateForm,
    preparePlayerData,
    setErrorMessage,
  } = usePlayerForm();

  const { mutate: addPlayer, isPending } = useAddPlayer();
  const [added, setAdded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm()) {
      return;
    }
    const playerData = preparePlayerData();

    // call mutate and react to success/failure instead of navigating immediately
    addPlayer(
      { player: playerData, tokenValue: "" },
      {
        onSuccess: () => {
          setAdded(true);
        },
        onError: (err: any) => {
          const message = err?.message ?? "Failed to add player";
          setErrorMessage(message);
        },
      },
    );
  };

  const handleCancel = () => {
    navigate("/players");
  };

  if (added) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Player added
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          The player was added successfully.
        </Alert>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => navigate("/players")}>
            Back to players
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Add New Player
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <PlayerForm
          formData={formData}
          onChange={handleChange}
          disabled={isPending}
        />
        <FormActions
          onCancel={handleCancel}
          submitLabel="Add Player"
          isSubmitting={isPending}
        />
      </Box>
    </Container>
  );
};
