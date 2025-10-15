import { CircularProgress, Container } from "@mui/material";

export const Loading = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, display: "flex", justifyContent: "center" }}
    >
      <CircularProgress />
    </Container>
  );
};
