import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const PredictionResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result;

  if (result == null) {
    navigate("/predictions");
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Prediction Result
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
        <Box>
          <Typography variant="h6">{result.player1Name}</Typography>
          <LinearProgress
            variant="determinate"
            value={result.player1WinProbability * 100}
            sx={{ height: 10, borderRadius: 5, mt: 1 }}
          />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {(result.player1WinProbability * 100).toFixed(2)}% Win Probability
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">{result.player2Name}</Typography>
          <LinearProgress
            variant="determinate"
            value={result.player2WinProbability * 100}
            sx={{ height: 10, borderRadius: 5, mt: 1 }}
          />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {(result.player2WinProbability * 100).toFixed(2)}% Win Probability
          </Typography>
        </Box>
        <Box sx={{ mt: 2, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
          <Typography variant="h6" color="success.contrastText">
            Predicted Winner: {result.winnerName}
          </Typography>
          <Typography variant="body2" color="success.contrastText">
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </Typography>
        </Box>
        <Button
          component={Link}
          variant="contained"
          to={"/predictions"}
          fullWidth
        >
          Make Another Prediction
        </Button>
      </Box>
    </Paper>
  );
};
