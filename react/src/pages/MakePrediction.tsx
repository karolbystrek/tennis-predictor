import { Alert, Container } from "@mui/material";
import type { PredictionRequest } from "../hooks/useMakePrediction.ts";
import { useMakePrediction } from "../hooks/useMakePrediction.ts";
import { PredictionForm } from "../components/predictions/PredictionForm.tsx";
import { useNavigate } from "react-router-dom";

export const MakePrediction = () => {
  const navigate = useNavigate();
  const { mutate: makePrediction, isPending, error } = useMakePrediction();

  const handleSubmit = (request: PredictionRequest) => {
    makePrediction(
      { ...request, tokenValue: "" },
      {
        onSuccess: (data) => {
          navigate("/predictions/result", { state: { result: data } });
        },
      },
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}
      <PredictionForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </Container>
  );
};
