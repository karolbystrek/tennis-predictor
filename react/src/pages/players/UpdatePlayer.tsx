import type { FormEvent } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer.ts";
import { useUpdatePlayer } from "../../hooks/useUpdatePlayer.ts";
import { usePlayerForm } from "../../hooks/usePlayerForm.ts";
import { PlayerForm } from "../../components/players/PlayerForm.tsx";
import { FormActions } from "../../components/players/FormActions.tsx";
import { PlayerError } from "../../components/players/PlayerError.tsx";
import { PlayerNotFoundAlert } from "../../components/players/PlayerNotFoundAlert.tsx";
import { playerToFormData } from "../../utils/playerUtils.ts";
import { Alert, Box, Container, Typography } from "@mui/material";
import { Loading } from "../../components/Loading.tsx";

export const UpdatePlayer = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const {
    data: player,
    isLoading,
    error,
  } = usePlayer({
    playerId: Number(playerId),
  });

  const {
    formData,
    errorMessage,
    handleChange,
    validateForm,
    preparePlayerData,
    setErrorMessage,
    updateFormData,
  } = usePlayerForm();

  const { mutate: updatePlayer, isPending } = useUpdatePlayer();

  useEffect(() => {
    if (player) {
      updateFormData(playerToFormData(player));
    }
  }, [player]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    const playerData = preparePlayerData();

    updatePlayer(
      {
        player: {
          id: Number(playerId),
          ...playerData,
        },
        tokenValue: "",
      },
      {
        onSuccess: () => {
          navigate("/players");
        },
        onError: (error) => {
          setErrorMessage(error.message || "Failed to update player");
        },
      },
    );
  };

  const handleCancel = () => {
    navigate("/players");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <PlayerError message={error.message} />;
  }

  if (!player) {
    return <PlayerNotFoundAlert />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Update Player
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
          submitLabel="Update Player"
          isSubmitting={isPending}
        />
      </Box>
    </Container>
  );
};
