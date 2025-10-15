import { Alert, Container } from "@mui/material";

type PlayerErrorProps = {
  message: string;
};

export const PlayerError = ({ message }: PlayerErrorProps) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="error">Error loading player: {message}</Alert>
    </Container>
  );
};
