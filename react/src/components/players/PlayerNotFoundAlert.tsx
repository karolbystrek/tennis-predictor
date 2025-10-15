import { Alert, Container } from "@mui/material";

export const PlayerNotFoundAlert = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="warning">Player not found</Alert>
    </Container>
  );
};
