import { useNavigate } from "react-router-dom";
import { useAddPlayer } from "../../hooks/useAddPlayer.ts";
import { usePlayerForm } from "../../hooks/usePlayerForm.ts";
import { FormActions } from "../../components/players/FormActions.tsx";
import { Alert, Box, Container, Typography } from "@mui/material";
import type { FormEvent } from "react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm()) {
      return;
    }
    const playerData = preparePlayerData();
    addPlayer({ player: playerData, tokenValue: "" });
  };

  const handleCancel = () => {
    navigate("/players");
  };

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
