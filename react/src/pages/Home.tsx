import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import BoltIcon from "@mui/icons-material/Bolt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";

export const Home = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      title: "Accurate Predictions",
      description:
        "A machine learning model trained on historical ATP matches to provide match-level win probabilities.",
      icon: <ShowChartIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Extensive Player Data",
      description:
        "Browse player profiles, rankings and historical performance metrics.",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Fast Results",
      description:
        "Make predictions and get near-instant results powered by an optimized backend.",
      icon: <BoltIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Secure Accounts",
      description:
        "Authentication and role-based access to manage players and predictions.",
      icon: <SecurityIcon sx={{ fontSize: 28 }} />,
    },
  ];

  const stats = [
    { label: "Matches", value: "1.2M+" },
    { label: "Players", value: "25k+" },
    { label: "Predictions", value: "350k+" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 3,
            p: { xs: 3, md: 6 },
            background: "linear-gradient(135deg, #0f172a 0%, #001e3c 60%)",
            color: "common.white",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: isSm ? 72 : 96,
              height: isSm ? 72 : 96,
              mr: { md: 3 },
            }}
          >
            <SportsTennisIcon sx={{ fontSize: isSm ? 36 : 48 }} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant={isSm ? "h4" : "h3"}
              component="h1"
              gutterBottom
            >
              Tennis Predictor
            </Typography>
            <Typography variant="h6" color="white" sx={{ opacity: 0.9, mb: 2 }}>
              Predict match outcomes using historical ATP data and an
              explainable ML model.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                to="/predictions"
                variant="contained"
                color="secondary"
                size="large"
              >
                Make a Prediction
              </Button>
              <Button
                component={Link}
                to="/players"
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Explore Players
              </Button>
            </Stack>
          </Box>

          <Box sx={{ width: { xs: "100%", md: 260 }, mt: { xs: 2, md: 0 } }}>
            <Card
              sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "common.white" }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                  Quick summary
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                  Trusted by tennis fans & analysts
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Fast, transparent predictions with a clean API for
                  integrations.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What you can do
        </Typography>
        <Grid container spacing={2}>
          {features.map((f) => (
            <Card sx={{ height: "100%", borderRadius: 2 }} key={f.title}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "primary.main" }}>{f.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {f.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Box>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Data & Model
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          The model is trained on historical ATP match data and player
          statistics. It focuses on explainability and reproducibility so
          results are auditable and useful for analysis.
        </Typography>
        <Stack direction="row" spacing={3}>
          {stats.map((s) => (
            <Box key={s.label}>
              <Typography variant="h6">{s.value}</Typography>
              <Typography variant="caption" color="text.secondary">
                {s.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Built with care — data from ATP match records. View the code,
          contribute or deploy your own instance.
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          © {new Date().getFullYear()} Tennis Predictor
        </Typography>
      </Box>
    </Container>
  );
};
