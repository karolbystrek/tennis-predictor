import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer.ts";
import { useDeletePlayer } from "../../hooks/useDeletePlayer.ts";
import { PlayerInfo } from "../../components/players/PlayerInfo.tsx";
import { Loading } from "../../components/Loading.tsx";
import { PlayerError } from "../../components/players/PlayerError.tsx";
import { PlayerNotFoundAlert } from "../../components/players/PlayerNotFoundAlert.tsx";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const DeletePlayer = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: player,
    isLoading,
    error,
  } = usePlayer({
    playerId: Number(playerId),
  });

  const { mutate: deletePlayer, isPending: isDeleting } = useDeletePlayer({
    playerId: Number(playerId),
  });

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    deletePlayer(
      { playerId: Number(playerId), tokenValue: "" },
      {
        onSuccess: () => {
          setOpenDialog(false);
          navigate("/players");
        },
      },
    );
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Delete Player
        </Typography>
        <Alert severity="warning" sx={{ mb: 3 }}>
          You are about to delete this player. This action cannot be undone.
        </Alert>
      </Box>

      <PlayerInfo player={player} />

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/players")}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? <CircularProgress size={24} /> : "Delete Player"}
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {player.firstName} {player.lastName}
            ? This action cannot be undone and all player data will be
            permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            autoFocus
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
